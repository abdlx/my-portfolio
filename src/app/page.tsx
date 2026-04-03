"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";

// Dynamic imports for components below the fold
const DeepDive = dynamic(() => import("@/components/DeepDive").then(mod => mod.DeepDive), { ssr: false });
const Pipeline = dynamic(() => import("@/components/Pipeline").then(mod => mod.Pipeline), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects").then(mod => mod.Projects), { ssr: false });
const Lab = dynamic(() => import("@/components/Lab").then(mod => mod.Lab), { ssr: false });
const Navigation = dynamic(() => import("@/components/Navigation").then(mod => mod.Navigation), { ssr: false });
const Metrics = dynamic(() => import("@/components/Metrics").then(mod => mod.Metrics), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => mod.Testimonials), { ssr: false });
const KnowledgeGraph = dynamic(() => import("@/components/KnowledgeGraph").then(mod => mod.KnowledgeGraph), { ssr: false });
const CV = dynamic(() => import("@/components/CV").then(mod => mod.CV), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact), { ssr: false });
const AITerminal = dynamic(() => import("@/components/AITerminal").then(mod => mod.AITerminal), { ssr: false });
const TracingBeam = dynamic(() => import("@/components/ui/tracing-beam").then(mod => mod.TracingBeam), { ssr: false });

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
              href="mailto:mirzaabdulla300@gmail.com"
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
