/**
 * Notification Service
 * Simulates in-app notifications and SMS gateway delivery confirmations
 */

export const notificationService = {
  /**
   * Simulates sending an SMS through a SMS gateway (e.g. Twilio/Beem SMS in Tanzania)
   * @param {string} phone - Recipient phone number
   * @param {string} message - Message text
   */
  sendSms(phone, message) {
    console.log(
      `%c[SMS Gateway] Sending to ${phone}:\n"${message}"`,
      "background: #10b981; color: white; padding: 4px; border-radius: 4px; font-weight: bold;"
    );
    
    // Create a visual logs storage inside localstorage for simulation
    const smsLogs = JSON.parse(localStorage.getItem("sms_simulation_logs") || "[]");
    smsLogs.unshift({
      id: Date.now() + Math.random(),
      phone,
      message,
      sentAt: new Date().toISOString().slice(11, 19),
    });
    localStorage.setItem("sms_simulation_logs", JSON.stringify(smsLogs.slice(0, 50)));
  },

  /**
   * Helper to format a standard SMS message for booking confirmation
   */
  triggerBookingSms(phone, tourTitle, amount, transactionId) {
    const message = `SmartTour: Confirmed! Your booking for ${tourTitle} has been received. Amount: Tsh ${Number(amount).toLocaleString("en-TZ")}. TxID: ${transactionId}. Thank you for booking with us!`;
    this.sendSms(phone, message);
  }
};
