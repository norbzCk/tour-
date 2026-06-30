import { Link } from 'react-router-dom';

const destinations = [
  {
    name: 'Zanzibar',
    highlight: 'Sun-soaked beaches, spice farms and cultural heritage',
    description: 'Enjoy laid-back island escapes, dhow cruises, and unforgettable sunsets in one of East Africa’s most vibrant destinations.',
    badge: 'Island Escape',
  },
  {
    name: 'Serengeti',
    highlight: 'World-class wildlife and dramatic safari adventures',
    description: 'Witness the Great Migration and experience authentic game drives in the heart of Tanzania’s wild landscapes.',
    badge: 'Safari',
  },
  {
    name: 'Kilimanjaro',
    highlight: 'Epic summit trails and awe-inspiring highland views',
    description: 'Challenge yourself with guided treks, expert support, and unforgettable alpine scenery.',
    badge: 'Adventure',
  },
  {
    name: 'Dar es Salaam',
    highlight: 'Dynamic city culture, cuisine and coastal charm',
    description: 'Blend urban exploration with relaxing beach time for a balanced stay in Tanzania’s busiest gateway city.',
    badge: 'City Break',
  },
];

function Destinations() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white dark:from-slate-950 dark:to-slate-900 transition-colors">
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center rounded-full bg-emerald-100 dark:bg-emerald-950/40 px-3 py-1 text-sm font-semibold text-emerald-700 dark:text-emerald-400">
            Curated destinations
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Discover unforgettable destinations
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            Every journey is designed to combine comfort, local insight, and extraordinary experiences that feel personal and effortless.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {destinations.map((destination) => (
            <div key={destination.name} className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 shadow-lg p-8 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{destination.name}</h2>
                <span className="rounded-full bg-green-100 dark:bg-green-950/30 px-3 py-1 text-xs font-semibold text-green-700 dark:text-green-400">
                  {destination.badge}
                </span>
              </div>
              <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-3">{destination.highlight}</p>
              <p className="text-gray-600 dark:text-slate-400 leading-relaxed">{destination.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-slate-900 dark:bg-slate-800 p-8 text-white shadow-2xl">
          <h3 className="text-2xl font-bold">Ready to build your next itinerary?</h3>
          <p className="mt-3 text-slate-300 max-w-2xl">
            Explore our handpicked tours, compare experiences, and book with confidence in minutes.
          </p>
          <Link to="/tours" className="mt-6 inline-flex items-center rounded-full bg-emerald-500 px-5 py-3 font-semibold text-white hover:bg-emerald-400 transition-colors">
            Explore Tours
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Destinations;
