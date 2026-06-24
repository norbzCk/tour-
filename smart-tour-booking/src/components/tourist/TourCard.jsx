import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

function TourCard({ tour }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition overflow-hidden">
      <img
        src={tour.image}
        alt={tour.title}
        className="h-52 w-full object-cover"
      />

      <div className="p-5 space-y-2">
        <h3 className="text-xl font-bold text-slate-800">{tour.title}</h3>

        <p className="text-slate-500 text-sm">{tour.destination} • {tour.duration}</p>

        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-slate-700 font-medium">{tour.rating}</span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <span className="text-green-600 font-bold text-lg">${tour.price}</span>
          <span className="text-xs px-3 py-1 bg-slate-100 rounded-full">{tour.category}</span>
        </div>

        <Link
          to={`/tour/${tour.id}`}
          className="block text-center mt-4 bg-green-600 text-white py-2 rounded-xl hover:bg-green-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default TourCard;