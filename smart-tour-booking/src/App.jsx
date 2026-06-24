import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Login from "./pages/LOgin";
import Register from "./pages/Register";
import Footer from "./components/Footer";
import Tours from "./pages/Tours";
import TourDetails from "./pages/TourDetails";
import Booking from "./pages/Booking";

import DashboardLayout from "./components/admin/DashboardLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import Operators from "./pages/admin/Operators";
import ToursAdmin from "./pages/admin/ToursAdmin";
import Logs from "./pages/admin/Logs";
import Reports from "./pages/admin/Reports";

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

function AppRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tour/:id" element={<TourDetails />} />
      <Route path="/booking/:id" element={<Booking />} />
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
        <Route path="logs" element={<Logs />} />
        <Route path="reports" element={<Reports />} />
      </Route>
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;