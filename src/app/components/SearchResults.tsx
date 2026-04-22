import { SlidersHorizontal, Bookmark, ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function SearchResults({ 
  books, 
  selectedCategory, 
  onOpenReader 
}: { 
  books: any[], 
  selectedCategory: string,
  onOpenReader?: (book: any) => void 
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row px-4 md:px-8 py-6 gap-6 md:gap-8 h-full max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Sidebar Filter */}
      <div className="w-full md:w-64 flex-shrink-0 flex flex-col md:gap-6">
        <div 
          className="flex items-center justify-between pb-4 border-b border-border cursor-pointer md:cursor-auto"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" />
            <h2 className="text-lg font-black tracking-tight" style={{ color: "var(--foreground)" }}>Filters</h2>
          </div>
          <button className="md:hidden p-1 bg-muted rounded-md text-foreground">
            {isFilterOpen ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>
        </div>
        
        {/* Filter Content */}
        <div className={`flex-col gap-6 mt-6 md:mt-0 ${isFilterOpen ? 'flex' : 'hidden'} md:flex`}>
          {/* Filter by Year */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Publication Year</h3>
          <div className="flex flex-col gap-2.5">
            {["2024", "2023", "2022", "2021", "2020 & Older"].map((year, idx) => (
              <label key={year} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${idx === 0 ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}>
                  {idx === 0 && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs font-bold group-hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)", opacity: idx === 0 ? 1 : 0.7 }}>{year}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Faculty / Program Studi */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Program Studi</h3>
          <div className="flex flex-col gap-2.5">
            {["Informatics", "Information Systems", "Business & Economics", "Creative Industries", "Engineering"].map((fac, idx) => (
              <label key={fac} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${idx === 1 ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}>
                  {idx === 1 && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs font-bold group-hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)", opacity: idx === 1 ? 1 : 0.7 }}>{fac}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Filter by Format */}
        <div className="flex flex-col gap-3">
          <h3 className="text-[10px] font-black uppercase tracking-widest" style={{ color: "var(--muted-foreground)" }}>Format</h3>
          <div className="flex flex-col gap-2.5">
            {["Buku", "Jurnal", "Skripsi"].map((format, idx) => (
              <label key={format} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-4 h-4 rounded border transition-colors flex items-center justify-center ${idx === 0 || idx === 1 ? 'bg-primary border-primary' : 'border-border group-hover:border-primary'}`}>
                  {(idx === 0 || idx === 1) && <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs font-bold group-hover:opacity-100 transition-opacity" style={{ color: "var(--foreground)", opacity: idx === 0 || idx === 1 ? 1 : 0.7 }}>{format}</span>
              </label>
            ))}
          </div>
        </div>
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="mb-6 flex items-end justify-between border-b border-border pb-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: "var(--foreground)" }}>Library Catalogue</h1>
            <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
              Showing {
                books.filter(b => selectedCategory === "All" ? true : b.category === selectedCategory).length
              } results in selected filters
            </p>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          {books
            .filter(b => selectedCategory === "All" ? true : b.category === selectedCategory)
            .map((book) => (
              <div key={book.id} className="flex flex-col md:flex-row p-4 rounded-3xl border transition-all cursor-pointer group/card hover:border-primary/40 hover:shadow-xl"
                   style={{ background: "var(--card)", borderColor: "var(--border)", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }}>
                <div className="flex gap-5 md:w-2/3">
                  <div className="relative w-24 h-36 bg-muted rounded-2xl flex-shrink-0 bg-cover bg-center shadow-md border border-border overflow-hidden" 
                       style={{ backgroundImage: `url('${book.cover}')` }}>
                      {/* Lens Preview Hover */}
                      <div className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-all duration-300 flex flex-col justify-center items-center backdrop-blur-sm p-2"
                           style={{ background: "rgba(0,0,0,0.6)" }}>
                          {book.category === 'Journals' || book.id === 2 || book.id === 5 || book.id === 6 ? (
                            <button 
                              onClick={(e) => { e.stopPropagation(); onOpenReader?.(book); }}
                              className="px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded shadow-lg scale-90 group-hover/card:scale-100 transition-transform active:scale-95">
                              Read Online
                            </button>
                          ) : (
                            <button className="px-2 py-1 bg-primary text-white text-[8px] font-black uppercase tracking-widest rounded shadow-lg scale-90 group-hover/card:scale-100 transition-transform">
                              Quick View
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
                    <h3 className="flex-1 text-base font-black leading-snug mb-1 group-hover:text-primary transition-colors" style={{ color: "var(--foreground)" }}>{book.title}</h3>
                    <p className="text-xs italic mb-2" style={{ color: "var(--muted-foreground)" }}>{book.author}</p>
                    
                    {/* Status Indicator */}
                    <div>
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[9px] font-black tracking-widest uppercase border ${book.status === 'Available' ? 'text-green-500 border-green-500/20 bg-green-500/10' : 'text-red-500 border-red-500/20 bg-red-500/10'}`}>
                        <div className={`size-1.5 rounded-full ${book.status === 'Available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                        {book.status} - {book.location || 'Kampus Jakarta'}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-1/3 mt-4 md:mt-0 flex flex-col justify-center border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-5">
                   <p className="text-[11px] leading-relaxed line-clamp-4 font-medium opacity-80" style={{ color: "var(--foreground)" }}>
                    {book.abstract || "This comprehensive guide covers modern architectural patterns for building scalable and reliable distributed systems..."}
                   </p>
                   <div className="mt-auto pt-4 flex items-center gap-2">
                     <button className="flex-1 max-w-[120px] py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border border-border bg-card hover:bg-muted transition-colors text-foreground shadow-sm">
                       View Details
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
