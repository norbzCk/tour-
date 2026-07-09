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
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (window.location.hash === "#contacts") {
      const el = document.getElementById("contacts");
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, []);

  const featuredTours = [
    {
      id: 1,
      title: "Serengeti Safari Adventure",
      image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      destination: "Serengeti",
      price: Math.round(799 * 2500),
      priceUSD: 799,
      rating: 4.8,
      category: "Safari",
    },
    {
      id: 2,
      title: "Zanzibar Beach Escape",
      image: baladiniBeach,
      destination: "Zanzibar",
      price: Math.round(499 * 2500),
      priceUSD: 499,
      rating: 4.6,
      category: "Beach",
    },
    {
      id: 3,
      title: "Mount Kilimanjaro Trek",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      destination: "Kilimanjaro",
      price: Math.round(1200 * 2500),
      priceUSD: 1200,
      rating: 4.9,
      category: "Adventure",
    },
  ];

  const popularDestinations = [
    { name: "Zanzibar", desc: "Beaches & Resorts", image: baladiniBeach },
    { name: "Serengeti", desc: "Wildlife Safari", image: "https://images.unsplash.com/photo-1516426122078-c23e76319801" },
    { name: "Kilimanjaro", desc: "Mountain Adventure", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" },
    { name: "Dar es Salaam", desc: "City Experience", image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b" },
  ];

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
    <div className="bg-white dark:bg-slate-900 transition-colors duration-300 overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-[75vh] min-h-[550px] max-h-[720px] flex items-center overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={current}
            initial={{ x: "100%", opacity: 1 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-100%", opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
          </motion.div>
        </AnimatePresence>

        <div className="relative max-w-7xl mx-auto px-6 w-full z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-2xl"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 dark:bg-slate-900/30 backdrop-blur-md border border-white/20 dark:border-slate-800 text-green-300 dark:text-green-400 text-sm font-bold mb-6 tracking-wide shadow-lg">
              🌍 Tanzania's Most Trusted Tour Platform
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-2xl">
              Explore Tanzania <br />
              <span className="bg-gradient-to-r from-green-300 to-emerald-400 bg-clip-text text-transparent">
                With SmartTour
              </span>
            </h1>

            <p className="text-base md:text-lg text-white/90 mb-8 leading-relaxed max-w-lg drop-shadow-lg">
              Discover pristine beaches, iconic safaris, majestic mountains, and unforgettable adventures.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                to="/tours"
                className="group bg-white text-green-700 dark:bg-green-600 dark:text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-green-50 dark:hover:bg-green-500 transition-all shadow-xl hover:shadow-green-500/20 flex items-center gap-2"
              >
                Browse Tours
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5-5 5M6 12h12" />
                </svg>
              </Link>

              <Link
                to="/register"
                className="bg-white/10 backdrop-blur-md border border-white/30 text-white px-7 py-3.5 rounded-2xl font-bold hover:bg-white/20 transition-all flex items-center gap-2"
              >
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === current ? "w-10 bg-white" : "w-3 bg-white/40 hover:bg-white/60"
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
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Experiences
          </h2>
          <p className="text-gray-600 dark:text-slate-450 max-w-2xl mx-auto">
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
              className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl hover:shadow-2xl overflow-hidden border border-gray-100 dark:border-slate-800 transition-all duration-300"
            >
              <div className="relative overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="absolute top-4 right-4 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full text-sm font-bold text-green-700 dark:text-green-400 shadow-md">
                  {formatTZS(tour.price)}
                </span>
                <span className="absolute top-4 left-4 bg-green-600/90 dark:bg-green-700/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-white">
                  {tour.category}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30 px-2.5 py-1 rounded-full">
                    📍 {tour.destination}
                  </span>
                  <div className="flex items-center gap-1 text-gray-500 dark:text-slate-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.56-.921 1.86 0l1.07 3.292a1 1 0 00.97.69h3.193c.97 0 1.371 1.24.588 1.81v.015c-.243.117-.513.78-.028 1.211l1.293 1.293c.329.329.123 1.414-.588 1.414H9.05c-.97 0-1.371-1.24-.588-1.81v-.015c.243-.117.513-.78.028-1.211L6.757 8.743c-.329-.329-.123-1.414.588-1.414h3.193c.3 0 .57-.269.646-.59l1.07-3.292z" />
                    </svg>
                    <span className="text-xs font-medium">{tour.rating}</span>
                  </div>
                </div>

                <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-4 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                  {tour.title}
                </h3>

                <Link
                  to={`/tour/${tour.id}`}
                  className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold hover:gap-3 transition-all group/link"
                >
                  View Tour
                  <span className="transition-transform group-hover/link:translate-x-1">→</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Popular Destinations
          </h2>
          <p className="text-gray-600 dark:text-slate-400">From pristine beaches to breathtaking savannas</p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-6">
          {popularDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-gray-100 dark:border-slate-800"
            >
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <h3 className="font-bold text-2xl mb-1">{dest.name}</h3>
                <p className="text-white/85 text-sm">{dest.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Why Choose SmartTour?
          </h2>
          <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
            We make travel planning effortless and unforgettable.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: "🎯",
              title: "Easy Booking",
              desc: "Book tours online within minutes with our streamlined process.",
              color: "from-green-500 to-emerald-600",
            },
            {
              icon: "🤝",
              title: "Trusted Operators",
              desc: "Verified tour providers and experienced local guides.",
              color: "from-blue-500 to-indigo-600",
            },
            {
              icon: "🔒",
              title: "Secure Payments",
              desc: "Safe and reliable transactions with MPesa integration.",
              color: "from-purple-500 to-violet-600",
            },
          ].map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group bg-white dark:bg-slate-800 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-slate-800/80 text-center transition-all duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <h3 className="font-bold text-xl text-gray-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-green-600 via-emerald-700 to-teal-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0,0 L100,0 L100,100 Q50,85 0,100 Z" fill="white" />
          </svg>
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Ready For Your Next Adventure?
            </h2>
            <p className="text-green-100 mb-10 text-lg max-w-2xl mx-auto">
              Join thousands of travelers exploring Tanzania with SmartTour.
            </p>
            <Link
              to="/register"
              className="inline-block bg-white text-green-700 dark:bg-slate-900 dark:text-green-400 px-10 py-4 rounded-2xl font-bold hover:bg-green-50 dark:hover:bg-slate-800 transition shadow-2xl transform hover:-translate-y-1"
            >
              Create Free Account
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-24 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-slate-400 max-w-2xl mx-auto">
              Have questions or need help planning your trip? Reach out to us anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center p-8 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 mb-5 text-2xl">
                📍
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Office</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm">123 Shabaan Robert Street</p>
              <p className="text-gray-600 dark:text-slate-300 text-sm">Dar es Salaam, Tanzania</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-center p-8 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 mb-5 text-2xl">
                📞
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Phone</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm">+255 774 458 938</p>
              <p className="text-gray-600 dark:text-slate-300 text-sm">+255 788 417 749</p>
              <p className="text-gray-600 dark:text-slate-300 text-sm">+255 745 691 504</p>

            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center p-8 rounded-3xl border border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-800 shadow-sm"
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 mb-5 text-2xl">
                ✉️
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Email</h3>
              <p className="text-gray-600 dark:text-slate-300 text-sm">info@smarttour.co.tz</p>
              <p className="text-gray-600 dark:text-slate-300 text-sm">support@smarttour.co.tz</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;