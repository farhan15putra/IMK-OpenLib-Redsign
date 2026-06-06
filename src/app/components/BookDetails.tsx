import { X, Bookmark, ExternalLink } from "lucide-react";
import { useEffect, useRef } from "react";
import { useI18n } from "../../context/i18nContext";

export function BookDetails({ book, onClose, isSaved, onToggleSave }: { book: any, onClose: () => void, isSaved?: boolean, onToggleSave?: (id: number) => void }) {
  const { t } = useI18n();
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div 
        className="relative bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-black/10 hover:bg-black/20 text-foreground transition-colors z-10"
        >
          <X className="size-5" />
        </button>

        <div className="w-full md:w-2/5 h-64 md:h-auto bg-muted relative">
          <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-md text-white border border-white/20 shadow-lg ${book.format === 'Journal' ? 'bg-blue-600' : (book.format === 'E-Book' ? 'bg-blue-500' : 'bg-primary')}`}>
              {book.format}
            </span>
          </div>
        </div>

        <div className="w-full md:w-3/5 p-6 md:p-8 flex flex-col">
          <div className="mb-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary bg-primary/10 px-2 py-1 rounded">{book.category}</span>
          </div>
          <h2 className="text-2xl font-black leading-tight mb-2 text-foreground">{book.title}</h2>
          <p className="text-sm font-semibold text-muted-foreground mb-4">{book.author}</p>
          
          <div className="flex items-center gap-2 mb-6">
            <div className={`px-2.5 py-1 rounded-md text-[10px] font-black tracking-widest uppercase border inline-flex items-center gap-1.5 ${book.status === 'Available' ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}`}>
              <div className={`size-1.5 rounded-full ${book.status === 'Available' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
              {book.status}
            </div>
            <span className="text-xs font-medium text-muted-foreground">• {book.location || 'Kampus Jakarta'}</span>
          </div>

          <div className="flex-1 overflow-y-auto mb-6 pr-2">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-2">Abstract / Synopsis</h3>
            <p className="text-sm leading-relaxed text-foreground opacity-80">
              {book.abstract || "This comprehensive guide covers modern architectural patterns for building scalable and reliable distributed systems. Learn how to design robust applications that can handle high traffic and data volume."}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border">
            <button className="flex-1 py-3 bg-primary text-white rounded-xl text-[11px] font-black uppercase tracking-widest hover:opacity-90 active:scale-[0.98] transition-all shadow-lg shadow-primary/30">
              {book.format === 'Physical' ? t("catalog.request_loan") : t("catalog.read_now")}
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleSave?.(book.id); }}
              className={`p-3 rounded-xl border transition-colors shadow-sm ${isSaved ? 'border-primary/50 text-primary bg-primary/10' : 'border-border text-muted-foreground hover:text-primary hover:border-primary/50 bg-muted/50'}`}>
              <Bookmark className="size-5" fill={isSaved ? "currentColor" : "none"} />
            </button>
            <button className="p-3 rounded-xl border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors shadow-sm bg-muted/50">
              <ExternalLink className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
