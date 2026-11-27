import { NextResponse } from "next/server";
import { getStaff } from "@/lib/auth";
import { roleLabels } from "@/lib/roles";

/** Does the signed-in person have a dashboard role? Used to show "Admin dashboard" in the account menu. */
export async function GET() {
  const staff = await getStaff();
  const ok = staff.status === "ok";
  return NextResponse.json(
    { success: true, staff: ok, role: ok ? staff.role : null, roleLabel: ok ? roleLabels[staff.role] : null },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
