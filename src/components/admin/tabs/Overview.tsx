import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { getOverview } from "@/lib/admin-data";
import { AdminPanel, StatCard } from "../AdminCard";
import WeeklyChart from "../WeeklyChart";
import { TabParamsEnum } from "../../enums/Enums";
import { can, type Role } from "@/lib/roles";

const relative = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
function ago(date: Date) {
  const mins = Math.round((date.getTime() - Date.now()) / 60_000);
  if (Math.abs(mins) < 60) return relative.format(mins, "minute");
  const hours = Math.round(mins / 60);
  if (Math.abs(hours) < 24) return relative.format(hours, "hour");
  return relative.format(Math.round(hours / 24), "day");
}

const thisWeek = (n: number) => (n ? `+${n} in the last 7 days` : "None in the last 7 days");
const ofTotal = (total: number, n: number) => `${total} in total · ${n ? `+${n} this week` : "none new this week"}`;

export default function Overview({ data: o, role }: { data: Awaited<ReturnType<typeof getOverview>>; role: Role }) {
  const totalRegistrations = o.registrations.reduce((n, r) => n + r.count, 0);
  const sees = (r: Parameters<typeof can>[2]) => can(role, "view", r);
  const activity = o.activity.filter((a) => sees(a.resource)).slice(0, 6);
  const pastoral = sees("prayerRequests");

  return (
    <div className="space-y-6">
      {pastoral && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {sees("prayerRequests") && (
            <Link href={`/admin?menu=${TabParamsEnum.PRAYER_REQUESTS}`}>
              <StatCard
                accent
                value={o.open.prayers}
                label="Prayer requests to pray over"
                detail={ofTotal(o.totals.prayers, o.newThisWeek.prayers)}
              />
            </Link>
          )}
          {sees("followUps") && (
            <Link href={`/admin?menu=${TabParamsEnum.FOLLOW_UP}`}>
              <StatCard
                value={o.open.followUps}
                label="New converts to follow up"
                detail={ofTotal(o.totals.followUps, o.newThisWeek.followUps)}
              />
            </Link>
          )}
          {sees("testimonies") && (
            <Link href={`/admin?menu=${TabParamsEnum.TESTIMONIES}`}>
              <StatCard value={o.totals.testimonies} label="Testimonies" detail={thisWeek(o.newThisWeek.testimonies)} />
            </Link>
          )}
          {sees("enquiries") && (
            <Link href={`/admin?menu=${TabParamsEnum.ENQUIRIES}`}>
              <StatCard
                value={o.open.enquiries}
                label="Messages to answer"
                detail={ofTotal(o.totals.enquiries, o.newThisWeek.enquiries)}
              />
            </Link>
          )}
        </div>
      )}

      {pastoral && (
        <div className="grid gap-6 xl:grid-cols-3">
          <AdminPanel className="xl:col-span-2">
            <h2 className="font-display text-xl font-medium text-ink">Submissions per week</h2>
            <p className="mb-4 text-sm text-stone">Website forms over the last 8 weeks</p>
            <WeeklyChart data={o.weekly} />
          </AdminPanel>

          <AdminPanel>
            <h2 className="font-display text-xl font-medium text-ink">Latest activity</h2>
            {activity.length === 0 ? (
              <p className="mt-4 text-sm text-stone">Nothing submitted yet.</p>
            ) : (
              <ul className="mt-3 divide-y divide-line">
                {activity.map((a) => (
                  <li key={a.kind + a.id}>
                    <Link href={a.href} className="group block py-3">
                      <div className="flex items-baseline justify-between gap-3">
                        <p className="font-medium text-ink group-hover:text-royal">{a.name}</p>
                        <span className="shrink-0 text-xs text-stone">{ago(a.createdAt)}</span>
                      </div>
                      <p className="text-xs font-semibold tracking-wider text-gold uppercase">{a.kind}</p>
                      <p className="mt-1 line-clamp-1 text-sm text-stone">{a.preview}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </AdminPanel>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {sees("registrations") && (
          <AdminPanel>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-medium text-ink">Group & ministry registrations</h2>
              <span className="font-display text-2xl text-ink tabular-nums">{totalRegistrations}</span>
            </div>
            <ul className="mt-3 divide-y divide-line">
              {o.registrations.map((r) => (
                <li key={r.key}>
                  <Link
                    href={`/admin?menu=${TabParamsEnum.REGISTRATIONS}&group=${r.key}`}
                    className="flex items-center justify-between py-2.5 text-ink hover:text-royal"
                  >
                    {r.label}
                    <span className="flex items-center gap-2 tabular-nums">
                      {r.count} <ArrowRight className="size-3.5 text-stone" aria-hidden />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </AdminPanel>
        )}

        {sees("workers") && (
          <AdminPanel>
            <div className="flex items-baseline justify-between">
              <h2 className="font-display text-xl font-medium text-ink">Workers by department</h2>
              <span className="font-display text-2xl text-ink tabular-nums">{o.totals.workers}</span>
            </div>
            {o.workersByDept.length === 0 ? (
              <p className="mt-4 text-sm text-stone">No workers registered yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {o.workersByDept.map((d) => (
                  <li key={d.dept}>
                    <div className="flex justify-between text-sm">
                      <span className="text-ink">{d.dept}</span>
                      <span className="text-stone tabular-nums">{d.count}</span>
                    </div>
                    <div className="mt-1 h-2 overflow-hidden rounded-full bg-sand">
                      <div
                        className="h-full rounded-full bg-royal"
                        style={{ width: `${(d.count / o.totals.workers) * 100}%` }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-5 text-sm text-stone">
              {o.totals.houseFellowships} house fellowship {o.totals.houseFellowships === 1 ? "center" : "centers"}{" "}
              listed.
            </p>
          </AdminPanel>
        )}
      </div>
    </div>
  );
}
