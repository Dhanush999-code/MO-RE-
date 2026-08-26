import {
  Home,
  Sparkles,
  Compass,
  Heart,
  Clock3,
  User,
  Settings,
  LogOut,
  Film,
} from "lucide-react";

const menuItems = [
  { label: "Home", icon: Home },
  { label: "Recommend", icon: Sparkles },
  { label: "Discover", icon: Compass },
  { label: "My List", icon: Heart },
  { label: "History", icon: Clock3 },
];

function Sidebar({
  activePage,
  setActivePage,
  onLogout,
}) {
  return (

    <aside className="fixed left-0 top-0 z-40 flex h-screen w-[250px] flex-col overflow-y-auto border-r border-white/10 bg-[#080808] px-5 py-6">
      {/* Logo */}
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
          <Film size={21} />
        </div>

        <div>
          <div className="text-lg font-black tracking-[0.18em]">
            MO-RE
          </div>

          <div className="text-[8px] uppercase tracking-[0.18em] text-zinc-600">
            Movie Recommendation
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="flex-1">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
          Menu
        </p>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activePage === item.label;

            return (
              <button
                key={item.label}
                onClick={() => setActivePage(item.label)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                  active
                    ? "bg-white text-black"
                    : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom */}
      <div className="border-t border-white/10 pt-4">

        <button
          onClick={() => setActivePage("Profile")}
          className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
        >
          <User size={18} />
          Profile
        </button>

        <button
          onClick={() => setActivePage("Settings")}
          className="mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 transition hover:bg-white/[0.05] hover:text-white"
        >
          <Settings size={18} />
          Settings
        </button>
        <button
  onClick={onLogout}
  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-600 transition hover:bg-red-500/10 hover:text-red-400"
>
  <LogOut size={18} />
  Logout
</button>

        
      </div>
    </aside>
  );
}

export default Sidebar;