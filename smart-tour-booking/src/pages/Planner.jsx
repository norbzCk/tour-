import { Link } from 'react-router-dom';

const itineraryDays = [
  {
    day: 'Day 1',
    title: 'Stone Town & Cultural Immersion',
    highlights: [
      'Historic Stone Town walking tour',
      'Lunch at a local spice market cafe',
      'Sunset dhow cruise along the coast',
    ],
    notes: 'Ideal for travelers arriving early and wanting a relaxed introduction to Zanzibar.',
  },
  {
    day: 'Day 2',
    title: 'Marine Adventure & Relaxation',
    highlights: [
      'Snorkeling trip at Mnemba Atoll',
      'Beach lunch and swimming stop',
      'Optional spa session in the evening',
    ],
    notes: 'Best scheduled on a calm day with clear water and favorable tide conditions.',
  },
  {
    day: 'Day 3',
    title: 'Nature Escape & Scenic Departure',
    highlights: [
      'Visit Jozani Forest for colobus monkeys',
      'Coffee break at a local farm',
      'Transfer for departure with luggage support',
    ],
    notes: 'A flexible closing day that pairs nature, culture, and smooth travel logistics.',
  },
];

function Planner() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 transition-colors">
      <style>{`
        @page {
          size: 8.5in 11in;
          margin: 0.79in;
        }

        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .planner-shell {
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
          }
          .no-print {
            display: none !important;
          }
          h2 {
            color: #111827 !important;
            font-size: 18pt !important;
            font-weight: 700 !important;
            margin-bottom: 0.15in !important;
          }
          h3 {
            color: #111827 !important;
            font-size: 13pt !important;
            font-weight: 700 !important;
            margin-top: 0.16in !important;
            margin-bottom: 0.08in !important;
          }
          p {
            color: #111827 !important;
            line-height: 115% !important;
            margin-bottom: 0.08in !important;
          }
          .planner-card {
            break-inside: avoid;
            box-shadow: none !important;
            border: 1px solid #e5e7eb !important;
          }
        }
      `}</style>

      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="planner-shell rounded-[2rem] border border-gray-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 p-8 md:p-10 shadow-2xl backdrop-blur-sm">
          <div className="no-print flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
              <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                Trip planner
              </span>
              <h1 className="mt-3 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
                Create a polished itinerary in minutes
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 dark:text-slate-400">
                Present your travel plan clearly with a professional schedule your guests can save, review, or print.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.print()}
                className="rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                Print Itinerary
              </button>
              <Link to="/tours" className="rounded-full border border-gray-300 dark:border-slate-700 px-5 py-3 font-semibold text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
                Browse Tours
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-emerald-100 dark:border-emerald-900/40 bg-emerald-50/70 dark:bg-emerald-950/20 p-6 md:p-8 mb-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">Suggested Zanzibar Escape</p>
                <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">3-day curated travel plan for first-time visitors</h2>
              </div>
              <div className="rounded-2xl bg-white dark:bg-slate-900 px-4 py-3 shadow-sm">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-slate-400">Travel style</p>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Culture + Adventure + Beach</p>
              </div>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {itineraryDays.map((item) => (
              <article key={item.day} className="planner-card rounded-3xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{item.day}</p>
                <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-600 dark:text-slate-400">
                  {item.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-slate-400">{item.notes}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Planner;
