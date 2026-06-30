const tips = [
  {
    title: 'Best time to visit',
    body: 'The dry season from June to October is ideal for safaris and beach travel, while the green season offers quieter landscapes and better value.',
  },
  {
    title: 'What to pack',
    body: 'Bring breathable clothing, sun protection, a light jacket for evenings, and comfortable walking shoes for excursions.',
  },
  {
    title: 'Stay connected',
    body: 'A local SIM card or eSIM makes navigation, ride-hailing, and communication easier when you are moving between destinations.',
  },
  {
    title: 'Book with flexibility',
    body: 'Choose tours with transparent cancellation terms and confirmed pickup details to avoid surprises during your trip.',
  },
];

function TravelTips() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors">
      <section className="max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="max-w-3xl mb-12">
          <span className="inline-flex items-center rounded-full bg-amber-100 dark:bg-amber-950/40 px-3 py-1 text-sm font-semibold text-amber-700 dark:text-amber-400">
            Smart travel essentials
          </span>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white">
            Travel tips that make every trip smoother
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-slate-400">
            From planning to arrival, these practical insights help you travel with confidence and enjoy more of what matters.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tips.map((tip) => (
            <div key={tip.title} className="rounded-3xl border border-gray-200 dark:border-slate-800 bg-gray-50 dark:bg-slate-800/70 p-7 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{tip.title}</h2>
              <p className="mt-3 text-gray-600 dark:text-slate-400 leading-relaxed">{tip.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default TravelTips;
