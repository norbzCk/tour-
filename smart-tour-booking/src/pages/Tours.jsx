import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";

function Tours() {
  const { tours, formatTZS } = useData();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.destination.toLowerCase().includes(search.toLowerCase()) ||
      tour.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || tour.category === category;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", ...new Set(tours.map((t) => t.category))];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 transition-colors duration-300">
      <div className="relative bg-gradient-to-br from-green-600 to-emerald-700 text-white py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Q50,85 0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg"
          >
            Explore Our Tours
          </motion.h1>
          <p className="text-green-100 text-lg max-w-2xl mx-auto">
            Discover handpicked experiences across Tanzania's most breathtaking destinations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search destinations, tours, or keywords..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-white dark:bg-slate-800 dark:text-white shadow-md"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="relative">
            <select
               className="appearance-none px-5 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-800 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-white dark:bg-slate-800 dark:text-white shadow-md pr-12 min-w-0 w-full sm:w-auto"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat} value={cat} className="dark:bg-slate-800 dark:text-white">{cat}</option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredTours.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800"
            >
              <div className="w-20 h-20 bg-gray-100 dark:bg-slate-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400 dark:text-slate-350" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-500 dark:text-slate-400 text-lg mb-4">No tours found matching your criteria.</p>
              <button
                onClick={() => { setSearch(""); setCategory("All"); }}
                className="text-green-600 dark:text-green-450 font-semibold hover:underline"
              >
                Clear filters and try again
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredTours.map((tour, index) => (
                <motion.div
                  key={tour.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-all duration-300"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-green-700 dark:text-green-450">
                      {tour.category}
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold text-green-700 dark:text-green-450">
                      {formatTZS(tour.price)}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs text-gray-500 dark:text-slate-400 flex items-center gap-1 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">
                        📍 {tour.destination}
                      </span>
                      <span className="text-xs text-gray-400">•</span>
                      <span className="text-xs text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-700/50 px-2.5 py-1 rounded-full">⏱ {tour.duration}</span>
                    </div>

                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                      {tour.title}
                    </h2>

                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-4 w-4 ${i < Math.floor(tour.rating) ? "text-yellow-400" : "text-gray-300 dark:text-slate-600"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.56-.921 1.86 0l1.07 3.292a1 1 0 00.97.69h3.193c.97 0 1.371 1.24.588 1.81v.015c-.243.117-.513.78-.028 1.211l1.293 1.293c.329.329.123 1.414-.588 1.414H9.05c-.97 0-1.371-1.24-.588-1.81v-.015c.243-.117.513-.78.028-1.211L6.757 8.743c-.329-.329-.123-1.414.588-1.414h3.193c.3 0 .57-.269.646-.59l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-slate-400 font-medium">({tour.rating})</span>
                    </div>

                    <p className="text-gray-600 dark:text-slate-300 text-sm mb-5 line-clamp-3 leading-relaxed">
                      {tour.description}
                    </p>

                    <Link
                      to={`/tour/${tour.id}`}
                      className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all group/link"
                    >
                      View Details
                      <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Tours;