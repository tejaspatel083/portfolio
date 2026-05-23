import { motion } from "framer-motion";
import { Terminal, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "01 / About" },
  { href: "#skills", label: "02 / Stack" },
  { href: "#projects", label: "03 / Projects" },
  { href: "#pipeline", label: "04 / Pipeline" },
  { href: "#contact", label: "05 / Contact" },
];

export function Nav() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "light") {
        document.documentElement.classList.add("light");
        document.documentElement.classList.remove("dark");
      } else {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      }
    } else {
      const isLight = document.documentElement.classList.contains("light");
      setTheme(isLight ? "light" : "dark");
    }
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("portfolio-theme", "dark");
    }
  };

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <div className="glass-panel flex items-center justify-between rounded-xl px-4 py-3">
          <a href="#top" className="flex items-center gap-2 font-mono-display text-sm">
            <Terminal className="h-4 w-4 text-neon-cyan" />
            <span className="font-bold tracking-widest">QA<span className="text-neon-cyan">/</span>SYS</span>
            <span className="ml-2 hidden text-[10px] text-muted-foreground sm:inline">v2.6.∞</span>
          </a>
          <nav className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="rounded-md px-3 py-1.5 text-xs font-medium tracking-wider text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="flex h-7 w-7 items-center justify-center rounded-lg border border-foreground/10 bg-foreground/5 text-muted-foreground transition-all hover:bg-foreground/10 hover:text-foreground active:scale-95 cursor-pointer"
            >
              {theme === "dark" ? (
                <Sun className="h-3.5 w-3.5 text-amber-400" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-indigo-500" />
              )}
            </button>

            <div className="flex items-center gap-2 font-mono-display text-[11px] text-neon-emerald">
              <span className="h-2 w-2 animate-pulse-neon rounded-full bg-neon-emerald shadow-[0_0_10px_var(--neon-emerald)]" />
              ONLINE
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}