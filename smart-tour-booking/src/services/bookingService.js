/**
 * Booking Microservice Simulator
 * Simulates background workers for checking tour guide availability, 
 * booking confirmations, and auto-dispatch processes.
 */

export const bookingService = {
  /**
   * Simulates a background worker that reviews booking details and guide availability.
   * After 8-10 seconds, it transitions the booking status from "Pending" to "Confirmed"
   * and logs the system event.
   * 
   * @param {object} booking - The booking object
   * @param {Array} guides - Available tour guides
   * @param {function} onConfirm - Callback to update booking in DataContext
   * @param {function} onNotify - Callback to post in-app notification
   */
  startBackgroundApprovalWorker(booking, guides, onConfirm, onNotify) {
    if (booking.status !== "Pending") return;

    // Simulate background verification queue
    setTimeout(() => {
      // Find active guides matching the category or assign a random active guide
      const activeGuides = guides.filter((g) => g.status === "Active");
      const assignedGuide = activeGuides.length > 0 
        ? activeGuides[Math.floor(Math.random() * activeGuides.length)] 
        : null;

      // Update state via context
      onConfirm(booking.id, "Confirmed", assignedGuide ? assignedGuide.id : null);

      // Create a push notification
      onNotify(
        booking.userEmail,
        "🎉 Booking Confirmed!",
        `Your reservation for ${booking.tourTitle} (Booking #${booking.id}) is now Confirmed! Guide ${assignedGuide?.name || "will be assigned shortly"}.`
      );

      console.log(`[Worker] Auto-confirmed Booking #${booking.id} and assigned Guide: ${assignedGuide?.name || "None"}`);
    }, 10000); // 10 seconds delay
  }
};
