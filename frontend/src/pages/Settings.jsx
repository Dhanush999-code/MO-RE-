import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Settings as SettingsIcon,
  Bell,
  Film,
  Image,
  Trash2,
  RotateCcw,
  Moon,
  ChevronRight,
} from "lucide-react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [highQuality, setHighQuality] = useState(true);

  useEffect(() => {
    const settings = JSON.parse(
      localStorage.getItem("more_settings") || "{}"
    );

    if (typeof settings.notifications === "boolean") {
      setNotifications(settings.notifications);
    }

    if (typeof settings.highQuality === "boolean") {
      setHighQuality(settings.highQuality);
    }
  }, []);

  const saveSettings = (updatedSettings) => {
    const currentSettings = JSON.parse(
      localStorage.getItem("more_settings") || "{}"
    );

    localStorage.setItem(
      "more_settings",
      JSON.stringify({
        ...currentSettings,
        ...updatedSettings,
      })
    );
  };

  const toggleNotifications = () => {
    const value = !notifications;

    setNotifications(value);

    saveSettings({
      notifications: value,
    });
  };

  const toggleQuality = () => {
    const value = !highQuality;

    setHighQuality(value);

    saveSettings({
      highQuality: value,
    });
  };

  const clearMyList = () => {
    const confirmed = window.confirm(
      "Remove all movies from My List?"
    );

    if (!confirmed) return;

    localStorage.removeItem("more_my_list");

    alert("My List has been cleared.");
  };

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Clear your entire recommendation history?"
    );

    if (!confirmed) return;

    localStorage.removeItem("more_history");

    alert("Recommendation history has been cleared.");
  };

  const resetApp = () => {
    const confirmed = window.confirm(
      "This will remove your saved movies, history, profile and settings. Continue?"
    );

    if (!confirmed) return;

    localStorage.removeItem("more_my_list");
    localStorage.removeItem("more_history");
    localStorage.removeItem("more_profile");
    localStorage.removeItem("more_settings");

    setNotifications(true);
    setHighQuality(true);

    alert("MO-RE has been reset.");
  };

  return (
    <div className="min-h-screen bg-[#050505] px-6 py-10 text-white md:px-10">

      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="mb-3 flex items-center gap-2 text-blue-400">

            <SettingsIcon size={16} />

            <span className="text-xs font-semibold uppercase tracking-[0.3em]">
              Preferences
            </span>

          </div>

          <h1 className="text-4xl font-black md:text-5xl">
            Settings<span className="text-blue-500">.</span>
          </h1>

          <p className="mt-4 text-sm text-zinc-500">
            Customize your MO-RE experience.
          </p>
        </motion.div>

        {/* Appearance */}
        <Section
          title="Appearance"
          description="Control how MO-RE looks."
        >

          <SettingRow
            icon={Moon}
            title="Dark Mode"
            description="MO-RE currently uses the dark cinematic interface."
            right={
              <div className="rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-black">
                Active
              </div>
            }
          />

        </Section>

        {/* Movie experience */}
        <Section
          title="Movie Experience"
          description="Control how movies are displayed."
        >

          <SettingRow
            icon={Image}
            title="High Quality Posters"
            description="Load high resolution movie posters whenever available."
            right={
              <Toggle
                enabled={highQuality}
                onClick={toggleQuality}
              />
            }
          />

          <SettingRow
            icon={Film}
            title="Recommendation Engine"
            description="MO-RE recommends the five closest movies using your selected movie."
            right={
              <span className="text-xs font-semibold text-blue-400">
                ACTIVE
              </span>
            }
          />

        </Section>

        {/* Notifications */}
        <Section
          title="Notifications"
          description="Manage MO-RE notifications."
        >

          <SettingRow
            icon={Bell}
            title="Recommendation Notifications"
            description="Allow MO-RE to show recommendation-related notifications."
            right={
              <Toggle
                enabled={notifications}
                onClick={toggleNotifications}
              />
            }
          />

        </Section>

        {/* Data */}
        <Section
          title="Your Data"
          description="Manage locally stored MO-RE data."
        >

          <ActionRow
            icon={Trash2}
            title="Clear My List"
            description="Remove every movie saved to your personal list."
            danger
            onClick={clearMyList}
          />

          <ActionRow
            icon={RotateCcw}
            title="Clear Recommendation History"
            description="Delete your previous recommendation searches."
            danger
            onClick={clearHistory}
          />

        </Section>

        {/* Danger */}
        <Section
          title="Danger Zone"
          description="These actions cannot be undone."
        >

          <button
            onClick={resetApp}
            className="group flex w-full items-center justify-between rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-5 text-left transition hover:border-red-500/40 hover:bg-red-500/[0.06]"
          >

            <div className="flex items-center gap-4">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                <RotateCcw size={18} />
              </div>

              <div>

                <p className="text-sm font-semibold text-red-400">
                  Reset MO-RE
                </p>

                <p className="mt-1 text-xs text-zinc-600">
                  Delete all local MO-RE data and restore defaults.
                </p>

              </div>

            </div>

            <ChevronRight
              size={16}
              className="text-red-500/40 transition group-hover:translate-x-1 group-hover:text-red-400"
            />

          </button>

        </Section>

        {/* Footer */}
        <div className="pb-10 pt-6 text-center">

          <p className="text-[10px] uppercase tracking-[0.3em] text-zinc-700">
            U just need MO-RE
          </p>

          <p className="mt-2 text-xs text-zinc-800">
            Movie Recommendation System
          </p>

        </div>

      </div>
    </div>
  );
}


/* ---------------- SECTION ---------------- */

function Section({
  title,
  description,
  children,
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10"
    >

      <div className="mb-4">

        <h2 className="text-sm font-bold">
          {title}
        </h2>

        <p className="mt-1 text-xs text-zinc-600">
          {description}
        </p>

      </div>

      <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025]">
        {children}
      </div>

    </motion.section>
  );
}


/* ---------------- SETTING ROW ---------------- */

function SettingRow({
  icon: Icon,
  title,
  description,
  right,
}) {
  return (
    <div className="flex items-center justify-between gap-5 border-b border-white/5 p-5 last:border-0">

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-zinc-500">
          <Icon size={18} />
        </div>

        <div>

          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 max-w-xl text-xs leading-5 text-zinc-600">
            {description}
          </p>

        </div>

      </div>

      {right}

    </div>
  );
}


/* ---------------- ACTION ROW ---------------- */

function ActionRow({
  icon: Icon,
  title,
  description,
  danger = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`group flex w-full items-center justify-between border-b border-white/5 p-5 text-left transition last:border-0 ${
        danger
          ? "hover:bg-red-500/[0.03]"
          : "hover:bg-white/[0.03]"
      }`}
    >

      <div className="flex items-center gap-4">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-xl ${
            danger
              ? "bg-red-500/10 text-red-400"
              : "bg-white/[0.05] text-zinc-500"
          }`}
        >
          <Icon size={18} />
        </div>

        <div>

          <p
            className={`text-sm font-semibold ${
              danger ? "text-red-400" : "text-white"
            }`}
          >
            {title}
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            {description}
          </p>

        </div>

      </div>

      <ChevronRight
        size={16}
        className={`transition group-hover:translate-x-1 ${
          danger
            ? "text-red-500/30 group-hover:text-red-400"
            : "text-zinc-700 group-hover:text-white"
        }`}
      />

    </button>
  );
}


/* ---------------- TOGGLE ---------------- */

function Toggle({
  enabled,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled
          ? "bg-blue-500"
          : "bg-zinc-800"
      }`}
    >

      <div
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled
            ? "left-6"
            : "left-1"
        }`}
      />

    </button>
  );
}

export default Settings;