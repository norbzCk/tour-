import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";

function OperatorDashboard() {
  const { user } = useAuth();
  const { tours, bookings, guides, formatTZS } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const currentOperator = guides.find((g) => g.email === user?.email);
  const myTours = tours.filter((t) => t.guideId === currentOperator?.id);
  const myTourIds = myTours.map((t) => t.id);
  const myBookings = bookings.filter((b) => myTourIds.includes(b.tourId));

  const filteredBookings = myBookings.filter((b) => {
    const matchSearch =
      b.userName.toLowerCase().includes(search.toLowerCase()) ||
      b.tourTitle.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "All" || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const statuses = ["All", "Confirmed", "Pending", "Rejected"];

  const totalRevenue = myBookings
    .filter((b) => b.status === "Confirmed")
    .reduce((sum, b) => sum + b.amount, 0);

  const pendingCount = myBookings.filter((b) => b.status === "Pending").length;

  const stats = [
    { icon: "🏨", title: "My Tours", value: myTours.length.toString(), color: "bg-blue-50 text-blue-600 dark:bg-blue-900/50 dark:text-blue-300" },
    { icon: "📅", title: "Total Bookings", value: myBookings.length.toString(), color: "bg-purple-50 text-purple-600 dark:bg-purple-900/50 dark:text-purple-300" },
    { icon: "⏳", title: "Pending", value: pendingCount.toString(), color: "bg-amber-50 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300" },
    { icon: "💰", title: "Revenue", value: `Tsh ${totalRevenue.toLocaleString()}`, color: "bg-green-50 text-green-700 dark:bg-green-900/50 dark:text-green-300" },
  ];

  if (!currentOperator) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className={`text-4xl font-bold mb-4 ${isDark ? "text-white" : "text-gray-900"}`}>Operator Profile Not Found</h1>
          <p className={isDark ? "text-gray-400" : "text-gray-600"}>Your operator account is not linked. Please contact admin.</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title={`Welcome, ${currentOperator.name}`}
        subtitle={`Tour Operator • ${currentOperator.specialty} • ${currentOperator.experience}`}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">{stat.icon}</span>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{stat.title}</p>
              </div>
              <p className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>My Tour Packages</h3>
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

        {myTours.length === 0 ? (
          <div className="text-center py-12">
            <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>No tour packages assigned yet.</p>
            <p className={`text-sm mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Contact an administrator to assign tours to you.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {myTours.map((tour, i) => (
              <motion.div
                key={tour.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`rounded-2xl shadow-sm border overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
              >
                <div className="relative h-40">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                  <span className={`absolute bottom-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                    isDark ? "bg-gray-800/90 text-green-300" : "bg-white/90 text-green-700"
                  }`}>
                    {tour.category}
                  </span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className={`font-bold text-lg truncate ${isDark ? "text-white" : "text-gray-900"}`}>{tour.title}</h3>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>📍 {tour.destination} • ⏱ {tour.duration}</p>
                  <div className="flex items-center justify-between pt-2">
                    <span className={`text-xl font-extrabold text-green-700 dark:text-green-400`}>{formatTZS(tour.price)}</span>
                    <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>★ {tour.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Booking Requests</h3>
        {filteredBookings.length === 0 ? (
          <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No bookings found for your packages.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>ID</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Customer</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Tour Package</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Date</th>
                  <th className={`pb-3 text-sm font-semibold ${isDark ? "text-gray-400" : "text-gray-500"}`}>Travelers</th>
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
                    <td className={`py-4 text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>{booking.travelers}</td>
                    <td className={`py-4 text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{formatTZS(booking.amount)}</td>
                    <td className="py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default OperatorDashboard;
