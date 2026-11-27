import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";
import { authorize, fail, json, parseBody, serverError } from "@/lib/api";
import { attendanceWindow, windowLabel } from "@/lib/attendance-rules";
import { canonicalDept } from "@/lib/departments";
import { deskMoment } from "@/lib/desk";
import { workerStatus } from "@/lib/workers";
import { deskUndoSchema, deskWorkerMarkSchema } from "@/lib/validation";

// The workers' desk checks in workers who can't do it themselves. Same Sunday window as self
// check-in; no location check (the desk is at church). Recorded as method "desk" with who marked it.

export async function POST(req: Request) {
  const { staff, denied } = await authorize("handle", "deskWorkers");
  if (denied) return denied;
  const body = await parseBody(req, deskWorkerMarkSchema);
  if (body.error) return body.error;

  const moment = deskMoment(body.data.markedAt);
  if ("error" in moment) return fail(422, moment.error);
  const window = attendanceWindow(moment.at);
  if (!window.open) return fail(403, `Attendance can only be marked on ${windowLabel}.`, { code: window.reason });

  const worker = await prisma.worker.findUnique({ where: { id: body.data.workerId } });
  if (!worker) return fail(404, "Worker not found");
  if (workerStatus(worker) !== "approved") return fail(403, "This worker isn't approved yet.");

  try {
    const record = await prisma.attendance.create({
      data: {
        workerId: worker.id,
        date: window.dateKey,
        dept: canonicalDept(worker.dept),
        method: "desk",
        markedBy: staff.name,
        markedAt: moment.at,
      },
      select: { workerId: true, date: true, markedAt: true, method: true },
    });
    return json({ success: true, data: record }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const existing = await prisma.attendance.findUnique({
        where: { workerId_date: { workerId: worker.id, date: window.dateKey } },
        select: { workerId: true, date: true, markedAt: true, method: true },
      });
      return json({ success: true, data: existing, alreadyMarked: true });
    }
    return serverError("mark attendance", e);
  }
}

/** Undo a mistaken desk check-in (only desk check-ins, and only on the same day). */
export async function DELETE(req: Request) {
  const { denied } = await authorize("handle", "deskWorkers");
  if (denied) return denied;
  const body = await parseBody(req, deskUndoSchema);
  if (body.error) return body.error;
  const record = await prisma.attendance.findUnique({ where: { workerId_date: { workerId: body.data.id, date: body.data.date } } });
  if (!record) return json({ success: true });
  if (record.method !== "desk") return fail(403, "This worker checked in on their own phone; that can't be undone here.");
  if (record.date !== attendanceWindow().dateKey) return fail(403, "Only today's check-ins can be undone.");
  await prisma.attendance.delete({ where: { id: record.id } });
  return json({ success: true });
}
