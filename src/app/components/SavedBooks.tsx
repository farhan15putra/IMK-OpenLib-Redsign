import { useState } from "react";
import { Bookmark, ExternalLink, Library, Filter, ChevronDown, X } from "lucide-react";
import { useI18n } from "../../context/i18nContext";

export function SavedBooks({ savedBooks, onRemove, onNavigateCatalog }: { savedBooks: any[], onRemove: (id: number) => void, onNavigateCatalog?: () => void }) {
  const { t } = useI18n();

  // ── Filter State ─────────────────────────────────────────────
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterFormat, setFilterFormat] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "az" | "za">("newest");

  // Derive unique categories & formats from actual data
  const categories = ["All", ...Array.from(new Set(savedBooks.map(b => b.category).filter(Boolean)))];
  const formats = ["All", ...Array.from(new Set(savedBooks.map(b => b.format).filter(Boolean)))];

  const activeFilterCount = (filterCategory !== "All" ? 1 : 0) + (filterFormat !== "All" ? 1 : 0) + (sortOrder !== "newest" ? 1 : 0);

  // ── Filter + Sort Logic ──────────────────────────────────────
  const filteredBooks = savedBooks
    .filter(b => filterCategory === "All" || b.category === filterCategory)
    .filter(b => filterFormat === "All" || b.format === filterFormat)
    .sort((a: any, b: any) => {
      if (sortOrder === "az") return a.title.localeCompare(b.title);
      if (sortOrder === "za") return b.title.localeCompare(a.title);
      return 0;
    });

  const clearFilters = () => {
    setFilterCategory("All");
    setFilterFormat("All");
    setSortOrder("newest");
  };

  return (
    <div className="px-8 py-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Bookmark className="size-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none" style={{ color: "var(--foreground)" }}>{t("saved.title")}</h1>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>{t("saved.subtitle")}</p>
          </div>
        </div>

        {/* ── Filter Button + Dropdown ── */}
        <div className="relative">
          <button
            onClick={() => setShowFilterMenu(!showFilterMenu)}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-border bg-card hover:bg-muted transition-colors shadow-sm active:scale-95"
            aria-expanded={showFilterMenu}
            aria-haspopup="true"
          >
            <Filter className="size-3.5" />
            {t("saved.filter_list")}
            {activeFilterCount > 0 && (
              <span className="size-5 rounded-full text-[9px] font-black text-white flex items-center justify-center" style={{ background: "var(--primary)" }}>
                {activeFilterCount}
              </span>
            )}
            <ChevronDown className={`size-3.5 transition-transform duration-300 ${showFilterMenu ? 'rotate-180' : ''}`} />
          </button>

          {/* Dropdown Menu */}
          {showFilterMenu && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowFilterMenu(false)} />
              <div className="absolute right-0 top-full mt-2 w-72 bg-card border border-border rounded-2xl shadow-2xl z-50 p-5 animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Category Filter */}
                <div className="mb-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "var(--muted-foreground)" }}>{t("saved.filter_by_category")}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => setFilterCategory(cat)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95"
                        style={filterCategory === cat
                          ? { background: "var(--primary)", color: "#fff" }
                          : { background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }
                        }
                      >
                        {cat === "All" ? t("saved.all") : cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Format Filter */}
                <div className="mb-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "var(--muted-foreground)" }}>{t("saved.filter_by_format")}</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {formats.map(fmt => (
                      <button
                        key={fmt}
                        onClick={() => setFilterFormat(fmt)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95"
                        style={filterFormat === fmt
                          ? { background: "var(--primary)", color: "#fff" }
                          : { background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }
                        }
                      >
                        {fmt === "All" ? t("saved.all") : fmt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort */}
                <div className="mb-4">
                  <h4 className="text-[9px] font-black uppercase tracking-widest mb-2" style={{ color: "var(--muted-foreground)" }}>{t("saved.sort_label")}</h4>
                  <div className="flex gap-1.5">
                    {([["newest", t("saved.sort_newest")], ["az", t("saved.sort_az")], ["za", t("saved.sort_za")]] as [string, string][]).map(([key, label]) => (
                      <button
                        key={key}
                        onClick={() => setSortOrder(key as any)}
                        className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all active:scale-95"
                        style={sortOrder === key
                          ? { background: "var(--primary)", color: "#fff" }
                          : { background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }
                        }
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                {activeFilterCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="w-full py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-primary hover:bg-primary/10 transition-colors border border-primary/20 flex items-center justify-center gap-1.5"
                  >
                    <X className="size-3" />
                    {t("catalog.clear_all")}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-6">
          {filterCategory !== "All" && (
            <button
              onClick={() => setFilterCategory("All")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
              style={{ background: "rgba(139,0,0,0.12)", color: "var(--primary)", border: "1px solid rgba(139,0,0,0.2)" }}
            >
              {filterCategory} <X className="size-2.5" />
            </button>
          )}
          {filterFormat !== "All" && (
            <button
              onClick={() => setFilterFormat("All")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
              style={{ background: "rgba(139,0,0,0.12)", color: "var(--primary)", border: "1px solid rgba(139,0,0,0.2)" }}
            >
              {filterFormat} <X className="size-2.5" />
            </button>
          )}
          {sortOrder !== "newest" && (
            <button
              onClick={() => setSortOrder("newest")}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider"
              style={{ background: "rgba(139,0,0,0.12)", color: "var(--primary)", border: "1px solid rgba(139,0,0,0.2)" }}
            >
              {sortOrder === "az" ? t("saved.sort_az") : t("saved.sort_za")} <X className="size-2.5" />
            </button>
          )}
        </div>
      )}

      {/* No match message */}
      {filteredBooks.length === 0 && savedBooks.length > 0 && (
        <div className="text-center py-16">
          <p className="text-sm font-bold" style={{ color: "var(--muted-foreground)" }}>{t("saved.no_match")}</p>
          <button onClick={clearFilters} className="mt-3 text-xs font-bold text-primary hover:underline">{t("catalog.clear_all")}</button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <div key={book.id} className="group flex flex-col p-4 rounded-3xl border border-border shadow-sm hover:shadow-xl hover:border-amber-500/40 transition-all cursor-pointer bg-card overflow-hidden relative">
            {/* Remove Bookmark Action Overlay */}
            <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
               <button 
                 onClick={(e) => { e.stopPropagation(); onRemove(book.id); }}
                 className="size-8 rounded-full bg-white/90 shadow-md backdrop-blur-md flex items-center justify-center hover:bg-red-50 text-red-500 hover:scale-110 active:scale-95 transition-all"
               >
                 <Bookmark className="size-4 fill-current" />
               </button>
            </div>

            <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-4 bg-muted">
              <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              {/* Grading Layer */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                 <span className="text-[10px] font-black tracking-widest uppercase px-2 py-1 bg-white/20 backdrop-blur-md rounded text-white border border-white/20">
                   {book.category || book.format || "Book"}
                 </span>
              </div>
              
              {/* Lens Preview Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center backdrop-blur-md"
                   style={{ background: "rgba(0,0,0,0.6)" }}>
                 <button className="px-4 py-2 mt-4 bg-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg scale-90 group-hover:scale-100 transition-transform">
                   {t("saved.open_details")}
                 </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              {/* FIX #5: line-clamp + title attribute to prevent invisible truncation */}
              <h3
                className="text-base font-black leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2"
                style={{ color: "var(--foreground)" }}
                title={book.title}
              >{book.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2" title={book.author}>{book.author}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t("saved.saved_recently")}</p>
               <ExternalLink className="size-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
            </div>
          </div>
        ))}
        
        {/* Placeholder for Discover More */}
        {/* FIX #5b: Improved empty state with direct action button */}
        <div
          onClick={() => onNavigateCatalog?.()}
          className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group"
        >
           <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Bookmark className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
           </div>
           <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>{t("saved.add_to_list")}</h3>
           <p className="text-xs mt-1 text-center font-medium mb-4" style={{ color: "var(--muted-foreground)" }}>{t("saved.explore_desc")}</p>
           <button className="flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all hover:opacity-90 active:scale-95"
             style={{ background: "var(--primary)" }}>
             <Library className="size-3.5" />
             {t("saved.explore_catalog")}
           </button>
        </div>
      </div>
    </div>
  );
}
