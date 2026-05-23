import { motion } from "framer-motion";
import { Terminal, Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";
import { WEBP_DISPLACEMENT_MAP } from "@/components/ui/apple-tahoe-liquid-glass-button";

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
      {/* SVG FILTER DEFINITION */}
      <svg className="absolute w-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <filter id="liquid-glass-nav" primitiveUnits="objectBoundingBox">
          <feImage 
            result="map" 
            width="100%" 
            height="100%" 
            x="0" 
            y="0" 
            href={WEBP_DISPLACEMENT_MAP} 
            preserveAspectRatio="none" 
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.01" result="blur" />
          <feDisplacementMap 
            id="disp" 
            in="blur" 
            in2="map" 
            scale="0.5" 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      <style>{`
        .nav-liquid-lens {
          background-color: oklch(from var(--foreground) l c h / 6%);
          backdrop-filter: blur(12px) url(#liquid-glass-nav) saturate(150%);
          -webkit-backdrop-filter: blur(12px) saturate(150%);
          
          box-shadow: 
            inset 0 0 0 1px color-mix(in srgb, white 10%, transparent),
            inset 1.8px 3px 0px -2px color-mix(in srgb, white 90%, transparent), 
            inset -2px -2px 0px -2px color-mix(in srgb, white 80%, transparent), 
            inset -3px -8px 1px -6px color-mix(in srgb, white 60%, transparent), 
            inset -3px -1px 4px 0px color-mix(in srgb, black 12%, transparent), 
            inset -1.5px 2.5px 0px -2px color-mix(in srgb, black 20%, transparent), 
            inset 0px 3px 4px -2px color-mix(in srgb, black 20%, transparent), 
            inset 2px -6.5px 1px -4px color-mix(in srgb, black 10%, transparent), 
            0px 1px 5px 0px color-mix(in srgb, black 10%, transparent), 
            0px 6px 16px 0px color-mix(in srgb, black 8%, transparent);
        }
      `}</style>

      <div className="mx-auto mt-4 max-w-7xl px-4">
        {/* CONTAINER WITH LIQUID GLASS LENS */}
        <div className="relative flex items-center justify-between rounded-xl px-4 py-3">
          {/* LIQUID GLASS LENS BACKGROUND */}
          <div className="nav-liquid-lens absolute inset-0 -z-10 rounded-[inherit] pointer-events-none" />

          {/* BRAND LOGO */}
          <a href="#top" className="flex items-center gap-2 font-mono-display text-sm relative z-10 transition-colors hover:text-foreground">
            <Terminal className="h-4 w-4 text-neon-cyan" />
            <span className="font-bold tracking-widest text-foreground/90 hover:text-foreground">QA<span className="text-neon-cyan">/</span>SYS</span>
            <span className="ml-2 hidden text-[10px] text-muted-foreground sm:inline">v2.6.∞</span>
          </a>

          {/* NAV LINKS */}
          <nav className="hidden items-center gap-1 md:flex relative z-10">
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

          {/* CONTROLS */}
          <div className="flex items-center gap-4 relative z-10">
            {/* THEME TOGGLE */}
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