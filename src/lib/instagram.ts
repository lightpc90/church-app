import "server-only";

const GRAPH = "https://graph.instagram.com";
const REVALIDATE_SECONDS = 3600;

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
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) return null;
  const url = `${GRAPH}/${path}?${new URLSearchParams({ fields, access_token: token })}`;
  try {
    const res = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
    if (!res.ok) {
      // Never log the URL: it contains the access token.
      console.error(`[instagram] ${path} failed: ${res.status}`);
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
