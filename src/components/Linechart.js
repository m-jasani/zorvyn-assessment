import React, { useMemo } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useStore from '../store/usestore';

const processData = (transactions, searchQuery) => {
  const term = searchQuery.toLowerCase();
  const filtered = transactions.filter(
    (txn) =>
      txn.description.toLowerCase().includes(term) ||
      txn.category.toLowerCase().includes(term) ||
      txn.amount.toString().includes(term)
  );

  const sorted = [...filtered].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  let runningBalance = 0;
  return sorted.map((txn) => {
    if (txn.type === 'income') runningBalance += txn.amount;
    else runningBalance -= txn.amount;

    return {
      date: new Date(txn.date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
      }),
      balance: runningBalance,
    };
  });
};

const Linechart = () => {
  // ✅ FIX: Read from Zustand store so chart reacts to add/edit/delete
  const { theme, searchQuery, transactions } = useStore();

  const data = useMemo(
    () => processData(transactions, searchQuery),
    [transactions, searchQuery]
  );

  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#3b82f6' : '#ef4444';
  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const textColor = isDark ? '#94a3b8' : '#64748b';

  return (
    <div
      className={`p-8 rounded-3xl shadow-sm border transition-all duration-300 w-full ${
        isDark
          ? 'bg-[#0f172a] border-slate-800'
          : 'bg-white border-slate-100'
      }`}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3
            className={`text-xl font-extrabold tracking-tight uppercase transition-colors ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            Balance Trend
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Running balance over time
          </p>
        </div>
        <div
          className={`${
            isDark
              ? 'bg-blue-900/30 text-blue-400'
              : 'bg-orange-100 text-orange-600'
          } px-3 py-1 rounded-lg flex items-center gap-1 font-bold text-sm transition-colors`}
        >
          <span>↗</span> Live
        </div>
      </div>

      {/* Empty State */}
      {data.length === 0 ? (
        <div className="h-72 flex flex-col items-center justify-center gap-2">
          <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">
            No data to display
          </p>
          <p className="text-slate-500 text-xs">
            Try clearing your search filter
          </p>
        </div>
      ) : (
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={primaryColor}
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor={primaryColor}
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke={gridColor}
              />
              <XAxis
                dataKey="date"
                axisLine={false}
                tickLine={false}
                tick={{ fill: textColor, fontSize: 12, fontWeight: 600 }}
                dy={15}
              />
              <YAxis
                hide={true}
                domain={['dataMin - 500', 'dataMax + 500']}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? '#1e293b' : '#0f172a',
                  border: 'none',
                  borderRadius: '12px',
                  color: '#fff',
                  fontSize: '12px',
                  boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.3)',
                }}
                itemStyle={{ color: '#fff', fontWeight: 'bold' }}
                cursor={{ stroke: primaryColor, strokeWidth: 2 }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Balance']}
              />
              <Area
                type="monotone"
                dataKey="balance"
                stroke={primaryColor}
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorBalance)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default Linechart;

