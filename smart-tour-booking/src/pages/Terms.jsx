import { Link } from "react-router-dom";

function Terms() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 mb-8">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Terms of Service</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">Last updated: June 2026</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Acceptance of Terms</h2>
            <p>By accessing or using SmartTour, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you may not use our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. Booking and Payments</h2>
            <p>All bookings made through SmartTour are subject to availability. Prices are displayed in Tanzanian Shillings (TZS) and USD for reference. Payments are simulated via M-Pesa for demonstration purposes in this academic project.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. User Responsibilities</h2>
            <p>Users must provide accurate information during registration and booking. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Cancellations and Refunds</h2>
            <p>Free cancellation is available up to 48 hours before tour departure. Refunds are processed according to the specific tour operator's policy. SmartTour facilitates communication but does not guarantee refunds directly.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Limitation of Liability</h2>
            <p>SmartTour is an academic project developed for educational purposes at the Institute of Finance Management. The platform is not a real commercial service, and no actual transactions or bookings are processed.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">6. Contact</h2>
            <p>For questions about these terms, please use our <Link to="/about" className="text-green-600 dark:text-green-400 hover:underline">Contact Us</Link> page.</p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Terms;
