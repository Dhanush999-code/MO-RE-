import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Heart,
  Clock3,
  Sparkles,
  Pencil,
  Film,
  ChevronRight,
} from "lucide-react";

function Profile({
  setActivePage,
}) {
  const [savedCount, setSavedCount] = useState(0);
  const [historyCount, setHistoryCount] = useState(0);

  const [profile, setProfile] = useState({
    name: "MO-RE User",
    email: "movie.lover@more.app",
  });

  useEffect(() => {
    const savedMovies = JSON.parse(
      localStorage.getItem("more_my_list") || "[]"
    );

    const history = JSON.parse(
      localStorage.getItem("more_history") || "[]"
    );

    const storedProfile = JSON.parse(
      localStorage.getItem("more_profile") || "null"
    );

    setSavedCount(savedMovies.length);
    setHistoryCount(history.length);

    if (storedProfile) {
      setProfile(storedProfile);
    }
  }, []);

  const editProfile = () => {
    const name = window.prompt(
      "Enter your name:",
      profile.name
    );

    if (!name || !name.trim()) return;

    const updatedProfile = {
      ...profile,
      name: name.trim(),
    };

    setProfile(updatedProfile);

    localStorage.setItem(
      "more_profile",
      JSON.stringify(updatedProfile)
    );
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10">

      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center gap-2 text-blue-400">
            <User size={16} />

            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Account
            </span>
          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Your <span className="text-blue-500">Profile.</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-500">
            Your personal MO-RE movie space.
          </p>
        </motion.div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.035]"
        >

          <div className="p-6 md:p-8">

            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

              <div className="flex items-center gap-5">

                {/* Avatar */}
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-white text-2xl font-black text-black">
                  {profile.name
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div>
                  <h2 className="text-2xl font-bold">
                    {profile.name}
                  </h2>

                  <p className="mt-1 text-sm text-zinc-500">
                    {profile.email}
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                    <Film size={12} />
                    MO-RE Member
                  </div>
                </div>

              </div>

              <button
                onClick={editProfile}
                className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-zinc-400 transition hover:bg-white/[0.05] hover:text-white"
              >
                <Pencil size={15} />
                Edit Profile
              </button>

            </div>

          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 border-t border-white/10 md:grid-cols-3">

            <Stat
              icon={Heart}
              label="Saved Movies"
              value={savedCount}
            />

            <Stat
              icon={Clock3}
              label="History"
              value={historyCount}
            />

            <Stat
              icon={Sparkles}
              label="Recommendation Engine"
              value="AI"
              className="col-span-2 md:col-span-1"
            />

          </div>

        </motion.div>

        {/* Quick actions */}
        <div className="mt-10">

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-600">
            Quick Access
          </p>

          <div className="grid gap-3 md:grid-cols-2">

            <QuickAction
              icon={Heart}
              title="My List"
              description={`${savedCount} movies saved`}
              onClick={() => setActivePage("My List")}
            />

            <QuickAction
              icon={Clock3}
              title="Recommendation History"
              description={`${historyCount} searches`}
              onClick={() => setActivePage("History")}
            />

            <QuickAction
              icon={Sparkles}
              title="Find Something New"
              description="Get your next recommendation"
              onClick={() => setActivePage("Recommend")}
            />

            <QuickAction
              icon={Film}
              title="Explore Movies"
              description="Browse the MO-RE collection"
              onClick={() => setActivePage("Discover")}
            />

          </div>

        </div>

      </div>
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  className = "",
}) {
  return (
    <div
      className={`p-5 md:p-6 ${className}`}
    >
      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[0.05]">
          <Icon size={16} className="text-zinc-500" />
        </div>

        <div>
          <p className="text-xl font-black">
            {value}
          </p>

          <p className="mt-1 text-[10px] uppercase tracking-wider text-zinc-600">
            {label}
          </p>
        </div>

      </div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  title,
  description,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[0.05]">
          <Icon
            size={18}
            className="text-zinc-500 transition group-hover:text-white"
          />
        </div>

        <div>
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {description}
          </p>
        </div>

      </div>

      <ChevronRight
        size={16}
        className="text-zinc-700 transition group-hover:translate-x-1 group-hover:text-white"
      />

    </button>
  );
}

export default Profile;