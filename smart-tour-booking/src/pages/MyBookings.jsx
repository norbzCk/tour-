import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useToast } from "../hooks/useToast";
import StatusBadge from "../components/admin/StatusBadge";

function MyBookings() {
  const { user } = useAuth();
  const { bookings, tours, formatTZS, cancelBooking } = useData();
  const { addToast } = useToast();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const myBookings = bookings.filter((booking) => {
    const currentEmail = user?.email?.toLowerCase();
    const bookingEmail = booking.userEmail?.toLowerCase();
    const bookingName = booking.userName?.toLowerCase();
    const userName = user?.name?.toLowerCase();

    return bookingEmail === currentEmail || bookingName === userName;
  });

  const filtered = myBookings.filter((b) => {
    const matchesSearch = b.tourTitle.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || b.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleCancelBooking = (bookingId) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      cancelBooking(bookingId);
      addToast("Booking cancelled successfully", "success");
    }
  };

  const filterOptions = ["All", "Pending", "Confirmed", "Completed", "Cancelled"];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">My Bookings</h1>
              <p className="text-gray-600 dark:text-slate-400">View and manage your tour reservations</p>
            </div>
            <Link
              to="/tours"
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-lg transition flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Browse Tours
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search your bookings..."
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-white dark:bg-slate-800 dark:text-white shadow-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {filterOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setFilter(option)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    filter === option
                      ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white"
                      : "bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-350 hover:bg-gray-200 dark:hover:bg-slate-700"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800"
            >
              <div className="w-24 h-24 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400 dark:text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-6 8h8m-5 5H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-7z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-slate-400 text-lg mb-4">No bookings found.</p>
              <Link
                to="/tours"
                className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition"
              >
                Start exploring tours
              </Link>
            </motion.div>
          ) : (
            <div className="grid gap-4">
              <AnimatePresence>
                {filtered.map((booking, i) => {
                  const tour = tours.find((t) => t.id === booking.tourId);
                  return (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800/80 p-6 flex flex-col md:flex-row gap-6 group hover:shadow-xl dark:hover:shadow-slate-950/35 transition-all"
                    >
                      {tour && (
                        <div className="md:w-48 h-32 md:h-auto rounded-2xl overflow-hidden flex-shrink-0 relative">
                          <img src={tour.image} alt={tour.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        </div>
                      )}
                      <div className="flex-1 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">{booking.tourTitle}</h3>
                          <StatusBadge status={booking.status} />
                        </div>

                        <div className="flex flex-wrap items-center gap-4 text-sm">
                          <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full text-gray-700 dark:text-slate-300">
                            📅 {booking.date}
                          </span>
                          <span className="flex items-center gap-1.5 bg-gray-50 dark:bg-slate-700/50 px-3 py-1.5 rounded-full text-gray-700 dark:text-slate-300">
                            👥 {booking.travelers} traveler{booking.travelers !== 1 ? "s" : ""}
                          </span>
                          <span className="font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-3 py-1.5 rounded-full">
                            {formatTZS(booking.amount)}
                          </span>
                        </div>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-slate-400 pt-2">
                          <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-700/40 px-2.5 py-1 rounded-full">
                            💳 {booking.paymentMethod || "MPESA"}
                          </span>
                          <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-700/40 px-2.5 py-1 rounded-full">
                            ✅ {booking.paymentStatus || "Paid"}
                          </span>
                          {booking.transactionId && (
                            <span className="flex items-center gap-1 bg-gray-50 dark:bg-slate-700/40 px-2.5 py-1 rounded-full font-mono">
                              🧾 {booking.transactionId}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700/50">
                          <p className="text-xs text-gray-405 dark:text-slate-450">
                            Booking #{booking.id} • Created {booking.createdAt || "recently"}
                          </p>
                          {booking.status === "Pending" && (
                            <button
                              onClick={() => handleCancelBooking(booking.id)}
                              className="px-4 py-1.5 text-xs font-semibold text-red-600 bg-red-50 dark:bg-red-950/30 dark:text-red-400 rounded-full hover:bg-red-100 dark:hover:bg-red-950/50 transition"
                            >
                              Cancel Booking
                            </button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MyBookings;