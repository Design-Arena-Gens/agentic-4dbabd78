type TrendPoint = {
  day: string;
  amount: number;
};

type SpendingTrendProps = {
  data: TrendPoint[];
  max?: number;
};

export function SpendingTrend({ data, max }: SpendingTrendProps) {
  const peak = max ?? Math.max(...data.map((item) => item.amount), 1);

  return (
    <div className="rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Spending trend</h2>
          <p className="text-sm text-slate-400">Past 7 days</p>
        </div>
        <div className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white">
          {Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(
            data.reduce((total, item) => total + item.amount, 0) / data.length
          )}{" "}
          avg
        </div>
      </div>
      <div className="flex items-end gap-3">
        {data.map((item) => {
          const height = Math.max((item.amount / peak) * 180, 12);
          return (
            <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
              <div className="flex h-[200px] w-full items-end">
                <div
                  className="w-full rounded-t-xl bg-gradient-to-t from-sky-400/60 via-sky-300/70 to-sky-200/90 shadow-[0_8px_16px_rgba(56,189,248,0.25)]"
                  style={{ height }}
                />
              </div>
              <div className="text-xs font-medium uppercase tracking-[0.12em] text-slate-400">
                {item.day}
              </div>
              <div className="text-xs text-slate-300">
                ${item.amount.toFixed(0)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
