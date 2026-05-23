import { motion } from "framer-motion";
import { useState } from "react";
import { SectionHeader } from "./SectionHeader";

type Skill = { name: string; level: number; years: number; cluster: "auto" | "perf" | "lang" | "infra" };

const skills: Skill[] = [
  { name: "Selenium", level: 92, years: 3, cluster: "auto" },
  { name: "Cucumber", level: 90, years: 3, cluster: "auto" },
  { name: "TOSCA", level: 94, years: 2, cluster: "auto" },
  { name: "API Testing", level: 88, years: 3, cluster: "auto" },
  { name: "Manual Testing", level: 92, years: 3, cluster: "auto" },

  { name: "Android", level: 85, years: 2, cluster: "perf" },
  { name: "Firebase", level: 82, years: 2, cluster: "perf" },
  { name: "SQL", level: 86, years: 3, cluster: "perf" },
  { name: "Retrofit", level: 80, years: 1, cluster: "perf" },

  { name: "Java", level: 88, years: 5, cluster: "lang" },
  { name: "XML", level: 82, years: 2, cluster: "lang" },
  { name: "Gherkin", level: 85, years: 3, cluster: "lang" },

  { name: "UNIX", level: 80, years: 2, cluster: "infra" },
  { name: "JIRA & qTest", level: 90, years: 3, cluster: "infra" },
  { name: "Agile (Scrum)", level: 94, years: 5, cluster: "infra" },
];

const clusterMeta: Record<Skill["cluster"], { label: string; color: string; hex: string }> = {
  auto: { label: "AUTOMATION", color: "var(--neon-cyan)", hex: "#7fe5ff" },
  perf: { label: "MOBILE & DATA", color: "var(--neon-amber)", hex: "#ffd166" },
  lang: { label: "LANGUAGES", color: "var(--neon-purple)", hex: "#c98bff" },
  infra: { label: "TOOLS & AGILE", color: "var(--neon-emerald)", hex: "#5fe5b0" },
};

// Build a deterministic radial layout
function layout(): Array<Skill & { x: number; y: number }> {
  const clusters = ["auto", "perf", "lang", "infra"] as const;
  const out: Array<Skill & { x: number; y: number }> = [];
  clusters.forEach((c, ci) => {
    const list = skills.filter((s) => s.cluster === c);
    const cx = 50 + 32 * Math.cos((ci / 4) * Math.PI * 2 - Math.PI / 2);
    const cy = 50 + 32 * Math.sin((ci / 4) * Math.PI * 2 - Math.PI / 2);
    list.forEach((s, i) => {
      const r = 14;
      const a = (i / list.length) * Math.PI * 2;
      out.push({ ...s, x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    });
  });
  return out;
}

const nodes = layout();

export function Skills() {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <section id="skills" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="02 / STACK_GRAPH"
          title="A connected system, not a list."
          subtitle="Hover any node to inspect proficiency and tenure. Clusters mirror how I architect QA platforms in production."
          accent="purple"
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Graph */}
          <div className="lg:col-span-8">
            <div className="glass-panel relative aspect-square overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-grid opacity-40" />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                {nodes.map((n, i) =>
                  nodes
                    .slice(i + 1)
                    .filter((m) => m.cluster === n.cluster)
                    .map((m, j) => (
                      <line
                        key={`${i}-${j}`}
                        x1={n.x}
                        y1={n.y}
                        x2={m.x}
                        y2={m.y}
                        stroke={clusterMeta[n.cluster].color}
                        strokeOpacity={hover && (hover === n.name || hover === m.name) ? 0.8 : 0.18}
                        strokeWidth={0.15}
                      />
                    )),
                )}
                {/* central hub */}
                <circle cx="50" cy="50" r="2" fill="var(--neon-cyan)" opacity="0.9">
                  <animate attributeName="r" values="2;3;2" dur="2.4s" repeatCount="indefinite" />
                </circle>
                {nodes.map((n) => (
                  <line key={`h-${n.name}`} x1="50" y1="50" x2={n.x} y2={n.y} stroke={clusterMeta[n.cluster].color} strokeOpacity={0.1} strokeWidth={0.1} />
                ))}
              </svg>

              {nodes.map((n) => {
                const meta = clusterMeta[n.cluster];
                const active = hover === n.name;
                return (
                  <motion.button
                    key={n.name}
                    onMouseEnter={() => setHover(n.name)}
                    onMouseLeave={() => setHover(null)}
                    initial={{ opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      left: `${n.x}%`,
                      top: `${n.y}%`,
                    }}
                  >
                    <span
                      className="block h-2.5 w-2.5 rounded-full transition-transform duration-300"
                      style={{
                        background: "currentColor",
                        color: meta.color,
                        boxShadow: `var(--skills-glow, 0 0 ${active ? 20 : 10}px currentColor)`,
                        transform: active ? "scale(1.8)" : "scale(1)",
                      }}
                    />
                    <span
                      className="pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap font-mono-display text-[10px] tracking-wider text-muted-foreground"
                      style={active ? { color: meta.color, fontWeight: "bold" } : {}}
                    >
                      {n.name}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>

          {/* Side panel */}
          <div className="lg:col-span-4">
            <div className="glass-panel sticky top-28 rounded-2xl p-6">
              <div className="font-mono-display text-[11px] tracking-widest text-muted-foreground">// INSPECTOR</div>
              {hover ? (
                (() => {
                  const n = nodes.find((x) => x.name === hover)!;
                  const meta = clusterMeta[n.cluster];
                  return (
                    <div className="mt-4">
                      <div className="font-mono-display text-2xl font-bold" style={{ color: meta.color }}>
                        {n.name}
                      </div>
                      <div className="mt-1 text-xs tracking-widest text-muted-foreground">{meta.label}</div>
                      <div className="mt-6 space-y-4">
                        <div>
                          <div className="flex justify-between font-mono-display text-xs">
                            <span className="text-muted-foreground">proficiency</span>
                            <span style={{ color: meta.color }}>{n.level}%</span>
                          </div>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-foreground/5">
                            <motion.div
                              key={n.name}
                              initial={{ width: 0 }}
                              animate={{ width: `${n.level}%` }}
                              transition={{ duration: 0.6 }}
                              className="h-full rounded-full"
                              style={{ background: "currentColor", color: meta.color, boxShadow: "var(--skills-glow)" }}
                            />
                          </div>
                        </div>
                        <div className="flex justify-between font-mono-display text-xs">
                          <span className="text-muted-foreground">tenure</span>
                          <span className="text-foreground">{n.years}y in production</span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <p>Hover a node to inspect proficiency and production tenure.</p>
                  <ul className="space-y-2">
                    {Object.entries(clusterMeta).map(([k, m]) => (
                      <li key={k} className="flex items-center gap-2 font-mono-display text-xs">
                        <span className="h-2 w-2 rounded-full" style={{ background: "currentColor", color: m.color, boxShadow: "var(--skills-glow)" }} />
                        {m.label}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}