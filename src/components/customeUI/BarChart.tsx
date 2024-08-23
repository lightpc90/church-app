"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";
import { attendanceInitData } from "../initData/initData";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import React from "react";

const chartConfig = {
  desktop: {
    label: "Attendance",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type MyPropsType = {
    data: typeof attendanceInitData
}

export const BarChartUI: React.FC<MyPropsType> = ({data})=> {
    const length = data.length
    const percentageIncrease = ((parseInt(data[length-1].attendance) - parseInt(data[length-2].attendance)) / parseInt(data[length-2].attendance)) * 100
    const to1Decimal = percentageIncrease.toFixed(1);
  return (
    <Card className="">
      <CardHeader>
        <CardTitle>{data[0].dept ? data[0].dept : 'General Attendance'} - Stat</CardTitle>
        <CardDescription>
          {data[0].name} - {data[length - 1].name}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={data}
            margin={{
              top: 20,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="attendance" fill="var(--color-desktop)" radius={8}>
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {`Trending ${
            parseInt(to1Decimal) < 0 ? "down" : "up"
          } by ${to1Decimal}% this week`}{" "}
          {parseInt(to1Decimal) < 0 ? (
            <TrendingDown className="h-4 w-4" />
          ) : (
            <TrendingUp className="h-4 w-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing attendance for the last 5 Sundays
        </div>
      </CardFooter>
    </Card>
  );
}
