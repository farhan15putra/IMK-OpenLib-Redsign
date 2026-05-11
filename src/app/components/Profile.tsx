import { useState } from "react";
import { useTranslation } from "react-i18next";
import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, ShieldCheck, Edit3, Bookmark, Globe, ChevronDown, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Profile() {
  const { t, i18n } = useTranslation();
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const toggleLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsLangMenuOpen(false);
  };

  const activityData = [
    { action: t('actions.Borrowed'), book: "The Pragmatic Programmer", date: "Oct 12, 2024", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
    { action: t('actions.Returned'), book: "Design Patterns: Elements of Reusable...", date: "Oct 10, 2024", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
    { action: t('actions.Reserved'), book: "Clean Code", date: "Oct 05, 2024", icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
    { action: t('actions.PaidFine'), book: "Late return fee - 2 days", date: "Sep 28, 2024", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10" }
  ];

  return (
    <div className="max-w-5xl mx-auto py-8 px-6 min-h-screen">
      
      {/* Header section with Magic UI / Origin UI inspired Language Switcher */}
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
            {t('profile.memberStatus')}
          </motion.p>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Origin UI Style Accessible Language Selector */}
          <div className="relative">
            <button 
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-secondary/50 border border-border/50 text-foreground hover:bg-secondary text-xs font-bold transition-all shadow-sm active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-haspopup="true"
              aria-expanded={isLangMenuOpen}
              aria-label="Select Language"
            >
              <Globe className="size-4 text-muted-foreground" />
              <span>{i18n.language === 'id' ? 'ID' : 'EN'}</span>
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
                    {i18n.language === 'en' && <Check className="size-4 text-primary" />}
                  </button>
                  <button
                    onClick={() => toggleLanguage('id')}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg hover:bg-primary/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary group"
                    aria-label="Ganti ke Bahasa Indonesia"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">Indonesia</span>
                    {i18n.language === 'id' && <Check className="size-4 text-primary" />}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button 
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-xs font-black uppercase tracking-widest transition-colors shadow-sm active:scale-95 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={t('profile.editProfile')}
          >
            <Edit3 className="size-4 group-hover:-translate-y-0.5 transition-transform" />
            {t('profile.editProfile')}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: ID Card & Info */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Aceternity UI Inspired Digital ID Card */}
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

          {/* Contact Details with Hover Effects */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-8"
            role="region"
            aria-label={t('profile.contactInfo')}
          >
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">{t('profile.contactInfo')}</h3>
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

        {/* Right Col: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Grid - Magic UI inspired subtle borders */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4" role="list" aria-label="Library Statistics">
            {[
              { icon: BookOpen, val: "42", label: t('profile.booksRead'), c: "blue" },
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

          {/* Detailed Sections */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="rounded-[2rem] bg-card border border-border shadow-sm p-8"
          >
             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-border">
              <h3 className="text-lg font-black text-foreground">{t('profile.activityTitle')}</h3>
              <button 
                className="text-xs font-bold text-primary hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
                aria-label={t('profile.viewHistory')}
              >
                {t('profile.viewHistory')}
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
