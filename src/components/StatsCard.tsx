import { TrendingUp } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number | string;
  percentage: number; // positive or negative
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, percentage, icon}: StatsCardProps) {
  const isPositive = percentage >= 0;

  return (
    <div className="relative w-72 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 p-5 shadow-lg h-40 flex flex-col justify-between overflow-hidden">
      {/* Icon button */}
      <div className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-blue-400">
        {icon || <TrendingUp className="h-5 w-5" />}
      </div>

      {/* Title */}
      <p className="text-md font-medium text-slate-400">{title}</p>

      {/* Value */}
      <div className="mt-3 flex items-end gap-3">
        <h2 className="text-3xl font-bold text-white">{value}</h2>

        {/* Percentage badge */}
        <span
          className={`text-sm font-semibold ${
            isPositive ? "text-emerald-400" : "text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {percentage}%
        </span>
      </div>
    </div>
  );
}
