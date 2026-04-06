
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { mockTransactions } from "../data/Mockdata";
import useStore from "../store/usestore";

const processCategoricalData = (transactions, searchQuery) => {
  // 1. Filter by Search Query first
  const term = searchQuery.toLowerCase();
  const filtered = transactions.filter(
    (txn) =>
      txn.type === "expense" &&
      (txn.description.toLowerCase().includes(term) ||
        txn.category.toLowerCase().includes(term) ||
        txn.amount.toString().includes(term)),
  );

  // 2. Aggregate by Category
  const totals = filtered.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const totalSum = Object.values(totals).reduce((a, b) => a + b, 0);

  return Object.keys(totals).map((key) => ({
    name: key.toUpperCase(),
    value: totals[key],
    percentage: totalSum > 0 ? ((totals[key] / totalSum) * 100).toFixed(0) : 0,
  }));
};

const SpendingBreakdown = () => {
  const { theme, searchQuery } = useStore();

  // Color Palettes
  const LIGHT_COLORS = ["#0f172a", "#b47000", "#64748b", "#94a3b8", "#cbd5e1"];
  const DARK_COLORS = ["#3b82f6", "#f59e0b", "#8b5cf6", "#10b981", "#64748b"];
  const COLORS = theme === "dark" ? DARK_COLORS : LIGHT_COLORS;

  const data = processCategoricalData(mockTransactions, searchQuery);
  const totalAmount = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className={`p-8 rounded-3xl shadow-sm border transition-all duration-300 w-full max-w-md ${
        theme === "dark"
          ? "bg-[#0f172a] border-slate-800"
          : "bg-white border-slate-100"
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3
            className={`text-xl font-extrabold tracking-tight uppercase transition-colors ${
              theme === "dark" ? "text-white" : "text-slate-900"
            }`}
          >
            Spending Breakdown
          </h3>
          <p className="text-sm text-slate-500 mt-1">Expenses by category</p>
        </div>
        <button className="text-slate-400 hover:text-slate-600 text-2xl font-bold">
          ···
        </button>
      </div>

      <div className="flex flex-col items-center justify-between mt-6 sm:flex-row">
        {/* Donut Chart with Center Text */}
        <div className="relative h-64 w-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={75}
                outerRadius={100}
                paddingAngle={data.length > 1 ? 4 : 0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    className="transition-all duration-500"
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === "dark" ? "#1e293b" : "#fff",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  color: theme === "dark" ? "#fff" : "#000",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center Text Labels */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span
              className={`text-2xl font-black transition-colors ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              ${(totalAmount / 1000).toFixed(1)}k
            </span>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Total
            </span>
          </div>
        </div>

        {/* Custom Legend */}
        <div className="flex flex-col gap-4 w-full sm:w-40 mt-6 sm:mt-0">
          {data.length > 0 ? (
            data.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-3 h-3 rounded-full transition-colors"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />
                  <span
                    className={`text-xs font-bold tracking-wide ${
                      theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}
                  >
                    {entry.name}
                  </span>
                </div>
                <span
                  className={`text-sm font-bold ${
                    theme === "dark" ? "text-slate-200" : "text-slate-800"
                  }`}
                >
                  {entry.percentage}%
                </span>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-500 text-xs py-10">
              No expenses found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SpendingBreakdown;
