import { User, Mail, Phone, MapPin, Award, BookOpen, Clock, ShieldCheck, Edit3, Bookmark } from "lucide-react";

export function Profile() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-6 animate-in fade-in duration-500 min-h-screen">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: "var(--foreground)" }}>Student Profile</h1>
          <p className="text-sm font-medium mt-2 flex items-center gap-2" style={{ color: "var(--muted-foreground)" }}>
            <span className="size-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
            Active Library Member
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 text-xs font-black uppercase tracking-widest transition-colors shadow-sm active:scale-95 group">
          <Edit3 className="size-4 group-hover:-translate-y-0.5 transition-transform" />
          Edit Profile
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Col: ID Card & Info */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Digital ID Card */}
          <div className="relative rounded-[2rem] p-8 overflow-hidden group border border-border/10 shadow-2xl transition-all"
            style={{ background: "linear-gradient(145deg, var(--primary), #4a0000)" }}>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/20 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4" />
            
            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-28 h-28 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl mb-4 bg-white/10 backdrop-blur-sm group-hover:scale-105 transition-transform duration-500">
                <img 
                  src="https://api.dicebear.com/9.x/notionists/svg?seed=TelkomStudent&backgroundColor=FDFBF3" 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-xl font-black text-white">Farhan Putra</h2>
              <p className="text-xs font-bold uppercase tracking-widest text-red-200 mt-1">Informatics Engineering</p>
              
              <div className="w-full mt-8 bg-black/20 rounded-2xl p-4 backdrop-blur-md border border-white/10 flex items-center justify-between text-left">
                <div>
                  <p className="text-[9px] font-bold text-white/50 uppercase tracking-widest">NIM</p>
                  <p className="text-sm font-black text-white tracking-widest mt-0.5" style={{ fontFamily: "monospace" }}>1301213034</p>
                </div>
                <div className="size-10 bg-white rounded-lg p-1">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=1301213034" alt="QR" className="w-full h-full mix-blend-multiply opacity-90" />
                </div>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div className="rounded-[2rem] bg-card border border-border shadow-sm p-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <Mail className="size-3.5" /> Email Address
                </span>
                <span className="text-sm font-medium text-foreground ml-5.5">farhan.putra@student.telkomuniversity.ac.id</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <Phone className="size-3.5" /> Phone Number
                </span>
                <span className="text-sm font-medium text-foreground ml-5.5">+62 812-3456-7890</span>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  <MapPin className="size-3.5" /> Campus Location
                </span>
                <span className="text-sm font-medium text-foreground ml-5.5">Telkom University, Jakarta Campus</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="rounded-[2rem] bg-card border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-md transition-all">
              <div className="size-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                <BookOpen className="size-5" />
              </div>
              <span className="text-2xl font-black text-foreground">42</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Books Read</span>
            </div>
            
            <div className="rounded-[2rem] bg-card border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-md transition-all">
              <div className="size-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
                <Clock className="size-5" />
              </div>
              <span className="text-2xl font-black text-foreground">2</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Currently Borrowed</span>
            </div>

            <div className="rounded-[2rem] bg-card border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-md transition-all">
              <div className="size-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                <ShieldCheck className="size-5" />
              </div>
              <span className="text-2xl font-black text-foreground">0</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Overdue Status</span>
            </div>

            <div className="rounded-[2rem] bg-card border border-border shadow-sm p-6 flex flex-col justify-center items-center text-center hover:border-primary/50 hover:shadow-md transition-all">
              <div className="size-12 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center mb-4">
                <Award className="size-5" />
              </div>
              <span className="text-2xl font-black text-foreground">Top 5%</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mt-1">Reader Rank</span>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="rounded-[2rem] bg-card border border-border shadow-sm p-8">
             <div className="flex items-center justify-between mb-8 pb-4 border-b border-border">
              <h3 className="text-lg font-black text-foreground">Recent Library Activity</h3>
              <button className="text-xs font-bold text-primary hover:underline underline-offset-4">View Full History</button>
            </div>

            <div className="space-y-6">
              {[
                { action: "Borrowed", book: "The Pragmatic Programmer", date: "Oct 12, 2024", icon: BookOpen, color: "text-blue-500", bg: "bg-blue-500/10" },
                { action: "Returned", book: "Design Patterns: Elements of Reusable...", date: "Oct 10, 2024", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
                { action: "Reserved", book: "Clean Code", date: "Oct 05, 2024", icon: Bookmark, color: "text-purple-500", bg: "bg-purple-500/10" },
                { action: "Paid Fine", book: "Late return fee - 2 days", date: "Sep 28, 2024", icon: ShieldCheck, color: "text-red-500", bg: "bg-red-500/10" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-pointer">
                  <div className={`size-12 rounded-2xl flex-shrink-0 flex items-center justify-center ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="size-5" />
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
          </div>

        </div>
      </div>
    </div>
  );
}
