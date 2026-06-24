import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");

  const recentBookings = [
    { id: 1, user: "Sarah M.", tour: "Serengeti Safari", date: "Jul 10, 2026", amount: "$799", status: "Confirmed" },
    { id: 2, user: "James K.", tour: "Zanzibar Beach", date: "Jul 20, 2026", amount: "$499", status: "Pending" },
    { id: 3, user: "Grace T.", tour: "Kilimanjaro Trek", date: "Aug 05, 2026", amount: "$1,200", status: "Confirmed" },
    { id: 4, user: "John D.", tour: "Ngorongoro Crater", date: "Aug 12, 2026", amount: "$650", status: "Pending" },
    { id: 5, user: "Maria L.", tour: "Dar City Tour", date: "Aug 18, 2026", amount: "$199", status: "Rejected" },
  ];

  const filteredBookings = recentBookings.filter((b) =>
    b.user.toLowerCase().includes(search.toLowerCase()) ||
    b.tour.toLowerCase().includes(search.toLowerCase())
  );

  const stats = [
    { icon: "👥", title: "Total Users", value: "2,847", color: "bg-blue-50 text-blue-600" },
    { icon: "🏨", title: "Active Tours", value: "156", color: "bg-green-50 text-green-600" },
    { icon: "📅", title: "Bookings", value: "1,234", color: "bg-purple-50 text-purple-600" },
    { icon: "💰", title: "Revenue", value: "$89K", color: "bg-amber-50 text-amber-600" },
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

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">
            Recent Bookings
          </h3>
          <SearchBar
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search bookings..."
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm font-semibold text-gray-500">ID</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">User</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Tour</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Date</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Amount</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 text-sm text-gray-600">#{booking.id}</td>
                  <td className="py-4 text-sm font-medium text-gray-900">{booking.user}</td>
                  <td className="py-4 text-sm text-gray-600">{booking.tour}</td>
                  <td className="py-4 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-4 text-sm font-semibold text-gray-900">{booking.amount}</td>
                  <td className="py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredBookings.length === 0 && (
          <p className="text-center text-gray-500 py-8">No bookings found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;
