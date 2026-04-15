import { ArrowUpRight, Sparkles, BookOpen, Globe } from "lucide-react";
import { useState, useEffect } from "react";

const featuredAuthors = [
  {
    name: "Telkom University",
    role: "Open Library Hub",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=GRRMartin&backgroundColor=3A3A3A",
    quote: 'Welcome to the digital knowledge center of Telkom University. Empowering research excellence through technology and accessibility.',
    bookTitle: "Excellence for Everyone",
    accent: "#8B0000"
  },
  {
    name: "George RR Martin",
    role: "Fantasy Literature",
    avatar: "https://api.dicebear.com/9.x/notionists/svg?seed=GRRMartin&backgroundColor=3A3A3A",
    quote: '"Fire and Blood" tells the story of the Targaryen dynasty in Westeros, chronicling the conquest of the Seven Kingdoms by House Targaryen. It also covers the Targaryen civil war known as the Dance of the Dragons.',
    bookTitle: "Fire and Blood",
    accent: "#8B0000"
  }
];

export function Hero() {
  const [authorIndex, setAuthorIndex] = useState(0);
  const author = featuredAuthors[authorIndex];

  useEffect(() => {
    const timer = setInterval(() => {
      setAuthorIndex((i) => (i + 1) % featuredAuthors.length);
    }, 12000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-8 pt-16 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative overflow-hidden">
      {/* Visual Identity Decorator */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(139,0,0,0.04),transparent_70%)] pointer-events-none" />
      
      {/* Brand & Narrative */}
      <div className="lg:col-span-7 flex flex-col items-start z-10">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-8 border border-border/80 shadow-sm"
             style={{ background: "rgba(139,0,0,0.05)", color: "var(--primary)" }}>
          <Sparkles className="size-3.5 fill-current" />
          Official eLibrary Hub
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-black leading-[1] mb-8 tracking-tighter"
            style={{ color: "var(--foreground)" }}>
          Digital Knowledge <br />
          <span style={{ color: "var(--primary)" }}>Open Library</span>
        </h1>
        
        <p className="text-base leading-relaxed mb-12 opacity-80 max-w-lg font-bold" 
           style={{ color: "var(--foreground)" }}>
          Unlock over <span className="text-white px-2 py-0.5 rounded-md" style={{ background: "var(--primary)" }}>24,448+</span> digital assets from
          Telkom University's official research vault and global publication networks.
        </p>

        <div className="flex items-center gap-5">
          <button
            className="group inline-flex items-center gap-4 px-10 py-5 rounded-[2rem] text-[11px] font-black uppercase tracking-widest transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(139,0,0,0.25)] active:scale-95"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            Start Discovering
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
          
          <div className="hidden sm:flex items-center gap-6 p-1 px-4 rounded-[2rem] border border-border bg-card/40 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 opacity-40" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">E-Books</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <Globe className="size-4 opacity-40" />
              <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Journals</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Featured Card */}
      <div className="lg:col-span-5 relative z-10">
        <div className="group rounded-[3rem] p-10 relative overflow-hidden transition-all duration-700 hover:shadow-[0_60px_120px_-30px_rgba(0,0,0,0.25)] bg-card border border-border/60 hover:border-primary/20 backdrop-blur-md">
          
          <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
             <BookOpen className="size-40" />
          </div>

          <div className="relative mb-8">
            <div className="flex items-center gap-5 mb-6">
               <div className="size-16 rounded-2xl overflow-hidden shadow-2xl flex-shrink-0 border-2 transition-transform duration-700 group-hover:rotate-12"
                 style={{ borderColor: "var(--primary)" }}>
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col">
                <h4 className="font-black text-xl leading-tight mb-0.5 tracking-tight" style={{ color: "var(--foreground)" }}>{author.name}</h4>
                <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: "var(--primary)" }}>{author.role}</p>
              </div>
            </div>
            
            <p className="text-base leading-relaxed font-black italic opacity-80" 
               style={{ color: "var(--foreground)" }}>
              {author.quote}
            </p>
          </div>

          <div className="flex items-center justify-between pt-8 border-t border-border/40">
            <div className="flex flex-col pl-2 border-l-4" style={{ borderColor: "var(--primary)" }}>
              <span className="text-[10px] uppercase font-black tracking-widest opacity-40 mb-1">Campus Legacy</span>
              <span className="text-sm font-black truncate max-w-[200px]" style={{ color: "var(--foreground)" }}>{author.bookTitle}</span>
            </div>
            
            <div className="flex gap-2">
              {featuredAuthors.map((_, i) => (
                <button 
                  key={i}
                  className={`size-2.5 rounded-full transition-all duration-700 ${i === authorIndex ? "w-8 bg-primary shadow-[0_0_15px_rgba(139,0,0,0.6)]" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
