import { useState } from "react";
import { useI18n } from "../../context/i18nContext";
import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, ShieldCheck, Edit3, Bookmark, Globe, ChevronDown, Check, Play, Eye, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Profile() {
  const { t, locale, setLocale } = useI18n();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleLanguage = (lang: "id" | "en") => {
    setLocale(lang);
    setIsLangMenuOpen(false);
  };

  const activityData = [
    { action: t('actions.borrowed'), book: "The Pragmatic Programmer", date: "Oct 12, 2024", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { action: t('actions.returned'), book: "Design Patterns: Elements of Reusable...", date: "Oct 10, 2024", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
    { action: t('actions.reserved'), book: "Clean Code", date: "Oct 05, 2024", icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
    { action: t('actions.paid_fine'), book: "Late return fee - 2 days", date: "Sep 28, 2024", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10" }
  ];

  // ── Mock data: Continue Reading ──────────────────────────────
  const continueReading = {
    title: "Clean Code: A Handbook of Agile Software Craftsmanship",
    author: "Robert C. Martin",
    cover: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
    progress: 65,
    currentPage: 218,
    totalPages: 335,
  };

  // ── Mock data: Recently Viewed ───────────────────────────────
  const recentlyViewed = [
    { id: 1, title: "The Design of Everyday Things", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", viewedAgo: "2h" },
    { id: 2, title: "Atomic Habits", cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", viewedAgo: "5h" },
    { id: 3, title: "Rich Dad Poor Dad", cover: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", viewedAgo: "1d" },
    { id: 4, title: "Interaction Design", cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", viewedAgo: "2d" },
  ];

  // ── Mock data: Recommendations ───────────────────────────────
  const recommendations = [
    { id: 101, title: "Interaction Design: Beyond HCI", author: "Helen Sharp, Yvonne Rogers", cover: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Teknologi" },
    { id: 102, title: "Dare to Lead", author: "Brené Brown", cover: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Pengembangan Diri" },
    { id: 103, title: "Algoritma & Struktur Data", author: "Dr. Kevin Hartono", cover: "https://images.unsplash.com/photo-1543269865-cbf427effbad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400", category: "Teknologi" },
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 min-h-screen">
      
      {/* Header section with Language Switcher */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-4xl font-black tracking-tight" 
            style={{ color: "var(--foreground)" }}
            aria-label={t('profile.title')}
          >
            {t('profile.title')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm font-medium mt-2 flex items-center gap-2" 
            style={{ color: "var(--muted-foreground)" }}
          >
            <span className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            {t('profile.member_status')}
          </motion.p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary text-xs font-bold transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-haspopup="true"
              aria-expanded={isLangMenuOpen}
              aria-label="Select Language"
            >
              <Globe className="size-4 text-muted-foreground" />
              <span>{locale === 'id' ? 'ID' : 'EN'}</span>
              <ChevronDown className={`size-3 text-muted-foreground transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50 p-1"
                >
                  <button
                    onClick={() => toggleLanguage('en')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                    aria-label="Switch to English"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">English</span>
                    {locale === 'en' && <Check className="size-4 text-primary" />}
                  </button>
                  <button
                    onClick={() => toggleLanguage('id')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                    aria-label="Ganti ke Bahasa Indonesia"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">Indonesia</span>
                    {locale === 'id' && <Check className="size-4 text-primary" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-xs font-black uppercase tracking-widest transition-colors shadow-sm active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('profile.edit_profile')}
          >
            <Edit3 className="size-4 group-hover:-translate-y-0.5 transition-transform" />
            {t('profile.edit_profile')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: ID Card & Info */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Digital ID Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative rounded-[2rem] p-8 overflow-hidden group border border-border/10 shadow-2xl transition-all"
            style={{ background: "linear-gradient(145deg, var(--primary), #4a0000)" }}
            role="region"
            aria-label="Student ID Card"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4 pointer-events-none" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl mb-4 bg-white/10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500 flex items-center justify-center">
                <img 
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=TelkomStudent&backgroundColor=FDFBF3" 
                  alt="Avatar Farhan Putra" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-black text-white">Farhan Putra</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-red-200 mt-1">{t('profile.major')}</p>
              
              <div className="w-full mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/10 flex items-center justify-between text-left transition-colors hover:bg-black/30">
                <div>
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest" aria-hidden="true">NIM</p>
                  <p className="text-sm font-black text-white tracking-widest mt-0.5" style={{ fontFamily: "monospace" }} aria-label="Student ID Number 1301213034">1301213034</p>
                </div>
                <div className="size-10 bg-white rounded-lg p-1" aria-hidden="true">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1301213034" alt="QR Code" className="w-full h-full mix-blend-multiply opacity-90" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-8"
            role="region"
            aria-label={t('profile.contact_info')}
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">{t('profile.contact_info')}</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5 group">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                  <Mail className="size-3.5" aria-hidden="true" /> {t('profile.email')}
                </span>
                <a href="mailto:farhan.putra@student.telkomuniversity.ac.id" className="text-sm font-medium text-foreground ml-5.5 break-all hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">farhan.putra@student.telkomuniversity.ac.id</a>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                  <Phone className="size-3.5" aria-hidden="true" /> {t('profile.phone')}
                </span>
                <a href="tel:+6281234567890" className="text-sm font-medium text-foreground ml-5.5 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded">+62 812-3456-7890</a>
              </div>
              <div className="flex flex-col gap-1.5 group">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider group-hover:text-primary transition-colors">
                  <MapPin className="size-3.5" aria-hidden="true" /> {t('profile.location')}
                </span>
                <span className="text-sm font-medium text-foreground ml-5.5">Telkom University, Jakarta Campus</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Col: Stats, Activity & Personalization */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list" aria-label="Library Statistics">
            {[
              { icon: BookOpen, val: "42", label: t('profile.books_read'), c: "blue" },
              { icon: Clock, val: "2", label: t('profile.borrowed'), c: "primary" },
              { icon: ShieldCheck, val: "0", label: t('profile.overdue'), c: "green" },
              { icon: Award, val: "Top 5%", label: t('profile.rank'), c: "purple" }
            ].map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * i }}
                className="rounded-[2rem] bg-card border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-md transition-all group focus-within:ring-2 focus-within:ring-primary focus-within:outline-none"
                role="listitem"
                tabIndex={0}
                aria-label={`${stat.label}: ${stat.val}`}
              >
                <div className={`size-12 rounded-full flex items-center justify-center mb-4 transition-transform group-hover:scale-110
                  ${stat.c === 'blue' ? 'bg-blue-500/10 text-blue-500' : 
                    stat.c === 'green' ? 'bg-green-500/10 text-green-500' :
                    stat.c === 'purple' ? 'bg-purple-500/10 text-purple-500' :
                    'bg-primary/10 text-primary'}`}>
                  <stat.icon className="size-5" aria-hidden="true" />
                </div>
                <span className="text-2xl font-black text-foreground">{stat.val}</span>
                <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{stat.label}</span>
              </motion.div>
            ))}
          </div>

          {/* ══════ FIX #3: CONTINUE READING ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Play className="size-4 text-primary" />
              <h3 className="text-lg font-black text-foreground">{t('profile.continue_reading')}</h3>
              <span className="text-[10px] font-bold text-muted-foreground ml-1">— {t('profile.continue_reading_sub')}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-5">
              <div className="w-24 h-36 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg border border-border bg-muted">
                <img src={continueReading.cover} alt={continueReading.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div>
                  <h4 className="text-base font-black text-foreground leading-snug line-clamp-2">{continueReading.title}</h4>
                  <p className="text-xs font-bold text-muted-foreground mt-1 uppercase tracking-widest">{continueReading.author}</p>
                </div>
                <div className="mt-4">
                  {/* Progress Bar */}
                  <div className="flex items-center justify-between text-[10px] font-bold text-muted-foreground mb-2">
                    <span>{t('profile.progress', { percent: String(continueReading.progress) })}</span>
                    <span>{t('profile.page', { current: String(continueReading.currentPage), total: String(continueReading.totalPages) })}</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-700" style={{ width: `${continueReading.progress}%`, background: "var(--primary)" }} />
                  </div>
                  <button className="mt-4 flex items-center gap-2 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest text-white active:scale-95 transition-all shadow-md hover:opacity-90"
                    style={{ background: "var(--primary)" }}>
                    <Play className="size-3.5" />
                    {t('profile.resume_reading')}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ══════ FIX #3: RECENTLY VIEWED ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Eye className="size-4 text-primary" />
              <h3 className="text-lg font-black text-foreground">{t('profile.recently_viewed')}</h3>
              <span className="text-[10px] font-bold text-muted-foreground ml-1">— {t('profile.recently_viewed_sub')}</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
              {recentlyViewed.map((book) => (
                <div key={book.id} className="flex-shrink-0 w-28 group cursor-pointer">
                  <div className="w-28 h-40 rounded-2xl overflow-hidden shadow-md border border-border mb-2 bg-muted group-hover:shadow-xl group-hover:border-primary/30 transition-all">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <p className="text-[11px] font-bold text-foreground leading-tight line-clamp-2">{book.title}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-0.5">{book.viewedAgo} ago</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* ══════ FIX #3: RECOMMENDATIONS ══════ */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-6 md:p-8"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="size-4 text-primary fill-primary" />
              <h3 className="text-lg font-black text-foreground">{t('profile.recommendations')}</h3>
              <span className="text-[10px] font-bold text-muted-foreground ml-1">— {t('profile.recommendations_sub')}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {recommendations.map((book) => (
                <div key={book.id} className="flex gap-3 p-3 rounded-2xl border border-border hover:border-primary/30 hover:shadow-md transition-all cursor-pointer group">
                  <div className="w-14 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm border border-border bg-muted">
                    <img src={book.cover} alt={book.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0 flex flex-col justify-center">
                    <h4 className="text-xs font-black text-foreground leading-tight line-clamp-2 group-hover:text-primary transition-colors">{book.title}</h4>
                    <p className="text-[9px] font-bold text-muted-foreground mt-1 truncate">{book.author}</p>
                    <span className="mt-1.5 inline-flex px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest bg-primary/10 text-primary w-fit">{book.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-8"
          >
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
              <h3 className="text-lg font-black text-foreground">{t('profile.activity_title')}</h3>
              <button 
                className="text-xs font-bold text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                aria-label={t('profile.view_history')}
              >
                {t('profile.view_history')}
              </button>
            </div>

            <div className="space-y-6" role="list" aria-label="Recent Activity List">
              {activityData.map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-4 group cursor-pointer focus-within:ring-2 focus-within:ring-primary rounded-xl p-2 -mx-2 transition-colors hover:bg-muted/50"
                  role="listitem"
                  tabIndex={0}
                  aria-label={`${item.action}: ${item.book} on ${item.date}`}
                >
                  <div className={`size-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 group-focus-within:scale-110 transition-transform`}>
                    <item.icon className="size-5" aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-foreground truncate">{item.book}</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">{item.action}</p>
                  </div>
                  <div className="text-xs font-medium text-muted-foreground flex-shrink-0 whitespace-nowrap">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
