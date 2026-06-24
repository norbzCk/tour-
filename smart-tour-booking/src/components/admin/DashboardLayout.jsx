import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

function DashboardLayout() {
  return (
    <div className="flex bg-slate-50 min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
