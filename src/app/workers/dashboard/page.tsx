import Link from "next/link";
import { redirect } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";
import { CalendarCheck, Check, Clock, Pencil, X } from "lucide-react";
import WorkersShell from "@/components/workers/WorkersShell";
import { ButtonLink } from "@/components/site/primitives";
import prisma from "@/lib/prisma";
import { getCurrentWorker, workerStatus } from "@/lib/workers";
import { attendanceWindow, recentSundays, windowLabel } from "@/lib/attendance-rules";
import { cn } from "@/lib/utils";
import { canonicalDept } from "@/lib/departments";

export const metadata = { title: "Workers' Dashboard" };
export const dynamic = "force-dynamic";

const dayFmt = new Intl.DateTimeFormat("en-NG", { day: "numeric", month: "short", timeZone: "UTC" });
const timeFmt = new Intl.DateTimeFormat("en-NG", { hour: "numeric", minute: "2-digit", timeZone: "Africa/Lagos" });

const statusCopy = {
  pending: { label: "Awaiting approval", tone: "bg-gold-soft text-ink", body: "Your HOD or a church admin will approve your registration soon. You can mark attendance once approved." },
  approved: { label: "Approved worker", tone: "bg-emerald-50 text-emerald-800", body: null },
  inactive: { label: "Inactive", tone: "bg-sand text-stone", body: "Your worker profile is inactive. Speak to your HOD if you're serving again." },
} as const;

export default async function Page() {
  const me = await getCurrentWorker();
  if (!me.signedIn) redirect("/workers");
  if (!me.worker) redirect("/workers/register");
  const w = me.worker;
  const status = workerStatus(w);
  const copy = statusCopy[status];

  const sundays = recentSundays(8);
  const records = await prisma.attendance.findMany({
    where: { workerId: w.id, date: { in: sundays } },
    select: { date: true, markedAt: true },
  });
  const byDate = new Map(records.map((r) => [r.date, r]));
  const window = attendanceWindow();
  const markedToday = byDate.has(window.dateKey);

  return (
    <WorkersShell>
      <p className="eyebrow">Workers&apos; dashboard</p>
      <h1 className="mt-4 font-display text-4xl font-medium text-ink">Hello, {(w.name ?? me.name).split(" ")[0] || "there"}</h1>

      <div className="mt-6 rounded-3xl border border-line bg-white p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className={cn("inline-flex rounded-full px-3 py-1 text-xs font-semibold", copy.tone)}>{copy.label}</span>
          <Link href="/workers/register" className="inline-flex items-center gap-1.5 text-sm font-semibold text-royal hover:underline">
            <Pencil className="size-3.5" aria-hidden /> Edit profile
          </Link>
        </div>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 text-sm">
          <div>
            <dt className="text-stone">Department</dt>
            <dd className="font-semibold text-ink">{canonicalDept(w.dept)}</dd>
          </div>
          <div>
            <dt className="text-stone">Phone</dt>
            <dd className="font-semibold text-ink tabular-nums">{w.phone ?? "-"}</dd>
          </div>
        </dl>
        {copy.body && <p className="mt-4 text-sm text-stone">{copy.body}</p>}
      </div>

      {status === "approved" && (
        <div className="mt-6 rounded-3xl bg-ink p-6 text-white">
          <div className="flex items-start gap-4">
            <CalendarCheck className="mt-1 size-6 shrink-0 text-gold" aria-hidden />
            <div>
              <h2 className="font-display text-2xl">Sunday attendance</h2>
              <p className="mt-1 text-sm text-white/70">
                {markedToday
                  ? `You're checked in for today at ${timeFmt.format(byDate.get(window.dateKey)!.markedAt)}. Thank you for serving!`
                  : window.open
                    ? "Check-in is open now. You need to be within 100 m of the church."
                    : `Open ${windowLabel}, within 100 m of the church.`}
              </p>
            </div>
          </div>
          {!markedToday && (
            <ButtonLink href="/workers/attendance" variant="gold" size="lg" className="mt-5 w-full">
              {window.open ? "Mark attendance now" : "Open check-in page"}
            </ButtonLink>
          )}
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xs font-semibold tracking-[0.2em] text-gold uppercase">Last 8 Sundays</h2>
        <ul className="mt-3 grid grid-cols-4 gap-2 sm:grid-cols-8">
          {sundays
            .slice()
            .reverse()
            .map((d) => {
              const r = byDate.get(d);
              const future = d === window.dateKey && !r && (window.open || window.reason === "too-early");
              return (
                <li
                  key={d}
                  title={r ? `Present, ${timeFmt.format(r.markedAt)}` : future ? "Today" : "No check-in"}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-2xl border p-2 text-xs",
                    r ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-line bg-white text-stone"
                  )}
                >
                  {r ? <Check className="size-4" aria-hidden /> : future ? <Clock className="size-4" aria-hidden /> : <X className="size-4 opacity-40" aria-hidden />}
                  <span className="tabular-nums">{dayFmt.format(new Date(d))}</span>
                  <span className="sr-only">{r ? "present" : future ? "today" : "no check-in"}</span>
                </li>
              );
            })}
        </ul>
      </div>

      <SignOutButton redirectUrl="/workers">
        <button type="button" className="mt-8 text-sm font-semibold text-stone hover:text-ink">
          Sign out
        </button>
      </SignOutButton>
    </WorkersShell>
  );
}
