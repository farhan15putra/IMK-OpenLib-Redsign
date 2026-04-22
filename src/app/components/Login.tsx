import { useState } from "react";
import { Mail, Lock, ArrowRight, BookOpen } from "lucide-react";
import logoImg from "../../imports/openlibcrop.png";

export function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex min-h-screen bg-background text-foreground overflow-hidden">
      {/* Left Banner Section */}
      <div 
        className="relative hidden lg:flex flex-col justify-between w-1/2 p-12 overflow-hidden" 
        style={{ background: "linear-gradient(135deg, var(--primary), #4a0000)" }}
      >
        <div className="absolute inset-0 bg-black/20" />
        
        {/* Abstract shapes */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] rounded-full bg-black/20 blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
           <div className="size-12 rounded-2xl overflow-hidden bg-white shadow-2xl p-1.5 transform rotate-3">
            <img src={logoImg} alt="Tel-U Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex flex-col text-white">
            <h1 className="text-2xl font-black tracking-tight leading-none">Open Library</h1>
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/70 mt-1">Telkom University</p>
          </div>
        </div>

        <div className="relative z-10 mt-20">
          <h2 className="text-5xl font-black text-white leading-[1.1] tracking-tighter">
            Discover a world of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-200 to-white">
              limitless knowledge.
            </span>
          </h2>
          <p className="mt-6 text-lg font-medium text-white/80 max-w-md leading-relaxed">
            Access thousands of academic journals, books, and exclusive research from the Telkom University digital vault.
          </p>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="size-12 rounded-full border-2 border-primary overflow-hidden shadow-lg bg-card">
                  <img src={`https://api.dicebear.com/9.x/notionists/svg?seed=student${i}&backgroundColor=FDFBF3`} alt="user" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <span className="text-white font-black">10,000+</span>
              <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Active Students</span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-white/50 text-xs font-bold tracking-widest uppercase mt-12">
          © {new Date().getFullYear()} Telkom University. All rights reserved.
        </div>
      </div>

      {/* Right Login Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 bg-background relative">
        <div className="absolute inset-0 bg-primary/5 blur-3xl" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Header Logo */}
          <div className="lg:hidden flex justify-center mb-8">
            <div className="size-16 rounded-3xl overflow-hidden bg-card/80 shadow-2xl p-2 border border-border backdrop-blur-md">
              <img src={logoImg} alt="Tel-U Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="text-center mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h2>
            <p className="text-sm font-medium text-muted-foreground">Please sign in with your SSO account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-4">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border text-sm font-bold text-foreground placeholder:font-medium placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(139,0,0,0.1)] transition-all"
                  placeholder="Student Email Address"
                />
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="size-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border text-sm font-bold text-foreground placeholder:font-medium placeholder:text-muted-foreground outline-none focus:border-primary focus:shadow-[0_0_0_4px_rgba(139,0,0,0.1)] transition-all"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative flex items-center justify-center size-5 rounded-[6px] border border-border bg-card group-hover:border-primary transition-colors">
                  <input type="checkbox" className="peer sr-only" />
                  <div className="absolute inset-0 bg-primary opacity-0 peer-checked:opacity-100 transition-opacity rounded-[5px]" />
                </div>
                <span className="text-xs font-bold text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-primary hover:text-primary/80 transition-colors hover:underline underline-offset-4">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 py-4 rounded-2xl bg-primary text-white text-sm font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-[0_8px_25px_rgba(139,0,0,0.3)] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
                {!isLoading && <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />}
              </span>
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out" />
            </button>
          </form>

          <div className="mt-10 text-center">
            <p className="text-xs font-medium text-muted-foreground">
              Having trouble logging in? <br/>
              <span className="text-foreground font-bold mt-1 inline-block hover:text-primary cursor-pointer transition-colors">Contact IT Support Desk</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
