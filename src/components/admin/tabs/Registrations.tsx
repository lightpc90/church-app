import Link from "next/link";
import type { Child } from "@prisma/client";
import { registrationGroups, type RegistrationGroupKey } from "@/lib/admin-data";
import { ChildrenTable, MembersTable } from "../tables";
import { TabParamsEnum } from "../../enums/Enums";
import { cn } from "@/lib/utils";

export async function loadRegistrations(group?: string) {
  const active = registrationGroups.find((g) => g.key === group) ?? registrationGroups[0];
  const [rows, counts] = await Promise.all([active.load(), Promise.all(registrationGroups.map((g) => g.count()))]);
  return { activeKey: active.key, rows, counts };
}

export default function Registrations({
  data: { activeKey, rows, counts },
}: {
  data: Awaited<ReturnType<typeof loadRegistrations>>;
}) {
  const active = registrationGroups.find((g) => g.key === activeKey)!;

  return (
    <div className="space-y-5">
      <nav aria-label="Groups and ministries" className="flex flex-wrap gap-2">
        {registrationGroups.map((g, i) => (
          <Link
            key={g.key}
            href={`/admin?menu=${TabParamsEnum.REGISTRATIONS}&group=${g.key}`}
            aria-current={g.key === active.key ? "page" : undefined}
            className={cn(
              "inline-flex h-9 items-center gap-2 rounded-full border px-4 text-sm font-medium transition",
              g.key === active.key ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink/30"
            )}
          >
            {g.label}
            <span className={cn("tabular-nums", g.key === active.key ? "text-gold" : "text-stone")}>{counts[i]}</span>
          </Link>
        ))}
      </nav>
      {active.key === ("children" satisfies RegistrationGroupKey) ? (
        <ChildrenTable data={rows as Child[]} />
      ) : (
        <MembersTable
          data={rows as Exclude<typeof rows, Child[]>}
          endpoint={active.endpoint}
          withGender={active.withGender}
          filename={active.key}
        />
      )}
    </div>
  );
}
