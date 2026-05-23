import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const neonButtonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 rounded-md font-mono-display text-sm font-semibold uppercase tracking-[0.18em] transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 overflow-hidden group",
  {
    variants: {
      variant: {
        cyan: "text-neon-cyan border border-neon-cyan/50 bg-neon-cyan/5 hover:bg-neon-cyan/15 hover:shadow-[var(--neon-cyan-glow-hover)] focus-visible:ring-neon-cyan",
        purple: "text-neon-purple border border-neon-purple/55 bg-neon-purple/6 hover:bg-neon-purple/18 hover:shadow-[var(--neon-purple-glow-hover)] focus-visible:ring-neon-purple",
        emerald: "text-neon-emerald border border-neon-emerald/50 bg-neon-emerald/5 hover:bg-neon-emerald/15 hover:shadow-[var(--neon-emerald-glow-hover)] focus-visible:ring-neon-emerald",
        ghost: "text-foreground/80 border border-border hover:text-foreground hover:border-neon-cyan/50",
      },
      size: {
        sm: "h-9 px-4",
        md: "h-11 px-6",
        lg: "h-14 px-8 text-base",
      },
    },
    defaultVariants: { variant: "cyan", size: "md" },
  },
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  asChild?: boolean;
}

export const NeonButton = React.forwardRef<HTMLButtonElement, NeonButtonProps>(
  ({ className, variant, size, children, ...props }, ref) => {
    return (
      <button ref={ref} className={cn(neonButtonVariants({ variant, size }), className)} {...props}>
        {/* Sweep highlight */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full"
        />
        <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
        {/* Corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-current opacity-70" />
        <span aria-hidden className="pointer-events-none absolute right-1 bottom-1 h-2 w-2 border-r border-b border-current opacity-70" />
      </button>
    );
  },
);
NeonButton.displayName = "NeonButton";

export { neonButtonVariants };