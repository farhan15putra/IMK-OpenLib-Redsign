import { ArrowUpRight, Sparkles, BookOpen, Globe } from "lucide-react";

export function Hero({ onNavigate }: { onNavigate?: (target: string, category?: string) => void }) {
  return (
    <section className="px-6 md:px-8 pt-10 md:pt-16 pb-12 md:pb-20 relative overflow-hidden">
      {/* Visual Identity Decorator */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,0,0,0.04),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(139,0,0,0.03),transparent_70%)] pointer-events-none" />

      {/* Brand & Narrative — full width */}
      <div className="relative z-10 flex flex-col items-start max-w-3xl">
        <div
          className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-border/80 shadow-sm"
          style={{ background: "rgba(139,0,0,0.05)", color: "var(--primary)" }}
        >
          <Sparkles className="size-3.5 fill-current" />
          Official eLibrary Hub
        </div>

        <h1
          className="text-4xl md:text-5xl lg:text-7xl font-black leading-[1.1] md:leading-[1] mb-6 md:mb-8 tracking-tighter"
          style={{ color: "var(--foreground)" }}
        >
          Digital Knowledge <br />
          <span style={{ color: "var(--primary)" }}>Open Library</span>
        </h1>

        <p
          className="text-sm md:text-base leading-relaxed mb-8 md:mb-12 opacity-80 max-w-lg font-bold"
          style={{ color: "var(--foreground)" }}
        >
          Unlock over{" "}
          <span className="text-white px-2 py-0.5 rounded-md" style={{ background: "var(--primary)" }}>
            24,448+
          </span>{" "}
          digital assets from Telkom University's official research vault and global publication networks.
        </p>

        <div className="flex items-center gap-5">
          <button
            onClick={() => onNavigate?.("catalog")}
            className="group inline-flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(139,0,0,0.25)] active:scale-95"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Start Discovering
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>

          <div className="hidden sm:flex items-center gap-6 p-1 px-4 rounded-[2rem] border border-border bg-card/40 backdrop-blur-md">
            <button
              onClick={() => onNavigate?.("catalog", "All")}
              className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer group/nav"
            >
              <BookOpen className="size-4 opacity-40 group-hover/nav:opacity-100 group-hover/nav:text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/nav:opacity-100">E-Books</span>
            </button>
            <div className="w-px h-6 bg-border" />
            <button
              onClick={() => onNavigate?.("catalog", "Journals")}
              className="flex items-center gap-2 hover:opacity-100 transition-opacity cursor-pointer group/nav"
            >
              <Globe className="size-4 opacity-40 group-hover/nav:opacity-100 group-hover/nav:text-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60 group-hover/nav:opacity-100">Journals</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="relative z-10 mt-12 md:mt-16 flex flex-wrap gap-6 md:gap-10">
        {[
          { value: "24,448+", label: "Digital Assets" },
          { value: "12", label: "Academic Databases" },
          { value: "4", label: "Campus Libraries" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col">
            <span className="text-2xl md:text-3xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>
              {stat.value}
            </span>
            <span className="text-[10px] font-bold uppercase tracking-widest mt-0.5" style={{ color: "var(--muted-foreground)" }}>
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
