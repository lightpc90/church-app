import { z } from "zod";
import prisma from "@/lib/prisma";
import { authorize, json, parseBody, serverError } from "@/lib/api";
import { getNotificationSettings, publicSettings, toE164 } from "@/lib/notify";

// Super admins only (the "notifications" resource).

const whatsapp = z
  .union([z.string().trim().regex(/^\+?[0-9\s-]{7,20}$/, "Enter a valid phone number"), z.literal("")])
  .transform((v) => (v ? toE164(v) : null));

const emails = z
  .array(z.string().trim().toLowerCase().pipe(z.email("One of the emails isn't valid")))
  .max(20, "At most 20 emails")
  .transform((list) => [...new Set(list)]);

// Omitted = keep the saved key, "" = remove it. CallMeBot keys are short digit strings.
const apiKey = z
  .string()
  .trim()
  .max(64)
  .regex(/^[A-Za-z0-9-]*$/, "That doesn't look like a CallMeBot API key")
  .transform((v) => v || null);

const settingsSchema = z.object({
  whatsappEnabled: z.boolean(),
  prayerTextOnWhatsapp: z.boolean(),
  prayerWhatsappKey: apiKey,
  convertWhatsappKey: apiKey,
  emailEnabled: z.boolean(),
  prayerWhatsapp: whatsapp,
  convertWhatsapp: whatsapp,
  prayerEmails: emails,
  convertEmails: emails,
});

export async function GET() {
  const { denied } = await authorize("view", "notifications");
  if (denied) return denied;
  try {
    return json({ success: true, data: publicSettings(await getNotificationSettings()) });
  } catch (e) {
    return serverError("fetch notification settings", e);
  }
}

export async function PUT(req: Request) {
  const { staff, denied } = await authorize("manage", "notifications");
  if (denied) return denied;
  const body = await parseBody(req, settingsSchema, true);
  if (body.error) return body.error;
  const data = { ...body.data, updatedBy: staff.name };
  // A key belongs to a number: clearing the number clears its key.
  if (data.prayerWhatsapp === null) data.prayerWhatsappKey = null;
  if (data.convertWhatsapp === null) data.convertWhatsappKey = null;
  try {
    const saved = await prisma.notificationSettings.upsert({
      where: { key: "default" },
      create: { key: "default", ...data },
      update: data,
    });
    return json({ success: true, data: publicSettings(saved) });
  } catch (e) {
    return serverError("save notification settings", e);
  }
}

/** Clears the "last error" banner. */
export async function DELETE() {
  const { denied } = await authorize("manage", "notifications");
  if (denied) return denied;
  await prisma.notificationSettings
    .update({ where: { key: "default" }, data: { lastError: null, lastErrorAt: null } })
    .catch(() => {});
  return json({ success: true });
}
