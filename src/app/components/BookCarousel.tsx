import { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../styles/carousel.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  featured?: boolean;
  location?: string;
  status?: "Available" | "Borrowed";
  abstract?: string;
  shelf?: string;
}

interface BookCarouselProps {
  books: Book[];
  savedBookIds?: number[];
  onToggleSave?: (id: number) => void;
  onOpenReader?: (book: Book) => void;
}

interface BookSlideProps extends Book {
  isSaved?: boolean;
  onToggleSave?: (id: number) => void;
  onOpenReader?: () => void;
}

function BookSlide({ id, title, author, cover, category, featured, location, status, abstract, shelf, isSaved, onToggleSave, onOpenReader }: BookSlideProps) {
  return (
    <div className={`group relative cursor-pointer px-3 py-4 md:py-8 transition-all duration-500 ease-out ${featured ? "md:scale-110 z-10 scale-105" : "hover:-translate-y-2 opacity-90 hover:opacity-100"}`}>
      {/* Book cover elevation */}
      <div
        className="relative overflow-hidden rounded-2xl mb-4"
        style={{
          aspectRatio: "2/3",
          boxShadow: featured
            ? "0 35px 70px -15px rgba(0,0,0,0.9), 0 0 0 2px rgba(139,0,0,0.6)"
            : "0 20px 45px -12px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        <img
          src={cover}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/400x600/1a1a1a/D9D9D9?text=${encodeURIComponent(title.slice(0, 15))}`;
          }}
        />

        {/* Featured badge */}
        {featured && (
          <div
            className="absolute top-5 left-5 px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg flex items-center justify-center leading-none"
            style={{ background: "rgba(139,0,0,0.85)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            Must Read
          </div>
        )}

        {/* Interaction overlay (Lens Preview) */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5 backdrop-blur-sm"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.6) 40%, rgba(0,0,0,0.2) 100%)" }}
        >
           <div className="text-left mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out text-white drop-shadow-md">
             {abstract && <p className="text-[10px] leading-relaxed mb-3 line-clamp-4 opacity-90">{abstract}</p>}
             {shelf && (
               <div className="inline-block px-2 py-1 rounded bg-white/10 text-[9px] font-bold uppercase tracking-widest backdrop-blur-md border border-white/20">
                 Shelf: {shelf}
               </div>
             )}
           </div>

           <button 
             onClick={(e) => { e.stopPropagation(); onOpenReader?.(); }}
             className="w-full py-2 rounded-xl text-xs font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75 shadow-lg active:scale-95"
             style={{ background: "var(--primary)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)" }}>
             Open Reader
           </button>
        </div>

        {/* Dynamic Category Tag & Save Button - Moved after overlay to prevent backdrop-blur issue */}
        <div 
          className="absolute top-4 right-4 translate-y-[-10px] opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2 items-end z-20"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); onToggleSave?.(id); }}
            className={`p-2 rounded-full border transition-all ${isSaved ? 'bg-amber-500/90 border-amber-500 text-white' : 'bg-black/60 border-white/20 text-white/70 hover:text-white hover:bg-black/80'} backdrop-blur-md shadow-lg active:scale-90`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={isSaved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
          </button>
        </div>
      </div>

      {/* Book details */}
      <div className="px-1 text-center flex flex-col items-center">
        <h3
          className={`line-clamp-2 leading-tight mb-2 uppercase tracking-wide px-2 ${featured ? "text-sm font-bold opacity-100" : "text-xs font-semibold opacity-80 group-hover:opacity-100"}`}
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p className="text-[10px] uppercase font-bold tracking-widest mb-2" style={{ color: "var(--primary)" }}>
           {author}
        </p>

        {/* Availability & Location */}
        {(status || location) && (
          <div className={`mt-1 px-2.5 py-1 rounded-md text-[8px] font-black tracking-widest uppercase border inline-flex items-center gap-1.5 transition-all
            ${status === 'Available' ? 'text-green-500 border-green-500/30 bg-green-500/10' : 'text-red-500 border-red-500/30 bg-red-500/10'}
          `}>
            <div className={`size-1.5 rounded-full ${status === 'Available' ? 'bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.5)] animate-pulse' : 'bg-red-500'}`} />
            {status} - {location}
          </div>
        )}
      </div>
    </div>
  );
}

export function BookCarousel({ books, savedBookIds = [], onToggleSave, onOpenReader }: BookCarouselProps) {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: false,
    infinite: books.length > 5,
    speed: 700,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    cssEase: "cubic-bezier(0.23, 1, 0.32, 1)",
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 5 } },
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1100, settings: { slidesToShow: 3.5 } },
      { breakpoint: 768,  settings: { slidesToShow: 2 } },
      { breakpoint: 480,  settings: { slidesToShow: 1 } },
    ],
  };

  if (!books.length) {
    return (
      <div className="w-full h-80 flex flex-col items-center justify-center rounded-3xl border-2 border-dashed" style={{ borderColor: "var(--border)", background: "rgba(255,255,255,0.02)" }}>
        <p className="text-muted-foreground text-sm font-medium">No books found in this category.</p>
      </div>
    );
  }

  return (
    <div className="relative w-full overflow-visible min-h-[450px]">
      {/* Precision Navigation - Hidden on mobile if not enough space */}
      <div className="absolute top-[-52px] right-2 z-10 flex items-center gap-2">
        <button
          onClick={() => sliderRef.current?.slickPrev()}
          className="size-10 rounded-2xl flex items-center justify-center transition-all duration-300 border hover:shadow-2xl active:scale-90 group/btn"
          style={{ 
            background: "var(--card)", 
            borderColor: "var(--border)",
            color: "var(--muted-foreground)" 
          }}
        >
          <ChevronLeft className="size-5 group-hover/btn:text-primary group-hover/btn:scale-110 transition-all" />
        </button>
        <button
          onClick={() => sliderRef.current?.slickNext()}
          className="size-10 rounded-2xl flex items-center justify-center transition-all duration-300 border hover:shadow-2xl active:scale-90 group/btn"
          style={{ 
            background: "var(--card)", 
            borderColor: "var(--border)",
            color: "var(--muted-foreground)"
          }}
        >
          <ChevronRight className="size-5 group-hover/btn:text-primary group-hover/btn:scale-110 transition-all" />
        </button>
      </div>

      {/* Slider Container with min-width fix */}
      <div className="w-full min-w-0 px-0 md:mx-[-12px]">
        <Slider ref={sliderRef} {...settings}>
          {books.map((book) => (
            <div key={book.id}>
              <BookSlide 
                {...book} 
                isSaved={savedBookIds.includes(book.id)} 
                onToggleSave={onToggleSave} 
                onOpenReader={() => onOpenReader?.(book)}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}
