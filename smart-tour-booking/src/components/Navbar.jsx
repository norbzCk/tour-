import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

function Navbar() {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-lg border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
            <span className="text-white font-extrabold text-lg">S</span>
          </div>
          <span className="text-xl font-extrabold text-gray-900">SmartTour</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/tours"
            className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
          >
            Tours
          </Link>

          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            >
              Admin
            </Link>
          )}

          {!user ? (
            <>
              <Link
                to="/login"
                className="text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-green-200 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-gray-700">
                Hi, {user.name}
              </span>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={logout}
                className="text-sm text-gray-500 hover:text-red-600 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
