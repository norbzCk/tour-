import { useState } from "react";
import tours from "../data/tours";
import TourCard from "../components/tourist/TourCard";
import TourFilters from "../components/tourist/TourFilters";

function Tours() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const filteredTours = tours.filter((tour) => {
    const matchesSearch =
      tour.title.toLowerCase().includes(search.toLowerCase()) ||
      tour.destination.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = category === "All" || tour.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 bg-slate-50 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Explore Tours</h1>

      <TourFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} />

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredTours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </div>
  );
}

export default Tours;