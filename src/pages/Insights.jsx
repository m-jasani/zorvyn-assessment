import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  AlertCircle,
  Calendar,
  Target,
  ArrowRight,
  Zap,
} from "lucide-react";
import useStore from "../store/usestore";
import ObservationCard from "../components/ObservationCard";

const Insights = () => {
  const { theme } = useStore();

  const isDark = theme === "dark";

  // Existing Chart Data
  const data = [
    { name: "MAY", balance: 400000 },
    { name: "JUN", balance: 600000 },
    { name: "JUL", balance: 450000 },
    { name: "AUG", balance: 900000 },
    { name: "SEP", balance: 750000 },
    { name: "OCT", balance: 1240000 },
  ];

  // New Data for Upcoming Payments
  const upcomingPayments = [
    {
      id: 1,
      client: "CloudScale AI",
      amount: 4200,
      date: "Oct 24",
      status: "Verified",
    },
    {
      id: 2,
      client: "Nexus Design",
      amount: 1850,
      date: "Oct 28",
      status: "Pending",
    },
  ];

  return (
    <>
      <div
        className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
      >
        Insights Content
      </div>
      <div
        className={`text-sm text-slate-500 mb-6 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}
      >
        Overview of your financial health
      </div>

      <div className="space-y-6 p-6 transition-colors duration-300">
        {/* --- TOP ROW --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className={`lg:col-span-2 p-8 rounded-3xl border transition-all duration-300 ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-100 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Balance Trend
                </h3>
                <p
                  className={`text-sm font-medium ${isDark ? "text-slate-400" : "text-slate-500"}`}
                >
                  Growth over last 6 months
                </p>
              </div>
              <div className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-lg flex items-center gap-1 text-xs font-bold border border-orange-500/20">
                <TrendingUp size={14} /> +24.8%
              </div>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient
                      id="colorBalance"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#ef4444"
                        stopOpacity={isDark ? 0.2 : 0.1}
                      />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke={isDark ? "#1e293b" : "#f1f5f9"}
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{
                      fill: isDark ? "#475569" : "#94a3b8",
                      fontSize: 10,
                      fontWeight: 700,
                    }}
                    dy={10}
                  />
                  <YAxis
                    hide={true}
                    domain={["dataMin - 100000", "dataMax + 100000"]}
                  />
                  <Tooltip
                    content={<CustomTooltip isDark={isDark} />}
                    cursor={{
                      stroke: "#ef4444",
                      strokeWidth: 1,
                      strokeDasharray: "5 5",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#ef4444"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    activeDot={{
                      r: 6,
                      fill: "#ef4444",
                      stroke: isDark ? "#0f172a" : "#fff",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div
            className={`p-8 rounded-3xl shadow-xl flex flex-col justify-between transition-colors duration-300 ${
              isDark
                ? "bg-rose-950/40 border border-rose-900/50"
                : "bg-rose-950 text-white"
            }`}
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 bg-white/10 rounded-lg">
                  <Target size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-60 text-white">
                  Major Expense
                </span>
              </div>
              <h3 className="text-4xl font-bold mb-2 text-white">Housing</h3>
              <p className="text-sm opacity-50 uppercase tracking-widest font-bold text-white">
                Monthly Allocation
              </p>
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-3">
                <span className="text-6xl font-bold text-white">38%</span>
                <div className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center">
                  <TrendingUp size={14} className="text-white" />
                </div>
              </div>
              <p className="text-xs mt-4 leading-relaxed opacity-50 text-white">
                Housing remains your primary expenditure. Consider refinancing
                options to reduce this by 4% annually.
              </p>
            </div>
          </div>
        </div>

        {/* --- NEW SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Payments List */}
          <div
            className={`lg:col-span-2 p-6 rounded-3xl border transition-all duration-300  ${
              isDark
                ? "bg-slate-900 border-slate-800"
                : "bg-white border-slate-100 shadow-sm"
            }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h3
                className={`text-sm font-bold flex items-center gap-2 ${isDark ? "text-white" : "text-slate-900"}`}
              >
                <Calendar size={16} className="text-rose-500" /> Upcoming
                Payments
              </h3>
              <button className="text-[10px] font-bold text-rose-500 uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity">
                View All <ArrowRight size={12} />
              </button>
            </div>
            <div className="space-y-3">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-colors  ${
                    isDark
                      ? "bg-slate-800/50 border-slate-800"
                      : "bg-slate-50/50 border-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-4 ">
                    <div
                      className={`w-10 h-10 rounded-full border flex items-center justify-center font-bold text-xs ${
                        isDark
                          ? "bg-slate-900 border-slate-700 text-slate-500"
                          : "bg-white border-slate-100 text-slate-400"
                      }`}
                    >
                      {payment.client[0]}
                    </div>
                    <div>
                      <p
                        className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-900"}`}
                      >
                        {payment.client}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium uppercase tracking-tighter">
                        {payment.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-sm font-bold ${isDark ? "text-slate-200" : "text-slate-900"}`}
                    >
                      ${payment.amount.toLocaleString()}
                    </p>
                    <span
                      className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                        payment.status === "Verified"
                          ? isDark
                            ? "bg-emerald-500/10 text-emerald-400"
                            : "bg-emerald-100 text-emerald-600"
                          : isDark
                            ? "bg-amber-500/10 text-amber-400"
                            : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Luminous Philosophy Card */}
          <div
            className={`p-6 rounded-3xl shadow-lg border flex flex-col justify-between overflow-hidden relative group transition-all duration-300 ${
              isDark
                ? "bg-slate-950 border-slate-800"
                : "bg-slate-900 border-slate-800"
            }`}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 bg-rose-500/20 rounded-lg shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                  <Zap size={18} className="text-rose-500" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">
                  Luminous Philosophy
                </span>
              </div>
              <h4 className="text-xl font-bold text-white mb-2 leading-tight">
                Clarity through Radiance
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed italic">
                "True growth is not just accumulation, but the luminous
                visibility of progress."
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800 relative z-10">
              <div className="flex justify-between items-end">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Active Focus
                </span>
                <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                  <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444]" />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl group-hover:bg-rose-500/20 transition-all duration-700" />
          </div>
        </div>

        {/* --- BOTTOM ROW --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ObservationCard
            icon={<AlertCircle className="text-rose-500" size={18} />}
            title="Spending Alert"
            text="Your spending in Dining Out increased by 15% this month compared to your 3-month average."
            tag="Actionable Insight"
            borderColor="border-l-rose-500"
            isDark={isDark}
          />
          <ObservationCard
            icon={
              <TrendingUp
                className={isDark ? "text-blue-400" : "text-slate-900"}
                size={18}
              />
            }
            title="Dividend Growth"
            text="Dividend reinvestments from Global Tech ETF yielded an extra $420 in passive growth."
            tag="Portfolio Update"
            borderColor={isDark ? "border-l-blue-500" : "border-l-slate-900"}
            isDark={isDark}
          />
          <ObservationCard
            icon={<Calendar className="text-slate-400" size={18} />}
            title="Subscription Audit"
            text="Subscription audits suggest 3 unused services totaling $42/mo could be terminated."
            tag="Optimization Tip"
            borderColor={isDark ? "border-l-slate-700" : "border-l-slate-200"}
            isDark={isDark}
          />
        </div>
      </div>
    </>
  );
};

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (active && payload && payload.length) {
    return (
      <div
        className={`px-4 py-2 rounded-lg shadow-xl border transition-colors ${
          isDark
            ? "bg-slate-800 text-white border-slate-700"
            : "bg-slate-900 text-white border-slate-800"
        }`}
      >
        <p className="text-[10px] font-bold uppercase tracking-widest">
          {label}:{" "}
          <span className="text-rose-400">
            ${(payload[0].value / 1000000).toFixed(2)}M
          </span>
        </p>
      </div>
    );
  }
  return null;
};

export default Insights;
