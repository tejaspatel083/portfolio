import * as React from "react";
import { cn } from "@/lib/utils";

type GlowColor = "cyan" | "purple" | "emerald" | "blue" | "pink";

const glowMap: Record<GlowColor, string> = {
  cyan: "var(--neon-cyan)",
  blue: "var(--neon-blue)",
  purple: "var(--neon-purple)",
  emerald: "var(--neon-emerald)",
  pink: "var(--neon-pink)",
};

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glowColor?: GlowColor;
  size?: "sm" | "md" | "lg";
}

export const GlowCard = React.forwardRef<HTMLDivElement, GlowCardProps>(
  ({ className, glowColor = "cyan", size = "md", children, style, ...props }, ref) => {
    const innerRef = React.useRef<HTMLDivElement | null>(null);
    React.useImperativeHandle(ref, () => innerRef.current as HTMLDivElement);

    const onMove = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
      const el = innerRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    }, []);

    const padding = size === "sm" ? "p-4" : size === "lg" ? "p-8" : "p-6";

    return (
      <div
        ref={innerRef}
        onMouseMove={onMove}
        className={cn(
          "group relative overflow-hidden rounded-2xl glass-panel transition-transform duration-300 will-change-transform hover:-translate-y-1",
          padding,
          className,
        )}
        style={{
          ["--glow" as string]: glowMap[glowColor],
          ...style,
        }}
        {...props}
      >
        {/* Spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--glow) 30%, transparent), transparent 60%)",
          }}
        />
        {/* Neon ring on hover */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            boxShadow:
              "inset 0 0 0 1px color-mix(in oklab, var(--glow) 55%, transparent), 0 0 28px color-mix(in oklab, var(--glow) 30%, transparent)",
          }}
        />
        {/* Corner accents */}
        <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-3 w-3 border-l border-t" style={{ borderColor: "var(--glow)" }} />
        <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-3 w-3 border-r border-t" style={{ borderColor: "var(--glow)" }} />
        <span aria-hidden className="pointer-events-none absolute left-2 bottom-2 h-3 w-3 border-l border-b" style={{ borderColor: "var(--glow)" }} />
        <span aria-hidden className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r border-b" style={{ borderColor: "var(--glow)" }} />
        <div className="relative z-10">{children}</div>
      </div>
    );
  },
);
GlowCard.displayName = "GlowCard";