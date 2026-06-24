import { Search, Bell, Settings, Layers, Menu, User, Globe } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useI18n } from "../../context/i18nContext";
import logoImg from "../../imports/openlibcrop.png";

export function Header({ 
  onHomeClick, 
  onProfileClick, 
  onMenuClick,
  searchQuery = "",
  onSearch
}: { 
  onHomeClick?: () => void, 
  onProfileClick?: () => void, 
  onMenuClick?: () => void,
  searchQuery?: string,
  onSearch?: (query: string) => void
}) {
  const { t, locale, setLocale } = useI18n();
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showAppSwitcher, setShowAppSwitcher] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setShowAdvanced(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-4 md:py-5 h-20 md:h-24 transition-all duration-300 relative z-40 bg-background/80 backdrop-blur-md"
      style={{ borderBottom: "1.5px solid var(--border)" }}>

      {/* Official Branding Flex Container */}
      <div className="flex items-center gap-3 md:gap-6">
        {/* Mobile Hamburger Menu */}
        <button
          onClick={onMenuClick}
          aria-label={t("header.menu_open")}
          aria-expanded={false}
          aria-controls="sidebar-nav"
          className="md:hidden p-2 rounded-xl border border-border bg-card shadow-sm active:scale-95 transition-transform"
        >
          <Menu className="size-5" aria-hidden="true" />
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
        <div className="absolute inset-0 bg-primary/5 blur-xl focus-within:bg-primary/10 transition-colors rounded-3xl" aria-hidden="true" />
        <form
          role="search"
          aria-label={t("header.search_label")}
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.elements.namedItem("q") as HTMLInputElement;
            if (input) onSearch?.(input.value);
          }}
          className="relative flex items-center h-10 md:h-12 w-full px-3 md:px-5 rounded-2xl bg-card border border-border shadow-sm focus-within:border-primary focus-within:shadow-[0_0_0_3px_rgba(139,0,0,0.1)] transition-all"
        >
          <button type="submit" aria-label={t("header.search_label")} className="focus:outline-none flex items-center">
            <Search className="size-4 md:size-5 transition-transform" style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
          </button>
          <label htmlFor="header-search" className="sr-only">{t("header.search_label")}</label>
          <input
            ref={searchInputRef}
            id="header-search"
            name="q"
            type="search"
            defaultValue={searchQuery}
            placeholder={t("header.search_placeholder")}
            className="flex-1 ml-3 md:ml-4 bg-transparent text-[11px] md:text-sm font-bold placeholder:font-medium placeholder:opacity-40 outline-none w-full"
            style={{ color: "var(--foreground)" }}
          />
          <div className="flex items-center gap-1.5 ml-2 md:ml-4">
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md bg-muted text-[10px] font-black opacity-50 uppercase tracking-widest border border-border" aria-hidden="true">
              <span>Alt+K</span>
            </div>
            <button 
              onClick={() => setShowAdvanced(!showAdvanced)}
              aria-expanded={showAdvanced}
              aria-controls="advanced-search-panel"
              aria-label={t("header.advanced_search")}
              className="flex items-center gap-1.5 px-2 md:px-2.5 py-1.5 md:py-1 rounded-md text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/10 text-primary border border-primary/20 bg-primary/5 active:scale-95 shadow-sm"
            >
              <Settings className="size-3 md:size-3.5" aria-hidden="true" />
              <span className="hidden xs:inline" aria-hidden="true">{t("header.advanced_search")}</span>
            </button>
          </div>
        </form>

        {/* Advanced Search Pop-up */}
        {showAdvanced && (
          <div
            id="advanced-search-panel"
            role="region"
            aria-label={t("search.advanced_options")}
            className="absolute top-[calc(100%+0.5rem)] left-0 w-full bg-card border border-primary/30 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-5 animate-in fade-in slide-in-from-top-4 duration-300 z-50 backdrop-blur-xl"
          >
            <h4 className="text-[10px] font-black uppercase tracking-widest text-primary mb-4 border-b border-border pb-2">{t("search.advanced_options")}</h4>
            <div className="grid grid-cols-2 gap-4 mb-5">
               <div>
                  <label htmlFor="adv-author" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{t("search.author")}</label>
                  <input id="adv-author" type="text" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder={t("search.author_placeholder")} />
               </div>
               <div>
                  <label htmlFor="adv-year" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{t("search.year")}</label>
                  <input id="adv-year" type="number" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder={t("search.year_placeholder")} />
               </div>
               <div className="col-span-2">
                  <label htmlFor="adv-publisher" className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground block mb-1.5">{t("search.publisher")}</label>
                  <input id="adv-publisher" type="text" className="w-full bg-muted/50 border border-border rounded-lg px-3 py-2 text-xs font-medium text-foreground outline-none focus:border-primary transition-colors" placeholder={t("search.publisher_placeholder")} />
               </div>
            </div>
            <button 
              type="button"
              onClick={() => {
                const author = (document.getElementById('adv-author') as HTMLInputElement)?.value || '';
                const year = (document.getElementById('adv-year') as HTMLInputElement)?.value || '';
                const publisher = (document.getElementById('adv-publisher') as HTMLInputElement)?.value || '';
                if (onSearch) {
                  onSearch(`adv: author=${author} year=${year} publisher=${publisher}`);
                }
                setShowAdvanced(false);
              }}
              className="w-full py-2.5 bg-primary text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
               {t("search.execute")}
            </button>
          </div>
        )}
      </div>

      {/* Right Action Hub */}
      <div className="flex flex-shrink-0 items-center gap-3 md:gap-6">

        {/* App Switcher */}
        <div className="relative hidden md:block">
          <button
            onClick={() => setShowAppSwitcher(!showAppSwitcher)}
            aria-label={t("header.app_switcher")}
            className="relative flex items-center justify-center size-12 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-all active:scale-95 group"
          >
            <Layers className="size-5 transition-transform group-hover:scale-110" style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
          </button>
          
          {showAppSwitcher && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowAppSwitcher(false)} />
              <div className="absolute right-0 top-[calc(100%+0.5rem)] w-64 bg-card border border-border rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] p-3 animate-in fade-in slide-in-from-top-4 duration-200 z-50">
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-3 px-2">Telkom Apps</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'openlibrary', name: 'Open Library', icon: '📚' },
                    { id: 'lms', name: 'CeLOE LMS', icon: '🎓' },
                    { id: 'igracias', name: 'iGracias', icon: '🏛️' },
                    { id: 'student', name: 'Student Portal', icon: '👤' },
                  ].map(app => (
                    <a key={app.id} href="#" onClick={(e) => { e.preventDefault(); setShowAppSwitcher(false); }} className="flex flex-col items-center justify-center p-3 rounded-xl hover:bg-muted transition-colors text-center border border-transparent hover:border-border group/app">
                      <span className="text-2xl mb-2 group-hover/app:scale-110 transition-transform">{app.icon}</span>
                      <span className="text-[10px] font-bold text-foreground leading-tight">{app.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Global Notifications */}
        <button
          aria-label={t("header.notifications_unread", { count: 1 })}
          className="relative flex items-center justify-center size-12 rounded-2xl bg-card border border-border shadow-sm hover:bg-muted hover:shadow-md transition-all active:scale-95 group"
        >
          <Bell className="size-5 transition-transform group-hover:rotate-12" style={{ color: "var(--muted-foreground)" }} aria-hidden="true" />
          <span className="absolute top-3.5 right-3.5 size-2.5 rounded-full ring-2 ring-card shadow-lg" style={{ background: "var(--primary)" }} aria-hidden="true" />
        </button>

        {/* Language Switcher */}
        <div className="hidden sm:flex items-center gap-1.5 p-1 rounded-2xl bg-card border border-border shadow-sm">
          {(["id", "en"] as const).map(l => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              aria-pressed={locale === l}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                locale === l 
                ? "bg-primary text-white shadow-md shadow-primary/20" 
                : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {l === "id" ? "ID" : "EN"}
            </button>
          ))}
        </div>

        {/* User Account */}
        <button
          onClick={onProfileClick}
          aria-label={t("header.user_profile")}
          className="flex items-center gap-2 md:gap-4 py-1 md:py-1.5 px-1.5 md:px-2.5 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md transition-shadow cursor-pointer active:scale-95"
        >
          <div className="size-8 md:size-10 rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 bg-muted">
            <img
              src="https://api.dicebear.com/9.x/notionists/svg?seed=TelkomStudent&backgroundColor=FDFBF3"
              alt={t("header.user_profile")}
              className="w-full h-full object-cover"
            />
          </div>
        </button>

      </div>
    </header>
  );
}
