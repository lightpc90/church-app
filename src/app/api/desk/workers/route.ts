import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, json, serverError } from "@/lib/api";
import { getStaff } from "@/lib/auth";
import { canonicalDept } from "@/lib/departments";
import { canRegisterWorker, findWorkerByPhone } from "@/lib/desk";
import { workerAddSchema } from "@/lib/validation";

// Register a worker who has no email (or no smartphone): from the Workers tab or the workers' desk.
// Added by trusted staff, so they're approved straight away.
export async function POST(req: Request) {
  const staff = await getStaff();
  if (staff.status === "unauthenticated") return fail(401, "Sign in required");
  if (staff.status !== "ok") return fail(403, "You don't have permission to do that");

  const raw = await req.json().catch(() => undefined);
  if (raw === undefined) return fail(400, "Request body must be valid JSON");
  const parsed = workerAddSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors);
  const data = { ...parsed.data, dept: canonicalDept(parsed.data.dept) };

  if (!canRegisterWorker(staff, data.dept)) {
    return fail(403, staff.role === "hod" ? "You can only add workers to your own department." : "You don't have permission to do that");
  }
  const existing = await findWorkerByPhone(data.phone);
  if (existing) return fail(409, `${existing.name ?? "A worker"} is already registered with this phone number.`, { existingId: existing.id });

  try {
    const worker = await prisma.worker.create({
      data: { ...data, email: data.email ?? null, status: "approved", approvedBy: staff.name, approvedAt: new Date() },
    });
    return json({ success: true, data: worker }, 201);
  } catch (e) {
    return serverError("register worker", e);
  }
}
