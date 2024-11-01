"use client";
import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
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
    { id: 5, title: "Episode 5: Listener Q&A", plays: 15000 },
    { id: 6, title: "Episode 6: Listener Q&A", plays: 15000 },
    { id: 7, title: "Episode 7: Listener Q&A", plays: 15000 },
    { id: 8, title: "Episode 8: Listener Q&A", plays: 15000 },
    { id: 9, title: "Episode 9: Listener Q&A", plays: 15000 },
    { id: 10, title: "Episode 10: Listener Q&A", plays: 15000 },
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
    { date: "2027-08-01", plays: 66000 },
    { date: "2027-09-01", plays: 8000 },
    { date: "2027-10-01", plays: 80000 },
    { date: "2027-11-01", plays: 42000 },
    { date: "2027-12-01", plays: 14000 },
    { date: "2028-01-01", plays: 6000 },
    { date: "2028-02-01", plays: 8000 },
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

const COLORS = ["#BEF853", "#00C49F", "#FFBB28", "#FF8042"];

const cardData = [
  { title: "Total Plays", value: sampleData.totalPlays.toLocaleString() },
  { title: "Listeners", value: sampleData.listeners.toLocaleString() },
  {
    title: "Avg. Listening Time",
    value: `${sampleData.averageListeningTime} min`,
  },
  { title: "Subscriptions", value: sampleData.subscriptions.toLocaleString() },
];

const Analytics = () => {
  return (
    <div className="w-full h-full overflow-y-auto p-12">
      <h1 className="text-xl font-semibold mb-6">Analytics Dashboard</h1>
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">10,482</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">$54,320</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">2,845</p>
          </CardContent>
        </Card>
      </div> */}
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

      <div className="space-y-4 divider-y-[0.5px] divide-gray-200">
        <div className="flex items-center justify-between font-semibold">
          <h1 className="">Content</h1>

          <div className="flex items-center gap-1">
            <span className="">Downloads</span>
            <span className="">Plays</span>
          </div>
        </div>
        <div className="pb-4 space-y-4">
          {sampleData?.episodes?.map((episode) => (
            <div
              key={episode.id}
              className="flex items-center justify-between w-full border-b-[0.5px] border-gray-200 text-sm font-normal"
            >
              <div className="flex flex-row items-center justify-between space-y-0 pb-2">
                <h3 className="">{episode.title}</h3>
              </div>

              <div className="">{episode.plays}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
