import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import heroImage from "../assets/hero.png";
import baladiniBeach from "../assets/Baladini Zanzibar beach vacation.jpeg";
import queenHotel from "../assets/Queen hotel in Zanzibar.jpeg";
import makunduchi from "../assets/MAKUNDUCHI-ZANZIBAR.jpeg";
import nungwiBeach from "../assets/NUNGWI BEACH - ZANZIBAR.jpeg";

function Home() {
  const { formatTZS } = useData();
  const featuredTours = [
    {
      id: 1,
      title: "Zanzibar Beach Escape",
      image: baladiniBeach,
      destination: "Zanzibar",
      price: Math.round(499 * 2500),
      priceUSD: 499,
      rating: 4.6,
    },
    {
      id: 2,
      title: "Queen Hotel Zanzibar",
      image: queenHotel,
      destination: "Zanzibar",
      price: Math.round(599 * 2500),
      priceUSD: 599,
      rating: 4.8,
    },
    {
      id: 3,
      title: "Makunduchi Beach Stay",
      image: makunduchi,
      destination: "Zanzibar",
      price: Math.round(399 * 2500),
      priceUSD: 399,
      rating: 4.5,
    },
  ];

  const popularDestinations = [
    {
      name: "Zanzibar",
      desc: "Beaches & Resorts",
      image: baladiniBeach,
    },
    {
      name: "Serengeti",
      desc: "Wildlife Safari",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    },
    {
      name: "Kilimanjaro",
      desc: "Mountain Adventure",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    {
      name: "Dar es Salaam",
      desc: "City Experience",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    },
  ];

  const [current, setCurrent] = useState(0);
  const slides = [
    { src: queenHotel, alt: "Queen Hotel Zanzibar" },
    { src: baladiniBeach, alt: "Baladini Beach Zanzibar" },
    { src: nungwiBeach, alt: "Nungwi Beach Zanzibar" },
    { src: makunduchi, alt: "Makunduchi Zanzibar" },
    { src: heroImage, alt: "Tanzania Adventure" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[520px] max-h-[680px] flex items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeIn" }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-green-300 text-sm font-bold mb-6 tracking-wide">
              Tanzania's #1 Tour Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-[1.15] drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
              Explore Tanzania <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                With SmartTour
              </span>
            </h1>

            <p className="text-base md:text-lg text-white mb-8 leading-relaxed max-w-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Discover pristine beaches, iconic safaris, majestic mountains, and unforgettable adventures.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/tours"
                className="bg-white text-green-700 px-7 py-3 rounded-xl font-bold hover:bg-green-50 transition-all shadow-lg backdrop-blur-sm"
              >
                Browse Tours
              </Link>

              <Link
                to="/register"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-7 py-3 rounded-xl font-bold hover:bg-white/20 transition-all"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Tours */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Featured Experiences
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Handpicked tours that offer the best of Tanzania's natural beauty and cultural heritage.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredTours.map((tour, index) => (
            <motion.div
              key={tour.id}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="bg-white rounded-2xl shadow-lg overflow-hidden card-hover"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-green-700">
                  {formatTZS(tour.price)}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                    {tour.destination}
                  </span>
                  <span className="text-xs text-gray-500 flex items-center gap-1">
                    ★ {tour.rating}
                  </span>
                </div>

                <h3 className="font-bold text-xl text-gray-900 mb-3">
                  {tour.title}
                </h3>

                <Link
                  to={`/tour/${tour.id}`}
                  className="inline-flex items-center gap-2 text-green-600 font-semibold hover:gap-3 transition-all"
                >
                  View Tour <span>→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-gray-600">
              From pristine beaches to breathtaking savannas
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {popularDestinations.map((dest, index) => (
              <motion.div
                key={dest.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-80 rounded-2xl overflow-hidden cursor-pointer"
              >
                <img
                  src={dest.image}
                  alt={dest.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 text-white">
                  <h3 className="font-bold text-2xl mb-1">{dest.name}</h3>
                  <p className="text-white/80 text-sm">{dest.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose SmartTour?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We make travel planning effortless and unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Easy Booking",
              desc: "Book tours online within minutes with our streamlined process.",
            },
            {
              icon: "🤝",
              title: "Trusted Operators",
              desc: "Verified tour providers and experienced local guides.",
            },
            {
              icon: "🔒",
              title: "Secure Payments",
              desc: "Safe and reliable transactions with multiple payment options.",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center card-hover"
            >
              <span className="text-5xl mb-4 block">{feature.icon}</span>
              <h3 className="font-bold text-xl text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-green-50 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Travelers Say
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                text: "Amazing safari experience. Everything was well organized from pickup to the final day.",
                name: "Sarah M.",
                role: " adventurer",
              },
              {
                text: "The Zanzibar trip was unforgettable. The beachfront hotel was a dream come true.",
                name: "James K.",
                role: "traveler",
              },
              {
                text: "Professional guides and excellent customer support throughout the journey.",
                name: "Grace T.",
                role: "explorer",
              },
            ].map((review, i) => (
              <motion.div
                key={review.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex gap-1 text-yellow-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{review.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                    {review.name[0]}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-xs text-gray-500">{review.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready For Your Next Adventure?
            </h2>
            <p className="text-green-100 mb-10 text-lg">
              Join thousands of travelers exploring Tanzania with SmartTour.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-green-700 px-10 py-4 rounded-xl font-bold hover:bg-green-50 transition shadow-xl"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Pinterest Embeds */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Travel Inspiration
            </h2>
            <p className="text-gray-600">
              Explore stunning visuals from our travel community
            </p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="pinterest-embed"
            >
              <iframe
                src="https://assets.pinterest.com/ext/embed.html?id=622059767326732724"
                height="714"
                width="345"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                title="Travel Inspiration 1"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="pinterest-embed"
            >
              <iframe
                src="https://assets.pinterest.com/ext/embed.html?id=1000925085921112071"
                height="714"
                width="345"
                frameBorder="0"
                scrolling="no"
                loading="lazy"
                title="Travel Inspiration 2"
              />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
