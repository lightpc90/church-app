import "server-only";
import { cache } from "react";
import { auth, currentUser } from "@clerk/nextjs/server";
import prisma from "./prisma";
import { highestRole, isRole, type Role } from "./roles";
import { canonicalDept } from "./departments";

export type StaffMember = {
  status: "ok";
  role: Role;
  /** Shown as "handled by …" */
  name: string;
  email: string;
  /** HODs: their department, if set */
  dept: string | null;
};
export type Staff = StaffMember | { status: "forbidden" | "unauthenticated" };

const envEmails = (name: string) =>
  (process.env[name] ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

/** Emails given a role by environment variable. These can't be changed from the dashboard. */
export function envRoles(): { email: string; role: Role }[] {
  return [
    ...envEmails("SUPER_ADMIN_EMAILS").map((email) => ({ email, role: "superadmin" as const })),
    ...envEmails("ADMIN_EMAILS").map((email) => ({ email, role: "admin" as const })),
  ];
}

/**
 * Works out the signed-in user's dashboard role from (highest wins):
 *  - SUPER_ADMIN_EMAILS / ADMIN_EMAILS env vars (bootstrap; can't be removed from the dashboard),
 *  - their Clerk `publicMetadata.role` (one of the role names in roles.ts),
 *  - a TeamMember record added by a super admin on the Team tab.
 * Only verified email addresses count. Being signed in alone is NOT enough: anyone can create
 * a Clerk account from the navbar. Cached per request.
 */
export const getStaff = cache(async (): Promise<Staff> => {
  const { userId } = await auth();
  if (!userId) return { status: "unauthenticated" };

  const user = await currentUser();
  if (!user) return { status: "unauthenticated" };

  const emails = user.emailAddresses
    .filter((e) => e.verification?.status === "verified")
    .map((e) => e.emailAddress.toLowerCase());

  const candidates: { role: Role; email: string; dept?: string | null }[] = [];
  for (const r of envRoles()) if (emails.includes(r.email)) candidates.push(r);

  const metaRole = user.publicMetadata?.role;
  if (isRole(metaRole) && emails[0]) candidates.push({ role: metaRole, email: emails[0] });

  if (emails.length) {
    try {
      const members = await prisma.teamMember.findMany({ where: { email: { in: emails } } });
      for (const m of members) if (isRole(m.role)) candidates.push({ role: m.role, email: m.email, dept: m.dept });
    } catch (e) {
      // Env-based access keeps working if the database is unreachable.
      console.error("[auth] team lookup failed:", e);
    }
  }

  const role = highestRole(candidates.map((c) => c.role));
  if (!role) return { status: "forbidden" };
  const winner = candidates.find((c) => c.role === role)!;
  // A department set on the Team tab applies even when the role came from elsewhere.
  const rawDept = candidates.find((c) => c.dept)?.dept;
  const dept = rawDept ? canonicalDept(rawDept) : null;

  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ") || user.username || winner.email;

  return { status: "ok", role, name, email: winner.email, dept };
});
