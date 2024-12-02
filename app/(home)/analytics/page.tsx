"use client";
import React from "react";
import { motion } from "framer-motion";
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
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Clock,
  Users,
  FileText,
  TrendingUp,
  BarChart2,
  PieChart as PieChartIcon,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const Analytics = () => {
  // Sample data
  const monthlyData = [
    { month: "Jan", transcriptions: 120, minutes: 360 },
    { month: "Feb", transcriptions: 150, minutes: 450 },
    { month: "Mar", transcriptions: 200, minutes: 600 },
    { month: "Apr", transcriptions: 180, minutes: 540 },
    { month: "May", transcriptions: 250, minutes: 750 },
    { month: "Jun", transcriptions: 300, minutes: 900 },
  ];

  const languageData = [
    { name: "English", value: 60 },
    { name: "Spanish", value: 20 },
    { name: "French", value: 10 },
    { name: "German", value: 10 },
  ];

  const COLORS = ["#4F46E5", "#818CF8", "#A5B4FC", "#C7D2FE"];

  const stats = [
    {
      title: "Total Transcriptions",
      value: "1,234",
      change: "+12.3%",
      trend: "up",
      icon: FileText,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Minutes Transcribed",
      value: "3,567",
      change: "+8.7%",
      trend: "up",
      icon: Clock,
      color: "bg-purple-50 text-purple-600",
    },
    {
      title: "Active Users",
      value: "892",
      change: "-2.1%",
      trend: "down",
      icon: Users,
      color: "bg-pink-50 text-pink-600",
    },
    {
      title: "Avg. Accuracy",
      value: "98.2%",
      change: "+1.4%",
      trend: "up",
      icon: TrendingUp,
      color: "bg-green-50 text-green-600",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={container}
      className="max-w-7xl mx-auto p-8"
    >
      <motion.div variants={item} className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <p className="text-gray-500 mt-2">
          Track your transcription metrics and performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
            whileHover={{ y: -2, transition: { duration: 0.2 } }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-900">
                  {stat.value}
                </h3>
                <div className="flex items-center mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                  )}
                  <span
                    className={cn(
                      "text-sm font-medium",
                      stat.trend === "up" ? "text-green-600" : "text-red-600"
                    )}
                  >
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={cn("p-3 rounded-lg", stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Transcriptions Over Time */}
        <motion.div
          variants={item}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Transcriptions Over Time
              </h3>
              <p className="text-sm text-gray-500">Monthly activity</p>
            </div>
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
              <BarChart2 className="w-5 h-5" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="month"
                  stroke="#6B7280"
                  fontSize={12}
                  tickLine={false}
                />
                <YAxis stroke="#6B7280" fontSize={12} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="transcriptions"
                  stroke="#4F46E5"
                  strokeWidth={2}
                  dot={{ fill: "#4F46E5" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Language Distribution */}
        <motion.div
          variants={item}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Language Distribution
              </h3>
              <p className="text-sm text-gray-500">
                Transcription language breakdown
              </p>
            </div>
            <div className="p-2 rounded-lg bg-purple-50 text-purple-600">
              <PieChartIcon className="w-5 h-5" />
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={languageData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {languageData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#FFF",
                    border: "1px solid #E5E7EB",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value) =>
                    <span className="text-sm text-gray-600">{value}</span>
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div variants={item}>
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Recent Activity
              </h3>
              <p className="text-sm text-gray-500">Latest transcriptions</p>
            </div>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              {
                title: "Q1 Financial Report",
                duration: "15:32",
                language: "English",
                accuracy: "98.5%",
                time: "2 hours ago",
              },
              {
                title: "Team Meeting Recording",
                duration: "45:17",
                language: "Spanish",
                accuracy: "97.8%",
                time: "5 hours ago",
              },
              {
                title: "Product Launch Presentation",
                duration: "28:45",
                language: "French",
                accuracy: "98.2%",
                time: "1 day ago",
              },
            ].map((activity, index) => (
              <motion.div
                key={index}
                className="py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                whileHover={{ x: 4 }}
              >
                <div>
                  <h4 className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {activity.duration} • {activity.language} •{" "}
                    <span className="text-green-600">{activity.accuracy}</span>
                  </p>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
