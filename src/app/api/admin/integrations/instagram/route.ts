import { revalidatePath } from "next/cache";
import { z } from "zod";
import { authorize, fail, json, parseBody } from "@/lib/api";
import { refreshInstagramToken, saveInstagramToken } from "@/lib/instagram";

// Super admins only. The token is sent from the dashboard straight to our server, checked with
// Instagram, and stored; it's never shown again.

const tokenBody = z.object({ token: z.string().trim().min(20, "That doesn't look like an access token").max(1000) });

export async function PUT(req: Request) {
  const { denied } = await authorize("manage", "integrations");
  if (denied) return denied;
  const body = await parseBody(req, tokenBody);
  if (body.error) return body.error;
  const result = await saveInstagramToken(body.data.token);
  if (!result.ok) return fail(422, `Instagram didn't accept this token: ${result.error}`);
  revalidatePath("/");
  return json({ success: true, username: result.username });
}

/** "Renew now": same as the weekly job. Works once a token is at least 24 hours old. */
export async function POST() {
  const { denied } = await authorize("manage", "integrations");
  if (denied) return denied;
  const result = await refreshInstagramToken();
  return result.ok ? json({ success: true, expiresAt: result.expiresAt }) : fail(502, result.error ?? "Renewal failed");
}
