import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

function TourDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { tours, formatTZS } = useData();
  const tour = tours.find((t) => t.id === Number(id));

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
          <p className="text-gray-600 mb-6">The tour you're looking for doesn't exist.</p>
          <Link to="/tours" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition">
            Browse All Tours
          </Link>
        </motion.div>
      </div>
    );
  }

  const features = [
    "Professional guide",
    "Accommodation",
    "Meals included",
    "Transport",
    "Entrance fees",
    "Travel insurance",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-lg rounded-full text-sm font-bold mb-4 border border-white/30">
              {tour.destination}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-lg">
              {tour.title}
            </h1>
            <div className="flex items-center gap-6 text-green-200">
              <span className="flex items-center gap-1.5">⏱ {tour.duration}</span>
              <span className="flex items-center gap-1.5">★ {tour.rating}</span>
              {tour.rating && (
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className={`h-4 w-4 ${i < Math.floor(tour.rating) ? "text-yellow-400" : "text-gray-400"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.56-.921 1.86 0l1.07 3.292a1 1 0 00.97.69h3.193c.97 0 1.371 1.24.588 1.81v.015c-.243.117-.513.78-.028 1.211l1.293 1.293c.329.329.123 1.414-.588 1.414H9.05c-.97 0-1.371-1.24-.588-1.81v-.015c.243-.117.513-.78.028-1.211L6.757 8.743c-.329-.329-.123-1.414.588-1.414h3.193c.3 0 .57-.269.646-.59l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {tour.description}
              </p>
              <p className="text-gray-600">
                Experience the beauty and culture of Tanzania with our expertly crafted tour package. From stunning landscapes to rich heritage, this journey promises unforgettable memories.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {features.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-700"
                  >
                    <span className="text-green-600 bg-green-100 rounded-full p-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Tour Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Scenic Views", "Cultural Experience", "Photography"].map((tag) => (
                  <span key={tag} className="px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 h-fit sticky top-8">
              <div className="text-center pb-6 border-b border-gray-100">
                <span className="text-sm text-gray-500 uppercase tracking-wider">Price per person</span>
                <div className="text-4xl font-extrabold text-gray-900 mt-1">{formatTZS(tour.price)}</div>
                {tour.priceUSD && (
                  <div className="text-xs text-gray-400 mt-1">≈ ${tour.priceUSD} USD</div>
                )}
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Duration</span>
                  <span className="font-semibold text-gray-900">{tour.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Rating</span>
                  <span className="font-semibold text-gray-900">★ {tour.rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Group Size</span>
                  <span className="font-semibold text-gray-900">Up to 12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="font-semibold text-gray-900 capitalize">{tour.category}</span>
                </div>
              </div>

              <Link
                to={user ? `/booking/${tour.id}` : "/login"}
                state={user ? undefined : { from: `/booking/${tour.id}` }}
                className={`block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-200 transition transform hover:-translate-y-0.5 ${!user ? "pulse-animation" : ""}`}
              >
                {user ? "Book Now" : "Login to Book"}
              </Link>

              <AnimatePresence>
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-100"
                  >
                    <p className="text-xs text-amber-700 text-center">
                      Please sign in to book this tour and access your reservations
                    </p>
                    <Link
                      to="/register"
                      className="block text-center text-xs text-green-600 font-semibold mt-2 hover:underline"
                    >
                      Don't have an account? Create one
                    </Link>
                  </motion.div>
                )}

                {user && (
                  <p className="text-xs text-gray-400 text-center mt-3">
                    Free cancellation up to 48 hours before departure
                  </p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TourDetails;