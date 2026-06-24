import { ArrowUpRight, Sparkles, BookOpen, Globe, BookMarked, Users, Heart, Search } from "lucide-react";
import { useI18n } from "../../context/i18nContext";

type QuickAccessItem = {
  icon: React.ElementType;
  labelKey: "hero.qa_ebooks" | "hero.qa_journals" | "hero.qa_readers" | "hero.qa_toprated";
  count: string;
  color: string;
  bg: string;
  // navigation target
  navTarget: string;
  navCategory?: string;
};

export function Hero({ onNavigate, onSearch }: { onNavigate?: (target: string, category?: string) => void; onSearch?: (query: string) => void }) {
  const { t } = useI18n();

  const quickAccessItems: QuickAccessItem[] = [
    {
      icon: BookMarked,
      labelKey: "hero.qa_ebooks",
      count: "18,240+",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      navTarget: "catalog",
      navCategory: "E-Book",
    },
    {
      icon: Globe,
      labelKey: "hero.qa_journals",
      count: "4,800+",
      color: "text-green-500",
      bg: "bg-green-500/10",
      navTarget: "catalog",
      navCategory: "Journals",
    },
    {
      icon: Users,
      labelKey: "hero.qa_readers",
      count: "10,000+",
      color: "text-amber-500",
      bg: "bg-amber-500/10",
      navTarget: "history",
    },
    {
      icon: Heart,
      labelKey: "hero.qa_toprated",
      count: "352",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      navTarget: "saved",
    },
  ];

  const stats = [
    { value: "24,448+", labelKey: "hero.stat_assets" as const },
    { value: "12",       labelKey: "hero.stat_databases" as const },
    { value: "4",        labelKey: "hero.stat_libraries" as const },
  ];

  return (
    <section className="px-6 md:px-8 pt-10 md:pt-14 pb-12 md:pb-18 relative overflow-hidden">
      {/* Dot Grid Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, var(--foreground) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Visual Identity Decorator */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,0,0,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,0,0,0.03),transparent_70%)] pointer-events-none" />

      {/* Two-column layout on large screens */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 lg:gap-16">
        {/* Left: Text Content — wrapped in glassmorphism card */}
        <div className="flex flex-col items-start max-w-2xl flex-1">
          <div
            className="rounded-[2.5rem] p-8 md:p-10 backdrop-blur-xl border border-border/50 shadow-2xl w-full"
            style={{ background: "var(--card)" }}
          >
            <div
              className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 border border-border/80 shadow-sm"
              style={{ background: "rgba(139,0,0,0.05)", color: "var(--primary)" }}
            >
              <Sparkles className="size-3.5 fill-current" />
              {t("hero.badge")}
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] md:leading-[1] mb-6 md:mb-8 tracking-tighter"
              style={{ color: "var(--foreground)" }}
            >
              {t("hero.title_line1")} <br />
              <span style={{ color: "var(--primary)" }}>{t("hero.title_line2")}</span>
            </h1>

            <p
              className="text-sm md:text-base leading-relaxed mb-8 opacity-80 max-w-lg font-bold"
              style={{ color: "var(--foreground)" }}
            >
              {t("hero.description").split("{{count}}")[0]}
              <span className="text-white px-2 py-0.5 rounded-md" style={{ background: "var(--primary)" }}>
                24,448+
              </span>
              {t("hero.description").split("{{count}}")[1]}
            </p>

            {/* ===== FIX #1: Prominent Hero Search Bar ===== */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem("hero-q") as HTMLInputElement;
                if (input?.value.trim()) onSearch?.(input.value.trim());
              }}
              className="w-full mb-8 relative group/search"
            >
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl opacity-0 group-focus-within/search:opacity-100 transition-opacity duration-500" aria-hidden="true" />
              <div className="relative flex items-center h-14 md:h-16 w-full px-5 md:px-6 rounded-full border-2 shadow-lg transition-all duration-300 border-border/80 focus-within:border-primary focus-within:shadow-[0_0_0_4px_rgba(139,0,0,0.12)]"
                style={{ background: "var(--card)" }}
              >
                <Search className="size-5 md:size-6 flex-shrink-0" style={{ color: "var(--muted-foreground)" }} />
                <input
                  id="hero-q"
                  name="hero-q"
                  type="search"
                  placeholder={t("hero.search_placeholder")}
                  className="flex-1 ml-4 bg-transparent text-sm md:text-base font-bold placeholder:font-medium placeholder:opacity-50 outline-none min-w-0"
                  style={{ color: "var(--foreground)" }}
                />
                <button
                  type="submit"
                  className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full text-[11px] font-black uppercase tracking-widest transition-all hover:opacity-90 active:scale-95 shadow-md flex-shrink-0"
                  style={{ background: "var(--primary)", color: "#fff" }}
                >
                  <Search className="size-4" />
                  {t("hero.search_button")}
                </button>
              </div>
            </form>

            {/* CTA Buttons */}
            <div className="flex items-center gap-5">
              <button
                onClick={() => onNavigate?.("catalog")}
                className="group inline-flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(139,0,0,0.25)] active:scale-95"
                style={{ background: "var(--foreground)", color: "var(--background)" }}
              >
                {t("hero.start_discovering")}
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <div className="hidden sm:flex items-center gap-6 p-1 px-4 rounded-[2rem] border border-border bg-card/40 backdrop-blur-md">
                <button
                  onClick={() => onNavigate?.("catalog", "E-Book")}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer group/nav"
                >
                  <BookOpen className="size-4 opacity-40 group-hover/nav:opacity-100 group-hover/nav:text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/nav:opacity-100">{t("hero.ebooks")}</span>
                </button>
                <div className="w-px h-6 bg-border" />
                <button
                  onClick={() => onNavigate?.("catalog", "Journals")}
                  className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer group/nav"
                >
                  <Globe className="size-4 opacity-40 group-hover/nav:opacity-100 group-hover/nav:text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/nav:opacity-100">{t("hero.journals")}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Stats Row — separate card container */}
          <div
            className="mt-6 w-full rounded-2xl px-8 py-5 border border-border/50 shadow-md flex flex-wrap gap-6 md:gap-10"
            style={{ background: "var(--card)", backdropFilter: "blur(12px)" }}
          >
            {stats.map((stat) => (
              <div key={stat.labelKey} className="flex flex-col">
                <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
                  {stat.value}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                  {t(stat.labelKey)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Quick Access panel */}
        <div className="hidden lg:flex flex-col gap-4 flex-shrink-0 w-72">
          <div className="rounded-3xl border border-border/50 p-5 backdrop-blur-md" style={{ background: "var(--card)" }}>
            <p className="text-[9px] font-black uppercase tracking-widest mb-4" style={{ color: "var(--muted-foreground)" }}>
              {t("hero.quick_access")}
            </p>
            <div className="flex flex-col gap-1">
              {quickAccessItems.map((item) => (
                <button
                  key={item.labelKey}
                  onClick={() => onNavigate?.(item.navTarget, item.navCategory)}
                  className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-muted transition-colors group/item text-left w-full"
                >
                  <div className={`size-9 rounded-xl flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                    <item.icon className={`size-4 ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-black leading-none truncate" style={{ color: "var(--foreground)" }}>
                      {t(item.labelKey)}
                    </p>
                    <p className="text-[10px] font-bold mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                      {item.count} {t("hero.qa_collections")}
                    </p>
                  </div>
                  <ArrowUpRight className="size-3.5 opacity-0 group-hover/item:opacity-60 transition-opacity flex-shrink-0" style={{ color: "var(--primary)" }} />
                </button>
              ))}
            </div>
          </div>
          {/* "Sistem aktif" badge REMOVED per user request */}
        </div>
      </div>
    </section>
  );
}
