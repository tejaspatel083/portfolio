import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { ClipboardList, Code2, FlaskConical, Rocket, Activity } from "lucide-react";

const stages = [
  {
    icon: ClipboardList,
    name: "Planning & Integration",
    role: "Associate SQE · Sun Life (FDM Contractor)",
    period: "10/2023 — Present",
    text: "Collaborate in a dynamic QA team to ensure quality across multiple projects. Design and execute Tricentis Tosca automated tests, validate mainframe systems, and manage runs via qTest and JIRA.",
    color: "var(--neon-cyan)",
  },
  {
    icon: FlaskConical,
    name: "Automation & Testing",
    role: "QA Engineer · FDM Group",
    period: "01/2023 — 10/2023",
    text: "Performed manual and automated regression testing of Ticketing System. Engineered Selenium WebDriver + Cucumber BDD test suites in Java within Scrum sprints.",
    color: "var(--neon-blue)",
  },
  {
    icon: Activity,
    name: "Support & Diagnostics",
    role: "Technical Support Advisor · Kelly Services",
    period: "08/2022 — 10/2022",
    text: "Followed training procedures to diagnose and resolve software and hardware issues. Logged support calls in technical databases and handled secure data backups.",
    color: "var(--neon-purple)",
  },
  {
    icon: Code2,
    name: "Software Development",
    role: "Software Developer Intern · Siyana Info Solutions",
    period: "06/2018 — 12/2018",
    text: "Gained hands-on experience developing Android applications. Leveraged Java, Android Studio, Retrofit (REST APIs), local SQL databases, and Firebase real-time data sync.",
    color: "var(--neon-emerald)",
  },
  {
    icon: Rocket,
    name: "Academic Foundation",
    role: "Mobile App Dev & Computer Engineering",
    period: "2015 — 2021",
    text: "Post Graduation Diploma in Mobile Application Development (Montreal, Canada) & Bachelor of Engineering in Computer Engineering (Ahmedabad, India).",
    color: "var(--neon-amber)",
  },
];

export function Pipeline() {
  return (
    <section id="pipeline" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="04 / RELEASE_PIPELINE"
          title="Career as a CI/CD pipeline."
          subtitle="Every role is a stage. Each stage hardens the next."
          accent="emerald"
        />

        <div className="relative">
          {/* Spine */}
          <div className="absolute left-6 top-0 bottom-0 hidden w-px bg-gradient-to-b from-neon-cyan via-neon-purple to-neon-emerald opacity-40 md:block" />

          <div className="space-y-8">
            {stages.map((s, i) => (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative md:pl-20"
              >
                {/* Node */}
                <div className="absolute left-0 top-1 hidden h-12 w-12 items-center justify-center md:flex">
                  <span
                    className="absolute inset-0 rounded-full opacity-30 blur-md"
                    style={{ background: s.color }}
                  />
                  <span
                    className="relative flex h-12 w-12 items-center justify-center rounded-full border"
                    style={{
                      borderColor: s.color,
                      background: "var(--background)",
                      color: s.color,
                      boxShadow: "var(--node-glow)",
                    }}
                  >
                    <s.icon className="h-5 w-5" style={{ color: "currentColor" }} />
                  </span>
                </div>

                <div className="glass-panel rounded-xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="font-mono-display text-[10px] tracking-[0.3em]" style={{ color: s.color }}>
                      STAGE 0{i + 1} · {s.name.toUpperCase()}
                    </div>
                    <div className="font-mono-display text-[11px] text-muted-foreground">{s.period}</div>
                  </div>
                  <h3 className="mt-2 font-mono-display text-xl font-bold">{s.role}</h3>
                  <p className="mt-2 text-sm text-muted-foreground text-justify">{s.text}</p>

                  <div className="mt-4 flex items-center gap-2 font-mono-display text-[10px] tracking-widest">
                    <span className="h-1.5 w-1.5 animate-pulse-neon rounded-full" style={{ background: s.color }} />
                    <span style={{ color: s.color }}>EXIT_CODE 0 · STAGE COMPLETE</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}