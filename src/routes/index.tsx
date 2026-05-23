import { createFileRoute } from "@tanstack/react-router";
import { BackgroundFX } from "@/components/portfolio/BackgroundFX";
import { SpotlightCursor } from "@/components/portfolio/SpotlightCursor";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Projects } from "@/components/portfolio/Projects";
import { Pipeline } from "@/components/portfolio/Pipeline";
import { Contact } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background text-foreground">
      <BackgroundFX />
      <SpotlightCursor />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Pipeline />
        <Contact />
      </main>
    </div>
  );
}
