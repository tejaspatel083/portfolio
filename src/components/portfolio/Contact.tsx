import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Github, Linkedin, Mail, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="05 / OPEN_CHANNEL"
          title="Initiate handshake."
          subtitle="Best for staff QE roles, automation framework consulting, and SLO design audits."
          accent="purple"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="glass-panel rounded-xl p-6"
          >
            <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">// DIRECT_LINK</div>
            <div className="mt-3 flex flex-col gap-2.5 font-mono-display">
              <a href="mailto:tjp083@gmail.com" className="inline-flex items-center gap-2 text-lg text-neon-cyan text-glow-cyan transition-opacity hover:opacity-80">
                <Mail className="h-4 w-4" /> tjp083@gmail.com
              </a>
              <a href="tel:+14389244116" className="inline-flex items-center gap-2 text-lg text-neon-cyan text-glow-cyan transition-opacity hover:opacity-80">
                <Phone className="h-4 w-4" /> +1 438-924 4116
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-panel rounded-xl p-6"
          >
            <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">// SOCIAL_PROTOCOLS</div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {[
                { i: Github, l: "github", c: "var(--neon-cyan)", href: "https://github.com/tejaspatel083" },
                { i: Linkedin, l: "linkedin", c: "var(--neon-blue)", href: "https://www.linkedin.com/in/tejas-patel-04b583114/" },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] p-4 transition-all hover:-translate-y-0.5"
                  style={{ ["--c" as string]: s.c }}
                >
                  <s.i className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[var(--c)]" style={{ filter: "drop-shadow(0 0 0 transparent)" }} />
                  <span className="font-mono-display text-[10px] tracking-widest text-muted-foreground group-hover:text-foreground">{s.l}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-panel rounded-xl p-6 font-mono-display text-xs"
          >
            <div className="text-[10px] tracking-widest text-muted-foreground">// SYSTEM_STATUS</div>
            <ul className="mt-3 space-y-2">
              <li className="flex justify-between"><span className="text-muted-foreground">timezone</span><span>UTC-4 · Toronto</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">availability</span><span className="text-neon-emerald">Active</span></li>
              <li className="flex justify-between"><span className="text-muted-foreground">response</span><span>&lt; 24h</span></li>
            </ul>
          </motion.div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-white/5 pt-6 font-mono-display text-[11px] text-muted-foreground">
          <span>© 2026 TEJAS PATEL · SOFTWARE QUALITY ENGINEER</span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse-neon rounded-full bg-neon-emerald" />
            ALL SYSTEMS OPERATIONAL
          </span>
        </div>
      </div>
    </section>
  );
}