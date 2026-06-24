import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";

function AdminBookings() {
  const { bookings, updateBookingStatus, formatTZS } = useData();
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

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader title="Customer Bookings" subtitle="Monitor and manage all tour bookings" />

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-lg font-bold text-gray-800">All Bookings</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search bookings..." />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-white shadow-sm text-sm font-medium"
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
              <tr className="border-b border-gray-100">
                <th className="pb-3 text-sm font-semibold text-gray-500">ID</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Customer</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Tour</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Date</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Travelers</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Amount</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Status</th>
                <th className="pb-3 text-sm font-semibold text-gray-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((booking, i) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 text-sm text-gray-600">#{booking.id}</td>
                  <td className="py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{booking.userName}</p>
                      <p className="text-xs text-gray-500">{booking.userEmail}</p>
                    </div>
                  </td>
                  <td className="py-4 text-sm text-gray-600 max-w-[200px] truncate">{booking.tourTitle}</td>
                  <td className="py-4 text-sm text-gray-600">{booking.date}</td>
                  <td className="py-4 text-sm text-gray-600">{booking.travelers}</td>
                  <td className="py-4 text-sm font-semibold text-gray-900">{formatTZS(booking.amount)}</td>
                  <td className="py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      {booking.status === "Pending" && (
                        <>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                            className="px-3 py-1.5 rounded-lg bg-green-600 text-white text-xs font-bold hover:bg-green-700 transition"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "Rejected")}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                          >
                            Reject
                          </button>
                        </>
                      )}
                      {booking.status !== "Pending" && (
                        <span className="text-xs text-gray-400">No actions</span>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-gray-500 py-8">No bookings found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default AdminBookings;
