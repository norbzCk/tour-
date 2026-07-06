import { Link } from "react-router-dom";

function Privacy() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-green-600 dark:text-green-400 hover:text-green-700 mb-8">
          ← Back to Home
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">Privacy Policy</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-10">Last updated: June 2026</p>

        <div className="prose prose-gray dark:prose-invert max-w-none space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">1. Information We Collect</h2>
            <p>We collect personal information such as your name, email address, phone number, and payment details when you register, book a tour, or contact us. This information is used solely to provide and improve our services.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">2. How We Use Your Information</h2>
            <p>Your data is used to process bookings, send confirmations, improve user experience, and communicate important updates. We do not sell or share your personal information with third parties for marketing purposes.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">3. Data Security</h2>
            <p>We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or destruction. Payment transactions are simulated securely within the platform.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">4. Cookies</h2>
            <p>SmartTour uses local storage to enhance your experience, such as remembering your theme preference and booking history. You can clear this data at any time through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">5. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please reach out through our <Link to="/about" className="text-green-600 dark:text-green-400 hover:underline">Contact Us</Link> page.</p>
          </section>
        </div>
      </section>
    </div>
  );
}

export default Privacy;
