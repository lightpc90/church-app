import "server-only";
import { createHash } from "node:crypto";
import prisma from "./prisma";

/**
 * Instagram feed via the Instagram API with Instagram Login (graph.instagram.com). The old
 * "Basic Display" API was shut down in December 2024.
 *
 * Long-lived tokens expire after 60 days, which is why the feed stopped. Now:
 *  - INSTAGRAM_ACCESS_TOKEN (env) is the starting token;
 *  - /api/cron/instagram-refresh (Vercel Cron, weekly) renews it and stores the new one in the
 *    database (IntegrationToken "instagram"), so it never expires while the site is running;
 *  - setting a different token in the env replaces the stored one automatically.
 */

const GRAPH = "https://graph.instagram.com";
const KEY = "instagram";
const SEED_KEY = "instagram:seed";

const fingerprint = (token: string) => createHash("sha256").update(token).digest("hex");

/** The newest token: the renewed one in the database, unless the env token has been changed since. */
async function currentToken(): Promise<string | null> {
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN || null;
  try {
    const [stored, seed] = await Promise.all([
      prisma.integrationToken.findUnique({ where: { key: KEY } }),
      prisma.integrationToken.findUnique({ where: { key: SEED_KEY } }),
    ]);
    const envChanged = envToken && seed?.value !== fingerprint(envToken);
    if (stored && !envChanged && (!stored.expiresAt || stored.expiresAt > new Date())) return stored.value;
  } catch (e) {
    console.error("[instagram] token lookup failed:", e instanceof Error ? e.message : e);
  }
  return envToken;
}

/** Renews the long-lived token (valid 60 more days) and stores it. Called weekly by the cron job. */
export async function refreshInstagramToken(): Promise<{ ok: boolean; expiresAt?: Date; error?: string }> {
  const token = await currentToken();
  if (!token) return { ok: false, error: "No INSTAGRAM_ACCESS_TOKEN set" };
  const url = `${GRAPH}/refresh_access_token?${new URLSearchParams({ grant_type: "ig_refresh_token", access_token: token })}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const body = await res.json().catch(() => null);
    if (!res.ok || !body?.access_token) {
      const msg = body?.error?.message ?? `HTTP ${res.status}`;
      console.error(`[instagram] token refresh failed: ${msg}`);
      return { ok: false, error: msg };
    }
    const expiresAt = new Date(Date.now() + Number(body.expires_in ?? 60 * 86_400) * 1000);
    const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    await prisma.$transaction([
      prisma.integrationToken.upsert({
        where: { key: KEY },
        update: { value: body.access_token, expiresAt },
        create: { key: KEY, value: body.access_token, expiresAt },
      }),
      ...(envToken
        ? [
            prisma.integrationToken.upsert({
              where: { key: SEED_KEY },
              update: { value: fingerprint(envToken) },
              create: { key: SEED_KEY, value: fingerprint(envToken) },
            }),
          ]
        : []),
    ]);
    return { ok: true, expiresAt };
  } catch (e) {
    const msg = e instanceof Error ? e.message : "request failed";
    console.error(`[instagram] token refresh failed: ${msg}`);
    return { ok: false, error: msg };
  }
}
const REVALIDATE_SECONDS = 3600;

/** Checks a token against Instagram and, if it works, stores it as the current one. */
export async function saveInstagramToken(token: string): Promise<{ ok: boolean; username?: string; error?: string }> {
  const check = await whoAmI(token);
  if (!check.ok) return check;
  const envToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  await prisma.$transaction([
    prisma.integrationToken.upsert({
      where: { key: KEY },
      // Expiry is learned at the next renewal (new tokens last 60 days).
      update: { value: token, expiresAt: null },
      create: { key: KEY, value: token },
    }),
    // Record the env token as "seen", so the stored token wins until the env one changes.
    envToken
      ? prisma.integrationToken.upsert({
          where: { key: SEED_KEY },
          update: { value: fingerprint(envToken) },
          create: { key: SEED_KEY, value: fingerprint(envToken) },
        })
      : prisma.integrationToken.deleteMany({ where: { key: SEED_KEY } }),
  ]);
  return check;
}

async function whoAmI(token: string): Promise<{ ok: boolean; username?: string; error?: string }> {
  try {
    const res = await fetch(`${GRAPH}/me?${new URLSearchParams({ fields: "id,username", access_token: token })}`, { cache: "no-store" });
    const body = await res.json().catch(() => null);
    if (res.ok && body?.username) return { ok: true, username: body.username };
    return { ok: false, error: body?.error?.message ?? `Instagram returned HTTP ${res.status}` };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Couldn't reach Instagram" };
  }
}

/** For the Integrations page: where the token comes from and whether Instagram accepts it. */
export async function instagramStatus() {
  const token = await currentToken();
  const stored = await prisma.integrationToken.findUnique({ where: { key: KEY } }).catch(() => null);
  const source = !token ? "none" : stored?.value === token ? "dashboard" : "environment";
  const check = token ? await whoAmI(token) : { ok: false, error: "No token yet" };
  return {
    source,
    connected: check.ok,
    username: check.username ?? null,
    error: check.ok ? null : (check.error ?? null),
    expiresAt: source === "dashboard" ? (stored?.expiresAt ?? null) : null,
    updatedAt: source === "dashboard" ? (stored?.updatedAt ?? null) : null,
    autoRenew: !!process.env.CRON_SECRET,
  };
}

export type InstagramStatus = Awaited<ReturnType<typeof instagramStatus>>;

export type InstagramProfile = {
  id: string;
  username: string;
  profile_picture_url?: string;
  followers_count?: number;
  follows_count?: number;
};

type RawPost = {
  id: string;
  caption?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
};

export type InstagramPost = { id: string; caption?: string; permalink: string; imageUrl: string };

async function graph<T>(path: string, fields: string): Promise<T | null> {
  const token = await currentToken();
  if (!token) return null;
  const url = `${GRAPH}/${path}?${new URLSearchParams({ fields, access_token: token })}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      // Never log the URL: it contains the access token. Code 190 = expired or invalid token.
      const err = (await res.json().catch(() => null))?.error;
      console.error(`[instagram] ${path} failed: ${res.status}${err ? ` (code ${err.code}: ${err.message})` : ""}`);
      return null;
    }
    return (await res.json()) as T;
  } catch (e) {
    console.error(`[instagram] ${path} failed:`, e instanceof Error ? e.message : e);
    return null;
  }
}

export function getInstagramProfile() {
  return graph<InstagramProfile>(
    "me",
    "id,username,profile_picture_url,followers_count,follows_count"
  );
}

/** The most recent posts that have a displayable image (videos use their thumbnail). */
export async function getInstagramPosts(limit = 9): Promise<InstagramPost[] | null> {
  const data = await graph<{ data?: RawPost[] }>(
    "me/media",
    "id,caption,media_url,permalink,thumbnail_url,media_type"
  );
  if (!Array.isArray(data?.data)) return null;

  return data.data
    .map((p) => ({
      id: p.id,
      caption: p.caption,
      permalink: p.permalink,
      imageUrl: (p.media_type === "VIDEO" ? p.thumbnail_url : p.media_url ?? p.thumbnail_url) ?? "",
    }))
    .filter((p) => p.imageUrl)
    .slice(0, limit);
}
