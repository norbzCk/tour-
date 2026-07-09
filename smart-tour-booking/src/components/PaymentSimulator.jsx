import { useState } from "react";
import { motion } from "framer-motion";
import { paymentService, PAYMENT_METHODS, TZ_BANKS } from "../services/paymentService";

function methodMeta(method) {
  return PAYMENT_METHODS.find((m) => m.id === method) || PAYMENT_METHODS[0];
}

function ProgressBar({ progress }) {
  return (
    <div className="pt-2">
      <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
        <span>Processing Payment</span>
        <span>{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

function SuccessCard({ transactionId, paymentStatus }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl bg-green-50 dark:bg-green-950/20 border border-green-100 dark:border-green-900/30 p-4 text-center"
    >
      <div className="w-12 h-12 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mx-auto mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      </div>
      <p className="text-sm font-semibold text-green-700 dark:text-green-400">Payment Successful!</p>
      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
        {paymentStatus === "Pending" ? "Awaiting bank clearance • " : ""}
        Transaction: <span className="font-bold">{transactionId}</span>
      </p>
    </motion.div>
  );
}

function ErrorCard({ error }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3 text-sm flex items-center gap-2"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
      </svg>
      {error}
    </motion.div>
  );
}

function PaymentSimulator({ amount, amountLabel, initialPhone = "", onSuccess, onCancel }) {
  const [method, setMethod] = useState(null);
  const [step, setStep] = useState("select"); // select | pay | done
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [progress, setProgress] = useState(0);
  const [transactionId, setTransactionId] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("Paid");

  // Mobile money state
  const [phone, setPhone] = useState(initialPhone);
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);

  // Card state
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  // Bank state
  const [bank, setBank] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const isMobile = method === "MPESA" || method === "AIRTEL";

  const startProgress = (target, stepMs, increment) => {
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + increment;
      });
    }, stepMs);
    return interval;
  };

  const finishSuccess = (result, extra = {}) => {
    setTransactionId(result.transactionId);
    setPaymentStatus(result.status === "Pending" ? "Pending" : "Paid");
    setProcessing(false);
    setProgress(100);
    setStep("done");
    onSuccess({
      paymentMethod: method,
      transactionId: result.transactionId,
      paymentStatus: result.status === "Pending" ? "Pending" : "Paid",
      phone: isMobile ? phone.trim() : undefined,
      ...extra,
    });
  };

  const handleSelectMethod = (id) => {
    setMethod(id);
    setError("");
    setStep("pay");
    setShowPinInput(false);
    setPin("");
    setProgress(0);
  };

  const validatePhone = () => {
    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return false;
    }
    if (!/^(\+255|0)\d{9}$/.test(phone.trim()) && !/^\+?\d{9,15}$/.test(phone.trim())) {
      setError("Please enter a valid Tanzanian phone number (e.g., +255712345678 or 0712345678).");
      return false;
    }
    setError("");
    return true;
  };

  const handleMobileInitiate = async () => {
    if (!validatePhone()) return;
    setProcessing(true);
    setError("");
    setShowPinInput(true);
    const interval = startProgress(30, 200, 8);

    try {
      if (method === "MPESA") {
        await paymentService.initiateStkPush(phone.trim(), amount);
      } else {
        await paymentService.initiateAirtelPush(phone.trim(), amount);
      }
      setProcessing(false);
      clearInterval(interval);
    } catch (err) {
      setError(err.message || "Payment request failed");
      setProcessing(false);
      clearInterval(interval);
      setProgress(0);
      setShowPinInput(false);
    }
  };

  const handleMobileConfirm = async () => {
    if (pin.length !== 4) {
      setError("Please enter a valid 4-digit PIN.");
      return;
    }
    setProcessing(true);
    setError("");
    setProgress(30);
    const interval = startProgress(100, 300, 12);

    try {
      const result =
        method === "MPESA"
          ? await paymentService.confirmPayment("ws_CO_" + Date.now(), pin)
          : await paymentService.confirmAirtelPayment("air_CO_" + Date.now(), pin);
      clearInterval(interval);
      finishSuccess(result);
    } catch (err) {
      setError(err.message || "Payment failed");
      setProcessing(false);
      clearInterval(interval);
      setProgress(0);
    }
  };

  const handleCardPay = async () => {
    setProcessing(true);
    setError("");
    const interval = startProgress(100, 300, 12);
    try {
      const result = await paymentService.processCardPayment({
        cardNumber,
        cardName,
        expiry,
        cvv,
        amount,
      });
      clearInterval(interval);
      finishSuccess(result);
    } catch (err) {
      setError(err.message || "Card payment failed");
      setProcessing(false);
      clearInterval(interval);
      setProgress(0);
    }
  };

  const handleBankPay = async () => {
    setProcessing(true);
    setError("");
    const interval = startProgress(100, 300, 12);
    try {
      const result = await paymentService.processBankTransfer({
        bank,
        accountNumber,
        accountName,
        amount,
      });
      clearInterval(interval);
      finishSuccess(result);
    } catch (err) {
      setError(err.message || "Bank transfer failed");
      setProcessing(false);
      clearInterval(interval);
      setProgress(0);
    }
  };

  const resetMethod = () => {
    setMethod(null);
    setStep("select");
    setError("");
    setShowPinInput(false);
    setPin("");
    setProgress(0);
    setCardNumber("");
    setCardName("");
    setExpiry("");
    setCvv("");
    setBank("");
    setAccountNumber("");
    setAccountName("");
  };

  const meta = methodMeta(method);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 p-6 overflow-hidden transition-colors"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${meta.color} flex items-center justify-center text-xl shadow-md`}>
          {meta.icon}
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Secure Payment</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Choose how you'd like to pay</p>
        </div>
      </div>

      <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-green-950/10 p-4 border border-green-100 dark:border-green-900/30 mb-6">
        <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Amount to Pay</p>
        <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">{amountLabel}</p>
      </div>

      {error && <div className="mb-4"><ErrorCard error={error} /></div>}

      {/* Step 1: method selection */}
      {step === "select" && (
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PAYMENT_METHODS.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => handleSelectMethod(m.id)}
              className="group flex flex-col items-start gap-1 p-4 rounded-2xl border border-gray-200 dark:border-slate-700 hover:border-green-400 dark:hover:border-green-500 hover:shadow-md transition bg-gray-50/50 dark:bg-slate-800/50 text-left"
            >
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center text-lg`}>
                {m.icon}
              </div>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">{m.label}</p>
              <p className="text-xs text-gray-500 dark:text-slate-400 leading-tight">{m.description}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: method-specific payment form */}
      {step === "pay" && (
        <div className="space-y-4">
          <button
            type="button"
            onClick={resetMethod}
            disabled={processing}
            className="text-xs text-gray-500 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 font-semibold flex items-center gap-1 disabled:opacity-60"
          >
            ← Change payment method
          </button>

          {/* Mobile money */}
          {isMobile && !showPinInput && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500 dark:text-slate-400 text-sm font-medium">+255</span>
                  </div>
                  <input
                    type="tel"
                    value={phone.startsWith("+255") ? phone.slice(4) : phone.startsWith("0") ? phone.slice(1) : phone}
                    onChange={(e) => setPhone("+255" + e.target.value.replace(/\D/g, ""))}
                    placeholder="712 345 678"
                    className="w-full pl-14 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={onCancel} disabled={processing} className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60">
                  Cancel
                </button>
                <button type="button" onClick={handleMobileInitiate} disabled={processing} className={`flex-1 bg-gradient-to-r ${meta.color} text-white py-3.5 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2`}>
                  {processing ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Sending...</>) : "Send Payment Request"}
                </button>
              </div>
            </div>
          )}

          {isMobile && showPinInput && (
            <div className="space-y-4">
              <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-4">
                <div className="flex items-center gap-2 mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Payment Request Sent</p>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
                  Check your phone <span className="font-bold">{phone}</span> and enter your PIN to confirm.
                </p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">PIN (4 digits)</label>
                <div className="relative">
                  <input
                    type="password"
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="••••"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white text-center text-2xl font-bold tracking-widest"
                    maxLength={4}
                  />
                  <div className="absolute inset-y-0 right-4 flex items-center">
                    <div className="flex gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full transition ${i < pin.length ? "bg-green-500" : "bg-gray-300 dark:bg-slate-600"}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <ProgressBar progress={progress} />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={() => setShowPinInput(false)} disabled={processing} className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60">
                  Back
                </button>
                <button type="button" onClick={handleMobileConfirm} disabled={processing || pin.length !== 4} className={`flex-1 bg-gradient-to-r ${meta.color} text-white py-3.5 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2`}>
                  {processing ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Confirming...</>) : "Confirm Payment"}
                </button>
              </div>
            </div>
          )}

          {/* Card */}
          {method === "CARD" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  placeholder="4242 4242 4242 4242"
                  inputMode="numeric"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Cardholder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Expiry (MM/YY)</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="08/29"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">CVV</label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    placeholder="123"
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white text-center font-bold tracking-widest"
                  />
                </div>
              </div>
              <ProgressBar progress={progress} />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={onCancel} disabled={processing} className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60">
                  Cancel
                </button>
                <button type="button" onClick={handleCardPay} disabled={processing} className={`flex-1 bg-gradient-to-r ${meta.color} text-white py-3.5 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2`}>
                  {processing ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Processing...</>) : "Pay with Card"}
                </button>
              </div>
            </div>
          )}

          {/* Bank */}
          {method === "BANK" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Bank</label>
                <select
                  value={bank}
                  onChange={(e) => setBank(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                >
                  <option value="">Select your bank</option>
                  {TZ_BANKS.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Account Number</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="0123456789"
                  inputMode="numeric"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Account Holder Name</label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="JOHN DOE"
                  className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-slate-400">Transfers clear asynchronously; the booking will be marked pending until your bank confirms and an admin approves.</p>
              <ProgressBar progress={progress} />
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button type="button" onClick={onCancel} disabled={processing} className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60">
                  Cancel
                </button>
                <button type="button" onClick={handleBankPay} disabled={processing} className={`flex-1 bg-gradient-to-r ${meta.color} text-white py-3.5 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2`}>
                  {processing ? (<><svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> Transferring...</>) : "Pay with Bank"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Step 3: success */}
      {step === "done" && (
        <div className="space-y-4">
          <SuccessCard transactionId={transactionId} paymentStatus={paymentStatus} />
          <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-4 border border-gray-100 dark:border-slate-700">
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500 dark:text-slate-400">Method</span>
              <span className="font-semibold text-gray-900 dark:text-white">{meta.label}</span>
            </div>
            <div className="flex justify-between text-sm py-1">
              <span className="text-gray-500 dark:text-slate-400">Status</span>
              <span className="font-semibold text-green-700 dark:text-green-400">{paymentStatus}</span>
            </div>
            {isMobile && (
              <div className="flex justify-between text-sm py-1">
                <span className="text-gray-500 dark:text-slate-400">Phone</span>
                <span className="font-semibold text-gray-900 dark:text-white">{phone}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default PaymentSimulator;
