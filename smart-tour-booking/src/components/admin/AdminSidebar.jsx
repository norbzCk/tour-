import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
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

function AdminSidebar({ open, onClose }) {
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
    <aside
      className={`fixed top-20 bottom-0 left-0 z-40 w-64 shadow-xl flex flex-col transform transition-transform duration-300 md:static md:top-0 md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} ${isDark ? "bg-gray-800 border-r border-gray-700" : "bg-white border-r border-gray-200"}`}
    >
      <div className={`flex items-center justify-between p-6 border-b ${isDark ? "border-gray-700" : "border-gray-200"}`}>
        <h2 className={`text-sm font-extrabold uppercase tracking-wider ${isDark ? "text-gray-300" : "text-gray-600"}`}>Admin</h2>
        <button
          onClick={onClose}
          className={`md:hidden p-1.5 rounded-lg ${isDark ? "text-gray-400 hover:bg-gray-700 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"} transition`}
          aria-label="Close menu"
        >
          <FaTimes className="w-4 h-4" />
        </button>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === "/admin"}
            onClick={onClose}
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
