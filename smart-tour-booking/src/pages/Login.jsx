import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../hooks/useToast";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const email = e.target.email.value.trim();
    const password = e.target.password.value;
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const role = await login(email, password);
      addToast(`Welcome back, ${email.split("@")[0]}!`, "success");
      const redirectTo = location.state?.from;
      if (role === "admin") {
        navigate("/admin");
      } else if (redirectTo) {
        navigate(redirectTo, { replace: true });
      } else {
        navigate("/tours");
      }
    } catch (err) {
      setError(err.message || "Login failed. Please try again.");
      addToast(err.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-emerald-100 dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 px-4 py-12 transition-colors duration-300">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white/90 dark:bg-slate-800/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-green-100/50 dark:border-slate-700/50"
      >
        <div className="text-center mb-8">
          <motion.img
            src="/Logo.png"
            alt="SmartTour"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 object-contain mx-auto mb-4"
          />
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">SmartTour</h1>
          <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">Your journey begins with a single click</p>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 text-red-705 dark:text-red-400 text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            {error}
          </motion.div>
        )}

        <div className="flex bg-gray-100 dark:bg-slate-900 rounded-xl p-1 mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              isLogin
                ? "bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 shadow-md"
                : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              !isLogin
                ? "bg-white dark:bg-slate-800 text-green-700 dark:text-green-400 shadow-md"
                : "text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200"
            }`}
          >
            Create Account
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 018 0zM5.121 17.804A13.978 13.978 0 0112 15c2.304 0 4.506.647 6.879 2.196M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2050/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
              />
            </div>
          </div>

          {!isLogin && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div>
                <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-4 focus:ring-green-100 dark:focus:ring-green-950/20 focus:border-green-500 transition bg-gray-50/50 dark:bg-slate-900/50 dark:text-white"
                  />
                </div>
              </div>
            </motion.div>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-slate-700 text-green-600 focus:ring-green-500" />
              <span className="text-sm text-gray-655 dark:text-slate-400">Remember me</span>
            </label>
            <a href="#" className="text-sm text-green-605 dark:text-green-400 font-semibold hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:shadow-green-200 transition transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isLogin ? "Signing in..." : "Creating account..."}
              </>
            ) : (
              isLogin ? "Sign In" : "Create Account"
            )}
          </button>
        </form>

        <div className="mt-8">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white dark:bg-slate-800 text-gray-500 dark:text-slate-400">Or continue with</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-3 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 text-sm font-medium bg-white dark:bg-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="h-5 w-5" />
              Google
            </button>
            <button className="flex items-center justify-center gap-3 border border-gray-200 dark:border-slate-700 rounded-xl py-2.5 text-sm font-medium bg-white dark:bg-slate-900 dark:text-white hover:bg-gray-50 dark:hover:bg-slate-800 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-black dark:text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.365 1.43c.03.01 3.276.96 3.26 4.078-.017 3.222-2.606 4.916-2.646 4.94-1.63.98-3.312.988-3.342.988-.03 0-1.702-.008-3.333-.988-.04-.024-2.63-1.718-2.647-4.94C7.033 2.39 10.28 1.43 10.309 1.42c1.81-.597 3.888-.558 5.1.01z" />
                <path d="M20.7 11.8c-.07-.17-.5-1.78-1.73-3.1-.88-.92-1.95-1.44-3.18-1.5-.61 0-1.24.11-1.83.33 1.3.82 2.1 2.2 2.1 3.73 0 2.56-2.07 4.64-4.63 4.64-1.6 0-3.03-.86-3.86-2.15-.02.08-.04.17-.04.25 0 2.34 1.54 4.34 3.73 4.89 2.3.6 4.84-.1 6.39-1.9 1.68-1.95 2.67-4.7 2.67-7.49 0-.4-.02-.8-.06-1.18z" />
              </svg>
              Apple
            </button>
          </div>
        </div>

        <p className="text-xs text-gray-500 dark:text-slate-450 text-center mt-6">
          By continuing, you agree to SmartTour's{" "}
          <a href="#" className="text-green-600 dark:text-green-450 hover:underline font-medium">Terms</a> and{" "}
          <a href="#" className="text-green-600 dark:text-green-450 hover:underline font-medium">Privacy</a>
        </p>
      </motion.div>
    </div>
  );
}

export default Login;