import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaMapMarkedAlt,
  FaChartBar,
  FaHistory,
  FaTachometerAlt,
  FaUserTie,
  FaCalendarAlt,
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

function AdminSidebar() {
  const { isDark } = useTheme();

  const navItems = [
    { to: "/admin", icon: FaTachometerAlt, label: "Dashboard" },
    { to: "/admin/users", icon: FaUsers, label: "Users" },
    { to: "/admin/operators", icon: FaUserTie, label: "Tour Guides" },
    { to: "/admin/tours", icon: FaMapMarkedAlt, label: "Tours" },
    { to: "/admin/bookings", icon: FaCalendarAlt, label: "Bookings" },
    { to: "/admin/logs", icon: FaHistory, label: "Activity Logs" },
    { to: "/admin/reports", icon: FaChartBar, label: "Reports" },
  ];

  return (
    <aside className={`w-72 shadow-xl min-h-screen flex flex-col transition-colors duration-300 ${isDark ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"}`}>
      <div className={`p-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <h2 className={`text-xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>Admin Panel</h2>
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
                  ? isDark
                    ? "bg-green-900/50 text-green-400 shadow-sm"
                    : "bg-green-50 text-green-700 shadow-sm"
                  : isDark
                  ? "text-gray-400 hover:bg-gray-700 hover:text-white"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`
            }
          >
            <item.icon className={`w-5 h-5`} />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default AdminSidebar;
