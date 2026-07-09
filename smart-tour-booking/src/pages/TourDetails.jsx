import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";
import { useState } from "react";

function TourDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const { tours, formatTZS } = useData();
  const tourId = id ? Number(id) : null;

  const tour = tours.find((t) => t.id === tourId);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!id || !tour) {
    const invalidId = id && isNaN(Number(id));
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900 transition-colors">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8 bg-white dark:bg-slate-800 rounded-3xl shadow-lg max-w-md border border-gray-100 dark:border-slate-700"
        >
          <div className="w-20 h-20 bg-red-100 dark:bg-red-950/40 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.466 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {invalidId ? "Invalid Tour ID" : "Tour Not Found"}
          </h1>
          <p className="text-gray-600 dark:text-slate-400 mb-6">
            {invalidId 
              ? `The tour ID "${id}" is not valid. Please check the URL and try again.`
              : "The tour you're looking for doesn't exist or may have been removed."
            }
          </p>
          <Link to="/tours" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold hover:shadow-lg transition">
            Browse All Tours
          </Link>
        </motion.div>
      </div>
    );
  }

  const gallery = tour.gallery || [tour.image];
  const features = [
    "Professional guide",
    "Accommodation included",
    "Meals & Snacks",
    "All ground transport",
    "Park & Entry fees",
    "Full travel insurance",
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Hero Header Area with Interactive Carousel */}
      <div className="relative h-[40vh] min-h-[300px] md:h-[480px] overflow-hidden">
        <motion.img
          key={currentIndex}
          src={gallery[currentIndex] || tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1516426122078-c23e76319801";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

        {/* Carousel Controls */}
        {gallery.length > 1 && (
          <>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 dark:bg-slate-900/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-slate-800/70 transition z-20 border border-white/30 dark:border-slate-700"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 dark:bg-slate-900/50 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/40 dark:hover:bg-slate-800/70 transition z-20 border border-white/30 dark:border-slate-700"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex gap-2 z-20">
              {gallery.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2.5 rounded-full transition-all ${
                    idx === currentIndex
                      ? "w-8 bg-green-500"
                      : "w-2.5 bg-white/60 hover:bg-white/80"
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-white/20 dark:bg-slate-900/50 backdrop-blur-lg rounded-full text-sm font-bold mb-4 border border-white/30 dark:border-slate-700">
              {tour.destination}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-3 drop-shadow-xl text-white">
              {tour.title}
            </h1>
            <div className="flex flex-wrap items-center gap-6 text-green-200 text-sm">
              <span className="flex items-center gap-1.5">⏱ {tour.duration}</span>
              <span className="flex items-center gap-1.5">★ {tour.rating}</span>
              {tour.rating && (
                <div className="flex items-center gap-0.5">
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

      {/* Main content grid */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2 space-y-8">
            {/* Interactive Image Gallery Thumbnails */}
            {gallery.length > 1 && (
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Image Gallery</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {gallery.map((img, idx) => (
                    <motion.button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover" 
                         onError={(e) => {
                           e.target.src = "https://images.unsplash.com/photo-1516426122078-c23e76319801";
                         }}
                       />
                      <div className={`absolute inset-0 transition-all duration-300 ${
                        currentIndex === idx
                          ? "bg-transparent border-green-500 shadow-lg shadow-green-500/30"
                          : "bg-black/20 border-transparent"
                      }`}></div>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">About This Tour</h2>
              <p className="text-gray-700 dark:text-slate-300 text-base md:text-lg leading-relaxed mb-6">
                {tour.description}
              </p>
              <p className="text-gray-500 dark:text-slate-400 text-sm md:text-base leading-relaxed">
                Experience the beauty and culture of Tanzania with our expertly crafted tour package. From stunning landscapes to rich heritage, this journey promises unforgettable memories. Our local guides ensure safety, comfort, and deep local insight.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {features.map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-gray-700 dark:text-slate-300"
                  >
                    <span className="text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-950/40 rounded-full p-0.5 flex-shrink-0">
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
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Tour Highlights</h3>
              <div className="flex flex-wrap gap-2">
                {["Adventure", "Scenic Views", "Cultural Experience", "Photography"].map((tag) => (
                  <span key={tag} className="px-3.5 py-1.5 bg-green-50 dark:bg-green-950/30 text-green-700 dark:text-green-400 rounded-full text-xs font-semibold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Sticky Side Payment card */}
          <div>
            <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-2xl border border-gray-150 dark:border-slate-800 h-fit sticky top-24 transition-colors">
              <div className="text-center pb-6 border-b border-gray-100 dark:border-slate-700">
                <span className="text-sm text-gray-500 dark:text-slate-400 uppercase tracking-wider">Price per person</span>
                <div className="text-4xl font-extrabold text-gray-900 dark:text-white mt-1">{formatTZS(tour.price)}</div>
                {tour.priceUSD && (
                  <div className="text-xs text-gray-400 dark:text-slate-450 mt-1">≈ ${tour.priceUSD} USD</div>
                )}
              </div>

              <div className="py-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Duration</span>
                  <span className="font-semibold text-gray-900 dark:text-slate-100">{tour.duration}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Rating</span>
                  <span className="font-semibold text-gray-900 dark:text-slate-100">★ {tour.rating}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Group Size</span>
                  <span className="font-semibold text-gray-900 dark:text-slate-100">Up to 12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500 dark:text-slate-400">Category</span>
                  <span className="font-semibold text-gray-900 dark:text-slate-100 capitalize">{tour.category}</span>
                </div>
              </div>

              <Link
                to={user ? `/booking/${tour.id}` : "/login"}
                state={user ? undefined : { from: `/booking/${tour.id}` }}
                className={`block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-2xl font-bold hover:shadow-lg transition transform hover:-translate-y-0.5 ${!user ? "pulse-animation" : ""}`}
              >
                {user ? "Book Now" : "Login to Book"}
              </Link>

              <AnimatePresence>
                {!user && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-100 dark:border-amber-900/30"
                  >
                    <p className="text-xs text-amber-700 dark:text-amber-450 text-center">
                      Please sign in to book this tour and access your reservations
                    </p>
                    <Link
                      to="/register"
                      className="block text-center text-xs text-green-600 dark:text-green-450 font-semibold mt-2 hover:underline"
                    >
                      Don't have an account? Create one
                    </Link>
                  </motion.div>
                )}

                {user && (
                  <p className="text-xs text-gray-400 dark:text-slate-450 text-center mt-4">
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