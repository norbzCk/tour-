import { useTheme } from "../../context/ThemeContext";

function StatusBadge({ status }) {
  const { isDark } = useTheme();
  const styles = {
    Approved:
      isDark
        ? "bg-green-900/50 text-green-300"
        : "bg-green-100 text-green-700",

    Pending:
      isDark
        ? "bg-amber-900/50 text-amber-300"
        : "bg-yellow-100 text-yellow-700",

    Rejected:
      isDark
        ? "bg-red-900/50 text-red-300"
        : "bg-red-100 text-red-700",

    Active:
      isDark
        ? "bg-green-900/50 text-green-300"
        : "bg-green-100 text-green-700",

    Suspended:
      isDark
        ? "bg-red-900/50 text-red-300"
        : "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`
      px-3
      py-1
      rounded-full
      text-sm
      font-medium
      ${styles[status] || (isDark ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-700")}
      `}
    >
      {status}
    </span>
  );
}

export default StatusBadge;
