"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export interface SignupsChartProps {
  data: Array<{ date: string; count: number }>;
}

export function SignupsChart({ data }: SignupsChartProps) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Signups Over Time (Last 30 Days)
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
          <XAxis
            dataKey="date"
            stroke="#71717a"
            tick={{ fill: "#71717a" }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getDate()}`;
            }}
          />
          <YAxis stroke="#71717a" tick={{ fill: "#71717a" }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
            }}
            labelStyle={{ color: "#ffffff" }}
            itemStyle={{ color: "#8b5cf6" }}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: "#8b5cf6" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
