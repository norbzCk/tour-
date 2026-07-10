import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";

function ToursAdmin() {
  const { tours, guides, addTour, updateTour, deleteTour, assignGuide, formatTZS } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showGuideForm, setShowGuideForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ title: "", destination: "", slug: "", category: "Safari", price: "", duration: "", description: "", image: "", guideId: "" });
  const [guideForm, setGuideForm] = useState({ name: "", email: "", phone: "", specialty: "Safari", experience: "", status: "Active" });
  const fileInputRef = useRef(null);

  const filtered = tours.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()) ||
    t.destination.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ title: "", destination: "", slug: "", category: "Safari", price: "", duration: "", description: "", image: "", guideId: "" });
    setEditingId(null);
    setShowForm(false);
  };

  const resetGuideForm = () => {
    setGuideForm({ name: "", email: "", phone: "", specialty: "Safari", experience: "", status: "Active" });
    setShowGuideForm(false);
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 40);
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm({ ...form, title, slug: generateSlug(title) });
  };

  const handleEdit = (tour) => {
    setForm({
      title: tour.title,
      destination: tour.destination,
      slug: tour.slug || generateSlug(tour.title),
      category: tour.category,
      price: tour.price.toString(),
      duration: tour.duration,
      description: tour.description,
      image: tour.image,
      guideId: tour.guideId ? tour.guideId.toString() : "",
    });
    setEditingId(tour.id);
    setShowForm(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm({ ...form, image: ev.target.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: form.title,
      destination: form.destination,
      slug: form.slug,
      category: form.category,
      price: Number(form.price),
      duration: form.duration,
      description: form.description,
      image: form.image || "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      guideId: form.guideId ? Number(form.guideId) : null,
    };
    if (!data.title || !data.destination || !data.price || !data.duration) {
      alert("Please fill in all required fields");
      return;
    }
    if (editingId) {
      updateTour(editingId, data);
    } else {
      addTour(data);
    }
    resetForm();
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      deleteTour(id);
    }
  };

  const handleGuideSubmit = (e) => {
    e.preventDefault();

    if (!guideForm.name || !guideForm.email || !guideForm.specialty) {
      alert("Please fill in the required guide fields");
      return;
    }

    addGuide({
      name: guideForm.name,
      email: guideForm.email,
      phone: guideForm.phone,
      specialty: guideForm.specialty,
      experience: guideForm.experience || "New",
      status: guideForm.status,
      bio: "Added from the tours management dashboard",
      languages: "English, Swahili",
      rating: 4.6,
    });

    resetGuideForm();
  };

  const handleAssignGuide = (tourId, guideId) => {
    assignGuide(tourId, Number(guideId));
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader
        title="Tours Management"
        subtitle="Add, update, delete tours and manage tour guides"
      />

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tours..." />
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => { resetGuideForm(); setShowGuideForm(!showGuideForm); }}
            className="px-5 py-2.5 border border-green-200 dark:border-green-700 text-green-700 dark:text-green-300 rounded-xl font-bold hover:bg-green-50 dark:hover:bg-green-900/20 transition text-sm"
          >
            {showGuideForm ? "Cancel Guide" : "+ Add Guide"}
          </button>
          <button
            onClick={() => { resetForm(); setShowForm(!showForm); }}
            className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition text-sm"
          >
            {showForm ? "Cancel Tour" : "+ Add Tour"}
          </button>
        </div>
      </div>

      {showGuideForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleGuideSubmit}
          className={`rounded-2xl shadow-sm border p-6 space-y-5 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
        >
          <div className="flex items-center justify-between">
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>New Tour Guide</h3>
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-green-600 dark:text-green-400">Demo Admin</span>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-name">Name *</label>
              <input
                id="guide-name"
                type="text"
                value={guideForm.name}
                onChange={(e) => setGuideForm({ ...guideForm, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
                placeholder="Guide full name"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-email">Email *</label>
              <input
                id="guide-email"
                type="email"
                value={guideForm.email}
                onChange={(e) => setGuideForm({ ...guideForm, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
                placeholder="guide@example.com"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-phone">Phone</label>
              <input
                id="guide-phone"
                type="tel"
                value={guideForm.phone}
                onChange={(e) => setGuideForm({ ...guideForm, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
                placeholder="+255 712 000 000"
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-specialty">Specialty *</label>
              <input
                id="guide-specialty"
                type="text"
                value={guideForm.specialty}
                onChange={(e) => setGuideForm({ ...guideForm, specialty: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
                placeholder="Safari"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-experience">Experience</label>
              <input
                id="guide-experience"
                type="text"
                value={guideForm.experience}
                onChange={(e) => setGuideForm({ ...guideForm, experience: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
                placeholder="8 years"
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`} htmlFor="guide-status">Status</label>
              <select
                id="guide-status"
                value={guideForm.status}
                onChange={(e) => setGuideForm({ ...guideForm, status: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"}`}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={resetGuideForm}
              className={`px-5 py-2.5 border rounded-xl font-bold transition ${isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              Create Guide
            </button>
          </div>
        </motion.form>
      )}

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`rounded-2xl shadow-sm border p-6 space-y-5 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
        >
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{editingId ? "Edit Tour" : "New Tour"}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={handleTitleChange}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                placeholder="Tour title"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>URL Slug</label>
              <input
                type="text"
                value={form.slug}
                readOnly
                className={`w-full px-4 py-3 rounded-xl border text-sm ${isDark ? "border-gray-600 bg-gray-900 text-gray-400" : "border-gray-200 bg-gray-100 text-gray-600"}`}
                placeholder="auto-generated-slug"
              />
              <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Auto-generated from title for tour links</p>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Destination *</label>
              <input
                type="text"
                value={form.destination}
                onChange={(e) => setForm({ ...form, destination: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                placeholder="e.g., Zanzibar"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <option>Safari</option>
                <option>Beach</option>
                <option>Adventure</option>
                <option>City</option>
                <option>Mountain</option>
              </select>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Price (TZS) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                placeholder="799000"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Duration *</label>
              <input
                type="text"
                value={form.duration}
                onChange={(e) => setForm({ ...form, duration: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                placeholder="7 Days"
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Cover Image</label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition text-sm ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
              />
              {form.image && (
                <div className="mt-3 relative w-full h-32 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-600">
                  <img src={form.image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: "" })}
                    className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 rounded-full text-xs font-bold hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              )}
              <p className={`text-xs mt-1 ${isDark ? "text-gray-500" : "text-gray-400"}`}>Upload an image or leave blank for default</p>
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Assign Tour Guide</label>
              <select
                value={form.guideId}
                onChange={(e) => setForm({ ...form, guideId: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <option value="">Unassigned</option>
                {guides.map((g) => (
                  <option key={g.id} value={g.id.toString()}>{g.name} — {g.specialty}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition resize-none ${
                isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
              }`}
              placeholder="Tour description..."
            />
          </div>
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={resetForm}
              className={`px-5 py-2.5 border rounded-xl font-bold transition ${
                isDark ? "border-gray-600 text-gray-300 hover:bg-gray-700" : "border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
            >
              {editingId ? "Update Tour" : "Create Tour"}
            </button>
          </div>
        </motion.form>
      )}

      <div className={`rounded-2xl border p-5 shadow-sm ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Current Guides</h3>
            <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>Manage the guide list used by tours.</p>
          </div>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700 dark:bg-green-900/40 dark:text-green-300">
            {guides.length} guides
          </span>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <div key={guide.id} className={`rounded-xl border p-4 ${isDark ? "border-gray-700 bg-gray-900/50" : "border-gray-100 bg-gray-50/70"}`}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>{guide.name}</p>
                  <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{guide.specialty}</p>
                </div>
                <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${guide.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300"}`}>
                  {guide.status}
                </span>
              </div>
              <p className={`mt-3 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>{guide.experience || "New guide"}</p>
              <p className={`mt-2 text-xs ${isDark ? "text-gray-500" : "text-gray-400"}`}>{guide.email}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tour, i) => (
          <motion.div
            key={tour.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`rounded-2xl shadow-sm border overflow-hidden ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
          >
            <div className="relative h-40">
              <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  isDark ? "bg-gray-800/90 text-green-300" : "bg-white/90 text-green-700"
                }`}>
                  {tour.category}
                </span>
              </div>
            </div>
            <div className="p-5 space-y-3">
              <h3 className={`font-bold text-lg truncate ${isDark ? "text-white" : "text-gray-900"}`}>{tour.title}</h3>
              <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>📍 {tour.destination} • ⏱ {tour.duration}</p>
              <p className={`text-xs line-clamp-2 ${isDark ? "text-gray-500" : "text-gray-500"}`}>{tour.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className={`text-xl font-extrabold text-green-700 dark:text-green-400`}>{formatTZS(tour.price)}</span>
                <span className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>★ {tour.rating}</span>
              </div>
              <div className="mb-2">
                <label className={`block text-xs font-semibold mb-1 ${isDark ? "text-gray-300" : "text-gray-600"}`}>Guide:</label>
                <select
                  value={tour.guideId ? tour.guideId.toString() : ""}
                  onChange={(e) => handleAssignGuide(tour.id, e.target.value)}
                  className={`w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-green-100 dark:focus:ring-green-900/50 ${
                    isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                  }`}
                >
                  <option value="">Select guide...</option>
                  {guides.filter((g) => g.status === "Active").map((g) => (
                    <option key={g.id} value={g.id.toString()}>
                      {g.name} — {g.specialty}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(tour)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tour.id, tour.title)}
                  className="flex-1 px-3 py-2 bg-red-600 text-white rounded-lg text-sm font-bold hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12">
          <p className={`text-lg ${isDark ? "text-gray-400" : "text-gray-500"}`}>No tours found matching your search.</p>
        </div>
      )}
    </motion.div>
  );
}

export default ToursAdmin;
