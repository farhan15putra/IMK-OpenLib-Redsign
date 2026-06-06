import { SlidersHorizontal, Bookmark, ExternalLink, ChevronDown, ChevronUp, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "../../context/i18nContext";

type FilterState = {
  years: string[];
  programs: string[];
  formats: string[];
};

const YEARS = ["2024", "2023", "2022", "2021", "2020 & Older"];
const PROGRAMS = ["Informatics", "Information Systems", "Business & Economics", "Creative Industries", "Engineering"];
const FORMATS = ["Buku", "Jurnal", "Skripsi"];

export function SearchResults({ 
  books, 
  selectedCategory, 
  initialFormats = [],
  searchQuery = "",
  onOpenReader,
  onOpenDetails
}: { 
  books: any[], 
  selectedCategory: string,
  initialFormats?: string[],
  searchQuery?: string,
  onOpenReader?: (book: any) => void,
  onOpenDetails?: (book: any) => void
}) {
  const { t } = useI18n();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  // FIX: Start with filters from initialFormats (passed from quick access), else empty
  const [filters, setFilters] = useState<FilterState>({
    years: [],
    programs: [],
    formats: initialFormats,
  });

  const toggleFilter = (group: keyof FilterState, value: string) => {
    setFilters(prev => ({
      ...prev,
      [group]: prev[group].includes(value)
        ? prev[group].filter(v => v !== value)
        : [...prev[group], value]
    }));
  };

  const clearFilter = (group: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [group]: prev[group].filter(v => v !== value) }));
  };

  const activeFilters = [
    ...filters.years.map(v => ({ group: "years" as keyof FilterState, label: v })),
    ...filters.programs.map(v => ({ group: "programs" as keyof FilterState, label: v })),
    ...filters.formats.map(v => ({ group: "formats" as keyof FilterState, label: v })),
  ];

  const clearAll = () => setFilters({ years: [], programs: [], formats: [] });

  // Filter books by selectedCategory from parent (Home page pills)
  const filteredBooks = books.filter(b => {
    // 0. Search query check
    if (searchQuery && !b.title.toLowerCase().includes(searchQuery.toLowerCase()) && !b.author.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
    }

    // 1. Category check
    const matchCategory = selectedCategory === "All" ? true : b.category === selectedCategory;
    
    // 2. Format check
    let matchFormat = true;
    if (filters.formats.length > 0) {
      const formatMap: Record<string, string[]> = {
        "Buku": ["Physical", "E-Book"],
        "Jurnal": ["Journal"],
        "Skripsi": ["Skripsi"]
      };
      matchFormat = filters.formats.some(activeFmt => 
        formatMap[activeFmt]?.includes(b.format)
      );
    }
    
    // 3. Year check
    let matchYear = true;
    if (filters.years.length > 0) {
      matchYear = filters.years.includes(b.year);
    }
    
    // 4. Program check
    let matchProgram = true;
    if (filters.programs.length > 0) {
      matchProgram = filters.programs.includes(b.program);
    }
    
    return matchCategory && matchFormat && matchYear && matchProgram;
  });

  const renderCheckbox = (group: keyof FilterState, value: string) => {
    const checked = filters[group].includes(value);
    return (
      <label key={value} className="flex items-center gap-3 cursor-pointer group" onClick={() => toggleFilter(group, value)}>
        <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center flex-shrink-0 ${checked ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}>
          {checked && (
            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
        <span
          className="text-xs font-bold group-hover:opacity-100 transition-opacity"
          style={{ color: "var(--foreground)", opacity: checked ? 1 : 0.7 }}
        >{value}</span>
      </label>
    );
  };

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-8 py-6 gap-6 md:gap-8 h-full max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar Filter */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col gap-4 md:gap-6">
        {/* Filter header */}
        <div
          className="flex items-center justify-between pb-4 border-b border-border cursor-pointer md:cursor-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <h2 className="text-lg font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("catalog.filters")}</h2>
            {activeFilters.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[9px] font-black text-white" style={{ background: "var(--primary)" }}>
                {activeFilters.length}
              </span>
            )}
          </div>
          <button className="md:hidden p-1 bg-muted rounded-md text-foreground">
            {isFilterOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>

        {/* Active filter chips */}
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {activeFilters.map(f => (
              <button
                key={f.group + f.label}
                onClick={() => clearFilter(f.group, f.label)}
                className="flex items-center gap-1 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider transition-colors"
                style={{ background: "rgba(139,0,0,0.12)", color: "var(--primary)", border: "1px solid rgba(139,0,0,0.2)" }}
              >
                {f.label}
                <X className="size-2.5" />
              </button>
            ))}
            {activeFilters.length > 1 && (
              <button onClick={clearAll} className="px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-wider text-muted-foreground hover:text-primary transition-colors">
                {t("catalog.clear_all")}
              </button>
            )}
          </div>
        )}

        {/* Filter Content */}
        <div className={`flex-col gap-6 ${isFilterOpen ? 'flex' : 'hidden'} md:flex`}>
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{t("catalog.pub_year")}</h3>
            <div className="flex flex-col gap-2.5">{YEARS.map(y => renderCheckbox("years", y))}</div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{t("catalog.program")}</h3>
            <div className="flex flex-col gap-2.5">{PROGRAMS.map(p => renderCheckbox("programs", p))}</div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>{t("catalog.format")}</h3>
            <div className="flex flex-col gap-2.5">{FORMATS.map(f => renderCheckbox("formats", f))}</div>
          </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: "var(--foreground)" }}>{t("catalog.title")}</h1>
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
              {t("catalog.showing").replace("{{count}}", String(filteredBooks.length))}
              {activeFilters.length > 0 && (
                <span> • <span style={{ color: "var(--primary)" }}>{t("catalog.active_filters").replace("{{count}}", String(activeFilters.length))}</span></span>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="flex flex-col md:flex-row p-4 rounded-3xl border transition-all cursor-pointer group/card hover:border-primary/40 hover:shadow-xl"
                 style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
              <div className="flex gap-5 md:w-2/3">
                <div className="relative w-24 h-36 bg-muted rounded-2xl flex-shrink-0 bg-cover bg-center shadow-md border border-border overflow-hidden" 
                     style={{ backgroundImage: `url('${book.cover}')` }}>
                    <div className="absolute inset-0 opacity-0 md:group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-center items-center md:backdrop-blur-sm p-2"
                         style={{ background: "rgba(0,0,0,0.6)" }}>
                        {book.category === 'Journals' || book.id === 2 || book.id === 5 || book.id === 6 ? (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onOpenReader?.(book); }}
                            className="px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded shadow-lg scale-90 group-hover/card:scale-100 transition-transform active:scale-95">
                            {t("catalog.read_online")}
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => { e.stopPropagation(); onOpenDetails?.(book); }}
                            className="px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded shadow-lg scale-90 group-hover/card:scale-100 transition-transform">
                            {t("catalog.quick_view")}
                          </button>
                        )}
                    </div>
                </div>
                <div className="flex flex-col py-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest ${book.format === 'Journal' ? 'bg-blue-500/10 text-blue-500' : (book.format === 'E-Book' ? 'bg-blue-500/10 text-blue-500' : 'bg-primary/10 text-primary')}`}>
                      {book.format === 'Journal' ? 'Digital Journal' : (book.format === 'E-Book' ? 'E-Book' : 'Physical')}
                    </span>
                    <span className="text-[10px] font-bold opacity-60">2024</span>
                    <span className="text-[10px] font-bold opacity-60 px-1">•</span>
                    <span className="text-[10px] font-bold opacity-60">{book.category}</span>
                  </div>
                  <h3
                    className="flex-1 text-base font-black leading-snug mb-1 group-hover:text-primary transition-colors line-clamp-2"
                    style={{ color: "var(--foreground)" }}
                    title={book.title}
                  >{book.title}</h3>
                  <p className="text-xs italic mb-2" style={{ color: "var(--muted-foreground)" }}>{book.author}</p>
                  <div>
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase border ${book.status === 'Available' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'}`}>
                      <div className={`size-1.5 rounded-full ${book.status === 'Available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                      {book.status} - {book.location || 'Kampus Jakarta'}
                    </div>
                  </div>
                  <div className="mt-3 flex md:hidden">
                    <button 
                      onClick={(e) => { e.stopPropagation(); onOpenReader?.(book); }}
                      className="w-full py-2 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg shadow-md active:scale-95">
                      {book.format === 'Physical' ? t("catalog.request_loan") : t("catalog.read_now")}
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 mt-4 md:mt-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-5">
                <p className="text-[11px] leading-relaxed line-clamp-4 font-medium opacity-80" style={{ color: "var(--foreground)" }}>
                  {book.abstract || "This comprehensive guide covers modern architectural patterns for building scalable and reliable distributed systems..."}
                </p>
                <div className="mt-auto pt-4 flex items-center gap-2">
                  <button 
                    onClick={(e) => { e.stopPropagation(); onOpenDetails?.(book); }}
                    className="flex-1 max-w-[120px] py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
                    {t("catalog.view_details")}
                  </button>
                  <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm bg-card">
                    <Bookmark className="size-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm bg-card">
                    <ExternalLink className="size-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
