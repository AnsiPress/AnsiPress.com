"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

export interface SourcesChartProps {
  data: Array<{ source: string | null; count: number }>;
}

const COLORS = ["#8b5cf6", "#ec4899", "#06b6d4", "#10b981", "#f59e0b", "#ef4444"];

export function SourcesChart({ data }: SourcesChartProps) {
  // Format data for pie chart
  const chartData = data.map((item) => ({
    name: item.source || "Direct",
    value: item.count,
  }));

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        Traffic Sources
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#18181b",
              border: "1px solid #27272a",
              borderRadius: "8px",
              color: "#ffffff",
            }}
          />
          <Legend
            wrapperStyle={{ color: "#ffffff" }}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
