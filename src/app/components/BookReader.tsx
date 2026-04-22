import { X, ChevronLeft, ChevronRight, Download, BookOpen, Settings, Maximize2, Share2 } from "lucide-react";
import { useState } from "react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category?: string;
}

interface BookReaderProps {
  book: Book;
  onClose: () => void;
}

export function BookReader({ book, onClose }: BookReaderProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 324; // Mock total pages

  const handleDownload = () => {
    // Mock download action
    alert(`Downloading "${book.title}"...`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#0a0a0a] animate-in fade-in zoom-in-95 duration-300">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-4 bg-card/10 backdrop-blur-xl border-b border-white/5">
        <div className="flex items-center gap-4">
          <button 
            onClick={onClose}
            className="p-2 rounded-xl hover:bg-white/10 transition-colors"
          >
            <X className="size-5 text-white/70" />
          </button>
          <div className="h-6 w-px bg-white/10 mx-2" />
          <div className="flex flex-col">
            <h2 className="text-sm font-bold text-white truncate max-w-[200px] md:max-w-md">{book.title}</h2>
            <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{book.author}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="hidden md:flex items-center gap-1 bg-black/40 px-3 py-1.5 rounded-lg border border-white/5">
             <span className="text-[11px] font-bold text-white/50 uppercase tracking-tighter">Document Type:</span>
             <span className="text-[11px] font-black text-primary uppercase">{book.category === 'Journals' ? 'Academic Journal' : 'Digital E-Book'}</span>
          </div>
          
          <div className="flex items-center gap-1">
            <button onClick={handleDownload} className="p-2.5 rounded-xl bg-primary text-white hover:shadow-[0_0_20px_rgba(139,0,0,0.4)] transition-all active:scale-95 flex items-center gap-2">
              <Download className="size-4" />
              <span className="hidden sm:inline text-xs font-black uppercase tracking-widest">Download Full PDF</span>
            </button>
            <button className="p-2.5 rounded-xl hover:bg-white/10 transition-colors text-white/70">
              <Share2 className="size-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content (The Book Sheet) */}
      <div className="flex-1 overflow-hidden relative flex flex-col items-center justify-center p-4 md:p-10">
        {/* Background Decorator */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative w-full max-w-4xl h-full flex flex-col">
          {/* Reader Window */}
          <div className="flex-1 bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative group">
             {/* Mobile Overlay gradient */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/10 pointer-events-none" />
             
             {/* Left Page (Mobile Hidden/Table Only) */}
             <div className="hidden md:flex flex-1 p-12 border-r border-slate-100 flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                   <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Chapter 04: The Void Paradox</span>
                   <span className="text-[9px] font-black text-slate-300 uppercase italic">Telkom University Vault</span>
                </div>
                <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                   <h3 className="text-3xl font-serif text-slate-900 leading-tight">Navigating the <br/>Digital Infrastructure</h3>
                   <div className="space-y-4">
                      {[1,2,3,4].map(i => (
                        <p key={i} className="text-base text-slate-600 leading-relaxed font-serif">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                        </p>
                      ))}
                   </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-50 flex justify-center">
                   <span className="text-[11px] font-bold text-slate-400">{currentPage * 2 - 1}</span>
                </div>
             </div>

             {/* Right Page / Single Page View */}
             <div className="flex-1 p-8 md:p-12 flex flex-col">
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-50">
                   <span className="hidden md:inline text-[9px] font-black uppercase tracking-widest text-slate-300">Academic Manuscript (Restricted)</span>
                   <div className="flex items-center gap-2">
                      <Settings className="size-3 text-slate-300 pointer-events-none" />
                      <Maximize2 className="size-3 text-slate-300 pointer-events-none" />
                   </div>
                </div>
                <div className="space-y-6 flex-1 overflow-y-auto pr-4 custom-scrollbar">
                   <div className="w-full aspect-[4/3] bg-slate-50 rounded-xl mb-6 flex items-center justify-center border border-slate-200 overflow-hidden group/fig">
                      <img src={book.cover} alt="Illustration" className="w-full h-full object-cover opacity-20 grayscale group-hover/fig:grayscale-0 group-hover/fig:scale-105 transition-all duration-700" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 shadow-xl text-[10px] font-black uppercase tracking-widest text-slate-500">Fig 12.4: System Architecture</div>
                      </div>
                   </div>
                   <div className="space-y-4">
                      {[1,2].map(i => (
                        <p key={i} className="text-base text-slate-600 leading-relaxed font-serif">
                          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.
                        </p>
                      ))}
                   </div>
                </div>
                <div className="mt-8 pt-4 border-t border-slate-50 flex justify-center">
                   <span className="text-[11px] font-bold text-slate-400">{currentPage * 2}</span>
                </div>
             </div>
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-center gap-6">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="size-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronLeft className="size-6" />
            </button>
            <div className="px-8 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center gap-1">
               <span className="text-white font-black tracking-widest text-sm">{currentPage} / {totalPages / 2}</span>
               <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-primary" style={{ width: `${(currentPage / (totalPages/2)) * 100}%` }} />
               </div>
            </div>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages / 2, p + 1))}
              disabled={currentPage >= totalPages / 2}
              className="size-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all disabled:opacity-30 disabled:pointer-events-none"
            >
              <ChevronRight className="size-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Floating Status Bar */}
      <div className="px-6 py-3 bg-black border-t border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-[0.2em]">
          <div className="size-1.5 rounded-full bg-primary animate-pulse" />
          Decrypted Academic Access • Telkom University Secure Node
        </div>
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 text-[9px] font-black text-white/60 uppercase tracking-widest">
             <BookOpen className="size-3 text-primary" />
             Last Read: Nov 12, 14:23
           </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
}
