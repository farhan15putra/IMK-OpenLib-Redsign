import { useState, useEffect } from "react";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { BookCarousel } from "./components/BookCarousel";
import { SearchResults } from "./components/SearchResults";
import { LoanHistory } from "./components/LoanHistory";
import { SavedBooks } from "./components/SavedBooks";
import { Settings } from "./components/Settings";
import { Login } from "./components/Login";
import { Profile } from "./components/Profile";
import { BookReader } from "./components/BookReader";
import { ExternalLink } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Beauty and the Beast: Disney",
    author: "Disney Studios",
    cover: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Fantasy",
    featured: false,
    location: "Kampus Bandung",
    status: "Available" as const,
    abstract: "An enchanting tale about looking past outward appearances to see the true beauty within. A must-read classic.",
    shelf: "FAN-301",
    format: "Physical",
  },
  {
    id: 2,
    title: "Fire and Blood — A Game of Thrones series",
    author: "George R. R. Martin",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Fantasy",
    featured: true,
    location: "Kampus Jakarta",
    status: "Borrowed" as const,
    abstract: "Set 300 years before A Game of Thrones, dragons rule Westeros. This is the definitive history of the Targaryens.",
    shelf: "FAN-992",
    format: "Physical",
  },
  {
    id: 3,
    title: "The Chronicles of Narnia",
    author: "C.S. Lewis",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Fantasy",
    featured: false,
    location: "Kampus Bandung",
    status: "Available" as const,
    abstract: "Journeys to the end of the world, fantastic creatures, and epic battles between good and evil.",
    shelf: "FAN-105",
    format: "Physical",
  },
  {
    id: 4,
    title: "The Psychology of Success",
    author: "Prof. David Miller",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Leadership",
    featured: false,
    location: "Kampus Bandung",
    status: "Available" as const,
    abstract: "Understanding the mindset of high achievers through the lens of cognitive psychology.",
    shelf: "PSY-404",
    format: "Physical",
  },
  {
    id: 5,
    title: "Modern Business Strategy",
    author: "Robert Kiyosaki",
    cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Business",
    featured: true,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Tactical approaches to dominating markets in the era of platform economies.",
    shelf: "BUS-505",
    format: "E-Book",
  },
  {
    id: 6,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Finance",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Learn the secrets of the rich and understand fundamental steps towards creating passive income in the modern era.",
    shelf: "FIN-199",
    format: "E-Book",
  },
  {
    id: 7,
    title: "Journal of IT and Computer Science",
    author: "Telkom University Researchers",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Journals",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "A collection of peer-reviewed research papers focusing on the latest advancements in AI, Cybersecurity, and Software Engineering.",
    shelf: "DIG-001",
    format: "Journal",
  },
  {
    id: 8,
    title: "Industrial Revolution in Southeast Asia",
    author: "Prof. Ahmad Yani",
    cover: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Journals",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "A detailed analysis of industrial growth and economic shifts in the SEA region over the last century.",
    format: "Journal",
  },
];

const allCategories = ["All", "Fantasy", "Finance", "Leadership", "Journals", "Business"];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentView, setCurrentView] = useState("login"); // Start at login
  const [savedBookIds, setSavedBookIds] = useState<number[]>([1, 4]); // Init with some books
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [readingBook, setReadingBook] = useState<any>(null);

  const toggleSaveBook = (id: number) => {
    setSavedBookIds(prev => prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]);
  };

  if (currentView === "login") {
    return <Login onLogin={() => setCurrentView("home")} />;
  }

  return (
    <div className="flex h-screen overflow-hidden font-sans" style={{ background: "var(--background)" }}>
      {/* Dynamic Scrollbar styles */}
      <style>{`
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(139,0,0,0.1); border-radius: 10px; }
        .dark ::-webkit-scrollbar-thumb { background: rgba(139,0,0,0.3); }
        ::-webkit-scrollbar-thumb:hover { background: var(--primary); }
        .main-content { margin-left: 0; }
        @media (min-width: 768px) {
          .main-content { margin-left: var(--sidebar-width); }
        }
      `}</style>

      {/* Left Sidebar */}
      <Sidebar 
        currentView={currentView} 
        setCurrentView={(view) => { setCurrentView(view); setIsMobileMenuOpen(false); }} 
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Main Container */}
      <div className="main-content flex flex-col flex-1 min-w-0 h-full transition-all duration-300">
        <Header 
          onHomeClick={() => setCurrentView("home")} 
          onProfileClick={() => setCurrentView("profile")} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0">
          <div className="max-w-[1440px] mx-auto transition-all duration-500">
            {currentView === "catalog" && (
              <SearchResults 
                books={books} 
                selectedCategory={selectedCategory} 
                onOpenReader={(book) => setReadingBook(book)} 
              />
            )}
            {currentView === "history" && <LoanHistory />}
            {currentView === "saved" && <SavedBooks savedBooks={books.filter(b => savedBookIds.includes(b.id))} onRemove={toggleSaveBook} />}
            {currentView === "settings" && <Settings />}
            {currentView === "profile" && <Profile />}
            {currentView === "home" && (
              <>
                {/* Hero Section */}
                <Hero onNavigate={(target, category) => {
                  setCurrentView(target);
                  if (category) {
                    setSelectedCategory(category);
                  } else if (target === "catalog") {
                    setSelectedCategory("All");
                  }
                }} />

            {/* Divider */}
            <div className="mx-4 md:mx-8 opacity-50" style={{ borderTop: "1.5px solid var(--border)" }} />

            {/* Selection Hub */}
            <div className="px-4 md:px-8 pt-8 pb-6 flex items-center justify-between flex-wrap gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-wrap w-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--muted-foreground)" }}>Explore Categories:</span>
                <div className="flex gap-2 flex-nowrap w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar scroll-smooth">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className="px-6 py-2 rounded-2xl text-[11px] font-bold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
                      style={
                        selectedCategory === cat
                          ? { background: "var(--primary)", color: "#fff", boxShadow: "0 6px 15px rgba(139,0,0,0.25)" }
                          : { background: "var(--card)", color: "var(--foreground)", border: "1px solid var(--border)", boxShadow: "0 4px 10px rgba(0,0,0,0.03)" }
                      }
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-border bg-muted/50">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
                <span style={{ color: "var(--muted-foreground)" }}>Catalog Active Storage</span>
              </div>
            </div>

            {/* Carousel Segment */}
            <section className="px-2 md:px-5 pt-8 pb-10 md:pb-14 overflow-visible">
               <div className="px-3 mb-2">
                <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>New Arrivals</h2>
                <div className="w-12 h-1 mt-1 rounded-full" style={{ background: "var(--primary)" }} />
              </div>
              <div className="min-w-0">
                <BookCarousel 
                  books={selectedCategory === "All" ? books : books.filter(b => b.category === selectedCategory)} 
                  savedBookIds={savedBookIds}
                  onToggleSave={toggleSaveBook}
                  onOpenReader={(book) => setReadingBook(book)}
                />
              </div>
            </section>

            {/* Knowledge Vault Segment */}
            <section className="px-4 md:px-8 pb-20">
              <div className="mb-8 md:mb-10 opacity-60" style={{ borderTop: "1.5px solid var(--border)" }} />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>Digital Library Vault</h2>
                  <p className="text-xs font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>Certified academic databases & institutional partners</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { code: "IEEE", name: "IEEE Xplore", color: "linear-gradient(135deg, #2463eb, #1e40af)", desc: "Engineering & Tech" },
                  { code: "S", name: "Springer", color: "linear-gradient(135deg, #8B0000, #4c0000)", desc: "Scientific Journals" },
                  { code: "P", name: "ProQuest", color: "linear-gradient(135deg, #374151, #111827)", desc: "Research Papers" },
                  { code: "SD", name: "ScienceDirect", color: "linear-gradient(135deg, #ea580c, #9a3412)", desc: "Physics & Chemistry" },
                ].map(db => (
                  <div
                    key={db.code}
                    className="group relative flex flex-col p-6 rounded-[2rem] transition-all duration-500 cursor-pointer overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-2xl"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="size-14 rounded-2xl flex items-center justify-center text-white text-base font-black shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500"
                        style={{ background: db.color }}>
                        {db.code}
                      </div>
                      <ExternalLink className="size-4 opacity-20 group-hover:opacity-100 transition-all group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-tight" style={{ color: "var(--foreground)" }}>{db.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-50">{db.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
              </>
            )}
          </div>
        </main>
      </div>
      {/* Reader Modal */}
      {readingBook && (
        <BookReader book={readingBook} onClose={() => setReadingBook(null)} />
      )}
    </div>
  );
}