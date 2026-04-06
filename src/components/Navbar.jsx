import React from "react";
import { Search, Bell, Sun, Moon, User } from "lucide-react";
import useStore from "../store/usestore";

const Navbar = () => {
  const {
    userRole,
    setUserRole,
    searchQuery,
    setSearchQuery,
    theme,
    toggleTheme,
  } = useStore();
  return (
    // <nav className="fixed top-0 right-0 left-0 h-20 bg-[#f8fafc] flex items-center border-b border-slate-100 z-10">
    <nav
      className={`fixed top-0 right-0 left-0 h-20 flex items-center border-b shadow-sm z-10 transition-colors duration-300 ${
        theme === "dark"
          ? "bg-[#0f172a] border-slate-800"
          : "bg-[#ffffff] border-slate-100"
      }`}
    >
      <div className="ml-72 w-full flex items-center justify-between px-8">
        {/* Search Bar Container */}
        <div className="relative w-full max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="text-slate-400" size={18} />
          </div>
          <input
            type="text"
            placeholder="Search transactions, entities, or amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Updates global state
            className="w-full bg-[#f1f5f9] border-none rounded-full py-3 pl-12 pr-4 text-sm text-slate-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-6">
          {/* Admin/Viewer Toggle */}

          <div className="flex items-center bg-[#e2e8f0] p-1 rounded-full border border-slate-200">
            <button
              onClick={() => setUserRole("admin")}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                userRole === "admin"
                  ? "bg-red-400 text-[#0f172a] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Admin
            </button>
            <button
              onClick={() => setUserRole("viewer")}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all uppercase tracking-wider ${
                userRole === "viewer"
                  ? "bg-red-400 text-[#0f172a] shadow-sm"
                  : "text-slate-500 hover:text-slate-700"
              }`}
            >
              Viewer
            </button>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full transition-all ${
              theme === "dark"
                ? "text-amber-400 hover:bg-slate-800"
                : "text-slate-600 hover:bg-white hover:shadow-sm"
            }`}
          >
            {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          {/* Notification Bell */}
          <button className="relative p-2 text-slate-600 hover:bg-white hover:shadow-sm rounded-full transition-all group">
            <Bell size={22} strokeWidth={2.5} />
            {/* Optional Notification Dot */}
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#f8fafc]"></span>
          </button>

          {/* Profile Section */}
          <div className="flex items-center gap-3 pl-2 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p
                className={`text-xs font-bold ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Alex Rivera
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                {userRole}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-800 to-slate-500 flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-105 transition-transform">
              <User size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
