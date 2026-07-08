import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import { notificationService } from "../../services/notificationService";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";

function AdminBookings() {
  const { bookings, updateBookingStatus, formatTZS } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.tourTitle.toLowerCase().includes(search.toLowerCase()) ||
      b.userEmail.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statuses = ["All", "Confirmed", "Pending", "Rejected"];

  const handleStatusUpdate = (id, newStatus, booking) => {
    updateBookingStatus(id, newStatus);

    const statusEmoji = newStatus === "Confirmed" ? "✅" : newStatus === "Rejected" ? "❌" : "⏳";

    notificationService.sendSms(
      booking.userPhone || booking.phone || "+255 712 345 678",
      `SmartTour: Booking #${id} for ${booking.tourTitle} has been updated to ${newStatus}. ${statusEmoji}`
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader title="Customer Bookings" subtitle="Monitor and manage all tour bookings" />

      <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>All Bookings</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className={`px-4 py-2.5 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition shadow-sm text-sm font-medium ${
                isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-white"
              }`}
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>ID</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Customer</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tour</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Travelers</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Amount</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Status</th>
                <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b transition-colors ${isDark ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-50 hover:bg-gray-50"}`}
                >
                  <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>#{booking.id}</td>
                  <td className="py-4">
                    <div>
                      <p className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}>{booking.userName}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{booking.userEmail}</p>
                      <p className={`text-[11px] mt-0.5 ${isDark ? "text-gray-500" : "text-gray-400"}`}>
                        {booking.paymentMethod || "MPESA"} • {booking.paymentStatus || "Paid"}
                      </p>
                      {booking.transactionId && (
                        <p className={`text-[11px] font-mono ${isDark ? "text-gray-500" : "text-gray-400"}`}>{booking.transactionId}</p>
                      )}
                    </div>
                  </td>
                  <td className={`py-4 text-sm max-w-[200px] truncate ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.tourTitle}</td>
                  <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.date}</td>
                  <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.travelers}</td>
                  <td className={`py-4 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{formatTZS(booking.amount)}</td>
                  <td className="py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, "Confirmed", booking)}
                            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking.id, "Rejected", booking)}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status !== "Pending" && (
                        <span className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>No actions</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No bookings found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default AdminBookings;
