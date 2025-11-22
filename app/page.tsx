import { PiggyBank, TrendingUp, Wallet } from "lucide-react";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { ExpenseTable } from "@/components/expense-table";
import { SpendingTrend } from "@/components/spending-trend";
import { SummaryCard } from "@/components/summary-card";
import { dailyBudget, todayExpenses, weeklyTrend } from "@/lib/expenses";

const totalSpent = todayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
const remainingBudget = dailyBudget - totalSpent;
const budgetUsage = (totalSpent / dailyBudget) * 100;

const categoryTotals = todayExpenses.reduce<Record<string, number>>((acc, item) => {
  acc[item.category] = (acc[item.category] ?? 0) + item.amount;
  return acc;
}, {});

const topCategories = Object.entries(categoryTotals)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 5)
  .map(([name, amount]) => ({
    name,
    amount,
    percentage: (amount / totalSpent) * 100
  }));

const yesterdayTotal = 62.4;
const trendDelta = totalSpent - yesterdayTotal;
const trendLabel =
  trendDelta === 0
    ? "Even with yesterday"
    : trendDelta > 0
      ? `+$${trendDelta.toFixed(2)} vs yesterday`
      : `-$${Math.abs(trendDelta).toFixed(2)} vs yesterday`;
const trendIntent = trendDelta > 0 ? "down" : trendDelta < 0 ? "up" : "neutral";

export default function Home() {
  return (
    <main className="w-full max-w-6xl space-y-8">
      <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
            Daily expenses
          </p>
          <h1 className="mt-2 text-4xl font-semibold text-white">
            Quietly confident spending
          </h1>
        </div>
        <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-slate-200">
          <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
          On track · Updated just now
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          title="Spent today"
          value={Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD"
          }).format(totalSpent)}
          trend={{ label: trendLabel, intent: trendIntent }}
          icon={<Wallet size={18} strokeWidth={1.5} />}
        />
        <SummaryCard
          title="Daily budget"
          value={`$${dailyBudget.toFixed(0)} limit`}
          trend={{
            label: `${budgetUsage.toFixed(0)}% used`,
            intent: budgetUsage > 100 ? "down" : "neutral"
          }}
          icon={<PiggyBank size={18} strokeWidth={1.5} />}
        />
        <SummaryCard
          title="Remaining"
          value={
            remainingBudget >= 0
              ? `$${remainingBudget.toFixed(2)} left`
              : `-$${Math.abs(remainingBudget).toFixed(2)} over`
          }
          trend={{
            label:
              remainingBudget >= 0
                ? "Comfort zone"
                : "Time to slow down",
            intent: remainingBudget >= 0 ? "up" : "down"
          }}
          icon={<TrendingUp size={18} strokeWidth={1.5} />}
        />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">
        <SpendingTrend data={weeklyTrend} />
        <CategoryBreakdown categories={topCategories} />
      </section>

      <ExpenseTable expenses={todayExpenses} />
    </main>
  );
}
