import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import MpesaSimulator from "../components/MpesaSimulator";

function Booking() {
  const { id } = useParams();
  const tourId = parseInt(id);
  const { tours, addBooking, formatTZS, USD_TO_TZS } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [travelers, setTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [success, setSuccess] = useState(false);
  const [paymentSession, setPaymentSession] = useState(null);

  useEffect(() => {
    if (!user) {
      const from = location?.state?.from || `/booking/${id}`;
      navigate("/login", { state: { from } });
    }
  }, [user, navigate, location?.state, id]);

  const tour = tours.find((t) => t.id === tourId);
  const tzsAmount = tour ? tour.price * travelers : 0;
  const usdAmount = tour ? Math.round(tzsAmount / USD_TO_TZS) : 0;

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.466 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tour Not Found</h1>
          <p className="text-gray-600 mb-6">The requested tour could not be found.</p>
          <Link to="/tours" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition">
            Browse All Tours
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleBookingComplete = (paymentData) => {
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
      paymentStatus: paymentData.paymentStatus,
      paymentMethod: paymentData.paymentMethod || "MPESA",
      transactionId: paymentData.transactionId,
      phone: paymentData.phone,
      status: "Pending",
    });
    setPaymentSession(paymentData);
    setSuccess(true);
    addToast(`Booking confirmed! Transaction: ${paymentData.transactionId}`, "success");
    setTimeout(() => {
      addToast("Redirecting to your bookings...", "info", 2000);
      navigate("/my-bookings");
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md border border-green-100"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Payment Confirmed!</h2>
          <p className="text-gray-600 mb-4">Your M-Pesa payment for {tour.title} is complete.</p>
          <div className="bg-gray-50 rounded-xl p-4 mb-4">
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Transaction ID</span>
              <span className="font-semibold text-green-700">{paymentSession?.transactionId}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Phone</span>
              <span className="font-semibold text-green-700">{paymentSession?.phone}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500">Amount</span>
              <span className="font-semibold text-green-700">{formatTZS(tzsAmount)}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400">Redirecting to your bookings...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-6">
        <Link to={`/tour/${tour.id}`} className="inline-flex items-center gap-2 text-green-600 font-semibold mb-8 hover:gap-3 transition-all">
          ← Back to tour details
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
        >
          <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="M0,0 L100,0 L100,100 Q50,80 0,100 Z" fill="white" />
              </svg>
            </div>
            <div className="relative">
              <h1 className="text-2xl font-extrabold mb-1">Confirm Booking</h1>
              <p className="text-green-100">Complete your reservation for {tour.title}</p>
            </div>
          </div>

          <div className="p-8">
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border border-green-100">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                <p className="text-sm text-gray-500 mt-1">⏱ {tour.duration} • 📍 {tour.destination}</p>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider">Total Price</p>
                <p className="text-3xl font-extrabold text-green-700">{formatTZS(tzsAmount)}</p>
                <p className="text-xs text-gray-400">≈ ${usdAmount} USD</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={user?.name || ""}
                    placeholder="John Doe"
                    readOnly
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    placeholder="you@example.com"
                    readOnly
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-100 text-gray-700 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      max="20"
                      value={travelers}
                      onChange={(e) => setTravelers(Number(e.target.value))}
                      required
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                  <input
                    type="text"
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="Any special requirements..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="rounded-3xl border-2 border-dashed border-gray-200 p-6 bg-gray-50/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                    <span className="text-white text-lg">💳</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Step 1: Authorize MPESA Payment</p>
                    <p className="text-xs text-gray-500">Secure M-Pesa STK Push payment simulation</p>
                  </div>
                </div>
                <MpesaSimulator
                  amountLabel={`${formatTZS(tzsAmount)} (${usdAmount} USD)`}
                  initialPhone={user?.phone || ""}
                  onSuccess={handleBookingComplete}
                  onCancel={() => navigate("/tours")}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Booking;