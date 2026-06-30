import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { bookings, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const userNotifications = user
    ? notifications.filter((n) => n.userEmail === user.email)
    : [];

  const unreadCount = userNotifications.filter((n) => !n.isRead).length;

  const myBookingCount = user && user.role === "tourist"
    ? bookings.filter((b) => b.userEmail === user.email).length
    : 0;

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role) => {
    switch (role) {
      case "admin":
        return <span className="text-xs font-bold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2.5 py-1 rounded-full">Admin</span>;
      case "guide":
        return <span className="text-xs font-bold bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-2.5 py-1 rounded-full">Guide</span>;
      case "operator":
        return <span className="text-xs font-bold bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 px-2.5 py-1 rounded-full">Operator</span>;
      default:
        return <span className="text-xs font-bold bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">Tourist</span>;
    }
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 sticky top-0 z-50 shadow-sm transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-base">S</span>
            </div>
            <span className="text-lg font-extrabold text-gray-900 dark:text-white tracking-tight hidden sm:block">SmartTour</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/tours"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Tours
            </Link>
            <Link
              to="/destinations"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Destinations
            </Link>
            <Link
              to="/travel-tips"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Travel Tips
            </Link>
            <Link
              to="/about"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              About
            </Link>
            <Link
              to="/planner"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
            >
              Planner
            </Link>

            {user?.role === "admin" && (
              <Link
                to="/admin"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                Admin Panel
              </Link>
            )}

            {user?.role === "guide" && (
              <Link
                to="/guide"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                Guide Dashboard
              </Link>
            )}

            {user?.role === "operator" && (
              <Link
                to="/operator"
                className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 dark:text-slate-300 hover:text-green-700 dark:hover:text-green-400 hover:bg-green-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                Operator Dashboard
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors border border-transparent dark:border-slate-800"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Notification Bell Dropdown */}
            {user && (
              <div className="relative">
                <button
                  onClick={() => setNotificationsOpen(!notificationsOpen)}
                  className="p-2.5 rounded-xl text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors relative border border-transparent dark:border-slate-800"
                  aria-label="Notifications"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  {unreadCount > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white animate-pulse">
                      {unreadCount}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {notificationsOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)}></div>
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-slate-700 py-3 z-20"
                      >
                        <div className="px-4 py-2 border-b border-gray-100 dark:border-slate-700 flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-900 dark:text-white">Notifications</span>
                          {unreadCount > 0 && (
                            <button
                              onClick={() => markAllNotificationsAsRead(user.email)}
                              className="text-xs font-semibold text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition"
                            >
                              Mark all as read
                            </button>
                          )}
                        </div>

                        <div className="max-h-64 overflow-y-auto divide-y divide-gray-50 dark:divide-slate-700/50">
                          {userNotifications.length === 0 ? (
                            <div className="p-6 text-center text-gray-400 dark:text-gray-500 text-xs">
                              No notifications yet.
                            </div>
                          ) : (
                            userNotifications.map((notif) => (
                              <div
                                key={notif.id}
                                onClick={() => markNotificationAsRead(notif.id)}
                                className={`p-3 text-left hover:bg-gray-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer relative ${
                                  !notif.isRead ? "bg-green-50/20 dark:bg-green-950/10" : ""
                                }`}
                              >
                                <div className="flex justify-between items-start gap-2">
                                  <span className="text-xs font-bold text-gray-800 dark:text-slate-200">
                                    {notif.title}
                                  </span>
                                  {!notif.isRead && (
                                    <span className="h-2 w-2 rounded-full bg-green-500 flex-shrink-0 mt-1"></span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-500 dark:text-slate-400 mt-1 leading-relaxed">
                                  {notif.content}
                                </p>
                                <span className="text-[9px] text-gray-400 dark:text-slate-500 mt-1.5 block">
                                  {notif.createdAt}
                                </span>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-bold hover:shadow-lg hover:shadow-green-200 transition"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2.5 pl-1 pr-2 py-1.5 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                    {getInitials(user.name)}
                  </div>
                  <div className="text-left hidden lg:block">
                    <p className="text-sm font-semibold text-gray-900 dark:text-slate-100 leading-tight">{user.name}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 leading-tight capitalize">{user.role}</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                      <motion.div
                        initial={{ opacity: 0, y: -8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-gray-100 dark:border-slate-700 py-2 z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-700">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                              {getInitials(user.name)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-slate-400 truncate max-w-[130px]">{user.email}</p>
                              <div className="mt-1">{getRoleBadge(user.role)}</div>
                            </div>
                          </div>
                        </div>

                        <div className="py-2">
                          {user.role === "tourist" && (
                            <>
                              <Link
                                to="/my-bookings"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                              >
                                <span className="text-base">📅</span>
                                My Bookings
                                {myBookingCount > 0 && (
                                  <span className="ml-auto bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                    {myBookingCount}
                                  </span>
                                )}
                              </Link>
                              <Link
                                to="/profile"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                              >
                                <span className="text-base">👤</span>
                                Profile
                              </Link>
                            </>
                          )}
                          {user.role === "guide" && (
                            <Link
                              to="/guide"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <span className="text-base">🎯</span>
                              Guide Dashboard
                            </Link>
                          )}
                          {user.role === "operator" && (
                            <Link
                              to="/operator"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <span className="text-base">🏨</span>
                              Operator Dashboard
                            </Link>
                          )}
                          {user.role === "admin" && (
                            <Link
                              to="/admin"
                              onClick={() => setProfileOpen(false)}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-50 dark:hover:bg-slate-700/50 transition-colors"
                            >
                              <span className="text-base">⚙️</span>
                              Admin Panel
                            </Link>
                          )}
                        </div>

                        <div className="border-t border-gray-100 dark:border-slate-700 pt-2">
                          <button
                            onClick={() => { logout(); setProfileOpen(false); }}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors w-full"
                          >
                            <span className="text-base">🚪</span>
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900"
          >
            <div className="px-4 py-3 space-y-1">
              <div className="flex justify-between items-center px-4 py-2">
                <span className="text-sm font-medium text-gray-500 dark:text-slate-400">Settings</span>
                {/* Theme toggle mobile */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-300"
                >
                  {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
                </button>
              </div>

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/tours"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                Tours
              </Link>
              <Link
                to="/destinations"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                Destinations
              </Link>
              <Link
                to="/travel-tips"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                Travel Tips
              </Link>
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                About
              </Link>
              <Link
                to="/planner"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
              >
                Planner
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  Admin Panel
                </Link>
              )}

              {user?.role === "guide" && (
                <Link
                  to="/guide"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  Guide Dashboard
                </Link>
              )}

              {user?.role === "operator" && (
                <Link
                  to="/operator"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-2.5 rounded-xl text-sm font-medium text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  Operator Dashboard
                </Link>
              )}

              {!user ? (
                <div className="pt-3 flex gap-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold text-gray-700 dark:text-slate-300 border border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl text-sm font-bold hover:shadow-lg transition"
                  >
                    Get Started
                  </Link>
                </div>
              ) : (
                <div className="pt-3 border-t border-gray-200 dark:border-slate-800">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-sm">
                      {getInitials(user.name)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 dark:text-slate-100">{user.name}</p>
                      <p className="text-xs text-gray-500 dark:text-slate-400">{user.email}</p>
                      <div className="mt-1">{getRoleBadge(user.role)}</div>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    {user.role === "tourist" && (
                      <>
                        <Link
                          to="/my-bookings"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          <span>📅 My Bookings</span>
                          {myBookingCount > 0 && (
                            <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {myBookingCount}
                            </span>
                          )}
                        </Link>
                        <Link
                          to="/profile"
                          onClick={() => setMobileOpen(false)}
                          className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                        >
                          👤 Profile
                        </Link>
                      </>
                    )}
                    {user.role === "guide" && (
                      <Link
                        to="/guide"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        🎯 Guide Dashboard
                      </Link>
                    )}
                    {user.role === "operator" && (
                      <Link
                        to="/operator"
                        onClick={() => setMobileOpen(false)}
                        className="block px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        🏨 Operator Dashboard
                      </Link>
                    )}
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-800 transition-colors w-full text-left"
                    >
                      🚪 Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
