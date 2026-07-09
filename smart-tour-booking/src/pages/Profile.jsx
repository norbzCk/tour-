import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useData } from "../context/DataContext";

function Profile() {
  const { user, updateCurrentUser } = useAuth();
  const { users, updateUser } = useData();
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ name: user?.name || "", email: user?.email || "", phone: "" });

  const currentUser = users.find((u) => u.email === user?.email);

  const handleSave = (e) => {
    e.preventDefault();
    if (currentUser) {
      updateUser(currentUser.id, { name: form.name, email: form.email, phone: form.phone });
      updateCurrentUser({ name: form.name, email: form.email });
    }
    setEditing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-950 py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <div>
             <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-2">My Profile</h1>
            <p className="text-gray-600 dark:text-slate-400">Manage your personal information</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-750 overflow-hidden transition-colors">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 h-24"></div>
            <div className="px-8 pb-8">
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-12">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg border-4 border-white dark:border-slate-800">
                  {form.name ? form.name[0].toUpperCase() : "?"}
                </div>
                <div className="text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{form.name || "User"}</h2>
                  <p className="text-gray-500 dark:text-slate-400">{form.email}</p>
                </div>
              </div>

              {!editing ? (
                <div className="mt-8 space-y-4">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-750">
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Full Name</p>
                      <p className="font-semibold text-gray-900 dark:text-slate-100">{form.name}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-750">
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Email</p>
                      <p className="font-semibold text-gray-900 dark:text-slate-100">{form.email}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-750">
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Phone</p>
                      <p className="font-semibold text-gray-900 dark:text-slate-100">{currentUser?.phone || "Not set"}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50 dark:bg-slate-900/40 border border-gray-100 dark:border-slate-750">
                      <p className="text-xs text-gray-500 dark:text-slate-400 mb-1 font-semibold uppercase tracking-wider">Role</p>
                      <p className="font-semibold text-gray-900 dark:text-slate-100 capitalize">{user?.role || "Tourist"}</p>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <button
                      onClick={() => { setForm({ name: currentUser?.name || "", email: currentUser?.email || "", phone: currentUser?.phone || "" }); setEditing(true); }}
                      className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold hover:shadow-lg transition text-sm"
                    >
                      Edit Profile
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="mt-8 space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full px-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
                        placeholder="+255 712 345 678"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 justify-end pt-2">
                    <button
                      type="button"
                      onClick={() => setEditing(false)}
                      className="px-5 py-2.5 border border-gray-200 dark:border-slate-700 rounded-xl font-bold text-gray-700 dark:text-slate-305 hover:bg-gray-50 dark:hover:bg-slate-700 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold hover:shadow-lg transition"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Profile;
