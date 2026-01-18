import { Hero } from "@/components/Hero";
import { Pipeline } from "@/components/Pipeline";
import { Projects } from "@/components/Projects";
import { Lab } from "@/components/Lab";
import { Navigation } from "@/components/Navigation";
import { Metrics } from "@/components/Metrics";
import { Testimonials } from "@/components/Testimonials";
import { KnowledgeGraph } from "@/components/KnowledgeGraph";
import { Contact } from "@/components/Contact";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { DeepDive } from "@/components/DeepDive";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Hero />
      <DeepDive />

      <div className="relative">
        <TracingBeam>
          <div className="flex flex-col gap-0">
            <Pipeline />
            <Metrics />
            <Projects />
            <Testimonials />
            <KnowledgeGraph />
          </div>
        </TracingBeam>
      </div>

      <Lab />
      <Contact />
      <Navigation />

      {/* Footer */}
      <footer className="w-full bg-black pt-12 pb-32 px-4 border-t border-neutral-900">
        <div className="max-w-7xl mx-auto text-center font-mono">
          <div className="mb-4">
            <a
              href="mailto:abdullah@example.com"
              className="text-emerald-500 hover:text-emerald-400 transition-colors inline-flex items-center gap-2"
            >
              <span className="text-neutral-500">$</span> ./contact_me.sh
            </a>
          </div>
          <p className="text-neutral-500 text-sm">
            © {new Date().getFullYear()} Abdullah. Built with Next.js & Framer Motion.
          </p>
          <p className="text-neutral-600 text-xs mt-2">
            Designed to impress. Engineered to perform.
          </p>
        </div>
      </footer>
    </main>
  );
}
