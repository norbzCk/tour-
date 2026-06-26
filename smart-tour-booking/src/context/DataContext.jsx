import { createContext, useContext, useState, useCallback } from "react";
import toursData from "../data/tours";

const DataContext = createContext(null);

const USD_TO_TZS = 2500;

const initialUsers = [
  { id: 1, name: "Admin User", email: "admin@example.com", phone: "+255 712 000 001", role: "admin", joinedAt: "2025-01-15" },
  { id: 2, name: "Sarah M.", email: "sarah@example.com", phone: "+255 712 345 678", role: "tourist", joinedAt: "2025-03-10" },
  { id: 3, name: "James K.", email: "james@example.com", phone: "+255 712 345 679", role: "tourist", joinedAt: "2025-04-22" },
  { id: 4, name: "Grace T.", email: "grace@example.com", phone: "+255 712 345 680", role: "tourist", joinedAt: "2025-05-05" },
];

const initialGuides = [
  { id: 1, name: "John Msangi", email: "john@guide.com", phone: "+255 712 111 001", specialty: "Safari", experience: "8 years", status: "Active", bio: "Expert safari guide with 8 years of experience in Serengeti and Ngorongoro.", languages: "English, Swahili", rating: 4.9 },
  { id: 2, name: "Fatma Ali", email: "fatma@guide.com", phone: "+255 712 111 002", specialty: "Beach", experience: "5 years", status: "Active", bio: "Zanzibar beach specialist who knows all the best spots and hidden gems.", languages: "English, Swahili, Arabic", rating: 4.7 },
  { id: 3, name: "Peter Kimaro", email: "peter@guide.com", phone: "+255 712 111 003", specialty: "Mountain", experience: "10 years", status: "Active", bio: "Certified mountain guide with numerous successful Kilimanjaro summits.", languages: "English, Swahili", rating: 4.8 },
  { id: 4, name: "Amina Hassan", email: "amina@guide.com", phone: "+255 712 111 004", specialty: "City", experience: "4 years", status: "Inactive", bio: "Dar es Salaam city tour expert with deep knowledge of local culture.", languages: "English, Swahili", rating: 4.5 },
];

const initialBookings = [
  { id: 1, userId: 2, userName: "Sarah M.", userEmail: "sarah@example.com", tourId: 1, tourTitle: "Serengeti Safari Adventure", date: "2026-07-10", amount: Math.round(799 * USD_TO_TZS), amountUSD: 799, status: "Confirmed", paymentStatus: "Paid", paymentMethod: "MPESA", travelers: 2, createdAt: "2026-06-20" },
  { id: 2, userId: 3, userName: "James K.", userEmail: "james@example.com", tourId: 2, tourTitle: "Zanzibar Beach Escape", date: "2026-07-20", amount: Math.round(499 * USD_TO_TZS), amountUSD: 499, status: "Pending", paymentStatus: "Paid", paymentMethod: "MPESA", travelers: 1, createdAt: "2026-06-21" },
  { id: 3, userId: 4, userName: "Grace T.", userEmail: "grace@example.com", tourId: 3, tourTitle: "Mount Kilimanjaro Trek", date: "2026-08-05", amount: Math.round(1200 * USD_TO_TZS), amountUSD: 1200, status: "Confirmed", paymentStatus: "Paid", paymentMethod: "MPESA", travelers: 1, createdAt: "2026-06-22" },
  { id: 4, userId: 2, userName: "Sarah M.", userEmail: "sarah@example.com", tourId: 5, tourTitle: "Ngorongoro Crater Tour", date: "2026-08-12", amount: Math.round(650 * USD_TO_TZS), amountUSD: 650, status: "Pending", paymentStatus: "Paid", paymentMethod: "MPESA", travelers: 4, createdAt: "2026-06-23" },
  { id: 5, userId: 3, userName: "James K.", userEmail: "james@example.com", tourId: 4, tourTitle: "Dar es Salaam City Tour", date: "2026-08-18", amount: Math.round(199 * USD_TO_TZS), amountUSD: 199, status: "Rejected", paymentStatus: "Paid", paymentMethod: "MPESA", travelers: 2, createdAt: "2026-06-24" },
];

const initialLogs = [
  { id: 1, action: "User Login", user: "admin@example.com", timestamp: "2026-06-24 08:00", details: "Admin logged in" },
  { id: 2, action: "Booking Created", user: "sarah@example.com", timestamp: "2026-06-24 08:15", details: "Booked Serengeti Safari Adventure" },
  { id: 3, action: "Tour Updated", user: "admin@example.com", timestamp: "2026-06-24 08:30", details: "Updated price for Zanzibar Beach Escape" },
  { id: 4, action: "User Registered", user: "james@example.com", timestamp: "2026-06-24 09:00", details: "New tourist account created" },
];

function formatTZS(amount) {
  return `Tsh ${Number(amount).toLocaleString("en-TZ")}`;
}

function DataProvider({ children }) {
  const [tours, setTours] = useState(
    toursData.map((t) => ({ ...t, guideId: t.guideId || null }))
  );
  const [bookings, setBookings] = useState(initialBookings);
  const [users, setUsers] = useState(initialUsers);
  const [guides, setGuides] = useState(initialGuides);
  const [logs, setLogs] = useState(initialLogs);
  const [nextId, setNextId] = useState(100);

  const addLog = useCallback((action, user, details) => {
    const log = {
      id: nextId,
      action,
      user: user || "system",
      timestamp: new Date().toISOString().replace("T", " ").slice(0, 19),
      details,
    };
    setLogs((prev) => [log, ...prev]);
    setNextId((prev) => prev + 1);
  }, [nextId]);

  const addTour = useCallback((tour) => {
    const newTour = { ...tour, id: nextId, rating: 4.5 };
    setTours((prev) => [...prev, newTour]);
    addLog("Tour Created", "admin@example.com", `Created tour: ${newTour.title}`);
    setNextId((prev) => prev + 1);
    return newTour;
  }, [nextId, addLog]);

  const updateTour = useCallback((id, data) => {
    setTours((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
    addLog("Tour Updated", "admin@example.com", `Updated tour ID: ${id}`);
  }, [addLog]);

  const deleteTour = useCallback((id) => {
    setTours((prev) => prev.filter((t) => t.id !== id));
    addLog("Tour Deleted", "admin@example.com", `Deleted tour ID: ${id}`);
  }, [addLog]);

  const assignGuide = useCallback((tourId, guideId) => {
    const guide = guides.find((g) => g.id === guideId);
    setTours((prev) => prev.map((t) => (t.id === tourId ? { ...t, guideId } : t)));
    addLog("Guide Assigned", "admin@example.com", `Assigned ${guide?.name || "guide"} to tour ID: ${tourId}`);
  }, [guides, addLog]);

  const addBooking = useCallback((booking) => {
    const newBooking = {
      ...booking,
      id: nextId,
      status: booking.status || "Pending",
      paymentStatus: booking.paymentStatus || "Paid",
      paymentMethod: booking.paymentMethod || "MPESA",
      createdAt: new Date().toISOString().slice(0, 10),
      amountUSD: booking.amountUSD || Math.round(booking.amount / USD_TO_TZS),
    };
    setBookings((prev) => [...prev, newBooking]);
    addLog("Booking Created", booking.userEmail || "system", `Booked ${booking.tourTitle}`);
    setNextId((prev) => prev + 1);
    return newBooking;
  }, [nextId, addLog]);

  const updateBookingStatus = useCallback((id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    addLog("Booking Updated", "admin@example.com", `Updated booking ID: ${id} to ${status}`);
  }, [addLog]);

  const addUser = useCallback((user) => {
    const newUser = { ...user, id: nextId, joinedAt: new Date().toISOString().slice(0, 10) };
    setUsers((prev) => [...prev, newUser]);
    addLog("User Created", "system", `Created user: ${newUser.name}`);
    setNextId((prev) => prev + 1);
    return newUser;
  }, [nextId, addLog]);

  const updateUser = useCallback((id, data) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    addLog("User Updated", "admin@example.com", `Updated user ID: ${id}`);
  }, [addLog]);

  const deleteUser = useCallback((id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    addLog("User Deleted", "admin@example.com", `Deleted user ID: ${id}`);
  }, [addLog]);

  const addGuide = useCallback((guide) => {
    const newGuide = { ...guide, id: nextId };
    setGuides((prev) => [...prev, newGuide]);
    addLog("Guide Created", "admin@example.com", `Created guide: ${newGuide.name}`);
    setNextId((prev) => prev + 1);
    return newGuide;
  }, [nextId, addLog]);

  const updateGuide = useCallback((id, data) => {
    setGuides((prev) => prev.map((g) => (g.id === id ? { ...g, ...data } : g)));
    addLog("Guide Updated", "admin@example.com", `Updated guide ID: ${id}`);
  }, [addLog]);

  const deleteGuide = useCallback((id) => {
    setGuides((prev) => prev.filter((g) => g.id !== id));
    addLog("Guide Deleted", "admin@example.com", `Deleted guide ID: ${id}`);
  }, [addLog]);

  const findGuideByEmail = useCallback((email) => {
    return guides.find((g) => g.email === email) || null;
  }, [guides]);

  const findUserByEmail = useCallback((email) => {
    return users.find((u) => u.email === email) || null;
  }, [users]);

  const value = {
    tours, addTour, updateTour, deleteTour, assignGuide,
    bookings, addBooking, updateBookingStatus,
    users, addUser, updateUser, deleteUser, findUserByEmail,
    guides, addGuide, updateGuide, deleteGuide, findGuideByEmail,
    logs, addLog,
    formatTZS, USD_TO_TZS,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export { DataProvider, useData };
