function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Explore the World with SmartTour</h1>
        <p className="text-xl text-gray-600 mb-8">Handpicked tours, seamless booking, unforgettable experiences.</p>
        <a href="/tours" className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">Browse Tours</a>
      </div>
    </div>
  );
}

export default Home;
