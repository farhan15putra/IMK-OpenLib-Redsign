import { Bookmark, ExternalLink } from "lucide-react";

export function SavedBooks({ savedBooks, onRemove }: { savedBooks: any[], onRemove: (id: number) => void }) {

  return (
    <div className="px-8 py-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="size-12 rounded-2xl bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
            <Bookmark className="size-6 text-amber-500" />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight leading-none" style={{ color: "var(--foreground)" }}>Saved Bookmark</h1>
            <p className="text-sm font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>Curated lists of your favorite discoveries.</p>
          </div>
        </div>
        <div className="flex gap-2">
            <button className="px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-border bg-card hover:bg-muted transition-colors">
              Filter List
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {savedBooks.map((book) => (
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
                   Open Details
                 </button>
              </div>
            </div>

            <div className="flex-1 flex flex-col">
              <h3 className="text-base font-black leading-snug mb-1 group-hover:text-primary transition-colors" style={{ color: "var(--foreground)" }}>{book.title}</h3>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-2">{book.author}</p>
            </div>
            
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
               <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Saved recently</p>
               <ExternalLink className="size-4 text-muted-foreground group-hover:text-amber-500 transition-colors" />
            </div>
          </div>
        ))}
        
        {/* Placeholder for Discover More */}
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl border-2 border-dashed border-border hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer group">
           <div className="size-14 rounded-full bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
             <Bookmark className="size-6 text-muted-foreground group-hover:text-primary transition-colors" />
           </div>
           <h3 className="font-bold text-sm" style={{ color: "var(--foreground)" }}>Add new to list</h3>
           <p className="text-xs mt-1 text-center font-medium" style={{ color: "var(--muted-foreground)" }}>Explore the catalog to pin more books here.</p>
        </div>
      </div>
    </div>
  );
}
