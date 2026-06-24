import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

function Booking() {
  const { id } = useParams();
  const tourId = parseInt(id);

  const toursData = {
    1: { id: 1, title: "Mountain Adventure", price: 299, duration: "7 Days" },
    2: { id: 2, title: "Beach Paradise", price: 499, duration: "5 Days" },
    3: { id: 3, title: "City Tour", price: 199, duration: "2 Days" },
    4: { id: 4, title: "Safari Expedition", price: 799, duration: "7 Days" },
  };

  const tour = toursData[tourId];

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
            <div className="bg-gray-50 rounded-xl p-6 mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{tour.title}</h2>
                <p className="text-sm text-gray-500 mt-1">Duration: {tour.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="text-3xl font-extrabold text-green-600">${tour.price}</p>
              </div>
            </div>

            <form className="space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
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
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue="1"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                <textarea
                  rows={3}
                  placeholder="Any dietary requirements, accessibility needs, or special occasions..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-green-200 transition transform hover:-translate-y-0.5"
              >
                Confirm Booking
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Booking;
