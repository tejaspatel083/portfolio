import { motion } from "framer-motion";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeader } from "./SectionHeader";
import { Github, ExternalLink, GaugeCircle } from "lucide-react";

const projects = [
  {
    code: "MOD_01",
    title: "Cineplex Automation",
    desc: "Selenium Cucumber-based automated test suite for Gherkin-defined user flows including ticket purchases, VIP menu selection, trailer playbacks, and movie details.",
    stack: ["Selenium WebDriver", "Cucumber", "Java", "Gherkin", "JUnit"],
    metrics: [
      ["test scenarios", "45+"],
      ["automation", "100%"],
      ["run time", "< 3m"],
    ],
    glow: "cyan" as const,
  },
  {
    code: "MOD_02",
    title: "Ticketing System QA",
    desc: "Comprehensive automated and manual testing suite for FDM's internal ticketing application, integrating behavior-driven Cucumber scripts with a Java/Selenium framework.",
    stack: ["Selenium WebDriver", "Cucumber", "Java", "Agile", "JIRA"],
    metrics: [
      ["test coverage", "+35%"],
      ["defect catch", "94%"],
      ["regression", "100%"],
    ],
    glow: "purple" as const,
  },
  {
    code: "MOD_03",
    title: "CookBook Android App",
    desc: "Android-based application providing structured recipes from different chefs, implementing local CRUD operations and full English and French localization for maximum accessibility.",
    stack: ["Android Studio", "Java", "XML", "SQLite"],
    metrics: [
      ["languages", "2 (EN/FR)"],
      ["features", "CRUD"],
      ["database", "Local SQL"],
    ],
    glow: "emerald" as const,
  },
  {
    code: "MOD_04",
    title: "AllianceFrancaise App",
    desc: "Android application featuring levels of learning French (Beginner, Intermediate, Advanced) using XML, Java, Jetpack Navigation, and Picasso for remote image loading.",
    stack: ["Android Studio", "Java", "Firebase DB", "Jetpack Nav", "Picasso"],
    metrics: [
      ["levels", "3 (Beg/Int/Adv)"],
      ["db sync", "Real-time"],
      ["routing", "Jetpack Nav"],
    ],
    glow: "pink" as const,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="03 / DEPLOYED_MODULES"
          title="Shipped quality systems."
          subtitle="Production frameworks and tooling I've designed and shipped — each module battle-tested against real traffic."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
            >
              <GlowCard glowColor={p.glow} size="lg" className="h-full">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-mono-display text-[10px] tracking-[0.3em] text-muted-foreground">
                      {p.code} · DEPLOYED
                    </div>
                    <h3 className="mt-2 font-mono-display text-2xl font-bold">{p.title}</h3>
                  </div>
                  <GaugeCircle className="h-5 w-5 animate-pulse-neon text-[var(--glow)]" />
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-justify">{p.desc}</p>

                {/* Loading bar */}
                <div className="mt-5 flex items-center gap-2 font-mono-display text-[10px] tracking-widest text-muted-foreground">
                  <span>BUILD</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-foreground/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.1 }}
                      className="h-full rounded-full"
                      style={{ background: "var(--glow)", boxShadow: "var(--skills-glow)" }}
                    />
                  </div>
                  <span style={{ color: "var(--glow)" }}>OK</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-foreground/5 px-2 py-1 font-mono-display text-[10px] tracking-wider text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border pt-5">
                  {p.metrics.map(([k, v]) => (
                    <div key={k}>
                      <div className="font-mono-display text-[9px] uppercase tracking-widest text-muted-foreground">
                        {k}
                      </div>
                      <div className="mt-1 font-mono-display text-base font-bold" style={{ color: "var(--glow)" }}>
                        {v}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4 font-mono-display text-xs">
                  <a href="#" className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground">
                    <Github className="h-3.5 w-3.5" /> source
                  </a>
                  <a href="#" className="inline-flex items-center gap-1.5 transition-colors hover:opacity-80" style={{ color: "var(--glow)" }}>
                    <ExternalLink className="h-3.5 w-3.5" /> live demo
                  </a>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}