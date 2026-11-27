import Link from "next/link";
import type { loadChildrenDesk } from "@/lib/admin-data";
import ChildrenDesk from "../../desk/ChildrenDesk";
import { AdminPanel } from "../AdminCard";
import { ChildAttendanceTable } from "../tables";
import { TabParamsEnum } from "../../enums/Enums";
import { cn } from "@/lib/utils";

export default function ChildrenDeskTab({ data: d }: { data: Awaited<ReturnType<typeof loadChildrenDesk>> }) {
  const past = d.history.filter((h) => h.date !== d.today);
  return (
    <div className="space-y-8">
      <ChildrenDesk dateKey={d.today} dateLabel={d.todayLabel} kids={d.children} marks={d.marks} />

      {past.length > 0 && (
        <AdminPanel className="space-y-4">
          <h2 className="font-display text-xl font-medium text-ink">Earlier check-ins</h2>
          <nav aria-label="Choose a day" className="flex flex-wrap gap-2">
            {past.map((h) => (
              <Link
                key={h.date}
                href={`/admin?menu=${TabParamsEnum.CHILDREN_DESK}&date=${h.date}`}
                aria-current={d.past?.date === h.date ? "page" : undefined}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition",
                  d.past?.date === h.date ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
                )}
              >
                {h.label} <span className="ml-1 opacity-70 tabular-nums">{h.count}</span>
              </Link>
            ))}
          </nav>
          {d.past && <ChildAttendanceTable data={d.past.rows} date={d.past.date!} />}
        </AdminPanel>
      )}
    </div>
  );
}
