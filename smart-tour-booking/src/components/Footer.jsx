import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";

function Footer() {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = (event) => {
    event.preventDefault();

    if (!email.trim()) {
      addToast("Please enter your email address.", "error");
      return;
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!isValidEmail(normalizedEmail)) {
      addToast("Please enter a valid email address.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
      if (subscribers.includes(normalizedEmail)) {
        setIsSubmitting(false);
        addToast("This email is already subscribed.", "info");
        return;
      }

      window.setTimeout(() => {
        localStorage.setItem("subscribers", JSON.stringify([...subscribers, normalizedEmail]));
        setEmail("");
        setIsSubmitting(false);
        addToast("Subscribed successfully! You will receive travel updates.", "success");
      }, 600);
    } catch {
      setIsSubmitting(false);
      addToast("We could not save your subscription right now. Please try again.", "error");
    }
  };

  const socialLinks = [
    { href: "https://www.facebook.com/", icon: <FaFacebookF />, label: "Facebook" },
    { href: "https://x.com/", icon: <FaXTwitter />, label: "X" },
    { href: "https://wa.me/255712345678", icon: <FaWhatsapp />, label: "WhatsApp" },
    { href: "https://www.instagram.com/", icon: <FaInstagram />, label: "Instagram" },
  ];

  return (
    <footer className={`relative transition-colors duration-300 ${isDark ? "bg-slate-950 text-gray-300" : "bg-gray-50 text-gray-600"}`}>
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="md:col-span-1"
        >
          <Link to="/" className="flex items-center gap-3 mb-6">
            <img src="/Logo.png" alt="SmartTour" className="w-12 h-12 object-contain rounded-2xl shadow-lg" />
            <span className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>SmartTour</span>
          </Link>
          <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Tanzania's premier tour booking platform. Discover breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime.
          </p>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className={`group flex h-11 w-11 items-center justify-center rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  isDark
                    ? "border-slate-700 bg-slate-900 text-gray-300 hover:border-green-500 hover:bg-green-600 hover:text-white"
                    : "border-gray-200 bg-white text-gray-700 hover:border-green-500 hover:bg-green-600 hover:text-white shadow-sm"
                }`}
              >
                <span className="text-lg transition-transform group-hover:scale-110">{item.icon}</span>
              </a>
            ))}
          </div>
          <p className={`mt-4 text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            Follow the journey. Travel stories, inspiration, and updates in one place.
          </p>
        </motion.div>

        {/* Explore */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className={`font-bold mb-5 text-lg ${isDark ? "text-white" : "text-gray-900"}`}>Explore</h4>
          <ul className="space-y-3">
            {[
              { to: "/tours", label: "Browse Tours" },
              { to: "/destinations", label: "Destinations" },
              { to: "/travel-tips", label: "Travel Tips" },
              { to: "/planner", label: "Trip Planner" },
              { to: "/about", label: "About Us" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={`text-sm hover:text-green-500 transition-colors inline-block ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className={`font-bold mb-5 text-lg ${isDark ? "text-white" : "text-gray-900"}`}>Support</h4>
          <ul className="space-y-3">
            {[
              { to: "/about", label: "Help Center" },
              { to: "/about", label: "Contact Us" },
              { to: "/travel-tips", label: "Safety Tips" },
              { to: "/privacy", label: "Privacy Policy" },
              { to: "/terms", label: "Terms of Service" },
            ].map((item) => (
              <li key={item.label}>
                <Link to={item.to} className={`text-sm hover:text-green-500 transition-colors inline-block ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Newsletter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className={`font-bold mb-5 text-lg ${isDark ? "text-white" : "text-gray-900"}`}>Stay Updated</h4>
          <p className={`text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Subscribe for exclusive travel deals, destination guides, and insider tips.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-2">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className={`flex-1 px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
                  isDark ? "bg-slate-800 border border-slate-700 text-white placeholder-gray-500" : "bg-white border border-gray-200 text-gray-900 placeholder-gray-400"
                }`}
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-sm text-white hover:shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Joining..." : "Subscribe"}
              </button>
            </div>
            <p className={`text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>
              No backend required — your email is saved locally in this prototype.
            </p>
          </form>
        </motion.div>
      </div>

      <div className={`border-t ${isDark ? "border-slate-800" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            © 2026 SmartTour. All rights reserved. Book • Explore • Enjoy 
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/privacy" className={`hover:text-green-500 transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}>Privacy</Link>
            <Link to="/terms" className={`hover:text-green-500 transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}>Terms</Link>
            <Link to="/" className={`hover:text-green-500 transition-colors ${isDark ? "text-gray-500" : "text-gray-400"}`}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
