import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

const tours = {
  1: {
    id: 1,
    title: "Mountain Adventure",
    destination: "Kilimanjaro",
    price: 299,
    duration: "7 Days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description:
      "Experience the beauty of Mount Kilimanjaro with professional guides and breathtaking views.",
  },
  2: {
    id: 2,
    title: "Beach Paradise",
    destination: "Zanzibar",
    price: 499,
    duration: "5 Days",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    description:
      "Relax on white sand beaches and enjoy crystal clear waters in Zanzibar.",
  },
  3: {
    id: 3,
    title: "City Tour",
    destination: "Dar es Salaam",
    price: 199,
    duration: "2 Days",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    description:
      "Discover culture, food and attractions across Tanzania's vibrant city.",
  },
  4: {
    id: 4,
    title: "Safari Expedition",
    destination: "Serengeti",
    price: 799,
    duration: "7 Days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    description:
      "See Africa's wildlife in their natural habitat on an unforgettable safari.",
  },
};

function TourDetails() {
  const { id } = useParams();
  const tour = tours[id];

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-gray-200 mb-4">404</h1>
          <p className="text-gray-600 text-lg">Tour not found.</p>
          <Link to="/tours" className="inline-block mt-6 text-green-600 font-semibold hover:underline">
            ← Back to Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[500px]">
        <img
          src={tour.image}
          alt={tour.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold mb-4">
              {tour.destination}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
              {tour.title}
            </h1>
            <div className="flex items-center gap-4 text-green-200">
              <span>⏱ {tour.duration}</span>
              <span>★ {tour.rating}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-3 gap-8"
        >
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Tour</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-8">
              {tour.description}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
            <div className="grid grid-cols-2 gap-3">
              {["Professional guide", "Accommodation", "Meals included", "Transport", "Entrance fees", "Travel insurance"].map(
                (item) => (
                  <div key={item} className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-600">✓</span>
                    <span className="text-sm">{item}</span>
                  </div>
                )
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-xl border border-gray-100 h-fit sticky top-8">
            <div className="text-center pb-6 border-b border-gray-100">
              <span className="text-sm text-gray-500">Price per person</span>
              <div className="text-4xl font-extrabold text-gray-900 mt-1">
                ${tour.price}
              </div>
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
                <span className="text-gray-500">Group size</span>
                <span className="font-semibold text-gray-900">Up to 12</span>
              </div>
            </div>

            <Link
              to={`/booking/${tour.id}`}
              className="block w-full text-center bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:shadow-lg hover:shadow-green-200 transition"
            >
              Book Now
            </Link>
            <p className="text-xs text-gray-400 text-center mt-3">
              Free cancellation up to 48 hours before
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default TourDetails;
