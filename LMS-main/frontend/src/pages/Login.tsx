import { type FormEvent, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../auth";

export default function Login() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
    } catch {
      setErr("Invalid email or password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="mb-12 flex justify-center">
          <img
            src={`${import.meta.env.BASE_URL}logo.svg`}
            alt="Fraylon Academy"
            className="h-14 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-blue-500/20 bg-gradient-to-br from-slate-900/50 to-slate-800/30 p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
            <p className="text-slate-400 text-sm">Sign in to your Fraylon Academy account</p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-slate-700/50 bg-slate-900/50 px-4 py-3 text-white placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-blue-500/50 focus:bg-slate-900 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Error Message */}
            {err && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/50 px-4 py-3 text-sm text-red-300">
                {err}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={busy}
              className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {busy ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Register Link */}
          <div className="mt-8 border-t border-slate-700/50 pt-6 text-center">
            <p className="text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
