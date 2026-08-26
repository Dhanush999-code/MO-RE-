import { useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const storedUser = JSON.parse(
      localStorage.getItem("more_user") || "null"
    );

    if (!storedUser) {
      setError("No account found. Create your MO-RE account first.");
      return;
    }

    if (
      email.toLowerCase() !== storedUser.email.toLowerCase() ||
      password !== storedUser.password
    ) {
      setError("Incorrect email or password.");
      return;
    }

    localStorage.setItem("more_logged_in", "true");
    onLogin();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="flex min-h-screen">

        {/* Left branding */}
        <div className="relative hidden w-1/2 overflow-hidden border-r border-white/10 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_70%_70%,rgba(139,92,246,0.10),transparent_35%)]" />

          <div className="relative flex flex-col justify-between p-12">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black">
                <Film size={22} />
              </div>

              <div>
                <div className="text-xl font-black tracking-[0.18em]">
                  MO-RE
                </div>

                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-600">
                  Movie Recommendation System
                </div>
              </div>

            </div>

            <div className="max-w-lg">

              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                U just need
              </p>

              <h1 className="text-6xl font-black leading-none">
                MO-
                <span className="text-blue-500">RE.</span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                Discover movies that feel like the ones you already
                love. MO-RE finds your five closest cinematic matches.
              </p>

            </div>

            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-700">
              Find something worth watching.
            </p>

          </div>
        </div>

        {/* Login */}
        <div className="flex flex-1 items-center justify-center px-6 py-12">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <Film size={20} />
              </div>

              <div className="font-black tracking-[0.18em]">
                MO-RE
              </div>

            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Welcome back
            </p>

            <h2 className="text-4xl font-black">
              Sign in<span className="text-blue-500">.</span>
            </h2>

            <p className="mt-3 text-sm text-zinc-600">
              Continue your movie discovery journey.
            </p>

            <form
              onSubmit={handleLogin}
              className="mt-10 space-y-5"
            >

              {/* Email */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-zinc-500">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
                  />

                </div>

              </div>

              {/* Password */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-zinc-500">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-12 text-sm outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={17} />
                    ) : (
                      <Eye size={17} />
                    )}
                  </button>

                </div>

              </div>

              {/* Error */}
              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              {/* Login */}
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200"
              >
                Sign In
                <ArrowRight size={17} />
              </button>

            </form>

            {/* Register */}
            <div className="mt-8 text-center text-sm text-zinc-600">

              Don't have an account?

              <button
                onClick={onShowRegister}
                className="ml-2 font-semibold text-white hover:text-blue-400"
              >
                Create one
              </button>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Login;