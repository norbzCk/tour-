import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/admin/PageHeader";

function Reports() {
  const { tours, bookings, guides, formatTZS } = useData();
  const { isDark } = useTheme();

  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status === "Confirmed" ? b.amount : 0), 0);
  const pendingRevenue = bookings.reduce((sum, b) => sum + (b.status === "Pending" ? b.amount : 0), 0);
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === "Confirmed").length;
  const pendingBookings = bookings.filter((b) => b.status === "Pending").length;
  const rejectedBookings = bookings.filter((b) => b.status === "Rejected").length;

  const categoryBreakdown = tours.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});

  const destinationBreakdown = tours.reduce((acc, t) => {
    acc[t.destination] = (acc[t.destination] || 0) + 1;
    return acc;
  }, {});

  const topTours = [...tours].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Business insights and performance metrics"
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total Revenue</p>
          <p className="text-3xl font-extrabold text-green-700 dark:text-green-400">{formatTZS(totalRevenue)}</p>
          <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>from confirmed bookings</p>
        </div>
        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Pending Revenue</p>
          <p className="text-3xl font-extrabold text-amber-700 dark:text-amber-400">{formatTZS(pendingRevenue)}</p>
          <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>awaiting confirmation</p>
        </div>
        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Total Bookings</p>
          <p className={`text-3xl font-extrabold text-blue-700 dark:text-blue-400`}>{totalBookings}</p>
          <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>{confirmedBookings} confirmed</p>
        </div>
        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <p className={`text-sm mb-1 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Active Guides</p>
          <p className={`text-3xl font-extrabold text-purple-700 dark:text-purple-400`}>{guides.filter((g) => g.status === "Active").length}</p>
          <p className={`text-xs mt-2 ${isDark ? "text-gray-500" : "text-gray-400"}`}>of {guides.length} total</p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className={`rounded-2xl shadow-sm border p-6 md:col-span-1 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Booking Status</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>Confirmed</span>
              <span className={`font-bold text-green-700 dark:text-green-400`}>{confirmedBookings}</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${totalBookings ? (confirmedBookings / totalBookings) * 100 : 0}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>Pending</span>
              <span className={`font-bold text-amber-700 dark:text-amber-400`}>{pendingBookings}</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="bg-amber-600 h-2.5 rounded-full" style={{ width: `${totalBookings ? (pendingBookings / totalBookings) * 100 : 0}%` }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span className={`text-sm ${isDark ? "text-gray-300" : "text-gray-600"}`}>Rejected</span>
              <span className={`font-bold text-red-700 dark:text-red-400`}>{rejectedBookings}</span>
            </div>
            <div className={`w-full rounded-full h-2.5 ${isDark ? "bg-gray-700" : "bg-gray-100"}`}>
              <div className="bg-red-600 h-2.5 rounded-full" style={{ width: `${totalBookings ? (rejectedBookings / totalBookings) * 100 : 0}%` }}></div>
            </div>
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-6 md:col-span-2 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Tours by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(categoryBreakdown).map(([ cat, count ]) => (
              <div key={cat} className={`p-4 rounded-xl border ${isDark ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"}`}>
                <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>{cat}</p>
                <p className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>{count}</p>
                <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>tours</p>
              </div>
            ))}
          </div>
          {Object.keys(categoryBreakdown).length === 0 && (
            <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No data available.</p>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Top Rated Tours</h3>
          <div className="space-y-4">
            {topTours.map((tour) => (
              <div key={tour.id} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                <div className="flex items-center gap-3">
                  <img src={tour.image} alt={tour.title} className="w-10 h-10 rounded-lg object-cover" />
                  <div>
                    <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{tour.title}</p>
                    <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{tour.destination}</p>
                  </div>
                </div>
                 <div className="text-right">
                   <p className={`text-sm font-bold ${isDark ? "text-white" : "text-gray-900"}`}>★ {tour.rating}</p>
                   <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{formatTZS(tour.price)}</p>
                 </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`rounded-2xl shadow-sm border p-6 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
          <h3 className={`text-lg font-bold mb-4 ${isDark ? "text-white" : "text-gray-800"}`}>Popular Destinations</h3>
          <div className="space-y-4">
            {Object.entries(destinationBreakdown).map(([dest, count]) => (
              <div key={dest} className={`flex items-center justify-between p-3 rounded-xl ${isDark ? "bg-gray-700" : "bg-gray-50"}`}>
                <p className={`text-sm font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{dest}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? "bg-green-900/50 text-green-300" : "bg-green-100 text-green-700"
                }`}>{count} tours</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default Reports;
