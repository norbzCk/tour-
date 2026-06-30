import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import { Link } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const { user } = useAuth();
  const { tours, bookings, users, guides, formatTZS } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");

  const recentBookings = bookings.slice(0, 5);
  const filteredBookings = recentBookings.filter((b) =>
    b.userName.toLowerCase().includes(search.toLowerCase()) ||
    b.tourTitle.toLowerCase().includes(search.toLowerCase())
  );

  const confirmedRevenue = bookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.amount, 0);

  const stats = [
    { icon: "👥", title: "Total Users", value: users.length.toLocaleString(), color: "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300" },
    { icon: "🏨", title: "Active Tours", value: tours.length.toString(), color: "bg-green-50 text-green-600 dark:bg-green-900/50 dark:text-green-300" },
    { icon: "📅", title: "Bookings", value: bookings.length.toLocaleString(), color: "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300" },
    { icon: "💰", title: "Revenue", value: `Tsh ${confirmedRevenue.toLocaleString()}`, color: "bg-amber-50 text-amber-600 dark:bg-amber-900/50 dark:text-amber-300" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <PageHeader
        title={`Welcome back, ${user?.name || "Admin"}`}
        subtitle="Here's what's happening with your tours today."
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <StatCard icon={stat.icon} title={stat.title} value={stat.value} />
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>
              Recent Bookings
            </h3>
            <div className="flex gap-3 w-full sm:w-auto">
              <SearchBar
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search bookings..."
              />
              <Link
                to="/admin/bookings"
                className="px-4 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition whitespace-nowrap"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>ID</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>User</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tour</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Amount</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking, i) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className={`border-b transition-colors ${isDark ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-50 hover:bg-gray-50"}`}
                  >
                    <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>#{booking.id}</td>
                    <td className={`py-4 text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{booking.userName}</td>
                    <td className={`py-4 text-sm max-w-[180px] truncate ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.tourTitle}</td>
                    <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.date}</td>
                    <td className={`py-4 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{formatTZS(booking.amount)}</td>
                    <td className="py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredBookings.length === 0 && (
            <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No bookings found.</p>
          )}
        </div>

        <div className="space-y-6">
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6`}>
            <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Active Guides</span>
                <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{guides.filter((g) => g.status === "Active").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Pending Bookings</span>
                <span className={`font-bold ${isDark ? "text-amber-400" : "text-amber-700"}`}>{bookings.filter((b) => b.status === "Pending").length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>Total Tours</span>
                <span className={`font-bold ${isDark ? "text-white" : "text-gray-900"}`}>{tours.length}</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-600 to-emerald-700 rounded-2xl shadow-sm p-6 text-white">
            <h3 className="font-bold text-lg mb-2">Need help?</h3>
            <p className="text-green-100 text-sm mb-4">Access guides, reports, and system logs from the sidebar.</p>
            <Link
              to="/admin/reports"
              className="inline-block bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/30 transition"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Dashboard;
