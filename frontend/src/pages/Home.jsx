import { motion } from "framer-motion";
import {
  Sparkles,
  Search,
  ArrowRight,
  Compass,
  Play,
} from "lucide-react";

function Home({ setActivePage }) {
  return (
    <div className="min-h-screen bg-[#050505] text-white">

      <div className="mx-auto max-w-6xl px-8 py-10">

        {/* Top bar */}
        <div className="mb-12 flex items-center justify-between">

          <div>
            <p className="mb-2 text-xs uppercase tracking-[0.3em] text-zinc-600">
              Welcome back
            </p>

            <h1 className="text-3xl font-bold">
              What are you watching today?
            </h1>
          </div>

          <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 md:flex">
            <Search size={17} className="text-zinc-500" />
            <span className="text-sm text-zinc-600">
              Search movies...
            </span>
          </div>

        </div>

        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-blue-950/60 via-[#101010] to-[#080808] p-8 md:p-12"
        >

          <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-blue-500/20 blur-[100px]" />

          <div className="relative max-w-2xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-3 py-1.5 text-xs text-blue-300">
              <Sparkles size={13} />
              AI-powered recommendations
            </div>

            <h2 className="text-4xl font-black leading-tight md:text-6xl">
              You pick one.
              <br />
              <span className="text-blue-500">
                We find five.
              </span>
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-6 text-zinc-400">
              Choose a movie you already love and MO-RE will find the
              five closest movies from our recommendation model.
            </p>

            <button
              onClick={() => setActivePage("Recommend")}
              className="mt-8 flex items-center gap-2 rounded-xl bg-white px-5 py-3.5 text-sm font-bold text-black transition hover:bg-zinc-200"
            >
              <Sparkles size={17} />
              Find My MO-RE
              <ArrowRight size={17} />
            </button>

          </div>
        </motion.section>

        {/* Stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-3">

          <Stat
            number="4,806+"
            label="Movies in the model"
          />

          <Stat
            number="Top 5"
            label="Recommendations per search"
          />

          <Stat
            number="MO-RE"
            label="Built for movie lovers"
          />

        </div>

        {/* Quick actions */}
        <div className="mt-12">

          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              Quick Start
            </h3>

            <button
              onClick={() => setActivePage("Recommend")}
              className="text-xs text-zinc-500 hover:text-white"
            >
              View all
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <QuickCard
              icon={<Sparkles size={21} />}
              title="Recommend a movie"
              description="Pick a movie and discover your next five."
              onClick={() => setActivePage("Recommend")}
            />

            <QuickCard
              icon={<Compass size={21} />}
              title="Explore movies"
              description="Browse and discover something new."
              onClick={() => setActivePage("Discover")}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

function Stat({ number, label }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="text-2xl font-bold">{number}</div>
      <div className="mt-1 text-xs text-zinc-600">{label}</div>
    </div>
  );
}

function QuickCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.06]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
        {icon}
      </div>

      <div className="flex-1">
        <div className="font-semibold">{title}</div>
        <div className="mt-1 text-xs text-zinc-600">
          {description}
        </div>
      </div>

      <ArrowRight
        size={18}
        className="text-zinc-700 transition group-hover:translate-x-1 group-hover:text-white"
      />
    </button>
  );
}

export default Home;