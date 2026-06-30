import { useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../../context/DataContext";
import { useTheme } from "../../context/ThemeContext";
import PageHeader from "../../components/admin/PageHeader";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";

function Users() {
  const { users, addUser, updateUser, deleteUser } = useData();
  const { isDark } = useTheme();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", role: "tourist" });

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const resetForm = () => {
    setForm({ name: "", email: "", phone: "", role: "tourist" });
    setEditingId(null);
    setShowForm(false);
  };

  const handleEdit = (user) => {
    setForm({ name: user.name, email: user.email, phone: user.phone || "", role: user.role });
    setEditingId(user.id);
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email are required");
      return;
    }
    if (editingId) {
      updateUser(editingId, form);
    } else {
      addUser(form);
    }
    resetForm();
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name}"?`)) {
      deleteUser(id);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
      <PageHeader title="Users Management" subtitle="Manage registered tourist and admin accounts" />

      <div className="flex justify-between items-center">
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." />
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition text-sm"
        >
          {showForm ? "Cancel" : "+ Add User"}
        </button>
      </div>

      {showForm && (
        <motion.form
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className={`rounded-2xl shadow-sm border p-6 space-y-5 ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}
        >
          <h3 className={`text-lg font-bold ${isDark ? "text-white" : "text-gray-800"}`}>{editingId ? "Edit User" : "New User"}</h3>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Full Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Email *</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                required
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
                placeholder="+255 712 345 678"
              />
            </div>
            <div>
              <label className={`block text-sm font-semibold mb-2 ${isDark ? "text-gray-300" : "text-gray-700"}`}>Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-900/50 focus:border-green-500 transition ${
                  isDark ? "border-gray-600 bg-gray-700 text-white" : "border-gray-200 bg-gray-50/50"
                }`}
              >
                <option value="tourist">Tourist</option>
                <option value="admin">Admin</option>
              </select>
            </div>
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
              {editingId ? "Update User" : "Create User"}
            </button>
          </div>
        </motion.form>
      )}

      <div className={`overflow-hidden rounded-2xl shadow-sm border ${isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-100"}`}>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className={`border-b ${isDark ? "border-gray-700" : "border-gray-100"}`}>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Name</th>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Email</th>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Phone</th>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Role</th>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Joined</th>
                <th className={`pb-3 text-sm font-semibold px-6 ${isDark ? "text-gray-400" : "text-gray-500"}`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user, i) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className={`border-b transition-colors ${isDark ? "border-gray-700 hover:bg-gray-700/50" : "border-gray-50 hover:bg-gray-50"}`}
                >
                  <td className={`py-4 text-sm font-medium px-6 ${isDark ? "text-white" : "text-gray-900"}`}>{user.name}</td>
                  <td className={`py-4 text-sm px-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{user.email}</td>
                  <td className={`py-4 text-sm px-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{user.phone || "—"}</td>
                  <td className="py-4 px-6">
                    <StatusBadge status={user.role === "admin" ? "Confirmed" : "Pending"} />
                  </td>
                  <td className={`py-4 text-sm px-6 ${isDark ? "text-gray-300" : "text-gray-600"}`}>{user.joinedAt}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-bold hover:bg-blue-700 transition"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <p className={`text-center py-8 ${isDark ? "text-gray-400" : "text-gray-500"}`}>No users found.</p>
        )}
      </div>
    </motion.div>
  );
}

export default Users;
