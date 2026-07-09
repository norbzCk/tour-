import { Outlet } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import AdminSidebar from "./AdminSidebar";

function DashboardLayout() {
  const { isDark } = useTheme();
  return (
    <div className={`flex min-h-screen transition-colors duration-300 ${isDark ? "bg-gray-900" : "bg-slate-50"}`}>
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="w-full">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
