import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-950/40 px-3 py-1 text-sm font-semibold text-blue-700 dark:text-blue-400">
              Why travelers choose SmartTour
            </span>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
              A modern travel experience built for comfort, clarity and discovery.
            </h1>
            <p className="mt-5 text-lg text-gray-600 dark:text-slate-400 leading-relaxed">
              SmartTour brings together curated tours, trusted booking tools, and clear trip information in one polished experience for travelers and operators alike.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/register" className="rounded-full bg-emerald-600 px-6 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors">
                Create Account
              </Link>
              <Link to="/tours" className="rounded-full border border-gray-300 dark:border-slate-700 px-6 py-3 font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                View Tours
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 shadow-xl">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 p-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Personalized planning</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">Discover experiences that reflect your style, pace, and travel goals.</p>
              </div>
              <div className="rounded-2xl bg-sky-50 dark:bg-sky-950/30 p-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Reliable booking flow</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">Enjoy a streamlined booking experience backed by secure account and payment handling.</p>
              </div>
              <div className="rounded-2xl bg-amber-50 dark:bg-amber-950/30 p-4">
                <h2 className="font-semibold text-gray-900 dark:text-white">Local support</h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-slate-400">Operators and travelers benefit from a platform designed for trust and clarity.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
