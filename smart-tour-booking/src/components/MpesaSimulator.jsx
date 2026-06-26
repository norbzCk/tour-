import { useState } from "react";
import { motion } from "framer-motion";

function MpesaSimulator({ amountLabel, initialPhone = "", onSuccess, onCancel }) {
  const [phone, setPhone] = useState(initialPhone);
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!phone.trim()) {
      setError("Please enter your MPESA phone number.");
      return;
    }
    if (!/^\+?\d{9,15}$/.test(phone.trim())) {
      setError("Please enter a valid phone number in international format.");
      return;
    }
    setProcessing(true);
    setStatus(null);
    const transaction = `MPESA-${Date.now().toString().slice(-8)}`;
    await new Promise((resolve) => setTimeout(resolve, 1400));
    setTransactionId(transaction);
    setStatus("success");
    setProcessing(false);
    onSuccess({ phone: phone.trim(), transactionId: transaction, paymentStatus: "Paid" });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6"
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl font-bold">
          💳
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">MPESA Payment Simulation</h2>
          <p className="text-sm text-gray-500">Simulate an MPESA STK Push and complete the booking payment securely.</p>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">Amount to pay</p>
          <p className="mt-1 text-lg font-bold text-green-700">{amountLabel}</p>
        </div>
        <div className="rounded-2xl bg-gray-50 p-4 text-sm text-gray-700">
          <p className="font-semibold text-gray-900">Payment method</p>
          <p className="mt-1">MPESA</p>
        </div>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">MPESA Phone Number</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+255712345678"
            className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-emerald-100 focus:border-emerald-400 transition bg-gray-50"
          />
        </div>

        {error && (
          <div className="rounded-2xl bg-red-50 border border-red-100 text-red-700 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl bg-green-50 border border-green-100 text-green-700 px-4 py-3 text-sm"
          >
            Payment request sent. Transaction ID <span className="font-semibold">{transactionId}</span>.
          </motion.div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={processing}
            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-2xl font-bold hover:shadow-lg transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {processing ? "Sending MPESA Push..." : "Simulate MPESA Payment"}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 border border-gray-200 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
}

export default MpesaSimulator;
