import "server-only";
import prisma from "./prisma";
import { whatsappNumber } from "./phone";
import { can } from "./roles";
import { sameDept } from "./departments";
import { lagosParts } from "./attendance-rules";
import type { StaffMember } from "./auth";

/** Phone numbers compared in one format: 0812… and +234 812… are the same person. */
export const samePhone = (a: string, b: string) => whatsappNumber(a) === whatsappNumber(b);

export async function findWorkerByPhone(phone: string) {
  const all = await prisma.worker.findMany({ where: { phone: { not: null } }, select: { id: true, phone: true, name: true, clerkUserId: true } });
  return all.find((w) => w.phone && samePhone(w.phone, phone)) ?? null;
}

/** Admins, the workers' desk, and HODs (for their own department) can register workers. */
export function canRegisterWorker(staff: StaffMember, dept: string) {
  if (can(staff.role, "manage", "workers") || can(staff.role, "handle", "deskWorkers")) return true;
  return staff.role === "hod" && can(staff.role, "handle", "workers") && !!staff.dept && sameDept(staff.dept, dept);
}

/**
 * The moment a desk check-in happened. Desk devices that were offline send the original time;
 * it must be in the last 24 hours and not in the future (10 minutes' clock slack).
 */
export function deskMoment(markedAt?: string): { at: Date; dateKey: string } | { error: string } {
  const now = Date.now();
  const at = markedAt ? new Date(markedAt) : new Date(now);
  // Desk phones/tablets are often a few minutes off; allow 10 minutes either way into the future.
  if (at.getTime() > now + 10 * 60_000) return { error: "That check-in time is in the future. Check the device's clock." };
  if (at.getTime() < now - 24 * 3_600_000) return { error: "That check-in is more than a day old and can't be added." };
  return { at, dateKey: lagosParts(at).dateKey };
}
