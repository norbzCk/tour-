import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-lg">S</span>
            </div>
            <span className="text-xl font-extrabold">SmartTour</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">
            Tanzania's premier tour booking platform. Discover, book, and experience the best of Tanzania.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Company</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-green-400 transition-colors">About Us</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Careers</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Blog</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Press</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Support</h4>
          <ul className="space-y-3 text-sm text-gray-400">
            <li><Link to="/" className="hover:text-green-400 transition-colors">Help Center</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Terms of Service</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/" className="hover:text-green-400 transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-4">Get in Touch</h4>
          <p className="text-sm text-gray-400 mb-4">
            Subscribe to our newsletter for travel deals and updates.
          </p>
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button className="px-4 py-2.5 bg-green-600 rounded-lg font-semibold text-sm hover:bg-green-500 transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 SmartTour. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <Link to="/" className="hover:text-green-400 transition-colors">Privacy</Link>
            <Link to="/" className="hover:text-green-400 transition-colors">Terms</Link>
            <Link to="/" className="hover:text-green-400 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
