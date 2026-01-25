import { ReactNode } from "react";

export interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: ReactNode;
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-zinc-400">{title}</p>
          <p className="mt-2 text-3xl font-bold text-white">{value}</p>
          {change !== undefined && (
            <p
              className={`mt-2 text-sm ${
                isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {isPositive ? "+" : ""}
              {change.toFixed(1)}% from last week
            </p>
          )}
        </div>
        <div className="text-purple-400 opacity-50">{icon}</div>
      </div>
    </div>
  );
}
