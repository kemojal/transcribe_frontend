"use client";
import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#fa6060",
  },
} satisfies ChartConfig;

const sampleData = {
  totalPlays: 50000,
  listeners: 10000,
  averageListeningTime: 35, // in minutes
  subscriptions: 5000,
  episodes: [
    { id: 1, title: "Episode 1: Getting Started", plays: 12000 },
    { id: 2, title: "Episode 2: Deep Dive", plays: 15000 },
    { id: 3, title: "Episode 3: Special Guest", plays: 8000 },
    { id: 4, title: "Episode 4: Listener Q&A", plays: 15000 },
  ],
  demographics: {
    countries: {
      US: 60,
      UK: 20,
      Germany: 10,
      India: 10,
    },
    devices: {
      Mobile: 70,
      Desktop: 20,
      Tablet: 10,
    },
  },
  playsOverTime: [
    { date: "2024-01-01", plays: 2000 },
    { date: "2024-02-01", plays: 120000 },
    { date: "2024-03-01", plays: 5000 },
    { date: "2024-04-01", plays: 8000 },
    { date: "2024-05-01", plays: 10000 },
    { date: "2024-06-01", plays: 1200 },
    { date: "2024-07-01", plays: 9500 },
    { date: "2024-08-01", plays: 18000 },
    { date: "2024-09-01", plays: 200 },
    { date: "2024-10-01", plays: 2200 },
    { date: "2024-11-01", plays: 200 },
    { date: "2024-12-01", plays: 68000 },
    { date: "2025-01-01", plays: 30000 },
    { date: "2025-02-01", plays: 2000 },
    { date: "2025-03-01", plays: 85000 },
    { date: "2025-04-01", plays: 28000 },
    { date: "2025-05-01", plays: 20000 },
    { date: "2025-06-01", plays: 42000 },
    { date: "2025-07-01", plays: 15000 },
    { date: "2025-08-01", plays: 18000 },
    { date: "2025-09-01", plays: 50000 },
    { date: "2025-10-01", plays: 22000 },
    { date: "2025-11-01", plays: 5000 },
    { date: "2025-12-01", plays: 28000 },
    { date: "2026-01-01", plays: 10000 },
    { date: "2026-02-01", plays: 12000 },
    { date: "2026-03-01", plays: 65000 },
    { date: "2026-04-01", plays: 68000 },
    { date: "2026-05-01", plays: 30000 },
    { date: "2026-06-01", plays: 72000 },
    { date: "2026-07-01", plays: 75000 },
    { date: "2026-08-01", plays: 28000 },
    { date: "2026-09-01", plays: 40000 },
    { date: "2026-10-01", plays: 32000 },
    { date: "2026-11-01", plays: 85000 },
    { date: "2026-12-01", plays: 18000 },
    { date: "2027-01-01", plays: 10000 },
    { date: "2027-02-01", plays: 92000 },
    { date: "2027-03-01", plays: 5000 },
    { date: "2027-04-01", plays: 8000 },
    { date: "2027-05-01", plays: 100000 },
    { date: "2027-06-01", plays: 2000 },
    { date: "2027-07-01", plays: 14000 },
    { date: "2027-08-01", plays: 116000 },
    { date: "2027-09-01", plays: 98000 },
    { date: "2027-10-01", plays: 80000 },
    { date: "2027-11-01", plays: 42000 },
    { date: "2027-12-01", plays: 114000 },
    { date: "2028-01-01", plays: 26000 },
    { date: "2028-02-01", plays: 18000 },
  ],
};

const sampleConfig = {
  plays: {
    label: "title",
    color: "#eb2525",
  },
} satisfies ChartConfig;

const countriesConfig = {
  us: {
    label: "title",
    color: "#eb2525",
  },
  uk: {
    label: "plays",
    color: "#fa6060",
  },
  germany: {
    label: "plays",
    color: "#fa6060",
  },
  india: {
    label: "plays",
    color: "#fa6060",
  },
} satisfies ChartConfig;

const devicesConfig = {
  desktop: {
    label: "title",
    color: "#eb2525",
  },
  mobile: {
    label: "plays",
    color: "#fa6060",
  },
} satisfies ChartConfig;

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const cardData = [
  { title: "Total Plays", value: sampleData.totalPlays.toLocaleString() },
  { title: "Listeners", value: sampleData.listeners.toLocaleString() },
  {
    title: "Avg. Listening Time",
    value: `${sampleData.averageListeningTime} min`,
  },
  { title: "Subscriptions", value: sampleData.subscriptions.toLocaleString() },
];

const AnalyticDetailPage = () => {
  const pieChartData = Object.entries(sampleData.demographics.devices).map(
    ([name, value]) => ({ name, value })
  );
  return (
    <div className="w-full h-full overflow-y-auto py-12 px-4 ">
      <ChartContainer config={chartConfig} className="h-[200px] w-full">
        <BarChart accessibilityLayer data={sampleData.playsOverTime}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="plays" fill="var(--color-desktop)" radius={4} />
          {/* <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} /> */}
        </BarChart>
      </ChartContainer>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {cardData.map((data, index) => (
          <Card
            key={index}
            className="text-sm  rounded-3xl border-[0.5px] border-gray-200"
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-normal">
                {data.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-xl font-bold">{data.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Countries */}
        <Card className="text-sm  rounded-3xl border-[0.5px] border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm font-normal">
              Listeners by Country
            </CardTitle>
          </CardHeader>
          <CardContent className="min-h-[calc(100%-68px)] flex flex-col justify-center p-2">
            <ul className="space-y-2 p-4">
              {Object.entries(sampleData.demographics.countries).map(
                ([country, percentage]) => (
                  <li
                    key={country}
                    className="flex justify-between items-center border-b-[0.5px] border-gray-200 pb-2"
                  >
                    <span>{country}</span>
                    <span className="font-semibold">{percentage}%</span>
                  </li>
                )
              )}
            </ul>
          </CardContent>
        </Card>

        {/* Devices */}
        <Card className="text-sm  rounded-3xl border-[0.5px] border-gray-200">
          <CardHeader>
            <CardTitle className="text-sm font-normal">
              Listeners by Device
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={devicesConfig} className="h-[200px] w-full">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                {/* <Tooltip /> */}
              </PieChart>
            </ChartContainer>
            <div className="mt-4 flex justify-center space-x-4">
              {pieChartData.map((entry, index) => (
                <div key={`legend-${index}`} className="flex items-center">
                  <div
                    className="w-3 h-3 mr-1"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  ></div>
                  <span>{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticDetailPage;
