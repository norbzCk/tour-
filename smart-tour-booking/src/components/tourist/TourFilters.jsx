import { FaSearch } from "react-icons/fa";

function TourFilters({ search, setSearch, category, setCategory }) {
  return (
    <div className="grid md:grid-cols-2 gap-4 mb-8">
      <div className="relative">
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search tours..."
          className="w-full border p-3 rounded-xl pl-10 focus:ring-2 focus:ring-green-500 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="border p-3 rounded-xl focus:ring-2 focus:ring-green-500 outline-none"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Safari">Safari</option>
        <option value="Beach">Beach</option>
        <option value="Adventure">Adventure</option>
        <option value="City">City</option>
      </select>
    </div>
  );
}

export default TourFilters;