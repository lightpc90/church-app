import prisma from "@/lib/prisma";
import { fail, json, serverError } from "@/lib/api";
import { getCurrentWorker, workerStatus } from "@/lib/workers";
import { workerSelfSchema } from "@/lib/validation";
import { z } from "zod";
import { canonicalDept, sameDept } from "@/lib/departments";
import { findWorkerByPhone } from "@/lib/desk";

// The signed-in person's own worker profile. Anyone with an account can register; new
// registrations stay "pending" until an admin or their HOD approves them.

export async function GET() {
  const me = await getCurrentWorker();
  if (!me.signedIn) return fail(401, "Sign in required");
  return json({ success: true, data: me.worker && { ...me.worker, status: workerStatus(me.worker) } });
}

export async function PUT(req: Request) {
  const me = await getCurrentWorker();
  if (!me.signedIn) return fail(401, "Sign in required");

  const raw = await req.json().catch(() => undefined);
  if (raw === undefined) return fail(400, "Request body must be valid JSON");
  if (!me.worker && raw?.consent !== true && raw?.consent !== "true") {
    return fail(422, "Validation failed", { consent: ["Please tick the box to agree before registering."] });
  }
  const parsed = workerSelfSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors);
  const data = { ...parsed.data, dept: canonicalDept(parsed.data.dept) };

  try {
    if (me.worker) {
      // Moving department needs the new HOD's approval.
      const movedDept = !sameDept(me.worker.dept, data.dept);
      const reapprove = movedDept && workerStatus(me.worker) === "approved";
      const worker = await prisma.worker.update({
        where: { id: me.worker.id },
        data: { ...data, ...(reapprove ? { status: "pending", approvedBy: null, approvedAt: null } : {}) },
      });
      return json({ success: true, data: { ...worker, status: workerStatus(worker) }, reapproval: reapprove });
    }
    // Registered earlier at the desk or by an admin (by phone, no account)? Link that record instead
    // of creating a duplicate. It goes back to "pending" so typing someone else's number gains nothing.
    const byPhone = await findWorkerByPhone(data.phone);
    if (byPhone && !byPhone.clerkUserId) {
      const worker = await prisma.worker.update({
        where: { id: byPhone.id },
        data: { ...data, clerkUserId: me.userId, email: me.email, image: me.image, status: "pending", approvedBy: null, approvedAt: null },
      });
      return json({ success: true, data: { ...worker, status: workerStatus(worker) }, linked: true });
    }
    const worker = await prisma.worker.create({
      data: { ...data, clerkUserId: me.userId, email: me.email, image: me.image, status: "pending" },
    });
    return json({ success: true, data: { ...worker, status: workerStatus(worker) } }, 201);
  } catch (e) {
    return serverError("save worker profile", e);
  }
}
