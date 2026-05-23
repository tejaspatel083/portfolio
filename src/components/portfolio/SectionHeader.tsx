import { motion } from "framer-motion";

export function SectionHeader({
  index,
  title,
  subtitle,
  accent = "cyan",
}: {
  index: string;
  title: string;
  subtitle?: string;
  accent?: "cyan" | "purple" | "emerald";
}) {
  const color =
    accent === "purple" ? "var(--neon-purple)" : accent === "emerald" ? "var(--neon-emerald)" : "var(--neon-cyan)";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.6 }}
      className="mb-12 max-w-2xl"
    >
      <div className="flex items-center gap-3 font-mono-display text-[11px] tracking-[0.3em] text-muted-foreground">
        <span className="h-px w-10" style={{ background: color, color: color, boxShadow: "var(--header-glow)" }} />
        <span style={{ color }}>{index}</span>
      </div>
      <h2 className="mt-4 font-mono-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-3 text-muted-foreground text-justify">{subtitle}</p>}
    </motion.div>
  );
}