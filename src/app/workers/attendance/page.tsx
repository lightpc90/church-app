import { redirect } from "next/navigation";
import WorkersShell from "@/components/workers/WorkersShell";
import AttendanceCheckIn from "@/components/workers/AttendanceCheckIn";
import prisma from "@/lib/prisma";
import { getCurrentWorker, workerStatus } from "@/lib/workers";
import { ATTENDANCE, attendanceWindow, windowLabel } from "@/lib/attendance-rules";

export const metadata = { title: "Mark Attendance" };
export const dynamic = "force-dynamic";

export default async function Page() {
  const me = await getCurrentWorker();
  if (!me.signedIn) redirect("/workers/login");
  if (!me.worker) redirect("/workers/register");
  if (workerStatus(me.worker) !== "approved") redirect("/workers/dashboard");

  const window = attendanceWindow();
  const existing = await prisma.attendance.findUnique({
    where: { workerId_date: { workerId: me.worker.id, date: window.dateKey } },
    select: { markedAt: true },
  });

  return (
    <WorkersShell>
      <p className="eyebrow">Sunday check-in</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">Mark attendance</h1>
      <p className="mt-3 text-stone">
        {windowLabel}, within {ATTENDANCE.radiusM} m of the church. Your phone&apos;s location is used to check
        you&apos;re at church; we only keep how far away you were, not where you are.
      </p>
      <AttendanceCheckIn
        open={window.open}
        reason={window.reason}
        markedAt={existing?.markedAt.toISOString() ?? null}
      />
    </WorkersShell>
  );
}
