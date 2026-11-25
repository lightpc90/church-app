import "server-only";
import { Resend } from "resend";

/**
 * Transactional email through Resend's official SDK.
 *
 * Env: RESEND_API_KEY (a *sending-only* key) and NOTIFY_EMAIL_FROM, e.g.
 * "RCCG Beautiful Gate <alerts@mail.example.org>" on a domain verified in Resend.
 * Before the domain is verified, use "… <onboarding@resend.dev>": Resend then only delivers to
 * the Resend account owner's own address.
 */

let client: Resend | null = null;
function resend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return (client ??= new Resend(key));
}

export const emailConfigured = () => !!(process.env.RESEND_API_KEY && process.env.NOTIFY_EMAIL_FROM);

export type SendResult =
  | { ok: true; id: string; attempts: number }
  | { ok: false; error: string; attempts: number };

// Worth retrying: rate limits, Resend-side failures, and a duplicate still in flight.
// Not retried: other 4xx (bad sender/domain, bad key, validation) and daily/monthly quota
// errors, which won't succeed until the quota resets.
const RETRYABLE = new Set(["rate_limit_exceeded", "application_error", "internal_server_error", "concurrent_idempotent_requests"]);

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Exponential backoff with jitter (0.5s, 1s, 2s…), or Resend's retry-after when it gives one. */
function delayFor(attempt: number, retryAfter?: string | null) {
  const seconds = Number(retryAfter);
  if (retryAfter && Number.isFinite(seconds)) return Math.min(seconds * 1000, 10_000);
  return Math.min(500 * 2 ** (attempt - 1), 8_000) + Math.random() * 250;
}

/**
 * Sends one notification email, with retries.
 *
 * `idempotencyKey` should identify the event, e.g. "prayer-request/<record id>": if the same
 * event is sent twice within 24 hours (a retry, a double submit), Resend delivers it once.
 * Never throws.
 */
export async function sendNotification(
  {
    to,
    subject,
    text,
    idempotencyKey,
    tags,
  }: { to: string[]; subject: string; text: string; idempotencyKey: string; tags?: Record<string, string> },
  { maxAttempts = 4 }: { maxAttempts?: number } = {}
): Promise<SendResult> {
  const api = resend();
  const from = process.env.NOTIFY_EMAIL_FROM;
  if (!api || !from) return { ok: false, error: "Email isn't set up on the server (RESEND_API_KEY, NOTIFY_EMAIL_FROM)", attempts: 0 };
  if (!to.length) return { ok: false, error: "No email recipients", attempts: 0 };

  let last = "Email: unknown error";
  let attempts = 0;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    attempts = attempt;
    let retryAfter: string | null | undefined;
    try {
      const { data, error, headers } = await api.emails.send(
        {
          from,
          to,
          subject,
          text,
          // Resend tag values: letters, numbers, _ and - only
          tags: tags && Object.entries(tags).map(([name, value]) => ({ name, value: value.replace(/[^\w-]/g, "_") })),
        },
        { idempotencyKey }
      );
      if (data) {
        console.info(`[email] sent ${data.id} (${idempotencyKey}) to ${to.length} recipient(s)`);
        return { ok: true, id: data.id, attempts: attempt };
      }
      last = `Email: ${error.statusCode ?? ""} ${error.name}: ${error.message}`.replace("  ", " ");
      const retryable = RETRYABLE.has(error.name) || (error.statusCode ?? 0) >= 500 || error.statusCode == null;
      if (!retryable) break;
      retryAfter = headers?.["retry-after"];
    } catch (e) {
      // Network failure: retry.
      last = `Email: ${e instanceof Error ? e.message : "request failed"}`;
    }
    if (attempt < maxAttempts) await sleep(delayFor(attempt, retryAfter));
  }
  console.error(`[email] failed (${idempotencyKey}): ${last}`);
  return { ok: false, error: last, attempts };
}

/** Comma/space separated list from an env var, e.g. NOTIFY_PRAYER_EMAILS. */
export function envEmails(name: string) {
  return (process.env[name] ?? "")
    .split(/[\s,;]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e));
}
