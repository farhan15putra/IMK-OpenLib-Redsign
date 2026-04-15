import { Search, Bell, Settings, Layers, Menu } from "lucide-react";
import { useState } from "react";
import logoImg from "../../imports/openlib-logo.jpg";

export function Header({ onHomeClick, onProfileClick, onMenuClick }: { onHomeClick?: () => void, onProfileClick?: () => void, onMenuClick?: () => void }) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 h-20 md:h-24 transition-all duration-300 relative z-40 bg-background/80 backdrop-blur-md"
      style={{ borderBottom: "1.5px solid var(--border)" }}>

      {/* Official Branding Flex Container */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Mobile Hamburger Menu */}
        <button onClick={onMenuClick} className="md:hidden p-2 rounded-xl border border-border bg-card shadow-sm active:scale-95 transition-transform">
          <Menu className="size-5" />
        </button>

        {/* Secondary Logo/Brand Identity Mark */}
        <div 
          className="hidden sm:flex flex-col md:border-r pr-6 cursor-pointer hover:opacity-80 transition-opacity" 
          style={{ borderColor: "var(--border)" }}
          onClick={onHomeClick}
        >
          <div className="flex items-center gap-3">
            <div className="size-10 rounded-xl overflow-hidden bg-white shadow-lg p-1 border border-border">
              <img src={logoImg} alt="Tel-U Logo" className="w-full h-full object-contain" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl font-black tracking-tight leading-none" style={{ color: "var(--foreground)" }}>
                Open Library
              </h1>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--primary)" }}>
                Telkom University
              </p>
            </div>
          </div>
        </div>

        {/* Location / Status Indicator */}
        <div className="hidden lg:flex flex-col">
          <div className="flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Telkom Univ - Kampus Jakarta</span>
          </div>
          <p className="text-[9px] font-bold opacity-60 mt-0.5 tracking-tighter">Mahasiswa Aktif</p>
        </div>
      </div>

      {/* Global Command Center (Centered Search) */}
      <div className="flex-1 min-w-0 max-w-lg mx-3 md:mx-8 relative z-50">
        <div className="absolute inset-0 bg-primary/5 blur-xl focus-within:bg-primary/10 transition-colors rounded-3xl" />
        <div className="relative flex items-center h-10 md:h-12 w-full px-3 md:px-5 rounded-2xl bg-card border border-border shadow-sm focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(139,0,0,0.1)] transition-all">
          <Search className="size-4 md:size-5 transition-transform" style={{ color: "var(--muted-foreground)" }} />
          <input
            type="text"
            placeholder="Search catalog, journals..."
            className="flex-1 ml-3 md:ml-4 bg-transparent text-[11px] md:text-sm font-bold placeholder:font-medium placeholder:opacity-40 outline-none w-full"
            style={{ color: "var(--foreground)" }}
          />
          <div className="hidden sm:flex items-center gap-2 ml-2 md:ml-4">
            <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-[10px] font-black opacity-50 uppercase tracking-widest border border-border">
              <span>Alt</span>
              <span>+</span>
              <span>K</span>
            </div>
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center gap-1.5 px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/10 text-primary border border-primary/20 bg-primary/5 active:scale-95 shadow-sm"
            >
              <Settings className="size-3" />
              Advanced
            </button>
          </div>
        </div>

        {/* Advanced Search Pop-up */}
        {showAdvanced && (
          <div className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-card border border-primary/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 animate-in fade-in slide-in-from-top-4 duration-300 z-50 backdrop-blur-xl">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 border-b border-border pb-2">Advanced Options</h4>
            <div className="grid grid-cols-2 gap-4 mb-5">
               <div>
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Author</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder="e.g. John Doe" />
               </div>
               <div>
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Publication Year</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder="e.g. 2024" />
               </div>
               <div className="col-span-2">
                  <label className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">Journal / Publisher</label>
                  <input type="text" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder="e.g. IEEE, ScienceDirect..." />
               </div>
            </div>
            <button className="w-full py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
               Execute Deep Search
            </button>
          </div>
        )}
      </div>

      {/* Right Action Hub */}
      <div className="flex flex-shrink-0 items-center gap-3 md:gap-6">

        {/* App Switcher (Grid Style) */}
        <button className="relative flex-center size-12 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all active:scale-95 group hidden md:flex items-center justify-center">
          <Layers className="size-5" style={{ color: "var(--muted-foreground)" }} />
        </button>

        {/* Global Notifications */}
        <button className="relative flex items-center justify-center size-12 rounded-2xl bg-card border border-border shadow-sm hover:bg-muted hover:shadow-md transition-all active:scale-95 group">
          <Bell className="size-5 transition-transform group-hover:rotate-12" style={{ color: "var(--muted-foreground)" }} />
          <span className="absolute top-3.5 right-3.5 size-2.5 rounded-full ring-2 ring-card shadow-lg" style={{ background: "var(--primary)" }} />
        </button>

        {/* User Account / Librarian Badge */}
        <div 
          onClick={onProfileClick}
          className="flex items-center gap-2 md:gap-4 py-1 md:py-1.5 px-1.5 md:px-2.5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-95"
        >
          <div className="size-8 md:size-10 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 bg-muted">
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=TelkomStudent&backgroundColor=FDFBF3"
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </header>
  );
}
