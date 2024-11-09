"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { cn } from "@/lib/utils";
import { getDashboardGraph } from "@/lib/api-calls/dashboard";
import { useCustomEffect } from "@/hooks/useEffect";

export const description = "An interactive line chart"
 
const getMonths = () => {
  // Get current date details
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // Current month index (0 = Jan, 11 = Dec)

  // Calculate the last and two months ago
  const lastMonth = (currentMonth === 0) ? 11 : currentMonth - 1; // Handle December (0-indexed)
  const twoMonthsAgo = (currentMonth <= 1) ? (currentMonth + 10) : currentMonth - 2; // Handle December and January
  const monthNames = [
    new Date(currentYear, currentMonth, 1).toLocaleString('default', { month: 'short' }), // Current month
    new Date(currentYear, lastMonth, 1).toLocaleString('default', { month: 'short' }),  // Last month
    new Date(currentYear, twoMonthsAgo, 1).toLocaleString('default', { month: 'short' }) // Two months ago
  ];

  return monthNames;
}

export function ChartComponent({ height }: { height: string }) {
  const [chartData, setChartData] = React.useState<any>([]);

  const [mounted, setMounted] = React.useState<boolean>(false);
  React.useEffect(() => setMounted(true), []);

  const fetchGraph = async () => {
    if (!mounted) return;
    let res = await getDashboardGraph();
    if (res) setChartData(res)
  };

  useCustomEffect(fetchGraph, [mounted]);

  const chartConfig = {
    [getMonths()[0].toLowerCase()]: {
      label: getMonths()[0],
      color: "hsl(var(--chart-1))",
    },
    [getMonths()[1].toLowerCase()]: {
      label: getMonths()[1],
      color: "hsl(var(--chart-2))",
    },
    [getMonths()[2].toLowerCase()]: {
      label: getMonths()[2],
      color: "hsl(var(--chart-3))",
    },
  } satisfies ChartConfig
 
  return (
    <Card className="flex-1 rounded-md">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Sale Analysis</CardTitle>
          <CardDescription>
            Daily order distribution
          </CardDescription>
        </div>

      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className={cn("aspect-auto w-full", height)}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid  />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey={getMonths()[0]}
              type="monotone"
              stroke="var(--chart-1)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={getMonths()[1]}
              type="monotone"
              stroke="var(--chart-2)"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey={getMonths()[2]}
              type="monotone"
              stroke="var(--chart-3)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>

    </Card>
  )
}