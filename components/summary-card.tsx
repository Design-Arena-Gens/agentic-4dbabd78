import type { ReactNode } from "react";

type SummaryCardProps = {
  title: string;
  value: string;
  trend?: {
    label: string;
    intent: "up" | "down" | "neutral";
  };
  icon: ReactNode;
};

const trendColorMap: Record<NonNullable<SummaryCardProps["trend"]>["intent"], string> =
  {
    up: "text-emerald-300",
    down: "text-rose-300",
    neutral: "text-slate-400"
  };

export function SummaryCard({ title, value, trend, icon }: SummaryCardProps) {
  return (
    <div className="rounded-2xl border border-white/5 bg-white/5 p-5 backdrop-blur-lg">
      <div className="mb-6 flex items-center justify-between text-sm font-medium uppercase tracking-[0.16em] text-slate-400">
        <span>{title}</span>
        <span className="text-base text-white">{icon}</span>
      </div>
      <div className="text-3xl font-semibold text-white">{value}</div>
      {trend && (
        <div className={`mt-4 text-xs ${trendColorMap[trend.intent]}`}>
          {trend.label}
        </div>
      )}
    </div>
  );
}
