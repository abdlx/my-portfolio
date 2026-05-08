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
          </div>
        </TracingBeam>
      </div>

      <Projects />

      <div className="relative">
        <TracingBeam>
          <div className="flex flex-col gap-0">
            <Testimonials />
            <KnowledgeGraph />
          </div>
        </TracingBeam>
      </div>

      <Lab />
      <Contact />
      <Navigation />

      {/* Semantic content for AI agents and search bots (Visually Hidden) */}
      <section className="sr-only" aria-hidden="false">
        <h1>Abdullah | AI Product Engineer</h1>
        <p>Full-Stack Engineer & AI Pipeline Architect specialized in building production-grade AI systems, SaaS platforms, and software that thinks.</p>
        
        <h2>Core Expertise</h2>
        <ul>
          <li>Next.js Development</li>
          <li>AI Pipeline Architecture</li>
          <li>LLM Orchestration (OpenAI, LangChain)</li>
          <li>RAG (Retrieval-Augmented Generation)</li>
          <li>Scalable SaaS Infrastructure</li>
          <li>Full-Stack Development (TypeScript, Python)</li>
        </ul>

        <h2>Quantified Impact (Numbers-Backed)</h2>
        <ul>
            <li><strong>15% Reduction in RTO:</strong> Optimized order delivery for Fulfix using Llama 3 scoring.</li>
            <li><strong>Sub-1.2s Latency:</strong> Engineered high-performance RAG pipelines for 10k+ SKU hardware catalogs.</li>
            <li><strong>100k+ Monthly Throughput:</strong> Built serverless Playwright swarms for industrial-grade data harvesting.</li>
            <li><strong>100/100 Core Web Vitals:</strong> Consistently delivering perfect performance scores for premium client sites.</li>
        </ul>

        <h2>Featured Projects</h2>
        <article>
          <h3>Fulfix</h3>
          <p>Agency-Grade Order Management System for Pakistan. Reduced RTO risk by 15% using Llama 3 address scoring. Built with Next.js, Supabase, and OpenRouter.</p>
          <a href="https://fulfix.pk">Visit Fulfix</a>
        </article>

        <article>
          <h3>ASAS Forge</h3>
          <p>Premium digital catalog with RAG-powered catalog search using Vercel AI SDK for 10k+ SKUs. Integrated jsPDF for automated, dynamic catalog generation.</p>
          <a href="https://asasforge.com">Visit ASAS Forge</a>
        </article>

        <article>
          <h3>Arsalan Malik (Pitch)</h3>
          <p>Immersive Web3 hub with Spline 3D environments and custom AI mentorship agents. Built with Next.js 16 and Framer Motion.</p>
        </article>

        <article>
          <h3>EchoHarvest</h3>
          <p>Industrial-grade distributed data harvesting infrastructure using a serverless Playwright swarm on Docker. Features 'Ghost Protocol' for bot evasion.</p>
        </article>

        <h2>Contact Information</h2>
        <p>Email: mirzaabdulla300@gmail.com</p>
        <p>LinkedIn: https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/</p>
        <p>GitHub: https://github.com/abdlx</p>
      </section>

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
