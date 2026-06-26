import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-extrabold text-xl">S</span>
            </div>
            <span className="text-2xl font-extrabold">SmartTour</span>
          </motion.div>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            Tanzania's premier tour booking platform. Discover breathtaking destinations, book unforgettable experiences, and create memories that last a lifetime.
          </p>
          <div className="flex gap-3">
            {["🌐", "📱", "📧"].map((icon, i) => (
              <div key={i} className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-lg hover:bg-green-600 transition cursor-pointer">
                {icon}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <h4 className="font-bold text-white mb-5 text-lg">Company</h4>
          <ul className="space-y-3">
            {["About Us", "Careers", "Blog", "Press", "Partners"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-gray-400 text-sm hover:text-green-400 transition-colors inline-block hover:translate-x-1 transition-transform">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="font-bold text-white mb-5 text-lg">Support</h4>
          <ul className="space-y-3">
            {["Help Center", "Contact Us", "Safety Center", "Terms of Service", "Privacy Policy"].map((item) => (
              <li key={item}>
                <Link to="/" className="text-gray-400 text-sm hover:text-green-400 transition-colors inline-block hover:translate-x-1 transition-transform">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <h4 className="font-bold text-white mb-5 text-lg">Newsletter</h4>
          <p className="text-gray-400 text-sm mb-4">
            Subscribe for exclusive travel deals, destination guides, and insider tips.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
            />
            <button className="px-5 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition transform hover:-translate-y-0.5">
              Subscribe
            </button>
          </div>
        </motion.div>
      </div>

      <div className="border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 SmartTour. All rights reserved. • Made with ❤️ in Tanzania
          </p>
          <div className="flex items-center gap-6 text-sm">
            <Link to="/" className="text-gray-500 hover:text-green-400 transition-colors">Privacy</Link>
            <Link to="/" className="text-gray-500 hover:text-green-400 transition-colors">Terms</Link>
            <Link to="/" className="text-gray-500 hover:text-green-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;