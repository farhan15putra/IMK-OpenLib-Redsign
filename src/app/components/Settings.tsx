import { User, Bell, Shield, Paintbrush, Globe, Smartphone, HelpCircle } from "lucide-react";

export function Settings() {
  const sections = [
    {
      id: "account",
      title: "Account Settings",
      icon: User,
      description: "Manage your profile, email, and authentication methods.",
      color: "text-blue-500",
      bgClass: "bg-blue-500/10 border-blue-500/20"
    },
    {
      id: "appearance",
      title: "Appearance",
      icon: Paintbrush,
      description: "Customize the interface, theme, and animations.",
      color: "text-primary",
      bgClass: "bg-primary/10 border-primary/20",
      content: (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-4">
           {['Light', 'Dark', 'System'].map((mode, idx) => (
              <button 
                key={mode} 
                className={`py-2 px-3 md:px-4 rounded-xl border border-border bg-card text-[10px] md:text-xs font-black uppercase tracking-widest hover:border-primary hover:text-primary transition-all shadow-sm ${idx === 2 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                {mode}
              </button>
           ))}
        </div>
      )
    },
    {
      id: "notifications",
      title: "Notifications",
      icon: Bell,
      description: "Control push notifications, due date alerts, and emails.",
      color: "text-amber-500",
      bgClass: "bg-amber-500/10 border-amber-500/20"
    },
    {
      id: "privacy",
      title: "Privacy & Security",
      icon: Shield,
      description: "Configure visibility for your loan history and connected apps.",
      color: "text-green-500",
      bgClass: "bg-green-500/10 border-green-500/20"
    }
  ];

  return (
    <div className="px-8 py-10 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="mb-10">
        <h1 className="text-3xl font-black tracking-tight leading-none mb-1" style={{ color: "var(--foreground)" }}>Preferences</h1>
        <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>Customize your library experience and account details.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Sidebar Mini Nav */}
        <div className="md:col-span-4 flex flex-col gap-2">
           {sections.map(section => (
             <button key={section.id} className="flex items-center gap-3 w-full text-left p-3 rounded-2xl hover:bg-muted font-bold text-sm tracking-wide transition-colors group">
               <div className={`p-1.5 rounded-lg border flex items-center justify-center ${section.bgClass}`}>
                  <section.icon className={`size-4 ${section.color}`} />
               </div>
               <span className="group-hover:text-primary transition-colors">{section.title}</span>
             </button>
           ))}
           <div className="w-full h-px bg-border my-2" />
           <button className="flex items-center gap-3 w-full text-left p-3 rounded-2xl hover:bg-muted text-muted-foreground font-bold text-sm tracking-wide transition-colors">
              <Globe className="size-4" /> Language & Region
           </button>
           <button className="flex items-center gap-3 w-full text-left p-3 rounded-2xl hover:bg-muted text-muted-foreground font-bold text-sm tracking-wide transition-colors">
              <HelpCircle className="size-4" /> Help Center
           </button>
        </div>

        {/* Main Settings Panel */}
        <div className="md:col-span-8 flex flex-col gap-6">
           {sections.map(section => (
             <div key={section.id} className="p-6 rounded-[2rem] border border-border shadow-sm transition-all hover:shadow-md bg-card">
               <div className="flex items-start gap-4">
                 <div className={`p-3 rounded-xl border flex-shrink-0 ${section.bgClass}`}>
                    <section.icon className={`size-6 ${section.color}`} />
                 </div>
                 <div className="flex-1 pt-1">
                   <h2 className="text-lg font-black tracking-tight mb-1" style={{ color: "var(--foreground)" }}>{section.title}</h2>
                   <p className="text-xs font-medium text-muted-foreground leading-relaxed">{section.description}</p>
                   
                   {section.content}
                   
                   {!section.content && (
                     <div className="mt-5 text-left border-t border-border pt-4">
                        <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:underline underline-offset-4">
                          Configure {section.title} →
                        </button>
                     </div>
                   )}
                 </div>
               </div>
             </div>
           ))}
        </div>

      </div>
    </div>
  );
}
