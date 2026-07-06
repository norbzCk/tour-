import { useState } from "react";
import { motion } from "framer-motion";
import { paymentService } from "../services/paymentService";

function MpesaSimulator({ amountLabel, initialPhone = "", onSuccess, onCancel }) {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState(null);
  const [pin, setPin] = useState("");
  const [showPinInput, setShowPinInput] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  const validatePhone = () => {
    if (!phone.trim()) {
      setError("Please enter your MPESA phone number.");
      return false;
    }
    if (!/^(\+255|0)\d{9}$/.test(phone.trim()) && !/^\+?\d{9,15}$/.test(phone.trim())) {
      setError("Please enter a valid Tanzanian phone number (e.g., +255712345678 or 0712345678).");
      return false;
    }
    setError("");
    return true;
  };

  const handleInitiatePayment = async () => {
    if (!validatePhone()) return;
    setProcessing(true);
    setStatus(null);
    setError("");
    setShowPinInput(true);
    setSimulatedProgress(0);

    const progressInterval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 30) {
          clearInterval(progressInterval);
          return prev;
        }
        return prev + Math.random() * 10;
      });
    }, 200);
  };

  const handleConfirmPin = async () => {
    if (pin.length !== 4) {
      setError("Please enter a valid 4-digit MPESA PIN.");
      return;
    }

    setProcessing(true);
    setSimulatedProgress(30);

    const progressInterval = setInterval(() => {
      setSimulatedProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 10 + 5;
      });
    }, 300);

    try {
      const result = await paymentService.confirmPayment("ws_CO_" + Date.now(), pin);
      setTransactionId(result.transactionId);
      setStatus("success");
      setProcessing(false);
      clearInterval(progressInterval);
      setSimulatedProgress(100);

      onSuccess({ phone: phone.trim(), transactionId: result.transactionId, paymentStatus: "Paid" });
    } catch (err) {
      setError(err.message || "Payment failed");
      setProcessing(false);
      clearInterval(progressInterval);
      setSimulatedProgress(0);
    }
  };

  const resetState = () => {
    setPin("");
    setShowPinInput(false);
    setStatus(null);
    setError("");
    setSimulatedProgress(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800 p-6 overflow-hidden transition-colors"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-xl shadow-md">
          💳
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">MPESA Payment Simulation</h2>
          <p className="text-sm text-gray-500 dark:text-slate-400">Secure M-Pesa STK Push payment</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-green-950/10 p-4 border border-green-100 dark:border-green-900/30">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Amount to Pay</p>
          <p className="text-2xl font-extrabold text-green-700 dark:text-green-400">{amountLabel}</p>
        </div>

        <div className="rounded-2xl bg-gray-50 dark:bg-slate-800 p-4 border border-transparent dark:border-slate-700/50">
          <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-1">Payment Method</p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-[10px] font-bold">M</span>
            </div>
            <p className="text-sm font-medium text-gray-700 dark:text-slate-200">M-Pesa</p>
          </div>
        </div>
      </div>

      {!showPinInput ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">MPESA Phone Number</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="text-gray-500 dark:text-slate-400 text-sm font-medium">+255</span>
              </div>
              <input
                type="tel"
                value={phone.startsWith("+255") ? phone.slice(4) : phone.startsWith("0") ? phone.slice(1) : phone}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, "");
                  setPhone("+255" + val);
                }}
                placeholder="712 345 678"
                className="w-full pl-14 pr-4 py-3.5 rounded-2xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-400 transition bg-gray-50 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          {error && (
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
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={onCancel}
              disabled={processing}
              className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleInitiatePayment}
              disabled={processing}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-2xl font-bold hover:shadow-lg hover:shadow-green-200 transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </>
              ) : (
                "Initiate Payment"
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 p-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm font-semibold text-blue-700 dark:text-blue-400">Payment Request Sent</p>
            </div>
            <p className="text-xs text-blue-600 dark:text-blue-400 leading-relaxed">
              Check your phone <span className="font-bold">{phone}</span> and enter your MPESA PIN to confirm.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">MPESA PIN (4 digits)</label>
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

          {error && (
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
          )}

          {status === "success" && (
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
              <p className="text-xs text-green-600 dark:text-green-400 mt-1">Transaction: <span className="font-bold">{transactionId}</span></p>
            </motion.div>
          )}

          <div className="pt-2">
            <div className="flex justify-between text-xs text-gray-500 dark:text-slate-400 mb-1">
              <span>Processing Payment</span>
              <span>{Math.round(simulatedProgress)}%</span>
            </div>
            <div className="h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${simulatedProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={resetState}
              disabled={processing}
              className="flex-1 border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-300 py-3.5 rounded-2xl font-semibold hover:bg-gray-50 dark:hover:bg-slate-800 transition disabled:opacity-60"
            >
              Back
            </button>
            <button
              type="button"
              onClick={handleConfirmPin}
              disabled={processing || pin.length !== 4}
              className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {processing ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Confirming...
                </>
              ) : (
                "Confirm Payment"
              )}
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default MpesaSimulator;
