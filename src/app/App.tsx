import { useState } from "react";
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
import { BookDetails } from "./components/BookDetails";
import { A11yPanel } from "./components/A11yPanel";
import { VoiceOver } from "./components/VoiceOver";
import { AssistiveTouch } from "./components/AssistiveTouch";
import { I18nProvider, useI18n } from "../context/i18nContext";
import { A11yProvider } from "../context/a11yContext";
import { ExternalLink, TrendingUp, BookOpen, Eye, CheckCircle, Flame } from "lucide-react";
import ieeeLogo from "../imports/ieee.png";
import springerLogo from "../imports/Springer.jpg";
import proquestLogo from "../imports/proquest.jpg";
import scienceDirectLogo from "../imports/sciencedirect.png";

// ── 5 BUKU (format: Physical / E-Book) ─────────────────────────────────────
const books = [
  {
    id: 1,
    title: "The Design of Everyday Things",
    author: "Don Norman",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Teknologi",
    featured: false,
    location: "Kampus Bandung",
    status: "Available" as const,
    abstract: "Buku klasik tentang desain berpusat pada manusia. Don Norman menjelaskan bagaimana desain yang baik membuat produk intuitif dan menyenangkan digunakan.",
    shelf: "TEK-001",
    format: "Physical",
    year: "2020 & Older",
    program: "Informatics",
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert T. Kiyosaki",
    cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Bisnis & Keuangan",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Pelajari rahasia orang kaya dan langkah-langkah fundamental menuju kebebasan finansial melalui aset dan investasi cerdas.",
    shelf: "BIS-199",
    format: "E-Book",
    year: "2020 & Older",
    program: "Business & Economics",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Pengembangan Diri",
    featured: false,
    location: "Kampus Jakarta",
    status: "Available" as const,
    abstract: "Panduan praktis membangun kebiasaan baik dan menghilangkan kebiasaan buruk melalui perubahan kecil yang berdampak besar.",
    shelf: "PDR-012",
    format: "Physical",
    year: "2020 & Older",
    program: "Business & Economics",
  },
  {
    id: 4,
    title: "Pemrograman Web Modern dengan React & TypeScript",
    author: "Dr. Rizal Fachrudin, M.Kom",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Teknologi",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Panduan lengkap pengembangan aplikasi web modern menggunakan React, TypeScript, dan ekosistem tools terkini untuk mahasiswa Informatika.",
    shelf: "TEK-045",
    format: "E-Book",
    year: "2023",
    program: "Informatics",
  },
  {
    id: 5,
    title: "Psikologi Komunikasi Organisasi",
    author: "Prof. Dr. Siti Rahayu, M.Si",
    cover: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Sosial & Humaniora",
    featured: false,
    location: "Kampus Bandung",
    status: "Borrowed" as const,
    abstract: "Mengkaji dinamika komunikasi dalam konteks organisasi modern, termasuk komunikasi lintas budaya dan manajemen konflik interpersonal.",
    shelf: "SOS-088",
    format: "Physical",
    year: "2022",
    program: "Business & Economics",
  },

  // ── 6 JURNAL (format: Journal) ──────────────────────────────────────────────
  {
    id: 6,
    title: "Journal of Information Systems & Digital Transformation",
    author: "Telkom University Research Center",
    cover: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Jurnal ilmiah yang memuat penelitian terkini di bidang sistem informasi, transformasi digital, dan inovasi teknologi informasi.",
    shelf: "JNL-IS-2024",
    format: "Journal",
    year: "2024",
    program: "Information Systems",
  },
  {
    id: 7,
    title: "Indonesian Journal of Electrical Engineering & Computer Science",
    author: "Institute of Advanced Engineering",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Menerbitkan karya penelitian orisinal di bidang teknik elektro, elektronika, sistem kontrol, dan ilmu komputer terapan.",
    shelf: "JNL-EE-001",
    format: "Journal",
    year: "2023",
    program: "Engineering",
  },
  {
    id: 8,
    title: "Journal of Business, Economics & Management",
    author: "Himpunan Peneliti Ekonomi Indonesia",
    cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Kajian akademik tentang manajemen strategis, ekonomi makro-mikro, kewirausahaan digital, dan ekosistem bisnis Asia Tenggara.",
    shelf: "JNL-BE-2024",
    format: "Journal",
    year: "2024",
    program: "Business & Economics",
  },
  {
    id: 9,
    title: "Journal of Human-Computer Interaction Studies",
    author: "Usability Professionals' Association",
    cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Penelitian peer-reviewed tentang desain pengalaman pengguna, metode evaluasi usabilitas, dan interaksi manusia-komputer.",
    shelf: "JNL-HCI-018",
    format: "Journal",
    year: "2021",
    program: "Informatics",
  },
  {
    id: 10,
    title: "Asian Journal of Artificial Intelligence & Data Science",
    author: "IEEE Asia Pacific Chapter",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Forum ilmiah untuk penelitian Machine Learning, Deep Learning, Computer Vision, dan aplikasi kecerdasan buatan di berbagai sektor industri.",
    shelf: "JNL-AI-2024",
    format: "Journal",
    year: "2024",
    program: "Informatics",
  },
  {
    id: 11,
    title: "Jurnal Kesehatan Masyarakat & Epidemiologi Indonesia",
    author: "Asosiasi Peneliti Kesehatan Nasional",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Jurnal",
    featured: false,
    location: "Online Access Only",
    status: "Available" as const,
    abstract: "Mempublikasikan penelitian epidemiologi, kebijakan kesehatan publik, surveilans penyakit, dan inovasi promosi kesehatan masyarakat.",
    shelf: "JNL-KES-2024",
    format: "Journal",
    year: "2022",
    program: "Creative Industries",
  },

  // ── KARYA TULIS (format: Skripsi / Tesis) ──────────────────────────────────
  {
    id: 12,
    title: "Analisis Pengalaman Pengguna pada Aplikasi e-Learning Perguruan Tinggi",
    author: "Farhan A. Pratama — Skripsi S1 Informatika, 2024",
    cover: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Karya Tulis",
    featured: false,
    location: "Repositori Digital",
    status: "Available" as const,
    abstract: "Penelitian mengevaluasi tingkat usabilitas platform e-learning perguruan tinggi menggunakan metode System Usability Scale (SUS) dan wawancara mendalam terhadap 120 mahasiswa.",
    shelf: "SKR-IF-2024-001",
    format: "Skripsi",
    year: "2024",
    program: "Informatics",
  },
  {
    id: 13,
    title: "Implementasi Machine Learning untuk Prediksi Prestasi Akademik Mahasiswa",
    author: "Rizky Setiawan — Skripsi S1 Sistem Informasi, 2024",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Karya Tulis",
    featured: false,
    location: "Repositori Digital",
    status: "Available" as const,
    abstract: "Pengembangan model prediktif menggunakan algoritma Random Forest dan XGBoost untuk mengidentifikasi mahasiswa berisiko drop-out berdasarkan data akademik dan aktivitas LMS.",
    shelf: "SKR-SI-2024-002",
    format: "Skripsi",
    year: "2024",
    program: "Information Systems",
  },
  {
    id: 14,
    title: "Pengaruh Transformasi Digital UMKM terhadap Peningkatan Omzet Penjualan",
    author: "Anisa Putri Dewi — Tesis S2 Manajemen Bisnis, 2023",
    cover: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Karya Tulis",
    featured: false,
    location: "Repositori Digital",
    status: "Available" as const,
    abstract: "Studi kuantitatif menganalisis dampak adopsi platform digital marketing dan e-commerce terhadap pertumbuhan pendapatan UMKM kuliner di Kota Bandung selama 2021–2023.",
    shelf: "TES-MB-2023-007",
    format: "Skripsi",
    year: "2023",
    program: "Business & Economics",
  },
];

const topPickBooks = [
  {
    id: 101,
    title: "Interaction Design: Beyond Human-Computer Interaction",
    author: "Helen Sharp, Yvonne Rogers, Jenny Preece",
    cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Teknologi",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Panduan komprehensif desain interaksi yang mencakup riset pengguna, prototyping, evaluasi, dan prinsip desain antarmuka.",
    shelf: "HCI-001",
    format: "E-Book",
    year: "2023",
    program: "Informatics",
  },
  {
    id: 102,
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Teknologi",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Prinsip dan praktik penulisan kode yang bersih, mudah dibaca, dan mudah dipelihara untuk pengembang perangkat lunak profesional.",
    shelf: "TEK-CC-001",
    format: "E-Book",
    year: "2020 & Older",
    program: "Informatics",
  },
  {
    id: 103,
    title: "Dare to Lead",
    author: "Brené Brown",
    cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Pengembangan Diri",
    featured: false,
    location: "Kampus Bandung",
    status: "Available" as const,
    abstract: "Eksplorasi mendalam tentang kepemimpinan berbasis keberanian, kerentanan, dan empati yang mengubah budaya organisasi secara nyata.",
    shelf: "PDR-DL-003",
    format: "Physical",
    year: "2021",
    program: "Business & Economics",
  },
  {
    id: 104,
    title: "Statistika Inferensia untuk Penelitian Sosial",
    author: "Prof. Dr. Bambang Setiadi, M.Si",
    cover: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Sosial & Humaniora",
    featured: false,
    location: "Kampus Jakarta",
    status: "Available" as const,
    abstract: "Pemahaman mendalam tentang metode statistika inferensia, uji hipotesis, regresi, dan analisis data untuk penelitian sosial dan pendidikan.",
    shelf: "SOS-STAT-004",
    format: "Physical",
    year: "2022",
    program: "Information Systems",
  },
  {
    id: 105,
    title: "Kewirausahaan Digital di Era Ekonomi Kreatif",
    author: "Dr. Indra Gunawan, M.B.A",
    cover: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Bisnis & Keuangan",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Panduan membangun startup digital dari nol: validasi ide, model bisnis canvas, strategi go-to-market, dan pendanaan ventura.",
    shelf: "BIS-KWU-005",
    format: "E-Book",
    year: "2023",
    program: "Business & Economics",
  },
  {
    id: 106,
    title: "Algoritma & Struktur Data dengan Python",
    author: "Dr. Kevin Hartono, M.Sc",
    cover: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    category: "Teknologi",
    featured: false,
    location: "Online Access",
    status: "Available" as const,
    abstract: "Implementasi algoritma klasik dan struktur data fundamental menggunakan Python, dilengkapi latihan soal dan analisis kompleksitas waktu-ruang.",
    shelf: "TEK-ASD-006",
    format: "E-Book",
    year: "2024",
    program: "Engineering",
  },
];

const allCategories = ["All", "Teknologi", "Bisnis & Keuangan", "Pengembangan Diri", "Sosial & Humaniora", "Jurnal", "Karya Tulis"];

export default function App() {
  return (
    <I18nProvider>
      <A11yProvider>
        <AppContent />
      </A11yProvider>
    </I18nProvider>
  );
}

function AppContent() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentView, setCurrentView] = useState("login");
  const [savedBookIds, setSavedBookIds] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [readingBook, setReadingBook] = useState<any>(null);
  const [detailBook, setDetailBook] = useState<any>(null);
  // Catalog state: key forces remount (= full reset) every time user navigates to catalog
  const [catalogKey, setCatalogKey] = useState(0);
  const [catalogInitialFormats, setCatalogInitialFormats] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Central function for any navigation to catalog — always resets filter state
  const goToCatalog = (formats: string[] = [], query: string = "") => {
    setCatalogInitialFormats(formats);
    setSearchQuery(query);
    setCatalogKey(k => k + 1); // force SearchResults to remount → clean slate
    setCurrentView("catalog");
  };

  // General navigation used by Sidebar, Header, etc.
  const navigate = (view: string) => {
    if (view === "catalog") {
      goToCatalog([], searchQuery); // always reset when going via sidebar/header
    } else {
      setCurrentView(view);
    }
    setIsMobileMenuOpen(false);
  };

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
        setCurrentView={navigate}
        isOpen={isMobileMenuOpen}
        setIsOpen={setIsMobileMenuOpen}
      />

      {/* Main Container */}
      <div className="main-content flex flex-col flex-1 min-w-0 h-full transition-all duration-300">
        <Header 
          onHomeClick={() => navigate("home")} 
          onProfileClick={() => navigate("profile")} 
          onMenuClick={() => setIsMobileMenuOpen(true)}
          searchQuery={searchQuery}
          onSearch={(q) => {
            setSearchQuery(q);
            if (currentView !== "catalog") {
              goToCatalog([], q);
            }
          }}
        />

        {/* Screen reader live region for dynamic announcements */}
        <div aria-live="polite" aria-atomic="true" className="sr-only" id="sr-announcer" />

        <main id="main-content" className="flex-1 overflow-y-auto overflow-x-hidden min-w-0" tabIndex={-1}>
          <div className="max-w-[1440px] mx-auto transition-all duration-500">
            {currentView === "catalog" && (
              <SearchResults 
                key={catalogKey}
                books={books} 
                selectedCategory={selectedCategory}
                initialFormats={catalogInitialFormats}
                searchQuery={searchQuery}
                savedBookIds={savedBookIds}
                onToggleSave={toggleSaveBook}
                onOpenReader={(book) => setReadingBook(book)} 
                onOpenDetails={(book) => setDetailBook(book)}
              />
            )}
            {currentView === "history" && <LoanHistory />}
            {currentView === "saved" && <SavedBooks savedBooks={books.filter(b => savedBookIds.includes(b.id))} onRemove={toggleSaveBook} onNavigateCatalog={() => navigate("catalog")} />}
            {currentView === "settings" && <Settings />}
            {currentView === "profile" && <Profile />}
            {currentView === "home" && (
              <>
                {/* Hero Section */}
                <Hero
                  onNavigate={(target, category) => {
                    if (target === "catalog") {
                      const fmtMap: Record<string, string[]> = {
                        "E-Book":  ["Buku"],
                        "Journals": ["Jurnal"],
                      };
                      goToCatalog(category ? (fmtMap[category] ?? []) : []);
                    } else {
                      navigate(target);
                    }
                  }}
                  onSearch={(q) => {
                    setSearchQuery(q);
                    goToCatalog([], q);
                  }}
                />

            {/* Divider */}
            <div className="mx-4 md:mx-8 opacity-50" style={{ borderTop: "1.5px solid var(--border)" }} />

            {/* Selection Hub */}
            <div className="px-4 md:px-8 pt-8 pb-6 flex items-center justify-between flex-wrap gap-4 md:gap-6">
              <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 flex-wrap w-full">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]" style={{ color: "var(--muted-foreground)" }}>{t("cat.label")}</span>
                <div role="list" aria-label={t("cat.label")} className="flex gap-2 flex-nowrap w-full md:w-auto overflow-x-auto pb-4 md:pb-0 hide-scrollbar scroll-smooth">
                  {allCategories.map(cat => (
                    <button
                      key={cat}
                      role="listitem"
                      onClick={() => setSelectedCategory(cat)}
                      aria-pressed={selectedCategory === cat}
                      aria-label={`${t("cat.label")} ${cat}`}
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
              
              <div aria-live="polite" className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-border bg-muted/50">
                <div className="size-2 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                <span style={{ color: "var(--muted-foreground)" }}>{t("cat.active")}</span>
              </div>
            </div>

            {/* New Arrivals Segment */}
            <section aria-labelledby="new-arrivals-heading" className="px-2 md:px-5 pt-8 pb-10 md:pb-14 overflow-visible">
              <div className="px-3 mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h2 id="new-arrivals-heading" className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("section.new_arrivals")}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: "rgba(139,0,0,0.1)", color: "var(--primary)" }}>{t("section.new_arrivals_badge")}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{t("section.new_arrivals_sub")}</p>
                <div className="w-12 h-1 mt-2 rounded-full" style={{ background: "var(--primary)" }} />
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

            {/* Divider */}
            <div className="mx-4 md:mx-8 opacity-30" style={{ borderTop: "1.5px solid var(--border)" }} />

            {/* Top Picks Segment */}
            <section aria-labelledby="top-picks-heading" className="px-2 md:px-5 pt-8 pb-10 md:pb-14 overflow-visible">
              <div className="px-3 mb-6">
                <div className="flex items-center gap-3 mb-1">
                  <h2 id="top-picks-heading" className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("section.top_picks")}</h2>
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white" style={{ background: "var(--primary)" }}>{t("section.top_picks_badge")}</span>
                </div>
                <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{t("section.top_picks_sub")}</p>
                <div className="w-12 h-1 mt-2 rounded-full" style={{ background: "var(--primary)" }} />
              </div>
              <div className="min-w-0">
                <BookCarousel 
                  books={topPickBooks} 
                  savedBookIds={savedBookIds}
                  onToggleSave={toggleSaveBook}
                  onOpenReader={(book) => setReadingBook(book)}
                />
              </div>
            </section>

            {/* ══════ FIX #5: TRENDING THIS WEEK ══════ */}
            <section aria-labelledby="trending-heading" className="px-4 md:px-8 pt-8 pb-10 md:pb-14">
              <div className="mb-8 md:mb-10 opacity-30" style={{ borderTop: "1.5px solid var(--border)" }} />
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 id="trending-heading" className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("section.trending")}</h2>
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest text-white flex items-center gap-1" style={{ background: "linear-gradient(135deg, #ef4444, var(--primary))" }}>
                      <Flame className="size-3" />{t("section.trending_badge")}
                    </span>
                  </div>
                  <p className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{t("section.trending_sub")}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {[
                  { rank: 1, title: "Atomic Habits", author: "James Clear", readers: 342, cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Pengembangan Diri" },
                  { rank: 2, title: "Clean Code", author: "Robert C. Martin", readers: 298, cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Teknologi" },
                  { rank: 3, title: "The Design of Everyday Things", author: "Don Norman", readers: 256, cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Teknologi" },
                ].map(item => (
                  <div key={item.rank} className="group flex gap-4 p-4 rounded-[2rem] border border-border hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer" style={{ background: "var(--card)" }}>
                    <div className="relative flex-shrink-0">
                      <div className="w-20 h-28 rounded-xl overflow-hidden shadow-md border border-border bg-muted">
                        <img src={item.cover} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                      </div>
                      <div className="absolute -top-2 -left-2 size-8 rounded-full flex items-center justify-center text-xs font-black text-white shadow-lg" style={{ background: item.rank === 1 ? "linear-gradient(135deg, #f59e0b, #ef4444)" : "var(--primary)" }}>
                        #{item.rank}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-center">
                      <h3 className="text-sm font-black text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase tracking-widest">{item.author}</p>
                      <div className="flex items-center gap-3 mt-3">
                        <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary">{item.category}</span>
                        <span className="text-[9px] font-bold text-muted-foreground flex items-center gap-1">
                          <TrendingUp className="size-3" />{t("app.readers").replace("{{count}}", String(item.readers))}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ══════ FIX #5: YOUR RECENT ACTIVITY ══════ */}
            <section aria-labelledby="activity-heading" className="px-4 md:px-8 pb-10 md:pb-14">
              <div className="mb-8 md:mb-10 opacity-30" style={{ borderTop: "1.5px solid var(--border)" }} />
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 id="activity-heading" className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("section.your_activity")}</h2>
                  <p className="text-xs font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>{t("section.your_activity_sub")}</p>
                </div>
                <button onClick={() => navigate("history")} className="text-xs font-bold text-primary hover:underline underline-offset-4">{t("section.view_all")}</button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { type: "viewed", title: "Clean Code", time: t("time.hours_ago").replace("{{count}}", "2"), icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
                  { type: "borrowed", title: "Atomic Habits", time: t("time.days_ago").replace("{{count}}", "3"), icon: BookOpen, color: "text-green-500", bg: "bg-green-500/10" },
                  { type: "returned", title: "Rich Dad Poor Dad", time: t("time.weeks_ago").replace("{{count}}", "1"), icon: CheckCircle, color: "text-purple-500", bg: "bg-purple-500/10" },
                  { type: "viewed", title: "Interaction Design", time: t("time.weeks_ago").replace("{{count}}", "2"), icon: Eye, color: "text-blue-500", bg: "bg-blue-500/10" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group" style={{ background: "var(--card)" }}>
                    <div className={`size-11 rounded-xl flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                      <item.icon className="size-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                      <p className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">{t(`actions.${item.type}` as any) || item.type}</p>
                    </div>
                    <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">{item.time}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Knowledge Vault Segment */}
            <section aria-labelledby="vault-heading" className="px-4 md:px-8 pb-20">
              <div className="mb-8 md:mb-10 opacity-60" style={{ borderTop: "1.5px solid var(--border)" }} />
              
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 id="vault-heading" className="text-2xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>{t("section.digital_vault")}</h2>
                  <p className="text-xs font-medium mt-1" style={{ color: "var(--muted-foreground)" }}>{t("section.digital_vault_sub")}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {[
                  { code: "IEEE", name: "IEEE Xplore", logo: ieeeLogo, bg: "#fff", descKey: "vault.desc_ieee" },
                  { code: "S", name: "Springer", logo: springerLogo, bg: "#fff", descKey: "vault.desc_springer" },
                  { code: "P", name: "ProQuest", logo: proquestLogo, bg: "#fff", descKey: "vault.desc_proquest" },
                  { code: "SD", name: "ScienceDirect", logo: scienceDirectLogo, bg: "#fff", descKey: "vault.desc_sd" },
                ].map(db => (
                  <div
                    key={db.code}
                    className="group relative flex flex-col p-6 rounded-[2rem] transition-all duration-500 cursor-pointer overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-2xl"
                    style={{ background: "var(--card)" }}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="h-12 w-28 rounded-xl flex items-center justify-center overflow-hidden border border-border/40 bg-white px-2 shadow-sm transform group-hover:scale-105 transition-transform duration-500">
                        <img src={db.logo} alt={db.name} className="h-full w-full object-contain" />
                      </div>
                      <ExternalLink className="size-4 opacity-20 group-hover:opacity-100 transition-all group-hover:text-primary" />
                    </div>
                    <div>
                      <p className="text-base font-black leading-tight" style={{ color: "var(--foreground)" }}>{db.name}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-50">{t(db.descKey as any)}</p>
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
      {/* Details Modal */}
      {detailBook && (
        <BookDetails 
          book={detailBook} 
          onClose={() => setDetailBook(null)} 
          isSaved={savedBookIds.includes(detailBook.id)} 
          onToggleSave={toggleSaveBook} 
        />
      )}
      {/* Floating Accessibility Panel (a11y settings) */}
      <A11yPanel />
      {/* VoiceOver — Text-to-Speech for blind users */}
      <VoiceOver />
      {/* AssistiveTouch — large touch navigation for motor/visual disabilities */}
      <AssistiveTouch />
    </div>
  );
}