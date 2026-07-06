import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useToast } from "../hooks/useToast";
import { useTheme } from "../context/ThemeContext";

function Footer() {
  const { addToast } = useToast();
  const { isDark } = useTheme();
  const [email, setEmail] = useState("");

  const isValidEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubscribe = () => {
    if (!email) {
      addToast("Please enter your email address.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      addToast("Please enter a valid email address.", "error");
      return;
    }

    const subscribers = JSON.parse(localStorage.getItem("subscribers") || "[]");
    if (subscribers.includes(email.toLowerCase())) {
      addToast("This email is already subscribed.", "info");
      return;
    }

    localStorage.setItem("subscribers", JSON.stringify([...subscribers, email.toLowerCase()]));
    setEmail("");
    addToast("Subscribed successfully! You will receive travel updates.", "success");
  };

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
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-xl">S</span>
            </div>
            <span className={`text-2xl font-extrabold ${isDark ? "text-white" : "text-gray-900"}`}>SmartTour</span>
          </Link>
          <p className={`text-sm leading-relaxed mb-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
            Tanzania's premier tour booking platform. Discover breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime.
          </p>
          <div className="flex gap-3">
            {["🌐", "📱", "📧"].map((icon, i) => (
              <div key={i} className={`w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer transition ${
                isDark ? "bg-slate-800 hover:bg-green-600 text-gray-300" : "bg-white hover:bg-green-600 text-gray-600 shadow-sm"
              }`}>
                {icon}
              </div>
            ))}
          </div>
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
              onClick={handleSubscribe}
              className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-sm text-white hover:shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-0.5"
            >
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <div className={`border-t ${isDark ? "border-slate-800" : "border-gray-200"}`}>
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`text-sm ${isDark ? "text-gray-500" : "text-gray-400"}`}>
            © 2026 SmartTour. All rights reserved. • Made with ❤️ in Tanzania
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
