import React from "react";
import { NavLink } from "react-router-dom";
import { LayoutGrid, ReceiptText, LineChart } from "lucide-react";
import useStore from "../store/usestore"; // Ensure this path matches your file structure

const Sidebar = () => {
  const { theme } = useStore();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutGrid size={24} /> },
    {
      name: "Transactions",
      path: "/transactions",
      icon: <ReceiptText size={24} />,
    },
    { name: "Insights", path: "/insights", icon: <LineChart size={24} /> },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen w-72 border-r p-8 flex flex-col transition-all duration-300 z-20 ${
        theme === "dark"
          ? "bg-[#0f172a] border-slate-800"
          : "bg-[#f1f5f9] border-slate-100"
      }`}
    >
      {/* Brand Header */}
      <div className="mb-12">
        <h1
          className={`text-2xl font-bold leading-tight transition-colors ${
            theme === "dark" ? "text-white" : "text-[#0f172a]"
          }`}
        >
          BitBank
        </h1>
        <p className="text-xs font-bold text-slate-400 tracking-[0.15em] mt-1 uppercase">
          Private Banking
        </p>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-y-4">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-200 group ${
                isActive
                  ? theme === "dark"
                    ? "bg-slate-800 text-white shadow-lg shadow-black/20"
                    : "bg-white shadow-sm shadow-slate-200 text-[#0f172a]"
                  : "text-slate-500 hover:text-slate-300"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span
                  className={`transition-colors ${
                    isActive
                      ? theme === "dark"
                        ? "text-blue-400"
                        : "text-[#0f172a]"
                      : "text-slate-400 group-hover:text-slate-600"
                  }`}
                >
                  {item.icon}
                </span>
                <span className="text-lg font-semibold tracking-tight">
                  {item.name}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Optional: Simple footer indication of current mode */}
      <div className="mt-auto pt-8">
        <div
          className={`text-[10px] font-bold uppercase tracking-widest ${
            theme === "dark" ? "text-slate-600" : "text-slate-300"
          }`}
        >
          System Mode: {theme}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
