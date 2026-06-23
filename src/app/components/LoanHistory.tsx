import { Clock, RefreshCcw, CheckCircle, AlertTriangle } from "lucide-react";
import { useI18n } from "../../context/i18nContext";

export function LoanHistory() {
  const { t } = useI18n();
  const loans = [
    {
      id: 1, 
      title: "Algorithm & Data Structures 101", 
      author: "Prof. Anita Suryani",
      borrowDate: "12 Oct 2025", 
      dueDate: "26 Oct 2025",
      status: "Active", 
      returnedDate: "-", 
      image: "https://images.unsplash.com/photo-1589998059171-988d887df646?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 2, 
      title: "Leadership Principles", 
      author: "John Maxwell",
      borrowDate: "01 Sep 2025", 
      dueDate: "15 Sep 2025",
      status: "Overdue", 
      returnedDate: "-", 
      image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    },
    {
      id: 3, 
      title: "Financial Freedom Guide", 
      author: "Robert T. Kiyosaki",
      borrowDate: "10 Aug 2025", 
      dueDate: "24 Aug 2025",
      status: "Returned", 
      returnedDate: "20 Aug 2025", 
      image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Active': return <RefreshCcw className="size-3.5" />;
      case 'Overdue': return <AlertTriangle className="size-3.5" />;
      case 'Returned': return <CheckCircle className="size-3.5" />;
      default: return null;
    }
  };

  const getStatusClasses = (status: string) => {
    switch(status) {
      case 'Active': return 'text-blue-500 bg-blue-500/10 border-blue-500/30';
      case 'Overdue': return 'text-red-500 bg-red-500/10 border-red-500/30';
      case 'Returned': return 'text-green-500 bg-green-500/10 border-green-500/30';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  return (
    <div className="px-8 py-6 max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border">
        <div className="size-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
          <Clock className="size-5 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-black tracking-tight leading-none" style={{ color: "var(--foreground)" }}>{t("history.title")}</h1>
          <p className="text-xs font-medium mt-0.5" style={{ color: "var(--muted-foreground)" }}>{t("history.subtitle")}</p>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {loans.map(loan => (
          <div key={loan.id} className="group relative flex flex-col sm:flex-row items-center justify-between p-5 rounded-3xl border border-border shadow-sm hover:shadow-lg transition-all" style={{ background: "var(--card)" }}>
            <div className="flex items-center gap-6 w-full">
              <div className="relative w-16 h-24 bg-muted rounded-xl flex-shrink-0 bg-cover bg-center shadow-md border border-border/50 group-hover:scale-105 transition-transform overflow-hidden" 
                   style={{ backgroundImage: `url('${loan.image}')` }}>
                  {/* Lens Preview Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-sm"
                       style={{ background: "rgba(0,0,0,0.6)" }}>
                      <span className="text-white text-[7px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded border border-white/20 bg-white/10">{t("history.details")}</span>
                  </div>
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg font-black leading-snug group-hover:text-primary transition-colors mb-1" style={{ color: "var(--foreground)" }}>{loan.title}</h3>
                <p className="text-xs font-bold uppercase tracking-widest opacity-60 mb-4" style={{ color: "var(--primary)" }}>{loan.author}</p>
                
                <div className="flex items-center gap-6 flex-wrap text-xs">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-widest opacity-40 text-[9px]" style={{ color: "var(--muted-foreground)" }}>{t("history.borrow_date")}</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{loan.borrowDate}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold uppercase tracking-widest opacity-40 text-[9px]" style={{ color: "var(--muted-foreground)" }}>{t("history.due_date")}</span>
                    <span className="font-medium" style={{ color: "var(--foreground)" }}>{loan.dueDate}</span>
                  </div>
                  {loan.returnedDate !== "-" && (
                    <div className="flex flex-col gap-1">
                      <span className="font-bold uppercase tracking-widest opacity-40 text-[9px]" style={{ color: "var(--muted-foreground)" }}>{t("history.return_date")}</span>
                      <span className="font-medium" style={{ color: "var(--foreground)" }}>{loan.returnedDate}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Status Section */}
            <div className="flex flex-col items-stretch gap-3 mt-4 sm:mt-0 ml-auto border-l border-border pl-6 m-4 w-full sm:w-36 flex-shrink-0">
              <div className={`flex items-center justify-center gap-1.5 w-full px-2 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest border text-center ${getStatusClasses(loan.status)}`}>
                {getStatusIcon(loan.status)}
                <span className="truncate">{t(`history.status_${loan.status.toLowerCase()}` as any)}</span>
              </div>
              
              {loan.status === "Active" && (
                <button className="w-full text-center text-[10px] font-bold uppercase tracking-widest px-2 py-2 border border-border rounded-lg hover:border-primary hover:text-primary transition-colors">
                  {t("history.renew")}
                </button>
              )}
              {loan.status === "Overdue" && (
                <button className="w-full text-center text-[10px] font-bold uppercase tracking-widest px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-md shadow-red-500/20">
                  {t("history.pay_penalty")}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
