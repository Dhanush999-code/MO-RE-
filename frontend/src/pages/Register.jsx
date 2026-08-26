import { useState } from "react";
import { motion } from "framer-motion";
import {
  Film,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Check,
} from "lucide-react";

function Register({ onRegister, onShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const user = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };

    localStorage.setItem(
      "more_user",
      JSON.stringify(user)
    );

    localStorage.setItem("more_logged_in", "true");

    // Keep profile synchronized
    localStorage.setItem(
      "more_profile",
      JSON.stringify({
        name: user.name,
        email: user.email,
      })
    );

    onRegister();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="flex min-h-screen">

        {/* Branding */}
        <div className="relative hidden w-1/2 overflow-hidden border-r border-white/10 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(59,130,246,0.16),transparent_35%),radial-gradient(circle_at_30%_70%,rgba(139,92,246,0.10),transparent_35%)]" />

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

            <div>

              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
                Your next movie
              </p>

              <h1 className="text-6xl font-black leading-none">
                U just need
                <br />
                <span className="text-blue-500">
                  MO-RE.
                </span>
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-zinc-500">
                Build your personal movie universe and discover
                recommendations based on what you already love.
              </p>

            </div>

            <div className="flex items-center gap-3 text-xs text-zinc-700">
              <Check size={14} />
              Your personal movie space
            </div>

          </div>
        </div>

        {/* Register */}
        <div className="flex flex-1 items-center justify-center px-6 py-10">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >

            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <Film size={20} />
              </div>

              <div className="font-black tracking-[0.18em]">
                MO-RE
              </div>

            </div>

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-blue-400">
              Join MO-RE
            </p>

            <h2 className="text-4xl font-black">
              Create account<span className="text-blue-500">.</span>
            </h2>

            <p className="mt-3 text-sm text-zinc-600">
              Start discovering movies made for your taste.
            </p>

            <form
              onSubmit={handleRegister}
              className="mt-8 space-y-4"
            >

              {/* Name */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-zinc-500">
                  Name
                </label>

                <div className="relative">

                  <User
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
                  />

                </div>

              </div>

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
                    placeholder="At least 6 characters"
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

              {/* Confirm */}
              <div>

                <label className="mb-2 block text-xs font-semibold text-zinc-500">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={17}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                  />

                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Repeat your password"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
                  />

                </div>

              </div>

              {error && (
                <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-xs text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200"
              >
                Create Account
                <ArrowRight size={17} />
              </button>

            </form>

            <div className="mt-7 text-center text-sm text-zinc-600">

              Already have an account?

              <button
                onClick={onShowLogin}
                className="ml-2 font-semibold text-white hover:text-blue-400"
              >
                Sign in
              </button>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default Register;