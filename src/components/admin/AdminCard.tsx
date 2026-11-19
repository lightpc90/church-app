import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function AdminPanel({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("rounded-3xl border border-line bg-white p-5 shadow-soft sm:p-6", className)} {...props} />;
}

export function StatCard({
  value,
  label,
  detail,
  accent = false,
}: {
  value: ReactNode;
  label: string;
  detail?: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-5 shadow-soft",
        accent ? "border-transparent bg-ink text-white" : "border-line bg-white text-ink"
      )}
    >
      <p className={cn("text-sm font-medium", accent ? "text-white/60" : "text-stone")}>{label}</p>
      <p className="mt-2 font-display text-4xl font-medium tabular-nums">{value}</p>
      {detail && <p className={cn("mt-1 text-sm", accent ? "text-gold" : "text-stone")}>{detail}</p>}
    </div>
  );
}

export function AdminSection({
  title,
  description,
  action,
  children,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-medium text-ink">{title}</h2>
          {description && <p className="mt-1 text-stone">{description}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}
