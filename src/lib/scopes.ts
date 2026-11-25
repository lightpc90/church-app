import type { StaffMember } from "./auth";

/** HODs with a department only see workers in it (case-insensitive match on Worker.dept). */
export function workerScope(staff: Pick<StaffMember, "role" | "dept">) {
  if (staff.role !== "hod" || !staff.dept) return undefined;
  return { dept: { equals: staff.dept, mode: "insensitive" as const } };
}
