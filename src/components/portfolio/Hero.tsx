import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { NeonButton } from "@/components/ui/neon-button";
import { Download } from "lucide-react";

const rotating = [
  "Automation",
  "TOSCA",
  "Reliability",
  "BDD Testing",
  "API Testing",
  "Quality Engineering",
];



export function Hero() {
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState("");
  const word = rotating[idx];

  useEffect(() => {
    let i = 0;
    setTyped("");
    const typing = setInterval(() => {
      i++;
      setTyped(word.slice(0, i));
      if (i >= word.length) clearInterval(typing);
    }, 70);
    const next = setTimeout(() => setIdx((p) => (p + 1) % rotating.length), 2600);
    return () => {
      clearInterval(typing);
      clearTimeout(next);
    };
  }, [idx, word]);

  return (
    <section id="top" className="relative flex min-h-screen items-center pt-28 pb-16">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-4 lg:grid-cols-12 lg:gap-8 items-center">
        {/* Left: copy */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-mono-display text-xs tracking-[0.3em] text-neon-cyan"
          >
            <span className="animate-pulse-neon">◉</span> SYSTEM // ASSOCIATE SOFTWARE QUALITY ENGINEER
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-mono-display text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Engineering<br />
            <span className="bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple bg-clip-text text-transparent text-glow-cyan">
              {typed}
              <span className="animate-blink">_</span>
            </span>
            <br />
            at scale.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg text-justify"
          >
            I'm <span className="text-foreground">Tejas Patel</span> — an Associate Software Quality Engineer
            building automated test suites, behavior-driven frameworks, and high-coverage release gates
            for enterprise-grade products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <NeonButton variant="purple" size="lg" onClick={() => {
              const link = document.createElement("a");
              link.href = "/Tejas_Patel_Resume.pdf";
              link.download = "Tejas_Patel_Resume.pdf";
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            }}>
              <Download className="h-4 w-4" /> Download CV
            </NeonButton>
          </motion.div>
        </div>

        {/* Right: Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center justify-center lg:col-span-5"
        >
          <div className="relative group">
            {/* Pulsing glow background */}
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-neon-cyan via-neon-blue to-neon-purple opacity-35 blur-xl group-hover:opacity-55 transition duration-1000 group-hover:duration-200" />
            
            {/* Glass panel container for the image */}
            <div className="glass-panel neon-border relative overflow-hidden rounded-2xl p-2 max-w-[380px] aspect-square shadow-2xl">
              <img
                src="/tejas_avatar.png"
                alt="Tejas Patel - 3D Avatar"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}