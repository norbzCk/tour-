import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";

function Logs() {
  const { logs } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  const getActionColor = (action) => {
    if (action.includes("Login")) return isDark ? "text-blue-300 bg-blue-900/50" : "text-blue-700 bg-blue-50";
    if (action.includes("Created")) return isDark ? "text-green-300 bg-green-900/50" : "text-green-700 bg-green-50";
    if (action.includes("Updated")) return isDark ? "text-amber-300 bg-amber-900/50" : "text-amber-700 bg-amber-50";
    if (action.includes("Deleted")) return isDark ? "text-red-300 bg-red-900/50" : "text-red-700 bg-red-50";
    if (action.includes("Booking")) return isDark ? "text-purple-300 bg-purple-900/50" : "text-purple-700 bg-purple-50";
    return isDark ? "text-gray-300 bg-gray-700" : "text-gray-700 bg-gray-50";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title="Activity Logs"
        subtitle="Monitor system activities and user actions"
      />

      <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Recent Activities</h3>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." />
        </div>

        <div className="space-y-3">
          {filtered.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                isDark ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-100 hover:bg-gray-50"
              }`}
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                  <span className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{log.user}</span>
                </div>
                <p className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{log.details}</p>
              </div>
              <span className={`text-xs whitespace-nowrap ${isDark ? "text-gray-500" : "text-gray-400"}`}>{log.timestamp}</span>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No logs found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Logs;
