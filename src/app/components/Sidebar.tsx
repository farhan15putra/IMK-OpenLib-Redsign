import { Home, BookMarked, Clock, Bookmark, Settings, AlignLeft, LogOut, Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
import logoImg from "../../imports/cropped-logo_telkom_university.png";

const navItems = [
  { id: 'home', icon: Home, label: "Home", active: false },
  { id: 'catalog', icon: BookMarked, label: "Catalogue", active: true },
  { id: 'history', icon: Clock, label: "Loan History", active: false },
  { id: 'saved', icon: Bookmark, label: "Saved Books", active: false },
  { id: 'settings', icon: Settings, label: "Preferences", active: false },
];

export function Sidebar({ currentView, setCurrentView, isOpen, setIsOpen }: { currentView: string, setCurrentView: (id: string) => void, isOpen?: boolean, setIsOpen?: (v: boolean) => void }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-300"
          onClick={() => setIsOpen?.(false)}
        />
      )}

      <aside className={`flex fixed left-0 top-0 h-screen z-50 flex-col items-center py-8 gap-8 transition-transform duration-300 ease-out 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
        style={{ width: "var(--sidebar-width)", background: "var(--sidebar)", borderRight: "1px solid var(--sidebar-border)" }}>

      {/* Campus Identity: Official Logo Container */}
      <div className="relative group cursor-pointer active:scale-95 transition-transform duration-200 px-2">
        <div className="flex items-center justify-center size-14 rounded-2xl p-1 bg-white shadow-xl transform group-hover:rotate-6 transition-transform duration-500 overflow-hidden border border-border">
          <img 
            src={logoImg} 
            alt="Tel-U Logo" 
            className="w-full h-full object-contain"
          />
        </div>
        {/* Glow effect matching brand colors */}
        <div className="absolute inset-0 size-14 mx-auto rounded-2xl blur-xl opacity-10 group-hover:opacity-40 transition-opacity"
          style={{ background: "var(--primary)" }} />
      </div>

      {/* THEME TOGGLE: Pill-shaped Switch */}
      <div className="mt-2 flex flex-col items-center gap-1">
        <div 
          onClick={toggleTheme}
          className="relative w-10 h-20 rounded-full cursor-pointer transition-all duration-500 flex flex-col items-center justify-between py-2 border shadow-inner group"
          style={{ 
            background: theme === 'dark' ? "var(--card)" : "var(--muted)",
            borderColor: "var(--border)"
          }}
        >
          {/* Moving Toggle Knob */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 size-7 rounded-full transition-all duration-500 shadow-lg flex items-center justify-center z-10"
            style={{ 
              top: theme === 'dark' ? "calc(100% - 32px)" : "4px",
              background: "var(--primary)",
              color: "#fff"
            }}
          >
            {theme === 'dark' ? <Moon className="size-4" /> : <Sun className="size-4" />}
          </div>

          {/* Background Icons (for visual cues) */}
          <Sun className={`size-3.5 opacity-30 mt-1 transition-opacity ${theme === 'dark' ? 'opacity-30' : 'opacity-0'}`} style={{ color: "var(--foreground)" }} />
          <Moon className={`size-3.5 opacity-30 mb-1 transition-opacity ${theme === 'dark' ? 'opacity-0' : 'opacity-30'}`} style={{ color: "var(--foreground)" }} />
        </div>
        <span className="text-[8px] font-black uppercase tracking-tighter opacity-40 mt-1">THEME</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex flex-col items-center gap-4 flex-1">
        {navItems.map(({ id, icon: Icon, label }) => {
          const isActive = id === currentView;
          return (
            <div key={id} className="relative py-1">
              <button
                onClick={() => setCurrentView(id)}
                className={`group relative flex items-center justify-center size-12 rounded-2xl transition-all duration-300 ease-out active:scale-90
                  ${isActive
                    ? "text-white shadow-[0_8px_20px_rgba(139,0,0,0.25)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"}`}
                style={isActive ? { background: "var(--primary)" } : {}}
              >
                <Icon className={`size-5 transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`} />
                
                {/* Active indicator dot and glow */}
                {isActive && (
                  <>
                    <div className="absolute right-[-14px] top-1/2 translate-y-[-50%] w-1.5 h-6 rounded-l-full bg-primary shadow-lg shadow-primary/50" />
                    <div className="absolute inset-0 size-8 m-auto rounded-full blur-xl opacity-20" style={{ background: "var(--primary)" }} />
                  </>
                )}

                {/* Tooltip */}
                <span className="absolute left-[calc(100%+16px)] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none whitespace-nowrap transition-all duration-300 z-50 shadow-2xl backdrop-blur-xl border border-white/10"
                  style={{ background: "rgba(35,35,35,0.95)", color: "#fff" }}>
                  {label}
                </span>
              </button>
            </div>
          );
        })}
      </nav>

      {/* Logout/Menu Bottom */}
      <div className="flex flex-col items-center gap-4 border-t pt-8" style={{ borderColor: "var(--border)" }}>
        <button 
          onClick={() => setCurrentView('login')}
          className="group relative flex items-center justify-center size-11 rounded-2xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-300 active:scale-90 opacity-60"
        >
          <LogOut className="size-5" />
        </button>
      </div>
      </aside>
    </>
  );
}
