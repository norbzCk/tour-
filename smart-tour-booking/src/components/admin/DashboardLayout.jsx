import { useState } from "react";
import { Outlet } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import AdminSidebar from "./AdminSidebar";

function DashboardLayout() {
  const { isDark } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}>
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {sidebarOpen && (
        <div
          className="fixed inset-0 top-20 z-30 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <div
          className={`md:hidden flex items-center gap-3 px-4 py-3 sticky top-20 z-20 border-b ${
            isDark ? "bg-gray-900 border-gray-700" : "bg-slate-50 border-gray-200"
          }`}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className={`p-2 rounded-xl border transition active:scale-95 ${
              isDark ? "border-gray-700 text-gray-300 hover:bg-gray-800" : "border-gray-200 text-gray-700 hover:bg-gray-100"
            }`}
            aria-label="Open menu"
          >
            <FaBars className="w-4 h-4" />
          </button>
          <span className={`font-extrabold uppercase tracking-wider text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Admin Panel
          </span>
        </div>

        <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
          <div className="w-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
