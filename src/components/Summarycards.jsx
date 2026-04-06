import React from "react";
import { ArrowUpRight, ArrowDownRight, Wallet } from "lucide-react";
import { mockTransactions } from "../data/Mockdata";
import useStore from "../store/usestore"; // Ensure this path is correct

const calculateSummaries = (transactions) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return {
    income: income.toLocaleString(),
    expenses: expenses.toLocaleString(),
    balance: (income - expenses).toLocaleString(),
  };
};

const SummaryCards = () => {
  const { theme, searchQuery } = useStore();

  // Global Search Logic: Filter data before calculating totals
  const filteredTransactions = mockTransactions.filter((txn) => {
    const term = searchQuery.toLowerCase();
    return (
      txn.description.toLowerCase().includes(term) ||
      txn.category.toLowerCase().includes(term) ||
      txn.amount.toString().includes(term)
    );
  });

  const totals = calculateSummaries(filteredTransactions);

  const cardData = [
    {
      label: "Total Balance",
      value: `$${totals.balance}`,
      trend: "+12.5%",
      isPositive: true,
      icon: (
        <Wallet
          size={20}
          className={theme === "dark" ? "text-blue-400" : "text-blue-600"}
        />
      ),
      bgColor: theme === "dark" ? "bg-blue-500/10" : "bg-blue-50",
    },
    {
      label: "Monthly Income",
      value: `$${totals.income}`,
      trend: "+15.2%",
      isPositive: true,
      icon: (
        <ArrowUpRight
          size={20}
          className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"}
        />
      ),
      bgColor: theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-50",
    },
    {
      label: "Monthly Expenses",
      value: `$${totals.expenses}`,
      trend: "-4.3%",
      isPositive: false,
      icon: (
        <ArrowDownRight
          size={20}
          className={theme === "dark" ? "text-rose-400" : "text-rose-600"}
        />
      ),
      bgColor: theme === "dark" ? "bg-rose-500/10" : "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 mt-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className={`p-6 rounded-3xl border transition-all duration-300 hover:scale-105 ${
            theme === "dark"
              ? "bg-[#0f172a] border-slate-800 shadow-lg shadow-black/20"
              : "bg-white border-slate-100 shadow-sm hover:shadow-md"
          }`}
        >
          <div className="flex justify-between items-start mb-4">
            <div
              className={`${card.bgColor} p-3 rounded-2xl transition-colors`}
            >
              {card.icon}
            </div>
            <span
              className={`text-xs font-bold px-2 py-1 rounded-lg transition-colors ${
                card.isPositive
                  ? theme === "dark"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-emerald-100 text-emerald-700"
                  : theme === "dark"
                    ? "bg-rose-500/20 text-rose-400"
                    : "bg-rose-100 text-rose-700"
              }`}
            >
              {card.trend}
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {card.label}
            </p>
            <h3
              className={`text-3xl font-black mt-1 tracking-tight transition-colors ${
                theme === "dark" ? "text-white" : "text-slate-900"
              }`}
            >
              {card.value}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
