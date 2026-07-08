/**
 * Payment Service
 * ---------------------------------------------------------------------------
 * Simulates a unified payments backend covering the most common Tanzanian and
 * international payment rails used by the platform:
 *   - M-PESA        (Daraja STK Push + PIN callback)
 *   - AIRTEL MONEY  (USSD push + PIN callback)
 *   - CARD          (Visa / Mastercard gateway)
 *   - BANK TRANSFER (TZ bank account transfer)
 *
 * Every method is fully simulated (no real network call) but mirrors the
 * request/response shape of the real provider so the UI and state behave the
 * same way a production integration would.
 *
 * All methods return a normalised receipt:
 *   { status, transactionId, method, amount, currency, timestamp, message }
 */

const SUPPORTED_METHODS = ["MPESA", "AIRTEL", "CARD", "BANK"];

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function randomDigits(length) {
  let out = "";
  for (let i = 0; i < length; i += 1) {
    out += Math.floor(Math.random() * 10).toString();
  }
  return out;
}

export const PAYMENT_METHODS = [
  {
    id: "MPESA",
    label: "M-PESA",
    description: "Tanzania mobile money (STK Push)",
    type: "mobile",
    color: "from-green-500 to-emerald-600",
    icon: "📱",
  },
  {
    id: "AIRTEL",
    label: "Airtel Money",
    description: "Airtel money wallet (USSD push)",
    type: "mobile",
    color: "from-red-500 to-rose-600",
    icon: "🔴",
  },
  {
    id: "CARD",
    label: "Card",
    description: "Visa / Mastercard",
    type: "card",
    color: "from-blue-500 to-indigo-600",
    icon: "💳",
  },
  {
    id: "BANK",
    label: "Bank Transfer",
    description: "Direct bank account transfer",
    type: "bank",
    color: "from-amber-500 to-orange-600",
    icon: "🏦",
  },
];

export const TZ_BANKS = [
  "CRDB Bank",
  "NMB Bank",
  "NBC Bank",
  "Stanbic Bank",
  "Absa Bank",
  "Equity Bank",
  "DTB Bank",
];

export const paymentService = {
  SUPPORTED_METHODS,

  /**
   * Generates a provider-formatted transaction/reference ID.
   * Kept backward compatible: called with no argument it returns an M-PESA id
   * matching /MPESA\d{8}/.
   */
  generateTransactionId(method = "MPESA") {
    switch (method) {
      case "CARD":
        return `CARD${randomDigits(12)}`;
      case "BANK":
        return `BANK${randomDigits(10)}`;
      case "AIRTEL":
        return `AIRTEL${randomDigits(8)}`;
      default:
        return `MPESA${randomDigits(8)}`;
    }
  },

  getPaymentMethods() {
    return PAYMENT_METHODS;
  },

  getBanks() {
    return TZ_BANKS;
  },

  /* ----------------------------- M-PESA --------------------------------- */
  /**
   * Simulates initiating an STK Push request to a phone number.
   * @returns {Promise<{ merchantRequestID, checkoutRequestID, responseDescription, status }>}
   */
  async initiateStkPush(phone, amount) {
    await delay(1500);

    if (!phone || !amount) {
      throw new Error("Phone number and amount are required for M-Pesa payment.");
    }
    if (!/^\+?\d{9,15}$/.test(phone.trim())) {
      throw new Error("Invalid phone number for M-Pesa STK Push.");
    }

    return {
      merchantRequestID: `REQ-${randomDigits(6)}`,
      checkoutRequestID: `ws_CO_${Date.now()}_${randomDigits(6)}`,
      responseDescription: "Success. Request accepted for processing.",
      status: "Accepted",
    };
  },

  /**
   * Simulates the STK Push PIN callback from the M-Pesa API.
   * @returns {Promise<{ status, transactionId, message, timestamp }>}
   */
  async confirmPayment(checkoutRequestID, pin) {
    await delay(2000);

    if (!pin || pin.length !== 4) {
      throw new Error("Invalid M-Pesa PIN. PIN must be 4 digits.");
    }

    return {
      status: "Success",
      transactionId: this.generateTransactionId("MPESA"),
      message: "Payment of STK Push completed successfully.",
      timestamp: new Date().toISOString(),
    };
  },

  /* --------------------------- AIRTEL MONEY ----------------------------- */
  async initiateAirtelPush(phone, amount) {
    await delay(1500);

    if (!phone || !amount) {
      throw new Error("Phone number and amount are required for Airtel Money.");
    }
    if (!/^\+?\d{9,15}$/.test(phone.trim())) {
      throw new Error("Invalid phone number for Airtel Money.");
    }

    return {
      merchantRequestID: `AIR-REQ-${randomDigits(6)}`,
      checkoutRequestID: `air_CO_${Date.now()}_${randomDigits(6)}`,
      responseDescription: "Success. Airtel push sent.",
      status: "Accepted",
    };
  },

  async confirmAirtelPayment(checkoutRequestID, pin) {
    await delay(2000);

    if (!pin || pin.length !== 4) {
      throw new Error("Invalid Airtel PIN. PIN must be 4 digits.");
    }

    return {
      status: "Success",
      transactionId: this.generateTransactionId("AIRTEL"),
      message: "Airtel Money payment completed successfully.",
      timestamp: new Date().toISOString(),
    };
  },

  /* ------------------------------- CARD --------------------------------- */
  /**
   * Simulates a Visa / Mastercard gateway charge.
   * @param {{ cardNumber, cardName, expiry, cvv, amount }} details
   */
  async processCardPayment({ cardNumber, cardName, expiry, cvv, amount }) {
    await delay(2000);

    const digits = (cardNumber || "").replace(/\s+/g, "");
    if (!/^\d{16}$/.test(digits)) {
      throw new Error("Invalid card number. Enter the 16-digit card number.");
    }
    if (!cardName || cardName.trim().length < 3) {
      throw new Error("Cardholder name is required.");
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry || "")) {
      throw new Error("Invalid expiry date. Use MM/YY format.");
    }
    const [mm] = expiry.split("/").map(Number);
    if (mm < 1 || mm > 12) {
      throw new Error("Invalid expiry month.");
    }
    if (!/^\d{3,4}$/.test(cvv || "")) {
      throw new Error("Invalid CVV. Enter the 3 or 4 digit code.");
    }
    if (!amount || amount <= 0) {
      throw new Error("A valid amount is required for card payment.");
    }

    return {
      status: "Success",
      transactionId: this.generateTransactionId("CARD"),
      message: "Card payment processed successfully.",
      timestamp: new Date().toISOString(),
    };
  },

  /* ---------------------------- BANK TRANSFER --------------------------- */
  /**
   * Simulates a bank account transfer. Banks clear asynchronously, so the
   * simulated status is "Pending" (awaiting clearance) which still lets the
   * booking be created and confirmed by an admin.
   * @param {{ bank, accountNumber, accountName, amount }} details
   */
  async processBankTransfer({ bank, accountNumber, accountName, amount }) {
    await delay(2200);

    if (!bank) {
      throw new Error("Please select your bank.");
    }
    if (!/^\d{10,15}$/.test((accountNumber || "").replace(/\s+/g, ""))) {
      throw new Error("Invalid account number. Use 10-15 digits.");
    }
    if (!accountName || accountName.trim().length < 3) {
      throw new Error("Account holder name is required.");
    }
    if (!amount || amount <= 0) {
      throw new Error("A valid amount is required for bank transfer.");
    }

    return {
      status: "Pending",
      transactionId: this.generateTransactionId("BANK"),
      message: "Bank transfer initiated. Awaiting clearance from your bank.",
      timestamp: new Date().toISOString(),
    };
  },

  /* --------------------------- UNIFIED FLOW ----------------------------- */
  /**
   * Routes a single-step payment (Card / Bank) through the right provider and
   * returns a normalised receipt. Mobile money (M-PESA / AIRTEL) uses the
   * two-step initiate + confirm flow and is handled directly in the UI.
   */
  async processPayment({ method, amount, details = {} }) {
    switch (method) {
      case "CARD":
        return this.processCardPayment({ ...details, amount });
      case "BANK":
        return this.processBankTransfer({ ...details, amount });
      default:
        throw new Error(`Unsupported payment method: ${method}`);
    }
  },
};
