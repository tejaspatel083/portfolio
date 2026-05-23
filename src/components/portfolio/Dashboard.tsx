import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { GlowCard } from "@/components/ui/glow-card";
import { SectionHeader } from "./SectionHeader";

function useTrend(seed: number, points = 24) {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: points }, (_, i) => 40 + 30 * Math.sin(i / 2 + seed) + Math.random() * 10),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((d) => {
        const next = [...d.slice(1), 40 + 30 * Math.sin(Date.now() / 800 + seed) + Math.random() * 15];
        return next;
      });
    }, 1400);
    return () => clearInterval(id);
  }, [seed]);
  return data;
}

function Sparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const points = data
    .map((v, i) => `${(i / (data.length - 1)) * 100},${100 - ((v - min) / range) * 90 - 5}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`g-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity="0.4" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polyline points={points} fill="none" stroke={color} strokeWidth="1.2" style={{ filter: `drop-shadow(0 0 4px ${color})` }} />
      <polygon points={`0,100 ${points} 100,100`} fill={`url(#g-${color})`} />
    </svg>
  );
}

function Bars({ count = 12, color }: { count?: number; color: string }) {
  const [bars, setBars] = useState<number[]>(() => Array.from({ length: count }, () => Math.random() * 100));
  useEffect(() => {
    const id = setInterval(() => setBars((b) => b.map(() => 30 + Math.random() * 70)), 1500);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex h-full items-end gap-1">
      {bars.map((b, i) => (
        <motion.div
          key={i}
          animate={{ height: `${b}%` }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="flex-1 rounded-sm"
          style={{ background: color, boxShadow: `0 0 6px ${color}` }}
        />
      ))}
    </div>
  );
}

function Donut({ value, color }: { value: number; color: string }) {
  const c = 2 * Math.PI * 40;
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r="40" stroke="oklch(1 0 0 / 0.06)" strokeWidth="6" fill="none" />
        <motion.circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: `0 ${c}` }}
          whileInView={{ strokeDasharray: `${(value / 100) * c} ${c}` }}
          viewport={{ once: true }}
          transition={{ duration: 1.4 }}
          style={{ filter: `drop-shadow(0 0 6px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="font-mono-display text-3xl font-bold" style={{ color }}>{value}%</div>
        <div className="text-[10px] tracking-widest text-muted-foreground">PASS</div>
      </div>
    </div>
  );
}

export function Dashboard() {
  const trend1 = useTrend(1);
  const trend2 = useTrend(3);

  return (
    <section id="dashboard" className="relative py-12">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHeader
          index="05 / QA_COMMAND_CENTER"
          title="Live quality telemetry."
          subtitle="Simulated readouts of the dashboards I build for engineering orgs."
          accent="cyan"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-6">
          <GlowCard glowColor="cyan" className="lg:col-span-2">
            <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">AUTOMATION SUCCESS RATE</div>
            <div className="mt-4 h-40">
              <Donut value={97} color="var(--neon-cyan)" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center font-mono-display text-xs">
              <div><div className="text-neon-emerald">12,402</div><div className="text-[9px] text-muted-foreground tracking-widest">PASS</div></div>
              <div><div className="text-neon-amber">214</div><div className="text-[9px] text-muted-foreground tracking-widest">FLAKY</div></div>
              <div><div className="text-neon-red">38</div><div className="text-[9px] text-muted-foreground tracking-widest">FAIL</div></div>
            </div>
          </GlowCard>

          <GlowCard glowColor="purple" className="lg:col-span-4">
            <div className="flex items-center justify-between">
              <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">TEST EXECUTION TRENDS · 24H</div>
              <div className="font-mono-display text-[10px] text-neon-emerald">▲ +12.4%</div>
            </div>
            <div className="mt-4 h-40">
              <Sparkline data={trend1} color="var(--neon-purple)" />
            </div>
          </GlowCard>

          <GlowCard glowColor="emerald" className="lg:col-span-3">
            <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">API RESPONSE TIMES · ms</div>
            <div className="mt-4 h-32">
              <Bars color="var(--neon-emerald)" />
            </div>
            <div className="mt-3 flex justify-between font-mono-display text-[10px] text-muted-foreground">
              <span>p50 84ms</span><span>p95 142ms</span><span>p99 287ms</span>
            </div>
          </GlowCard>

          <GlowCard glowColor="pink" className="lg:col-span-3">
            <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">DEFECT LEAKAGE · 12w</div>
            <div className="mt-4 h-32">
              <Sparkline data={trend2} color="var(--neon-pink)" />
            </div>
            <div className="mt-3 flex justify-between font-mono-display text-[10px]">
              <span className="text-muted-foreground">prod escapes</span>
              <span className="text-neon-pink">0.7 / 1000 deploys</span>
            </div>
          </GlowCard>

          <GlowCard glowColor="blue" className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {[
                { l: "COVERAGE", v: "94.7%", c: "var(--neon-cyan)" },
                { l: "MEAN BUILD", v: "5m 12s", c: "var(--neon-purple)" },
                { l: "MTTR", v: "3m 41s", c: "var(--neon-emerald)" },
                { l: "DEPLOY FREQ", v: "38 / day", c: "var(--neon-amber)" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-mono-display text-[10px] tracking-widest text-muted-foreground">{s.l}</div>
                  <div className="mt-1 font-mono-display text-3xl font-bold" style={{ color: s.c, textShadow: "var(--dashboard-glow)" }}>{s.v}</div>
                </div>
              ))}
            </div>
          </GlowCard>
        </div>
      </div>
    </section>
  );
}