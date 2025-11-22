type CategoryBreakdownProps = {
  categories: {
    name: string;
    amount: number;
    percentage: number;
  }[];
};

const accentPalette = [
  "from-indigo-400/70 to-indigo-200/60",
  "from-amber-400/70 to-amber-200/60",
  "from-emerald-400/70 to-emerald-200/60",
  "from-rose-400/70 to-rose-200/60",
  "from-sky-400/70 to-sky-200/60"
];

export function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-white/5 p-6 backdrop-blur-xl">
      <h2 className="mb-6 text-lg font-semibold text-white">Top categories</h2>
      <div className="space-y-4">
        {categories.map((category, index) => (
          <div key={category.name} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-white">{category.name}</span>
              <span className="text-slate-300">
                ${category.amount.toFixed(2)} · {category.percentage.toFixed(0)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${
                  accentPalette[index % accentPalette.length]
                }`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
