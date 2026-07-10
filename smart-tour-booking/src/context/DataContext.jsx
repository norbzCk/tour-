import { createContext, useContext, useState, useEffect, useCallback } from "react";
import toursData from "../data/tours";
import bookingsData from "../data/bookings";
import reviewsData from "../data/reviews";
import { paymentService } from "../services/paymentService";
import { notificationService } from "../services/notificationService";

/* eslint-disable react-refresh/only-export-components */
const DataContext = createContext(null);

const STORAGE_KEY = "smartTourState_v2";

function loadPersistedState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.warn("Failed to read persisted state:", e);
  }
  return null;
}

const persistedState = loadPersistedState();

const USD_TO_TZS = 2500;

const initialNotifications = [
  {
    id: 1,
    userEmail: "sarah@example.com",
    title: "Welcome to SmartTour!",
    content: "Explore Serengeti Safaris, Zanzibar beaches, and much more. Plan your dream tour today!",
    isRead: false,
    createdAt: new Date(Date.now() - 3600000).toISOString().slice(0, 16).replace("T", " "),
  },
  {
    id: 2,
    userEmail: "james@example.com",
    title: "Welcome to SmartTour!",
    content: "Browse our handpicked tours and enjoy a seamless Tanzanian booking experience.",
    isRead: true,
    createdAt: new Date(Date.now() - 7200000).toISOString().slice(0, 16).replace("T", " "),
  },
];

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
    persistedState?.tours ?? toursData.map((t) => ({ ...t, guideId: t.guideId || null }))
  );
  const [bookings, setBookings] = useState(
    persistedState?.bookings ?? bookingsData.map((b) => ({
      id: b.id,
      userId: b.userId ?? null,
      userName: b.userName ?? "Guest",
      userEmail: b.userEmail ?? "",
      tourId: b.tourId,
      tourTitle: b.tourTitle ?? b.tour,
      date: b.date,
      amount: b.amount ?? 0,
      amountUSD: b.amountUSD ?? Math.round((b.amount ?? 0) / USD_TO_TZS),
      status: b.status,
      paymentStatus: b.paymentStatus ?? "Pending",
      paymentMethod: b.paymentMethod ?? "MPESA",
      travelers: b.travelers ?? 1,
      createdAt: b.createdAt ?? b.date,
    }))
  );
  const [users, setUsers] = useState(persistedState?.users ?? initialUsers);
  const [guides, setGuides] = useState(persistedState?.guides ?? initialGuides);
  const [logs, setLogs] = useState(persistedState?.logs ?? initialLogs);
  const [notifications, setNotifications] = useState(persistedState?.notifications ?? initialNotifications);
  const [payments, setPayments] = useState(persistedState?.payments ?? []);
  const [reviews, setReviews] = useState(persistedState?.reviews ?? reviewsData.map((r) => ({ ...r, createdAt: r.createdAt || new Date().toISOString() })));
  const [nextId, setNextId] = useState(persistedState?.nextId ?? 100);

  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ tours, bookings, users, guides, logs, notifications, payments, reviews, nextId })
      );
    } catch (e) {
      console.warn("Failed to persist state:", e);
    }
  }, [tours, bookings, users, guides, logs, notifications, payments, reviews, nextId]);

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

  const addNotification = useCallback((userEmail, title, content) => {
    setNotifications((prev) => [
      {
        id: Date.now() + Math.random(),
        userEmail,
        title,
        content,
        isRead: false,
        createdAt: new Date().toISOString().slice(0, 16).replace("T", " ")
      },
      ...prev
    ]);
  }, []);

  const markNotificationAsRead = useCallback((id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllNotificationsAsRead = useCallback((userEmail) => {
    setNotifications((prev) =>
      prev.map((n) => (n.userEmail === userEmail ? { ...n, isRead: true } : n))
    );
  }, []);

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
    const transactionId = booking.transactionId || paymentService.generateTransactionId(booking.paymentMethod);
    const paymentMethod = booking.paymentMethod || "MPESA";
    const paymentStatus = booking.paymentStatus || "Paid";

    const newBooking = {
      ...booking,
      id: nextId,
      status: booking.status || "Pending",
      paymentStatus,
      paymentMethod,
      createdAt: new Date().toISOString().slice(0, 10),
      amountUSD: booking.amountUSD || Math.round(booking.amount / USD_TO_TZS),
      transactionId,
    };
    setBookings((prev) => [...prev, newBooking]);

    // Record the payment in the payments ledger (single source of truth)
    const newPayment = {
      id: `PAY-${transactionId}`,
      bookingId: nextId,
      transactionId,
      method: paymentMethod,
      status: paymentStatus,
      amount: booking.amount,
      amountUSD: newBooking.amountUSD,
      userEmail: booking.userEmail,
      userName: booking.userName,
      tourId: booking.tourId,
      tourTitle: booking.tourTitle,
      phone: booking.phone || "",
      createdAt: newBooking.createdAt,
    };
    setPayments((prev) => [newPayment, ...prev]);

    addLog("Booking Created", booking.userEmail || "system", `Booked ${booking.tourTitle} via ${paymentMethod} | Transaction: ${transactionId}`);
    setNextId((prev) => prev + 1);

    // Trigger SMS Service Simulation
    notificationService.triggerBookingSms(
      booking.phone || "+255 712 345 678",
      booking.tourTitle,
      booking.amount,
      transactionId
    );

    // Create in-app notifications
    addNotification(
      booking.userEmail,
      "💳 Payment Received",
      `Payment of ${formatTZS(booking.amount)} received via ${paymentMethod}. Transaction ID: ${transactionId}`
    );
    addNotification(
      booking.userEmail,
      "⏳ Booking Pending Confirmation",
      `Your booking for ${booking.tourTitle} is pending confirmation by an administrator.`
    );

    return newBooking;
  }, [nextId, addLog, addNotification]);

  const updateBookingStatus = useCallback((id, status) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    // Keep the payment ledger in sync: confirmed payments settle, rejected ones are refunded.
    if (status === "Confirmed" || status === "Rejected") {
      setPayments((prev) =>
        prev.map((p) =>
          p.bookingId === id
            ? { ...p, status: status === "Confirmed" ? "Paid" : "Refunded" }
            : p
        )
      );
    }
    addLog("Booking Updated", "admin@example.com", `Updated booking ID: ${id} to ${status}`);
  }, [addLog]);

  const cancelBooking = useCallback((id) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: "Cancelled" } : b)));
    addLog("Booking Cancelled", "system", `Cancelled booking ID: ${id}`);
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
    setUsers((prev) => prev.filter((u) => (u.id ?? u.email) !== id));
    addLog("User Deleted", "system", `Deleted user ID: ${id}`);
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

  const addReview = useCallback((review) => {
    const newReview = {
      ...review,
      id: nextId,
      createdAt: new Date().toISOString(),
    };
    setReviews((prev) => [...prev, newReview]);
    setNextId((prev) => prev + 1);
    return newReview;
  }, [nextId]);

  const getReviewsByTourId = useCallback((tourId) => {
    return reviews.filter((r) => r.tourId === tourId);
  }, [reviews]);

  const findGuideByEmail = useCallback((email) => {
    return guides.find((g) => g.email === email) || null;
  }, [guides]);

  const findUserByEmail = useCallback((email) => {
    return users.find((u) => u.email === email) || null;
  }, [users]);

  const value = {
    tours, addTour, updateTour, deleteTour, assignGuide,
    bookings, addBooking, updateBookingStatus, cancelBooking,
    users, addUser, updateUser, deleteUser, findUserByEmail,
    guides, addGuide, updateGuide, deleteGuide, findGuideByEmail,
    payments,
    logs, addLog,
    notifications, addNotification, markNotificationAsRead, markAllNotificationsAsRead,
    reviews, addReview, getReviewsByTourId,
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
