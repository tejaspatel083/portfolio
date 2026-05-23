import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeader } from "./SectionHeader";
import { Award, Bug, Code2, Sparkles } from "lucide-react";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const dur = 1600;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setV(Math.floor(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);
  return (
    <span ref={ref}>
      {v.toLocaleString()}
      {suffix}
    </span>
  );
}

const stats = [
  { icon: Award, label: "Years of Experience", value: 3, suffix: "+", color: "cyan" as const },
  { icon: Code2, label: "Test Cases Executed", value: 2000, suffix: "+", color: "purple" as const },
  { icon: Sparkles, label: "Automation Coverage", value: 85, suffix: "%", color: "emerald" as const },
  { icon: Bug, label: "Defects Resolved", value: 200, suffix: "+", color: "pink" as const },
];

export function About() {
  return (
    <section id="about" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="01 / OPERATOR"
          title="A quality engineer dedicated to software excellence."
          subtitle="Specialized in designing test automation suites, API testing, and backend validations. I implement test automation to bridge the gap between development and robust production releases."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlowCard glowColor={s.color} size="md" className="h-full">
                <s.icon className="h-6 w-6 text-[var(--glow)]" />
                <div className="mt-6 font-mono-display text-4xl font-bold text-glow-cyan">
                  <Counter to={s.value} suffix={s.suffix} />
                </div>
                <div className="mt-2 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3"
        >
          <GlowCard glowColor="cyan" className="lg:col-span-2">
            <div className="font-mono-display text-[11px] tracking-widest text-neon-cyan">// MISSION_BRIEF</div>
            <p className="mt-4 text-base leading-relaxed text-foreground/90 text-justify">
              I am an Associate Software Quality Engineer with experience in developing robust automation frameworks, validating API layers, and conducting integration testing. I leverage tools like Tricentis Tosca, Selenium WebDriver, and Gherkin/Cucumber to automate complex testing scenarios and improve delivery quality.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-justify">
              Recent focus: Automated mainframe testing, cross-browser validation suites, real-time database verification (SQL/Firebase), and embedding test suites directly into Agile sprint flows via JIRA and qTest.
            </p>
          </GlowCard>
          <GlowCard glowColor="purple">
            <div className="font-mono-display text-[11px] tracking-widest text-neon-purple">// REGISTRY</div>
            <ul className="mt-4 space-y-2 font-mono-display text-sm">
              {[
                ["role", "Associate SQE @ Sun Life"],
                ["contract", "FDM Group Contractor"],
                ["location", "Toronto, Canada"],
                ["status", "Active"],
              ].map(([k, v]) => (
                <li key={k} className="flex justify-between gap-3 border-b border-white/5 pb-1.5">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground">{v}</span>
                </li>
              ))}
            </ul>
          </GlowCard>
        </motion.div>

        {/* Certifications & Education Panels */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          <GlowCard glowColor="pink">
            <div className="font-mono-display text-[11px] tracking-widest text-neon-pink">// TRICENTIS_CERTIFICATIONS</div>
            <ul className="mt-4 space-y-2.5 font-mono-display text-xs">
              {[
                "Tosca Fundamentals - Automating Web Testing (AS1)",
                "Tosca Fundamentals - Optimizing Test Automation (AS2)",
                "Tosca Deep Dive - Structuring Test Cases & Data (TDS1)",
                "Tosca Deep Dive - Managing Stateful Data (TDS2)",
              ].map((cert, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground/90">
                  <span className="text-neon-pink">✓</span>
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </GlowCard>
          <GlowCard glowColor="emerald">
            <div className="font-mono-display text-[11px] tracking-widest text-neon-emerald">// PROFESSIONAL_CREDENTIALS</div>
            <ul className="mt-4 space-y-2.5 font-mono-display text-xs">
              <li className="flex items-start gap-2 text-foreground/90">
                <span className="text-neon-emerald">✓</span>
                <div>
                  <span className="font-semibold">Java 8 Essential Training</span>
                  <div className="text-[10px] text-muted-foreground">LinkedIn Learning Certificate</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-foreground/90">
                <span className="text-neon-emerald">✓</span>
                <div>
                  <span className="font-semibold">Post Graduation Diploma</span>
                  <div className="text-[10px] text-muted-foreground">Mobile Application Development · Cégep de la Gaspésie et des Îles</div>
                </div>
              </li>
              <li className="flex items-start gap-2 text-foreground/90">
                <span className="text-neon-emerald">✓</span>
                <div>
                  <span className="font-semibold">Bachelor of Engineering</span>
                  <div className="text-[10px] text-muted-foreground">Computer Engineering · Gujarat Technological University</div>
                </div>
              </li>
            </ul>
          </GlowCard>
        </motion.div>
      </div>
    </section>
  );
}