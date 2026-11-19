"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartConfig = {
  attendance: { label: "Attendance", color: "var(--chart-1)" },
} satisfies ChartConfig;

type AttendancePoint = { name: string; attendance: string; dept: string };

export function BarChartUI({ data }: { data: AttendancePoint[] }) {
  const n = data.length;
  const last = Number(data[n - 1]?.attendance ?? 0);
  const prev = Number(data[n - 2]?.attendance ?? 0);
  const change = prev ? ((last - prev) / prev) * 100 : 0;
  const chartData = data.map((d) => ({ ...d, attendance: Number(d.attendance) }));

  return (
    <div>
      <ChartContainer config={chartConfig} className="h-72 w-full">
        <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
          <CartesianGrid vertical={false} />
          {/* dates are dd/mm/yy: show dd/mm */}
          <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(v: string) => v.slice(0, 5)} />
          <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Bar dataKey="attendance" fill="var(--color-attendance)" radius={10}>
            <LabelList position="top" offset={10} className="fill-foreground" fontSize={12} />
          </Bar>
        </BarChart>
      </ChartContainer>
      <p className="mt-3 flex items-center gap-2 text-sm font-medium text-ink">
        {change < 0 ? <TrendingDown className="size-4 text-ember" aria-hidden /> : <TrendingUp className="size-4 text-emerald-600" aria-hidden />}
        {change < 0 ? "Down" : "Up"} {Math.abs(change).toFixed(1)}% on the previous Sunday
      </p>
    </div>
  );
}
