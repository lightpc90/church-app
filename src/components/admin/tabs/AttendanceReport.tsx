import Link from "next/link";
import type { loadAttendance } from "@/lib/admin-data";
import { AdminPanel, StatCard } from "../AdminCard";
import { AttendanceTable } from "../tables";
import { TabParamsEnum } from "../../enums/Enums";
import { windowLabel } from "@/lib/attendance-rules";
import { cn } from "@/lib/utils";

const dayFmt = new Intl.DateTimeFormat("en-NG", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });
const longFmt = new Intl.DateTimeFormat("en-NG", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

export default function AttendanceReport({ data: a }: { data: Awaited<ReturnType<typeof loadAttendance>> }) {
  const rate = a.expected ? Math.round((a.presentCount / a.expected) * 100) : 0;
  const max = Math.max(1, ...a.trend.map((t) => t.count));

  return (
    <div className="space-y-6">
      <nav aria-label="Choose a Sunday" className="flex gap-2 overflow-x-auto pb-1">
        {a.sundays.map((d) => (
          <Link
            key={d}
            href={`/admin?menu=${TabParamsEnum.ATTENDANCE}&date=${d}`}
            aria-current={d === a.date ? "page" : undefined}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition",
              d === a.date ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
            )}
          >
            {dayFmt.format(new Date(d))}
          </Link>
        ))}
      </nav>

      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard accent value={a.presentCount} label={`Checked in on ${longFmt.format(new Date(a.date))}`} detail={windowLabel} />
        <StatCard value={`${rate}%`} label="Attendance rate" detail={`${a.presentCount} of ${a.expected} approved workers`} />
        <StatCard value={a.expected - Math.min(a.presentCount, a.expected)} label="No check-in" detail={a.scopedDept ? `${a.scopedDept} only` : "All departments"} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <AdminPanel className="xl:col-span-2">
          <h2 className="font-display text-xl font-medium text-ink">By department</h2>
          {a.byDept.length === 0 ? (
            <p className="mt-4 text-sm text-stone">No approved workers yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {a.byDept.map((d) => (
                <li key={d.dept}>
                  <div className="flex justify-between text-sm">
                    <span className="text-ink">{d.dept}</span>
                    <span className="text-stone tabular-nums">
                      {d.present} / {d.total}
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-sand">
                    <div className="h-full rounded-full bg-royal" style={{ width: `${(d.present / d.total) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </AdminPanel>
        <AdminPanel>
          <h2 className="font-display text-xl font-medium text-ink">Last 12 Sundays</h2>
          <div className="mt-6 flex h-36 items-end gap-1.5" role="img" aria-label={`Check-ins per Sunday: ${a.trend.map((t) => t.count).join(", ")}`}>
            {a.trend.map((t) => (
              <div
                key={t.date}
                className="flex h-full flex-1 flex-col items-center justify-end gap-1"
                title={`${dayFmt.format(new Date(t.date))}: ${t.count}`}
              >
                <span className="text-[0.65rem] text-stone tabular-nums">{t.count || ""}</span>
                <div
                  className={cn("w-full rounded-t-md", t.date === a.date ? "bg-gold" : "bg-royal/70")}
                  style={{ height: `${Math.max(3, (t.count / max) * 85)}%` }}
                />
              </div>
            ))}
          </div>
          <p className="mt-2 flex justify-between text-[0.65rem] text-stone">
            <span>{dayFmt.format(new Date(a.trend[0].date))}</span>
            <span>{dayFmt.format(new Date(a.trend[a.trend.length - 1].date))}</span>
          </p>
        </AdminPanel>
      </div>

      <AttendanceTable data={a.rows} date={a.date} />
    </div>
  );
}
