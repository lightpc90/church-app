import { NextResponse } from "next/server";
import { refreshInstagramToken } from "@/lib/instagram";

// Weekly Vercel Cron job (vercel.json) that renews the Instagram token before it expires.
// Vercel sends `Authorization: Bearer $CRON_SECRET`; anything else is refused.
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const result = await refreshInstagramToken();
  return NextResponse.json({ success: result.ok, expiresAt: result.expiresAt, error: result.error }, { status: result.ok ? 200 : 502 });
}
