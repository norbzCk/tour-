import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";

function Operators() {
  const { guides, bookings, tours, addGuide, updateGuide, deleteGuide } = useData();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", specialty: "Safari", experience: "", status: "Active" });

  const filtered = guides.filter((g) =>
    g.name.toLowerCase().includes(search.toLowerCase()) ||
    g.specialty.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", specialty: "Safari", experience: "", status: "Active" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (guide) => {
    setForm({ name: guide.name, email: guide.email, phone: guide.phone || "", specialty: guide.specialty, experience: guide.experience, status: guide.status });
    setEditingId(guide.id);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }
    if (editingId) {
      updateGuide(editingId, form);
    } else {
      addGuide(form);
    }
    resetForm();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete guide "${name}"?`)) {
      deleteGuide(id);
    }
  };

  const getGuideStats = (guideId) => {
    const assignedTours = tours.filter((t) => t.guideId === guideId).length;
    const relatedBookings = bookings.filter((b) => {
      const tour = tours.find((t) => t.id === b.tourId);
      return tour && tour.guideId === guideId;
    }).length;
    return { assignedTours, relatedBookings };
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title="Tour Guide Management"
        subtitle="Add, update, and manage tour guides and operators"
      />

      <div className="flex justify-between items-center">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search guides..." />
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition text-sm"
        >
          {showForm ? "Cancel" : "+ Add Guide"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5"
        >
          <h3 className="text-lg font-bold text-gray-800">{editingId ? "Edit Guide" : "New Guide"}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                placeholder="+255 712 000 000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specialty</label>
              <select
                value={form.specialty}
                onChange={(e) => setForm({ ...form, specialty: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
              >
                <option>Safari</option>
                <option>Beach</option>
                <option>Mountain</option>
                <option>City</option>
                <option>Adventure</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Experience</label>
              <input
                type="text"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
                placeholder="5 years"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-green-100 focus:border-green-500 transition bg-gray-50/50"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={resetForm}
              className="px-5 py-2.5 border border-gray-200 rounded-xl font-bold text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              {editingId ? "Update Guide" : "Create Guide"}
            </button>
          </div>
        </motion.form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((guide, i) => {
          const stats = getGuideStats(guide.id);
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-lg">
                  {guide.name[0]}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{guide.name}</h3>
                  <p className="text-sm text-gray-500">{guide.specialty} • {guide.experience}</p>
                </div>
                <div className="ml-auto">
                  <StatusBadge status={guide.status} />
                </div>
              </div>
              <p className="text-sm text-gray-600">{guide.email}</p>
              <p className="text-sm text-gray-600">{guide.phone || "No phone"}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-gray-500">Tours: <strong className="text-gray-800">{stats.assignedTours}</strong></span>
                <span className="text-gray-500">Bookings: <strong className="text-gray-800">{stats.relatedBookings}</strong></span>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => handleEdit(guide)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(guide.id, guide.name)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No guides found matching your search.</p>
        </div>
      )}
    </motion.div>
  );
}

export default Operators;
