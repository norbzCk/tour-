import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Tourcard({ tour, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover group"
    >
      <div className="relative overflow-hidden h-56">
        {tour.video ? (
          <iframe
            src={tour.video}
            className="w-full h-full border-0"
            allowFullScreen
            scrolling="no"
            title={tour.title}
          />
        ) : (
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-green-600 bg-green-50 px-2.5 py-1 rounded-full uppercase tracking-wide">
            {tour.category}
          </span>
          <span className="text-sm text-gray-500">★ {tour.rating}</span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
          {tour.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {tour.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex flex-col">
            <span className="text-xs text-gray-500">From</span>
            <span className="text-xl font-extrabold text-green-600">${tour.price}</span>
          </div>
          <Link
            to={`/tour/${tour.id}`}
            className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-sm font-bold hover:bg-green-700 transition shadow-md shadow-green-200"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Tourcard;
