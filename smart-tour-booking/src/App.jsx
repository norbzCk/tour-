import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";
import { ToastProvider } from "./components/ToastProvider";
import { AssistantProvider, useAssistant } from "./context/AssistantContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import AiAssistant from "./components/AiAssistant";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Booking from "./pages/Booking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Destinations from "./pages/Destinations";
import TravelTips from "./pages/TravelTips";
import About from "./pages/About";
import Planner from "./pages/Planner";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

import { Link } from "react-router-dom";

import DashboardLayout from "./components/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Operators from "./pages/admin/Operators";
import ToursAdmin from "./pages/admin/ToursAdmin";
import AdminBookings from "./pages/admin/AdminBookings";
import Logs from "./pages/admin/Logs";
import Reports from "./pages/admin/Reports";

import GuideDashboard from "./pages/guide/GuideDashboard";
import OperatorDashboard from "./pages/operator/OperatorDashboard";

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }
  return children;
}

function TouristRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign In Required</h2>
          <p className="text-gray-600 mb-6">Please log in to access this page and book tours.</p>
          <Link to="/login" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition">
            Sign In Now
          </Link>
        </div>
      </div>
    );
  }
  return children;
}

function BookingRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-lg max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">You must be logged in to book a tour. Please sign in to continue.</p>
          <Link to="/login" className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition">
            Sign In to Book
          </Link>
        </div>
      </div>
    );
  }
  return children;
}

function GuideRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "guide") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in as a tour guide to view this page.</p>
        </div>
      </div>
    );
  }
  return children;
}

function OperatorRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "operator") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
          <p className="text-gray-600">Please log in as a tour operator to view this page.</p>
        </div>
      </div>
    );
  }
  return children;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/destinations" element={<Destinations />} />
      <Route path="/travel-tips" element={<TravelTips />} />
      <Route path="/about" element={<About />} />
      <Route path="/planner" element={<Planner />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/terms" element={<Terms />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/booking/:id" element={
        <BookingRoute>
          <Booking />
        </BookingRoute>
      } />
      <Route path="/my-bookings" element={
        <TouristRoute>
          <MyBookings />
        </TouristRoute>
      } />
      <Route path="/profile" element={
        <TouristRoute>
          <Profile />
        </TouristRoute>
      } />
      <Route path="/guide" element={
        <GuideRoute>
          <GuideDashboard />
        </GuideRoute>
      } />
      <Route path="/operator" element={
        <OperatorRoute>
          <OperatorDashboard />
        </OperatorRoute>
      } />
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <DashboardLayout />
          </AdminRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="operators" element={<Operators />} />
        <Route path="tours" element={<ToursAdmin />} />
        <Route path="bookings" element={<AdminBookings />} />
        <Route path="logs" element={<Logs />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

function FloatingAssistantOrb() {
  const { toggleAssistant } = useAssistant();
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleAssistant}
        aria-label="AI Assistant"
        className="relative inline-grid place-items-center rounded-full border-2 border-emerald-500/40 bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-[0_0_25px_-5px_rgba(16,185,129,0.4)] hover:shadow-[0_0_35px_-5px_rgba(16,185,129,0.6)] transition-all duration-300 active:scale-95 cursor-pointer overflow-visible h-16 w-16"
        style={{ WebkitTapHighlightColor: "transparent" }}
      >
        <span className="pointer-events-none absolute -inset-[4px] rounded-full animate-spin" style={{ animationDuration: "3s" }}>
          <svg viewBox="0 0 56 56" className="h-full w-full">
            <defs>
              <linearGradient id="rafikiGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            <circle cx="28" cy="28" r="26" fill="none" stroke="url(#rafikiGrad)" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="42 160" />
            <circle cx="28" cy="28" r="26" fill="none" stroke="url(#rafikiGrad)" strokeWidth="2.8" strokeLinecap="round" strokeDasharray="14 200" strokeDashoffset="80" opacity="0.75" />
          </svg>
        </span>
        <span className="pointer-events-none absolute inset-0 rounded-full animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,rgba(16,185,129,0.25)_360deg)] opacity-70" />
        <span className="pointer-events-none absolute -inset-[2px] rounded-full animate-[spin_6s_linear_infinite_reverse] bg-[conic-gradient(from_180deg,rgba(6,182,212,0.18),transparent,rgba(139,92,246,0.18))] opacity-80" />
        <img src="/rafiki.png" alt="RafikiChat" className="relative z-10 h-10 w-10 object-cover rounded-full p-1" />
      </button>
    </div>
  );
}

function App() {
  return (
    <AssistantProvider>
      <ThemeProvider>
        <AuthProvider>
          <DataProvider>
            <ToastProvider>
              <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <AppRoutes />
                <Footer />
                <AiAssistant />
                <FloatingAssistantOrb />
              </BrowserRouter>
            </ToastProvider>
          </DataProvider>
        </AuthProvider>
      </ThemeProvider>
    </AssistantProvider>
  );
}

export default App;