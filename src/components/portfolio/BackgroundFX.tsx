import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function BackgroundFX() {
  const [particles, setParticles] = useState<{ x: number; y: number; d: number; s: number }[]>([]);

  useEffect(() => {
    const arr = Array.from({ length: 28 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 6 + Math.random() * 10,
      s: 1 + Math.random() * 2,
    }));
    setParticles(arr);
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Layered gradients */}
      <div className="absolute inset-0 bg-hero-gradient opacity-80" />
      <div className="absolute inset-0 bg-grid opacity-60" />

      {/* Scanline */}
      <div
        className="absolute left-0 right-0 h-px animate-scan bg-gradient-to-r from-transparent via-neon-cyan/70 to-transparent"
        style={{ opacity: "var(--scanline-opacity)" }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.s,
            height: p.s,
            background: "currentColor",
            color: i % 3 === 0 ? "var(--neon-purple)" : i % 3 === 1 ? "var(--neon-cyan)" : "var(--neon-emerald)",
            boxShadow: "var(--particle-glow)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: p.d, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* SVG circuit traces */}
      <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
        <defs>
          <linearGradient id="circ" x1="0" x2="1">
            <stop offset="0" stopColor="var(--neon-cyan)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--neon-cyan)" stopOpacity="0.9" />
            <stop offset="1" stopColor="var(--neon-purple)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.15, 0.4, 0.65, 0.85].map((y, i) => (
          <path
            key={i}
            d={`M0 ${y * 100}% L ${20 + i * 5}% ${y * 100}% L ${25 + i * 5}% ${(y + 0.05) * 100}% L 100% ${(y + 0.05) * 100}%`}
            stroke="url(#circ)"
            strokeWidth="1"
            fill="none"
            strokeDasharray="6 12"
            style={{ animation: `circuit-flow ${8 + i * 2}s linear infinite` }}
          />
        ))}
      </svg>

      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />
    </div>
  );
}