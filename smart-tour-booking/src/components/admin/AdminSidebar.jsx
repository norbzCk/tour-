import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaMapMarkedAlt,
  FaChartBar,
  FaHistory,
  FaBuilding,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";

function AdminSidebar() {
  const { logout } = useAuth();

  const navItems = [
    { to: "/admin", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin/users", icon: FaUsers, label: "Users" },
    { to: "/admin/operators", icon: FaBuilding, label: "Operators" },
    { to: "/admin/tours", icon: FaMapMarkedAlt, label: "Tours" },
    { to: "/admin/logs", icon: FaHistory, label: "Activity Logs" },
    { to: "/admin/reports", icon: FaChartBar, label: "Reports" },
  ];

  return (
    <aside className="w-72 bg-white shadow-xl min-h-screen flex flex-col">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-gray-900">SmartTour</h2>
            <p className="text-xs text-gray-500 font-medium">Admin Panel</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "bg-green-50 text-green-700 shadow-sm"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon className={`w-5 h-5`} />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 transition w-full"
        >
          <FaSignOutAlt className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
