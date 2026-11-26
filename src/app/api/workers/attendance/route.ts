import { Prisma } from "@prisma/client";
import { z } from "zod";
import prisma from "@/lib/prisma";
import { fail, json, serverError } from "@/lib/api";
import { getCurrentWorker, workerStatus } from "@/lib/workers";
import { attendanceMarkSchema } from "@/lib/validation";
import { ATTENDANCE, attendanceWindow, distanceM, windowLabel } from "@/lib/attendance-rules";
import { canonicalDept } from "@/lib/departments";

// Sunday check-in. Every rule is enforced here on the server: approved worker, Sunday 6:30-8:00
// Lagos time, within 100 m of the church. Only the distance is stored, not the coordinates.

async function approvedWorker() {
  const me = await getCurrentWorker();
  if (!me.signedIn) return { error: fail(401, "Sign in required") };
  if (!me.worker) return { error: fail(403, "Register as a worker first.", { code: "not-registered" }) };
  const status = workerStatus(me.worker);
  if (status !== "approved") {
    return {
      error: fail(403, status === "pending" ? "Your registration is waiting for approval." : "Your worker profile is inactive.", {
        code: status,
      }),
    };
  }
  return { worker: me.worker };
}

export async function GET() {
  const { worker, error } = await approvedWorker();
  if (error) return error;
  const window = attendanceWindow();
  const history = await prisma.attendance.findMany({
    where: { workerId: worker.id },
    orderBy: { date: "desc" },
    take: 12,
    select: { date: true, markedAt: true, distanceM: true },
  });
  return json({ success: true, data: { window, windowLabel, markedToday: history[0]?.date === window.dateKey, history } });
}

export async function POST(req: Request) {
  const { worker, error } = await approvedWorker();
  if (error) return error;

  const window = attendanceWindow();
  if (!window.open) {
    return fail(403, `Attendance can only be marked on ${windowLabel}.`, { code: window.reason });
  }

  const raw = await req.json().catch(() => undefined);
  const parsed = attendanceMarkSchema.safeParse(raw);
  if (!parsed.success) return fail(422, "Validation failed", z.flattenError(parsed.error).fieldErrors);
  const { lat, lng, accuracy } = parsed.data;

  if (accuracy > ATTENDANCE.maxAccuracyM) {
    return fail(422, "Your location isn't precise enough. Turn on location/GPS and try again near the church.", {
      code: "inaccurate",
      accuracyM: Math.round(accuracy),
    });
  }
  const distance = Math.round(distanceM({ lat, lng }, ATTENDANCE.centre));
  if (distance > ATTENDANCE.radiusM) {
    return fail(403, `You need to be within ${ATTENDANCE.radiusM} m of the church to mark attendance.`, {
      code: "too-far",
      distanceM: distance,
    });
  }

  try {
    const record = await prisma.attendance.create({
      data: { workerId: worker.id, date: window.dateKey, dept: canonicalDept(worker.dept), distanceM: distance, accuracyM: Math.round(accuracy) },
      select: { date: true, markedAt: true, distanceM: true },
    });
    return json({ success: true, data: record }, 201);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
      const existing = await prisma.attendance.findUnique({
        where: { workerId_date: { workerId: worker.id, date: window.dateKey } },
        select: { date: true, markedAt: true, distanceM: true },
      });
      return json({ success: true, data: existing, alreadyMarked: true });
    }
    return serverError("mark attendance", e);
  }
}
