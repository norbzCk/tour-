import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";

function Booking() {
  const { id } = useParams();
  const tourId = parseInt(id);
  const { tours, addBooking, formatTZS, USD_TO_TZS } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [travelers, setTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [success, setSuccess] = useState(false);

  const tour = tours.find((t) => t.id === tourId);
  const tzsAmount = tour ? tour.price * travelers : 0;
  const usdAmount = tour ? Math.round(tzsAmount / USD_TO_TZS) : 0;

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The requested tour could not be found.</p>
          <Link to="/tours" className="text-green-600 font-semibold hover:underline">
            ← Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user) return;

    addBooking({
      userId: user.email.includes("admin") ? 1 : 2,
      userName: user.name,
      userEmail: user.email,
      tourId: tour.id,
      tourTitle: tour.title,
      date: new Date().toISOString().slice(0, 10),
      amount: tzsAmount,
      amountUSD: usdAmount,
      travelers,
      specialRequests,
    });

    setSuccess(true);
    setTimeout(() => navigate("/my-bookings"), 2000);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Booking Request Sent!</h2>
          <p className="text-gray-600 mb-2">Your reservation for {tour.title} has been placed.</p>
          <p className="text-sm text-gray-500">Status: <span className="font-semibold text-amber-600">Pending</span> (awaiting confirmation)</p>
          <p className="text-xs text-gray-400 mt-4">Redirecting to your bookings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link to={`/tour/${tour.id}`} className="inline-flex items-center gap-2 text-green-600 font-semibold mb-8 hover:gap-3 transition-all">
          ← Back to tour details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
            <h1 className="text-2xl font-extrabold mb-1">Confirm Booking</h1>
            <p className="text-green-100">Complete your reservation for {tour.title}</p>
          </div>

          <div className="p-8">
            <div className="bg-gray-50 rounded-xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Duration: {tour.duration} • {tour.destination}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="text-3xl font-extrabold text-green-700">{formatTZS(tzsAmount)}</p>
                <p className="text-xs text-gray-400">≈ ${usdAmount} USD</p>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={user?.name || ""}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user?.email || ""}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+255 712 345 678"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={travelers}
                    onChange={(e) => setTravelers(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-200 transition transform hover:-translate-y-0.5"
              >
                Confirm Booking — {formatTZS(tzsAmount)}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Booking;
