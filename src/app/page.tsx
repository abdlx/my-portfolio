"use client";

import dynamic from "next/dynamic";
import { Hero } from "@/components/Hero";
import { BootProvider } from "@/components/fx/Preloader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { Cursor } from "@/components/fx/Cursor";
import { Ticker } from "@/components/fx/Ticker";

// Dynamic imports for components below the fold
const DeepDive = dynamic(() => import("@/components/DeepDive").then(mod => mod.DeepDive), { ssr: false });
const Projects = dynamic(() => import("@/components/Projects").then(mod => mod.Projects), { ssr: false });
const Metrics = dynamic(() => import("@/components/Metrics").then(mod => mod.Metrics), { ssr: false });
const Testimonials = dynamic(() => import("@/components/Testimonials").then(mod => mod.Testimonials), { ssr: false });
const KnowledgeGraph = dynamic(() => import("@/components/KnowledgeGraph").then(mod => mod.KnowledgeGraph), { ssr: false });
const Lab = dynamic(() => import("@/components/Lab").then(mod => mod.Lab), { ssr: false });
const Contact = dynamic(() => import("@/components/Contact").then(mod => mod.Contact), { ssr: false });
const Navigation = dynamic(() => import("@/components/Navigation").then(mod => mod.Navigation), { ssr: false });

const ROLES = [
    "AI PIPELINE ARCHITECT",
    "FULL-STACK ENGINEER",
    "RAG SYSTEMS",
    "SAAS PLATFORMS",
    "AUTOMATION SWARMS",
    "LLM ORCHESTRATION",
];

export default function Home() {
    return (
        <BootProvider>
            <SmoothScroll />
            <Cursor />

            {/* fixed texture layers */}
            <div className="grain" aria-hidden="true" />
            <div className="page-columns" aria-hidden="true">
                <span style={{ left: "25%" }} />
                <span style={{ left: "50%" }} />
                <span style={{ left: "75%" }} />
            </div>

            <main className="relative min-h-screen">
                <Hero />

                {/* role ticker divider */}
                <Ticker
                    className="hairline-t hairline-b py-4 md:py-5"
                    duration={30}
                    items={ROLES.map((role, i) =>
                        i % 2 === 0 ? (
                            <span key={role} className="font-display font-bold text-xl md:text-3xl uppercase text-[var(--ink)]">
                                {role}
                            </span>
                        ) : (
                            <span key={role} className="font-serif-it text-xl md:text-3xl lowercase text-[var(--muted)]">
                                {role.toLowerCase()}
                            </span>
                        )
                    )}
                />

                <DeepDive />
                <Projects />
                <Metrics />
                <Testimonials />
                <KnowledgeGraph />
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
                        <h3>Glow: Skin Intelligence System</h3>
                        <p>Clinical-grade AI skincare recommendation engine with a Hybrid RAG pipeline, BullMQ and Redis for high-scale asynchronous reasoning.</p>
                        <a href="https://nglow.co">Visit Glow</a>
                    </article>

                    <article>
                        <h3>EchoHarvest</h3>
                        <p>Industrial-grade distributed data harvesting infrastructure using a serverless Playwright swarm on Docker. Features &apos;Ghost Protocol&apos; for bot evasion.</p>
                    </article>

                    <h2>Contact Information</h2>
                    <p>Email: mirzaabdulla300@gmail.com</p>
                    <p>LinkedIn: https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/</p>
                    <p>GitHub: https://github.com/abdlx</p>
                </section>
            </main>
        </BootProvider>
    );
}
