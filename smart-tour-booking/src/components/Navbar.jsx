import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "../context/DataContext";
import { useTheme } from "../context/ThemeContext";
import { 
  FaSun, 
  FaMoon, 
  FaBell, 
  FaUser, 
  FaCalendarAlt, 
  FaSignOutAlt,
  FaCog,
  FaBars,
  FaTimes,
  FaShieldAlt,
  FaChevronDown,
  FaSignInAlt,
  FaUserPlus
} from "react-icons/fa";

function Navbar() {
  const { user, logout } = useAuth();
  const { bookings, notifications, markNotificationAsRead, markAllNotificationsAsRead } = useData();
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const location = useLocation();

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
        return <span className="text-[9px] font-extrabold bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-400 px-2 py-0.5 rounded-full border border-red-200/50 dark:border-red-900/30 uppercase tracking-wider">Admin</span>;
      case "guide":
        return <span className="text-[9px] font-extrabold bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 px-2 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/30 uppercase tracking-wider">Guide</span>;
      case "operator":
        return <span className="text-[9px] font-extrabold bg-purple-100 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full border border-purple-200/50 dark:border-purple-900/30 uppercase tracking-wider">Operator</span>;
      default:
        return <span className="text-[9px] font-extrabold bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full border border-green-200/50 dark:border-green-900/30 uppercase tracking-wider">Tourist</span>;
    }
  };

  const checkActive = (item) => {
    if (item.hash) {
      return location.pathname === item.path && location.hash === item.hash;
    }
    return location.pathname === item.path && !location.hash;
  };

  const baseNavItems = [
    { name: "Home", path: "/", hash: "" },
    { name: "Tours", path: "/tours", hash: "" },
    { name: "Destinations", path: "/destinations", hash: "" },
    { name: "Travel Tips", path: "/travel-tips", hash: "" },
    { name: "About", path: "/about", hash: "" },
    { name: "Contacts", path: "/", hash: "#contacts" },
    { name: "Planner", path: "/planner", hash: "" },
  ];

  const roleNavItems = [];
  if (user?.role === "admin") {
    roleNavItems.push({ name: "Admin Panel", path: "/admin", hash: "" });
  } else if (user?.role === "guide") {
    roleNavItems.push({ name: "Guide Dashboard", path: "/guide", hash: "" });
  } else if (user?.role === "operator") {
    roleNavItems.push({ name: "Operator Dashboard", path: "/operator", hash: "" });
  }

  const allNavItems = [...baseNavItems, ...roleNavItems];

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-150 dark:border-slate-800/80 sticky top-0 z-50 transition-all duration-300 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03),0_4px_6px_-2px_rgba(0,0,0,0.01)]"
    >
      <div className="w-full">
        <div className="flex items-center h-20">
          
          {/* Left Side: Logo with divider */}
          <div className="w-auto md:w-64 flex items-center border-r border-gray-200 dark:border-slate-800 px-4 md:px-8 md:pr-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <img 
                   src="/Logo.png" 
                  alt="SmartTour" 
                  className="w-14 h-14 object-contain rounded-2xl shadow-md border border-gray-200/60 dark:border-slate-850 transition-transform duration-300 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-green-500/10 dark:bg-emerald-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <span className="text-2xl font-black bg-gradient-to-r from-green-600 via-emerald-500 to-teal-600 bg-clip-text text-transparent tracking-tight hidden sm:block transition-all duration-300 group-hover:brightness-110">
                SmartTour
              </span>
            </Link>
          </div>

          {/* Center Side: Links */}
          <div className="hidden md:flex items-center justify-center gap-4 flex-1 px-8">
            {allNavItems.map((item) => {
              const active = checkActive(item);
              return (
                <Link
                  key={item.name}
                  to={item.hash ? `${item.path}${item.hash}` : item.path}
                  className={`relative px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all duration-300 z-10 flex items-center gap-1.5 ${
                    active
                      ? "text-green-700 dark:text-emerald-400 font-extrabold"
                      : "text-gray-600 dark:text-slate-300 hover:text-green-600 dark:hover:text-emerald-400 hover:bg-gray-50/50 dark:hover:bg-slate-800/40"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-green-500/8 dark:bg-emerald-500/12 border border-green-500/10 dark:border-emerald-500/20 rounded-xl -z-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  )}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Side: Actions (SignIn, GetStarted, Theme, Profile) */}
          <div className="w-auto md:w-64 flex justify-end items-center gap-3 md:gap-5 px-4 md:px-8">
            
            {/* Desktop Actions */}
              <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl text-gray-550 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-slate-800/80 transition-all duration-300 border border-gray-200/50 dark:border-slate-800 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
                aria-label="Toggle Theme"
              >
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  {theme === "dark" ? <FaSun className="w-4 h-4 text-amber-400" /> : <FaMoon className="w-4 h-4 text-emerald-600" />}
                </motion.div>
              </button>

              {/* Notifications bell */}
              {user && (
                <div className="relative">
                  <button
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setProfileOpen(false);
                    }}
                    className={`p-2.5 rounded-xl text-gray-550 dark:text-gray-400 hover:bg-gray-100/70 dark:hover:bg-slate-800/80 transition-all duration-300 border border-gray-200/50 dark:border-slate-800 shadow-sm hover:shadow-md active:scale-95 cursor-pointer relative ${
                      notificationsOpen ? "bg-gray-100/70 dark:bg-slate-800/80" : ""
                    }`}
                    aria-label="Notifications"
                  >
                    <FaBell className="w-4 h-4" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-extrabold text-white ring-2 ring-white dark:ring-slate-900 animate-pulse">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <AnimatePresence>
                    {notificationsOpen && (
                      <>
                        <div className="fixed inset-0 z-10" onClick={() => setNotificationsOpen(false)}></div>
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute right-0 mt-3.5 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-150 dark:border-slate-800 py-3 z-20 overflow-hidden"
                        >
                          <div className="px-4 py-2.5 border-b border-gray-100 dark:border-slate-805 flex justify-between items-center bg-gray-50/50 dark:bg-slate-950/20">
                            <span className="text-sm font-black text-gray-900 dark:text-white">Notifications</span>
                            {unreadCount > 0 && (
                              <button
                                onClick={() => markAllNotificationsAsRead(user.email)}
                                className="text-xs font-semibold text-green-600 hover:text-green-700 dark:text-emerald-400 dark:hover:text-emerald-350 transition cursor-pointer"
                              >
                                Mark all as read
                              </button>
                            )}
                          </div>

                          <div className="max-h-64 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800/40">
                            {userNotifications.length === 0 ? (
                              <div className="p-8 text-center text-gray-400 dark:text-slate-500 text-xs">
                                <span className="text-2xl block mb-2">🔔</span>
                                No notifications yet.
                              </div>
                            ) : (
                              userNotifications.map((notif) => (
                                <div
                                  key={notif.id}
                                  onClick={() => markNotificationAsRead(notif.id)}
                                  className={`p-3 text-left hover:bg-gray-50 dark:hover:bg-slate-850/40 transition-colors cursor-pointer relative ${
                                    !notif.isRead ? "bg-green-500/5 dark:bg-emerald-500/5" : ""
                                  }`}
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <span className={`text-xs font-bold ${!notif.isRead ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-slate-350"}`}>
                                      {notif.title}
                                    </span>
                                    {!notif.isRead && (
                                      <span className="h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0 mt-1 shadow-sm"></span>
                                    )}
                                  </div>
                                  <p className="text-[11px] text-gray-555 dark:text-slate-400 mt-1 leading-relaxed">
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

              {/* Login / Register or Profile Dropdown */}
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300 dark:hover:border-emerald-700 shadow-sm hover:shadow-md active:scale-95 transition-all duration-200 cursor-pointer animate-live-glow"
                  >
                    <FaSignInAlt className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl text-sm font-black shadow-md shadow-green-500/20 hover:shadow-lg hover:shadow-green-500/30 dark:hover:shadow-emerald-950/30 hover:brightness-105 active:scale-95 transition-all duration-200 cursor-pointer animate-live-gradient whitespace-nowrap"
                  >
                    <FaUserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
                    Get Started
                  </Link>
                </>
              ) : (
                <div className="relative">
                  <button
                    onClick={() => {
                      setProfileOpen(!profileOpen);
                      setNotificationsOpen(false);
                    }}
                    className={`flex items-center gap-2.5 pl-2 pr-4 py-1.5 rounded-xl border border-transparent dark:border-slate-800 hover:border-gray-200 hover:bg-gray-100/50 dark:hover:bg-slate-800/60 transition-all duration-200 cursor-pointer ${
                      profileOpen ? "border-gray-200 bg-gray-100/50 dark:border-slate-800 dark:bg-slate-800/60" : ""
                    }`}
                  >
                    <div className="relative">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-xs shadow-sm ring-2 ring-emerald-500/10">
                        {getInitials(user.name)}
                      </div>
                      <span className="absolute bottom-0 right-0 w-2 h-2 bg-emerald-500 border border-white dark:border-slate-900 rounded-full"></span>
                    </div>
                    <div className="text-left hidden lg:block max-w-[110px]">
                      <p className="text-xs font-bold text-gray-900 dark:text-slate-100 leading-tight truncate">{user.name}</p>
                      <p className="text-[10px] text-gray-550 dark:text-slate-400 leading-none capitalize font-semibold">{user.role}</p>
                    </div>
                    <FaChevronDown className={`w-2.5 h-2.5 text-gray-400 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)}></div>
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 12, scale: 0.95 }}
                          transition={{ duration: 0.15, ease: "easeOut" }}
                          className="absolute right-0 mt-3.5 w-64 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-150 dark:border-slate-800 py-2.5 z-50 overflow-hidden"
                        >
                          <div className="px-4 py-3 border-b border-gray-100 dark:border-slate-805 bg-gray-50/50 dark:bg-slate-950/30">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-inner ring-2 ring-emerald-500/10">
                                {getInitials(user.name)}
                              </div>
                              <div className="min-w-0">
                                <p className="text-sm font-extrabold text-gray-900 dark:text-slate-100 truncate">{user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-slate-450 truncate font-semibold">{user.email}</p>
                                <div className="mt-1">{getRoleBadge(user.role)}</div>
                              </div>
                            </div>
                          </div>

                          <div className="py-1">
                            {user.role === "tourist" && (
                              <>
                                <Link
                                  to="/my-bookings"
                                  onClick={() => setProfileOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 transition-colors font-semibold"
                                >
                                  <FaCalendarAlt className="text-emerald-500 w-3.5 h-3.5" />
                                  My Bookings
                                  {myBookingCount > 0 && (
                                    <span className="ml-auto bg-gradient-to-r from-green-550 to-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                      {myBookingCount}
                                    </span>
                                  )}
                                </Link>
                                <Link
                                  to="/profile"
                                  onClick={() => setProfileOpen(false)}
                                  className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 transition-colors font-semibold"
                                >
                                  <FaUser className="text-emerald-500 w-3.5 h-3.5" />
                                  Profile Settings
                                </Link>
                              </>
                            )}
                            {user.role === "guide" && (
                              <Link
                                to="/guide"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 transition-colors font-semibold"
                              >
                                <FaCog className="text-emerald-500 w-3.5 h-3.5" />
                                Guide Dashboard
                              </Link>
                            )}
                            {user.role === "operator" && (
                              <Link
                                to="/operator"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 transition-colors font-semibold"
                              >
                                <FaCog className="text-emerald-500 w-3.5 h-3.5" />
                                Operator Dashboard
                              </Link>
                            )}
                            {user.role === "admin" && (
                              <Link
                                to="/admin"
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/50 transition-colors font-semibold"
                              >
                                <FaShieldAlt className="text-emerald-500 w-3.5 h-3.5" />
                                Admin Panel
                              </Link>
                            )}
                          </div>

                          <div className="border-t border-gray-100 dark:border-slate-800/60 pt-1.5 mt-1">
                            <button
                              onClick={() => { logout(); setProfileOpen(false); }}
                              className="flex items-center gap-3 px-4 py-2.5 text-xs xl:text-sm text-red-600 dark:text-red-400 hover:bg-red-500/5 dark:hover:bg-red-500/8 transition-colors w-full font-bold text-left cursor-pointer"
                            >
                              <FaSignOutAlt className="w-3.5 h-3.5 text-red-500" />
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

            {/* Mobile Actions and triggers */}
            <div className="flex md:hidden items-center gap-2">
              {/* Theme toggle mobile */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-gray-550 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-800 active:scale-95 cursor-pointer"
                aria-label="Toggle Theme"
              >
                {theme === "dark" ? <FaSun className="w-4 h-4 text-amber-400" /> : <FaMoon className="w-4 h-4 text-emerald-600" />}
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 rounded-xl text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 transition-all border border-gray-200 dark:border-slate-800 active:scale-95 cursor-pointer"
              >
                {mobileOpen ? <FaTimes className="w-4 h-4" /> : <FaBars className="w-4 h-4" />}
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[80px] bg-slate-900/40 backdrop-blur-xs z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="absolute left-0 right-0 top-[80px] md:hidden border-b border-gray-200 dark:border-slate-805 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl z-50 shadow-2xl overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {allNavItems.map((item, idx) => {
                  const active = checkActive(item);
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: idx * 0.04 }}
                    >
                      <Link
                        to={item.hash ? `${item.path}${item.hash}` : item.path}
                        onClick={() => setMobileOpen(false)}
                        className={`block px-4 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                          active
                            ? "text-green-700 dark:text-emerald-400 bg-green-500/8 dark:bg-emerald-500/12 border-l-4 border-green-600 dark:border-emerald-500 pl-3"
                            : "text-gray-700 dark:text-slate-200 hover:bg-gray-100/60 dark:hover:bg-slate-800/60 pl-4"
                        }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  );
                })}

                {!user ? (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: allNavItems.length * 0.04 }}
                    className="pt-3.5 border-t border-gray-100 dark:border-slate-800/85 flex gap-2"
                  >
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap text-gray-700 dark:text-slate-200 border border-gray-200 dark:border-slate-800 hover:bg-green-50 hover:text-green-700 hover:border-green-300 dark:hover:bg-emerald-900/30 dark:hover:text-emerald-300 transition-colors animate-live-glow"
                    >
                      <FaSignInAlt className="w-4 h-4" />
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileOpen(false)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white rounded-xl text-sm font-black shadow-md hover:shadow-lg transition animate-live-gradient whitespace-nowrap"
                    >
                      <FaUserPlus className="w-4 h-4" />
                      Get Started
                    </Link>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: allNavItems.length * 0.04 }}
                    className="pt-4 border-t border-gray-100 dark:border-slate-800/85"
                  >
                    <div className="flex items-center gap-3 px-4 py-2">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-black text-sm shadow-md">
                        {getInitials(user.name)}
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-gray-900 dark:text-slate-100 leading-tight">{user.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 font-semibold">{user.email}</p>
                        <div className="mt-1">{getRoleBadge(user.role)}</div>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      {user.role === "tourist" && (
                        <>
                          <Link
                            to="/my-bookings"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-850 transition-colors font-semibold"
                          >
                            <span className="flex items-center gap-3"><FaCalendarAlt className="text-emerald-500" /> My Bookings</span>
                            {myBookingCount > 0 && (
                              <span className="bg-green-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                {myBookingCount}
                              </span>
                            )}
                          </Link>
                          <Link
                            to="/profile"
                            onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-850 transition-colors font-semibold"
                          >
                            <FaUser className="text-emerald-500" />
                            <span>Profile Settings</span>
                          </Link>
                        </>
                      )}
                      {user.role === "guide" && (
                        <Link
                          to="/guide"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-850 transition-colors font-semibold"
                        >
                          <FaCog className="text-emerald-500" />
                          <span>Guide Dashboard</span>
                        </Link>
                      )}
                      {user.role === "operator" && (
                        <Link
                          to="/operator"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-850 transition-colors font-semibold"
                        >
                          <FaCog className="text-emerald-500" />
                          <span>Operator Dashboard</span>
                        </Link>
                      )}
                      {user.role === "admin" && (
                        <Link
                          to="/admin"
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-850 transition-colors font-semibold"
                        >
                          <FaShieldAlt className="text-emerald-500" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <button
                        onClick={() => {
                          logout();
                          setMobileOpen(false);
                        }}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-red-600 dark:text-red-400 hover:bg-red-500/5 dark:hover:bg-red-950/20 transition-colors w-full text-left font-bold cursor-pointer"
                      >
                        <FaSignOutAlt className="text-red-500" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
