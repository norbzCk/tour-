/**
 * Payment Service
 * Simulates M-Pesa Integration (STK Push API, Callback handler, and payment reconciliation)
 */

export const paymentService = {
  /**
   * Generates a random M-Pesa transaction ID
   * Format: MPESAXXXXXXXX (e.g. MPESA98765432)
   */
  generateTransactionId() {
    return `MPESA${Math.floor(10000000 + Math.random() * 90000000)}`;
  },

  /**
   * Simulates initiating an STK Push to a phone number.
   * @param {string} phone - User phone number (+255...)
   * @param {number} amount - Amount in TZS
   * @returns {Promise<{ merchantRequestID: string, checkoutRequestID: string, responseDescription: string }>}
   */
  async initiateStkPush(phone, amount) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (!phone || !amount) {
      throw new Error("Phone number and amount are required for M-Pesa payment.");
    }

    const merchantRequestID = `REQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const checkoutRequestID = `ws_CO_${Date.now()}_${Math.floor(100000 + Math.random() * 900000)}`;

    return {
      merchantRequestID,
      checkoutRequestID,
      responseDescription: "Success. Request accepted for processing.",
      status: "Accepted",
    };
  },

  /**
   * Simulates PIN validation and payment completion callback from M-Pesa API
   * @param {string} checkoutRequestID 
   * @param {string} pin - 4-digit PIN
   * @returns {Promise<{ status: string, transactionId: string, message: string }>}
   */
  async confirmPayment(checkoutRequestID, pin) {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (pin.length !== 4) {
      throw new Error("Invalid M-Pesa PIN. PIN must be 4 digits.");
    }

    const transactionId = this.generateTransactionId();
    
    return {
      status: "Success",
      transactionId,
      message: "Payment of STK Push completed successfully.",
      timestamp: new Date().toISOString(),
    };
  }
};
