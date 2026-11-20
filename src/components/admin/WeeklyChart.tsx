"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  type ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import type { WeeklyPoint } from "@/lib/admin-data";

const config = {
  prayer: { label: "Prayer requests", color: "var(--chart-1)" },
  testimony: { label: "Testimonies", color: "var(--chart-2)" },
  followUp: { label: "New converts", color: "var(--chart-3)" },
  enquiry: { label: "Messages", color: "var(--chart-4)" },
} satisfies ChartConfig;

const keys = Object.keys(config) as (keyof typeof config)[];

export default function WeeklyChart({ data }: { data: WeeklyPoint[] }) {
  return (
    <ChartContainer config={config} className="h-72 w-full">
      <BarChart accessibilityLayer data={data} margin={{ top: 8, left: -20 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="week" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis allowDecimals={false} tickLine={false} axisLine={false} width={40} />
        <ChartTooltip cursor={{ fill: "var(--sand)" }} content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        {keys.map((k, i) => (
          <Bar
            key={k}
            dataKey={k}
            stackId="submissions"
            fill={`var(--color-${k})`}
            radius={i === keys.length - 1 ? [6, 6, 0, 0] : 0}
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
