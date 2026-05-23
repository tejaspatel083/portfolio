import { motion } from "framer-motion";
import { useState } from "react";
import { NeonButton } from "@/components/ui/neon-button";
import { SectionHeader } from "./SectionHeader";
import { Github, Linkedin, Mail, Send, Twitter } from "lucide-react";

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", msg: "" });

  return (
    <section id="contact" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="05 / OPEN_CHANNEL"
          title="Initiate handshake."
          subtitle="Best for staff QE roles, automation framework consulting, and SLO design audits."
          accent="purple"
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-panel neon-border overflow-hidden rounded-xl">
              <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-red" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-amber" />
                  <span className="h-2.5 w-2.5 rounded-full bg-neon-emerald" />
                </div>
                <span className="font-mono-display text-[10px] tracking-widest text-muted-foreground">
                  contact ~ /handshake.sh
                </span>
                <span className="font-mono-display text-[10px] text-neon-emerald">● secure</span>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5 p-6 font-mono-display text-sm"
              >
                <Field
                  label="$ identify --name"
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder='"Ada Lovelace"'
                />
                <Field
                  label="$ identify --email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder='"ada@compute.dev"'
                  type="email"
                />
                <div>
                  <label className="flex items-center gap-2 text-neon-cyan">
                    <span className="text-muted-foreground">▸</span>$ transmit --payload
                  </label>
                  <textarea
                    value={form.msg}
                    onChange={(e) => setForm({ ...form, msg: e.target.value })}
                    rows={5}
                    placeholder='"propose a quality engineering engagement..."'
                    className="mt-2 w-full resize-none rounded-md border border-border bg-input px-3 py-2 text-foreground outline-none transition-colors focus:border-neon-cyan/60 focus:shadow-[0_0_12px_var(--neon-cyan)]"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="text-[11px] text-muted-foreground">
                    {submitted ? (
                      <span className="text-neon-emerald">✓ payload encrypted &amp; queued · response in &lt;24h</span>
                    ) : (
                      <span className="animate-blink">▌ awaiting input</span>
                    )}
                  </div>
                  <NeonButton type="submit" variant="cyan">
                    Transmit <Send className="h-4 w-4" />
                  </NeonButton>
                </div>
              </form>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 lg:col-span-2"
          >
            <div className="glass-panel rounded-xl p-6">
              <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">// DIRECT_LINK</div>
              <a href="mailto:tjp083@gmail.com" className="mt-3 inline-flex items-center gap-2 font-mono-display text-lg text-neon-cyan text-glow-cyan transition-opacity hover:opacity-80">
                <Mail className="h-4 w-4" /> tjp083@gmail.com
              </a>
            </div>

            <div className="glass-panel rounded-xl p-6">
              <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">// SOCIAL_PROTOCOLS</div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {[
                  { i: Github, l: "github", c: "var(--neon-cyan)" },
                  { i: Linkedin, l: "linkedin", c: "var(--neon-blue)" },
                  { i: Twitter, l: "twitter", c: "var(--neon-purple)" },
                ].map((s) => (
                  <a
                    key={s.l}
                    href="#"
                    className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-foreground/[0.02] hover:bg-foreground/[0.04] p-4 transition-all hover:-translate-y-0.5"
                    style={{ ["--c" as string]: s.c }}
                  >
                    <s.i className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-[var(--c)]" style={{ filter: "drop-shadow(0 0 0 transparent)" }} />
                    <span className="font-mono-display text-[10px] tracking-widest text-muted-foreground group-hover:text-foreground">{s.l}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="glass-panel rounded-xl p-6 font-mono-display text-xs">
              <div className="text-[10px] tracking-widest text-muted-foreground">// SYSTEM_STATUS</div>
              <ul className="mt-3 space-y-2">
                <li className="flex justify-between"><span className="text-muted-foreground">timezone</span><span>UTC-4 · Toronto</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">availability</span><span className="text-neon-emerald">Active</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">response</span><span>&lt; 24h</span></li>
              </ul>
            </div>
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

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="flex items-center gap-2 text-neon-cyan">
        <span className="text-muted-foreground">▸</span>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-md border border-border bg-input px-3 py-2 text-foreground outline-none transition-colors focus:border-neon-cyan/60 focus:shadow-[0_0_12px_var(--neon-cyan)]"
      />
    </div>
  );
}