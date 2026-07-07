import { useTheme } from "../../context/ThemeContext";

function RoleBadge({ role }) {
  const { isDark } = useTheme();

  const roleConfig = {
    admin: {
      label: "Admin",
      className: isDark ? "bg-red-900/50 text-red-300" : "bg-red-100 text-red-700",
    },
    guide: {
      label: "Guide",
      className: isDark ? "bg-blue-900/50 text-blue-300" : "bg-blue-100 text-blue-700",
    },
    operator: {
      label: "Operator",
      className: isDark ? "bg-purple-900/50 text-purple-300" : "bg-purple-100 text-purple-700",
    },
    tourist: {
      label: "Tourist",
      className: isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700",
    },
  };

  const config = roleConfig[role] || roleConfig.tourist;

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${config.className}`}
    >
      {config.label}
    </span>
  );
}

export default RoleBadge;
