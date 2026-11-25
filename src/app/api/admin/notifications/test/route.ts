import { z } from "zod";
import { authorize, fail, json, parseBody } from "@/lib/api";
import { sendTest } from "@/lib/notify";

const testSchema = z.object({
  kind: z.enum(["prayer", "convert"]),
  channel: z.enum(["whatsapp", "email"]),
});

/** Sends a sample alert using the saved recipients, even if that channel is switched off. */
export async function POST(req: Request) {
  const { denied } = await authorize("manage", "notifications");
  if (denied) return denied;
  const body = await parseBody(req, testSchema);
  if (body.error) return body.error;
  const result = await sendTest(body.data.kind, body.data.channel);
  return result.ok ? json({ success: true }) : fail(502, result.error);
}
