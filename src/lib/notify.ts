import "server-only";
import type { FollowUp, NotificationSettings, PrayerRequest } from "@prisma/client";
import prisma from "./prisma";
import { site } from "./site";
import { whatsappNumber } from "./phone";
import { emailConfigured, envEmails, sendNotification } from "./email";

/**
 * Team alerts for new prayer requests and new converts.
 *
 * WhatsApp, free (default): CallMeBot. The owner of each receiving number messages the CallMeBot
 * bot once ("I allow callmebot to send me messages") and gets an API key, which a super admin
 * saves next to that number on the Notifications tab. No server setup needed.
 * See https://www.callmebot.com/blog/free-api-whatsapp-messages/
 *
 * WhatsApp, paid fallback (used for a number without a CallMeBot key): Twilio, via
 * TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_WHATSAPP_FROM. Outside a 24-hour reply window
 * WhatsApp needs a Meta-approved template: TWILIO_PRAYER_TEMPLATE_SID / TWILIO_CONVERT_TEMPLATE_SID
 * with variables {{1}} name, {{2}} phone, {{3}} prayer request or address.
 *
 * Email goes through Resend (see email.ts): RESEND_API_KEY + NOTIFY_EMAIL_FROM. Default recipients come
 * from NOTIFY_PRAYER_EMAILS / NOTIFY_CONVERT_EMAILS; addresses a super admin saves on the
 * Notifications tab replace them. Each event is sent with an idempotency key, so it's emailed once.
 *
 * What gets sent, and to whom, is set by super admins on the Notifications tab.
 */

export type Kind = "prayer" | "convert";
export type Channel = "whatsapp" | "email";
type Result = { ok: true } | { ok: false; error: string };

const DEFAULTS: Omit<NotificationSettings, "id" | "updatedAt"> = {
  key: "default",
  whatsappEnabled: false,
  emailEnabled: false,
  prayerWhatsapp: null,
  convertWhatsapp: null,
  prayerWhatsappKey: null,
  convertWhatsappKey: null,
  prayerTextOnWhatsapp: false,
  prayerEmails: [],
  convertEmails: [],
  lastError: null,
  lastErrorAt: null,
  updatedBy: null,
};

const envDefaults = () => ({ prayer: envEmails("NOTIFY_PRAYER_EMAILS"), convert: envEmails("NOTIFY_CONVERT_EMAILS") });

export async function getNotificationSettings() {
  const row = await prisma.notificationSettings.findUnique({ where: { key: "default" } });
  if (row) return row;
  // Never saved on the dashboard yet: email is on if the server has recipients configured.
  const d = envDefaults();
  const emailEnabled = emailConfigured() && (d.prayer.length > 0 || d.convert.length > 0);
  return { ...DEFAULTS, emailEnabled, id: null, updatedAt: null };
}

/** Dashboard list if one is saved, else the server default from env. */
function emailRecipients(kind: Kind, s: { prayerEmails: string[]; convertEmails: string[] }) {
  const saved = kind === "prayer" ? s.prayerEmails : s.convertEmails;
  return saved.length ? saved : envDefaults()[kind];
}

type StoredSettings = Awaited<ReturnType<typeof getNotificationSettings>>;
// Kept for sendOne's parameter type.
type SettingsView = StoredSettings;

/** What the Notifications tab gets: API keys replaced by "is one saved?". */
export function publicSettings(s: StoredSettings) {
  const { prayerWhatsappKey, convertWhatsappKey, ...rest } = s;
  return { ...rest, hasPrayerKey: !!prayerWhatsappKey, hasConvertKey: !!convertWhatsappKey };
}

export type PublicSettings = ReturnType<typeof publicSettings>;

export function providerStatus() {
  return {
    twilio: !!(process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN && process.env.TWILIO_WHATSAPP_FROM),
    whatsappTemplates: {
      prayer: !!process.env.TWILIO_PRAYER_TEMPLATE_SID,
      convert: !!process.env.TWILIO_CONVERT_TEMPLATE_SID,
    },
    email: emailConfigured(),
    emailDefaults: envDefaults(),
  };
}

export type ProviderStatus = ReturnType<typeof providerStatus>;

/** E.164 with "+", e.g. 0812 345 6789 → +2348123456789 */
export const toE164 = (phone: string) => `+${whatsappNumber(phone)}`;

async function errorText(res: Response) {
  const body = await res.json().catch(() => null);
  return `${res.status} ${body?.message ?? body?.error?.message ?? body?.name ?? res.statusText}`.trim();
}

async function sendCallMeBot(to: string, apikey: string, text: string): Promise<Result> {
  const url = new URL("https://api.callmebot.com/whatsapp.php");
  url.search = new URLSearchParams({ phone: toE164(to), text, apikey }).toString();
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(15_000) });
    // Errors (e.g. a wrong API key) can come back as a 200 with an explanation in the body.
    const body = (await res.text()).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
    if (!res.ok || /error|invalid|not (allowed|activated)|blocked/i.test(body)) {
      return { ok: false, error: `WhatsApp (CallMeBot): ${res.status} ${body.slice(0, 160)}`.trim() };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: `WhatsApp (CallMeBot): ${e instanceof Error ? e.message : "request failed"}` };
  }
}

async function sendTwilio(to: string, body: string, template?: { sid: string; vars: Record<string, string> }): Promise<Result> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_FROM;
  if (!sid || !token || !from) {
    return { ok: false, error: "No CallMeBot key is saved for this number (and paid Twilio isn't set up)" };
  }

  const form = new URLSearchParams({ From: `whatsapp:${toE164(from)}`, To: `whatsapp:${toE164(to)}` });
  if (template) {
    form.set("ContentSid", template.sid);
    form.set("ContentVariables", JSON.stringify(template.vars));
  } else {
    form.set("Body", body);
  }
  try {
    const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
      method: "POST",
      headers: { Authorization: `Basic ${Buffer.from(`${sid}:${token}`).toString("base64")}` },
      body: form,
      signal: AbortSignal.timeout(10_000),
    });
    return res.ok ? { ok: true } : { ok: false, error: `WhatsApp: ${await errorText(res)}` };
  } catch (e) {
    return { ok: false, error: `WhatsApp: ${e instanceof Error ? e.message : "request failed"}` };
  }
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

/** `whatsappText` is what goes over WhatsApp, when it should differ from the email text. */
/** `eventKey` identifies the event for idempotency, e.g. "prayer-request/<id>". */
type Message = { eventKey: string; subject: string; text: string; whatsappText?: string; vars: Record<string, string> };

function prayerMessage(r: Pick<PrayerRequest, "id" | "fullname" | "phone" | "prayerRequest">): Message {
  const link = `Open the dashboard: ${site.url}/admin?menu=prayer-requests`;
  return {
    eventKey: `prayer-request/${r.id}`,
    whatsappText: ["🙏 New prayer request", `Name: ${r.fullname}`, `Phone: ${r.phone}`, "", link].join("\n"),
    subject: `New prayer request from ${r.fullname}`,
    text: [
      "🙏 New prayer request",
      `Name: ${r.fullname}`,
      `Phone: ${r.phone}`,
      "",
      clip(r.prayerRequest, 1200),
      "",
      `Open the dashboard: ${site.url}/admin?menu=prayer-requests`,
    ].join("\n"),
    vars: { "1": r.fullname, "2": r.phone, "3": clip(r.prayerRequest, 900) },
  };
}

function convertMessage(r: Pick<FollowUp, "id" | "name" | "phone" | "address">): Message {
  return {
    eventKey: `new-convert/${r.id}`,
    subject: `New convert to follow up: ${r.name}`,
    text: [
      "✝️ New convert to follow up",
      `Name: ${r.name}`,
      `Phone: ${r.phone}`,
      `Address: ${r.address}`,
      "",
      `Open the dashboard: ${site.url}/admin?menu=follow-up`,
    ].join("\n"),
    vars: { "1": r.name, "2": r.phone, "3": r.address },
  };
}

// Test sends get a fresh id each time, so every "Send test" click sends.
const sample = {
  prayer: () => prayerMessage({ id: `test-${crypto.randomUUID()}`, fullname: "Test Person", phone: "0800 000 0000", prayerRequest: "This is a test alert from the church website. No action needed." }),
  convert: () => convertMessage({ id: `test-${crypto.randomUUID()}`, name: "Test Person", phone: "0800 000 0000", address: "This is a test alert from the church website." }),
};

/** Sends one channel for one kind. Ignores the on/off switch (used for "Send test"). */
export async function sendOne(kind: Kind, channel: Channel, message: Message, settings?: SettingsView): Promise<Result> {
  const s = settings ?? (await getNotificationSettings());
  if (channel === "whatsapp") {
    const to = kind === "prayer" ? s.prayerWhatsapp : s.convertWhatsapp;
    if (!to) return { ok: false, error: "No WhatsApp number is set for this alert" };
    const text = kind === "prayer" && s.prayerTextOnWhatsapp ? message.text : (message.whatsappText ?? message.text);
    const key = kind === "prayer" ? s.prayerWhatsappKey : s.convertWhatsappKey;
    if (key) return sendCallMeBot(to, key, text);
    const sid = kind === "prayer" ? process.env.TWILIO_PRAYER_TEMPLATE_SID : process.env.TWILIO_CONVERT_TEMPLATE_SID;
    return sendTwilio(to, text, sid ? { sid, vars: message.vars } : undefined);
  }
  const to = emailRecipients(kind, s);
  if (!to.length) return { ok: false, error: "No email recipients are set for this alert" };
  const sent = await sendNotification({
    to,
    subject: message.subject,
    text: message.text,
    idempotencyKey: message.eventKey,
    tags: { event: kind === "prayer" ? "prayer_request" : "new_convert" },
  });
  return sent.ok ? { ok: true } : { ok: false, error: sent.error };
}

export const sendTest = (kind: Kind, channel: Channel) => sendOne(kind, channel, sample[kind]());

async function dispatch(kind: Kind, message: Message) {
  const s = await getNotificationSettings();
  const jobs: Promise<Result>[] = [];
  if (s.whatsappEnabled && (kind === "prayer" ? s.prayerWhatsapp : s.convertWhatsapp)) {
    jobs.push(sendOne(kind, "whatsapp", message, s));
  }
  if (s.emailEnabled && emailRecipients(kind, s).length) {
    jobs.push(sendOne(kind, "email", message, s));
  }
  const errors = (await Promise.all(jobs)).flatMap((r) => (r.ok ? [] : [r.error]));
  if (errors.length) {
    console.error(`[notify] ${kind} alert failed:`, errors);
    // Shown on the Notifications tab so a super admin can spot a broken setup.
    const failure = { lastError: errors.join(" · "), lastErrorAt: new Date() };
    await prisma.notificationSettings
      // Creating the row must keep the effective on/off state (email may be on via env defaults).
      .upsert({
        where: { key: "default" },
        update: failure,
        create: { key: "default", emailEnabled: s.emailEnabled, whatsappEnabled: s.whatsappEnabled, ...failure },
      })
      .catch(() => {});
  }
}

export const notifyPrayerRequest = (record: unknown) => dispatch("prayer", prayerMessage(record as PrayerRequest));
export const notifyNewConvert = (record: unknown) => dispatch("convert", convertMessage(record as FollowUp));
