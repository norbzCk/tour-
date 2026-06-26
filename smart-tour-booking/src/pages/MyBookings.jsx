import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import StatusBadge from "../components/admin/StatusBadge";

function MyBookings() {
  const { user } = useAuth();
  const { bookings, tours, formatTZS } = useData();
  const [search, setSearch] = useState("");

  const myBookings = bookings.filter((b) => b.userEmail === user?.email);
  const filtered = myBookings.filter((b) =>
    b.tourTitle.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">My Bookings</h1>
              <p className="text-gray-600">View and manage your tour reservations</p>
            </div>
            <Link
              to="/tours"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition text-sm"
            >
              Browse Tours
            </Link>
          </div>

          <div className="relative">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search your bookings..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-white shadow-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
              <p className="text-gray-500 text-lg mb-4">No bookings found.</p>
              <Link to="/tours" className="text-green-600 font-semibold hover:underline">
                Start exploring tours →
              </Link>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map((booking, i) => {
                const tour = tours.find((t) => t.id === booking.tourId);
                return (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col md:flex-row gap-6"
                  >
                    {tour && (
                      <div className="md:w-48 h-32 md:h-auto rounded-xl overflow-hidden flex-shrink-0">
                        <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h3 className="text-xl font-bold text-gray-900">{booking.tourTitle}</h3>
                        <StatusBadge status={booking.status} />
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <span>📅 {booking.date}</span>
                        <span>👥 {booking.travelers} traveler(s)</span>
                        <span className="font-semibold text-green-700">{formatTZS(booking.amount)}</span>
                        {booking.amountUSD && <span className="text-gray-400">≈ ${booking.amountUSD} USD</span>}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                        <span>Payment: {booking.paymentMethod || "MPESA"}</span>
                        <span>Status: {booking.paymentStatus || "Paid"}</span>
                        {booking.transactionId && <span>Tx: {booking.transactionId}</span>}
                      </div>
                      <p className="text-xs text-gray-400">Booking #{booking.id} • Created {booking.createdAt}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default MyBookings;
