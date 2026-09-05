import { Menu, Search, Bell, ChevronDown } from "lucide-react";
const currentUser =
  typeof window !== "undefined" && localStorage.getItem("erp_user")
    ? JSON.parse(localStorage.getItem("erp_user"))
    : { name: "Administrator", role: "admin", avatar: "" };

export default function Topbar({ onMenuClick, title }) {
  return (
    <header className="h-16 bg-white border-b border-black/[0.06] flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="lg:hidden text-ink p-1 -ml-1">
          <Menu size={22} />
        </button>
        <h1 className="font-display font-semibold text-lg sm:text-xl text-ink tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="hidden md:flex items-center gap-2 bg-paper rounded-full px-4 py-2 w-64 border border-black/[0.06]">
          <Search size={16} className="text-slate-text/60" />
          <input
            placeholder="Search students, staff, records..."
            className="bg-transparent outline-none text-[13px] w-full placeholder:text-slate-text/50"
          />
        </div>
        <button className="relative w-9 h-9 rounded-full bg-paper border border-black/[0.06] flex items-center justify-center hover:bg-amber/10 transition-colors">
          <Bell size={17} className="text-ink" />
          <span className="absolute top-1.5 right-2 w-1.5 h-1.5 rounded-full bg-alert"></span>
        </button>
        <div className="flex items-center gap-2 pl-2 sm:border-l sm:border-black/[0.08]">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-9 h-9 rounded-full object-cover"
          />
          <div className="hidden sm:block leading-tight">
            <p className="text-[13px] font-semibold text-ink">
              {currentUser.name}
            </p>
            <p className="text-[11px] text-slate-text/70">{currentUser.role}</p>
          </div>
          <ChevronDown
            size={15}
            className="hidden sm:block text-slate-text/50"
          />
        </div>
      </div>
    </header>
  );
}
