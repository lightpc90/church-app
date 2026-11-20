import "server-only";
import { auth, currentUser } from "@clerk/nextjs/server";

export type AdminStatus = "admin" | "forbidden" | "unauthenticated";

/**
 * A signed-in Clerk user is an admin when either:
 *  - their Clerk `publicMetadata.role` is "admin" (set in the Clerk dashboard), or
 *  - one of their verified emails is listed in the ADMIN_EMAILS env var (comma separated).
 *
 * Being signed in alone is NOT enough: anyone can create a Clerk account from the navbar.
 */
export async function getAdminStatus(): Promise<AdminStatus> {
  const { userId } = await auth();
  if (!userId) return "unauthenticated";

  const user = await currentUser();
  if (!user) return "unauthenticated";

  if (user.publicMetadata?.role === "admin") return "admin";

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAllowlisted = user.emailAddresses.some(
    (e) =>
      e.verification?.status === "verified" &&
      allowlist.includes(e.emailAddress.toLowerCase())
  );

  return isAllowlisted ? "admin" : "forbidden";
}
