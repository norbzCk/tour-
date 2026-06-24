import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";

function Logs() {
  const { logs } = useData();
  const [search, setSearch] = useState("");

  const filtered = logs.filter((l) =>
    l.action.toLowerCase().includes(search.toLowerCase()) ||
    l.user.toLowerCase().includes(search.toLowerCase()) ||
    l.details.toLowerCase().includes(search.toLowerCase())
  );

  const getActionColor = (action) => {
    if (action.includes("Login")) return "text-blue-700 bg-blue-50";
    if (action.includes("Created")) return "text-green-700 bg-green-50";
    if (action.includes("Updated")) return "text-amber-700 bg-amber-50";
    if (action.includes("Deleted")) return "text-red-700 bg-red-50";
    if (action.includes("Booking")) return "text-purple-700 bg-purple-50";
    return "text-gray-700 bg-gray-50";
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title="Activity Logs"
        subtitle="Monitor system activities and user actions"
      />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">Recent Activities</h3>
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search logs..." />
        </div>

        <div className="space-y-3">
          {filtered.map((log, i) => (
            <motion.div
              key={log.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-start gap-4 p-4 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${getActionColor(log.action)}`}>
                    {log.action}
                  </span>
                  <span className="text-sm font-medium text-gray-900">{log.user}</span>
                </div>
                <p className="text-sm text-gray-600">{log.details}</p>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap">{log.timestamp}</span>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">No logs found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Logs;
