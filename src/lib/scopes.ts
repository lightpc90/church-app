import type { StaffMember } from "./auth";
import { deptVariants } from "./departments";

/**
 * HODs with a department only see workers (and attendance) in it: case-insensitive, and including
 * older names of merged departments (see departments.ts). Works as a filter on Worker and Attendance.
 */
export function workerScope(staff: Pick<StaffMember, "role" | "dept">) {
  if (staff.role !== "hod" || !staff.dept) return undefined;
  return { OR: deptVariants(staff.dept).map((d) => ({ dept: { equals: d, mode: "insensitive" as const } })) };
}
