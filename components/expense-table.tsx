import type { Expense } from "@/lib/expenses";
import { WalletCards } from "lucide-react";

type ExpenseTableProps = {
  expenses: Expense[];
};

const chipColors: Record<Expense["method"], string> = {
  Card: "bg-white/10 text-white",
  Cash: "bg-yellow-200/20 text-yellow-200",
  Transfer: "bg-sky-200/20 text-sky-100"
};

export function ExpenseTable({ expenses }: ExpenseTableProps) {
  return (
    <div className="rounded-3xl border border-white/5 bg-slate-900/50 p-6 backdrop-blur-xl">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-white">Today&apos;s log</h2>
          <p className="text-sm text-slate-400">Latest transactions at a glance</p>
        </div>
        <div className="rounded-full bg-white/10 p-2 text-white">
          <WalletCards size={18} strokeWidth={1.5} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th className="w-2/5">Item</th>
              <th>Category</th>
              <th>Time</th>
              <th>Method</th>
              <th className="text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td className="text-sm font-medium text-white">{expense.title}</td>
                <td className="text-sm text-slate-300">{expense.category}</td>
                <td className="text-sm text-slate-300">{expense.time}</td>
                <td>
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${chipColors[expense.method]}`}
                  >
                    {expense.method}
                  </span>
                </td>
                <td className="text-right text-sm font-semibold text-white">
                  ${expense.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
