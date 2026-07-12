"use client";

import React, { useRef, useState } from "react";
import { ProjectModal } from "./ProjectModal";
import {
    motion,
    useScroll,
    useTransform,
    useMotionValueEvent,
    MotionValue,
} from "framer-motion";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useUiSounds } from "@/hooks/useUiSounds";

interface ImpactMetric {
    label: string;
    value: string;
}

interface ProjectData {
    title: string;
    description: string;
    longDescription?: string;
    stack: string[];
    videoUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    impactMetrics?: ImpactMetric[];
    kpiHighlight?: string;
    categories: string[];
    isUnderDevelopment?: boolean;
}

const projects: ProjectData[] = [
    {
        title: "Fulfix",
        categories: ["Web Apps & SaaS"],
        description:
            "Reduced RTO risk by 15% using AI-driven order confirmation. Engineered an automated validation system via WhatsApp and phone calls for Shopify and WordPress.",
        longDescription:
            "Fulfix is a sophisticated, AI-powered Order Confirmation System specifically tailored for the Pakistani e-commerce market. It solves the high RTO (Return to Origin) challenge by automating customer verification before fulfillment through intelligent WhatsApp and phone call workflows.\n\nKey capabilities include the AI TrustScore™, which uses Google Gemini and Llama 3 models via OpenRouter to predict delivery success by analyzing customer patterns. The system integrates deeply with Shopify and WordPress, replacing manual verification with high-reliability automation, while managing SaaS billing through Paddle and high-throughput communication via the Meta WhatsApp Business API.",
        stack: [
            "Next.js 15",
            "Supabase",
            "TypeScript",
            "Tailwind CSS 4",
            "OpenRouter (AI)",
            "TanStack Query/Table",
            "Upstash (Redis/QStash)",
            "Paddle",
            "WhatsApp Business API",
        ],
        videoUrl: "/videos/fulfix.mp4",
        isUnderDevelopment: true,
        kpiHighlight: "15% RTO Reduction",
        impactMetrics: [
            { label: "RTO Optimization", value: "15% Reduction" },
            { label: "Confirmation", value: "WhatsApp / Call" },
            { label: "Integrations", value: "Shopify / WordPress" },
        ],
    },
    {
        title: "ASAS Forge",
        categories: ["Web Apps & SaaS", "AI Agents & RAG Systems"],
        description:
            "Built a RAG-powered catalog search using Vercel AI SDK for 10k+ SKUs. Integrated jsPDF for automated, dynamic catalog generation.",
        longDescription:
            "ASAS Forge (formerly Shabbir & Sons) is a premium digital catalog and architectural hardware platform. It is designed to showcase precision-engineered stainless steel products—from luxury handles to glass fittings—for architects, builders, and designers.\n\nKey features include a state-of-the-art AI interface powered by the Vercel AI SDK and RAG (Retrieval-Augmented Generation), allowing users to find specific products or technical specs through conversational queries. The system includes an automated management suite for inventory, dynamic PDF catalog generation via jsPDF, and direct WhatsApp customer engagement, all built on a high-performance 'serverless-first' architecture.",
        stack: [
            "Next.js 15",
            "Supabase",
            "Vercel AI SDK",
            "TypeScript",
            "Tailwind CSS",
            "Framer Motion",
            "Shadcn UI",
            "OpenRouter (AI)",
            "jsPDF",
        ],
        videoUrl: "/videos/asas-forge.mp4",
        liveUrl: "https://asasforge.com",
        kpiHighlight: "1.2s RAG Response",
        impactMetrics: [
            { label: "Search Latency", value: "< 1.2 seconds" },
            { label: "Inventory Size", value: "10k+ SKUs" },
            { label: "Automation", value: "100% PDF Gen" },
        ],
    },
    {
        title: "Glow: Skin Intelligence System",
        categories: ["AI Agents & RAG Systems"],
        description:
            "Clinical-grade AI skincare recommendation engine. Engineered a Hybrid RAG pipeline with BullMQ and Redis for high-scale asynchronous reasoning.",
        longDescription:
            "Glow is a specialized Skin Intelligence Engine designed to transform skincare discovery from static search into a dynamic, expert-led consultation experience. The system delivers clinical-grade advice by combining dermatological nuance with high-scale AI orchestration.\n\nEngineering Highlights:\n- Deterministic State Machine: Orchestrates complex user profiling to programmatically extract skin types, environmental stressors, and localized concerns before initializing the AI reasoning loop.\n- Hybrid RAG Pipeline: Merges semantic vector search (via Supabase) with a logic-based ingredient matrix, ensuring recommendations are scientifically sound and validated against an ingredient synergy database.\n- Distributed Message Queue: Implemented BullMQ and Redis to handle complex LLM token generation and real-time product tagging asynchronously, maintaining sub-second response times even during high concurrent traffic.\n\nCore Objectives:\n- Scientific Profiling: Automated analysis of oiliness, sensitivity, and pH balance metrics.\n- Intelligence Injection: Proprietary tagging system for instant product linking within AI responses.\n- Ingredient Synergy: Personalized routine building based on deep chemical-level compatibility.",
        stack: [
            "Next.js 16",
            "Tailwind CSS 4",
            "Supabase Vector",
            "OpenRouter",
            "BullMQ",
            "TypeScript",
            "Redis",
        ],
        videoUrl: "/videos/glow.mp4",
        liveUrl: "https://nglow.co",
        kpiHighlight: "85% Recommendation Accuracy",
        impactMetrics: [
            { label: "Accuracy", value: "85% Mapping Precision" },
            { label: "Processing", value: "BullMQ / Redis" },
            { label: "Latency", value: "Sub-second Responses" },
        ],
    },
    {
        title: "EchoHarvest",
        categories: ["Automation & Scraping"],
        description:
            "Orchestrated a serverless Playwright swarm on Docker for large-scale data harvesting. Implemented 'Ghost Protocol' for bot evasion.",
        longDescription:
            "EchoHarvest is an industrial-grade distributed data infrastructure designed to solve the 'Scale vs. Quality' dilemma in web scraping.\n\nUnlike simple scripts, it uses a 'Serverless-Vessel' architecture where a Next.js Orchestrator commands a swarm of Dockerized Playwright workers (hosted on Hetzner for ~$5/mo). It features a 'Ghost Protocol' for anti-bot evasion, Zod schema validation for strict data integrity, and integrates the Serper API (Google Search) for autonomous target discovery. The system achieves 99.9% success rates on complex e-commerce and real estate platforms.",
        stack: [
            "Next.js 15",
            "Playwright",
            "Serper API",
            "Redis (Upstash)",
            "Docker",
            "Zod",
            "Supabase",
        ],
        videoUrl: "/videos/echo-harvest.mp4",
        isUnderDevelopment: true,
        kpiHighlight: "99.9% Success Rate",
        impactMetrics: [
            { label: "Downtime", value: "0.01%" },
            { label: "Bot Evasion", value: "Ghost Protocol" },
            { label: "Infrastructure", value: "Docker Swarm" },
        ],
    },
    {
        title: "Solviq",
        categories: ["UI/UX & Design"],
        description:
            "Premium brand presence and digital interface for a software product house. Focused on high-conversion storytelling and high-fidelity UI animations.",
        longDescription:
            "Solviq is a high-end digital platform engineered for a software product house. The project focuses on bridging the gap between complex engineering and human-centric design.\n\nHighlights include a bespoke GSAP-powered animation engine for scroll-based storytelling, a custom glassmorphism component library, and a dark-optimized typography system. The architecture uses Next.js for sub-second page loads and Framer Motion for micro-interactions, ensuring a premium user experience that reflects the technical excellence of the product house.",
        stack: [
            "Next.js 15",
            "Tailwind CSS 4",
            "GSAP",
            "Framer Motion",
            "TypeScript",
            "Lenis Scroll",
        ],
        videoUrl: "/videos/solviq.mp4",
        liveUrl: "https://solviqai.com",
        kpiHighlight: "98 Lighthouse Design Score",
        impactMetrics: [
            { label: "Performance", value: "99/100" },
            { label: "Design Score", value: "98/100" },
            { label: "Interactions", value: "GSAP / Framer" },
        ],
    },
];

function Slide({
    project,
    index,
    onOpen,
}: {
    project: ProjectData;
    index: number;
    onOpen: () => void;
}) {
    const { playHover, playClick } = useUiSounds();
    const num = String(index + 1).padStart(2, "0");

    return (
        <div className="min-w-[100vw] h-full flex items-center justify-center px-5 md:px-[6vw] relative">
            {/* giant outlined index behind the card */}
            <span
                aria-hidden="true"
                className="absolute left-2 md:left-10 bottom-2 md:bottom-6 font-display font-bold text-[34vh] leading-none text-stroke select-none pointer-events-none z-0"
            >
                {num}
            </span>

            <div
                data-cursor="OPEN"
                onClick={() => {
                    playClick();
                    onOpen();
                }}
                onMouseEnter={() => playHover()}
                className="group relative z-10 w-full max-w-6xl h-[58vh] md:h-[66vh] hairline bg-[var(--panel)] overflow-hidden cursor-pointer"
            >
                {/* media */}
                <div className="absolute inset-0">
                    {project.videoUrl ? (
                        <video
                            src={project.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover opacity-40 grayscale-[35%] group-hover:opacity-70 group-hover:grayscale-0 transition-all duration-700"
                        />
                    ) : (
                        <div className="w-full h-full bg-[var(--panel)]" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-[#070707]/50 to-transparent" />
                </div>

                {/* top meta row */}
                <div className="absolute top-0 inset-x-0 flex items-center justify-between p-5 md:p-8">
                    <span className="label text-[var(--muted)]">
                        {num} / {project.categories[0]}
                    </span>
                    <div className="flex items-center gap-3">
                        {project.isUnderDevelopment && (
                            <span className="label text-[var(--signal)] flex items-center gap-2">
                                <span className="h-[5px] w-[5px] rounded-full bg-[var(--signal)] pulse-dot" />
                                IN DEVELOPMENT
                            </span>
                        )}
                        {project.kpiHighlight && (
                            <span className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.14em] bg-[var(--acid)] text-[#070707] px-3 py-1.5">
                                {project.kpiHighlight}
                            </span>
                        )}
                    </div>
                </div>

                {/* bottom content */}
                <div className="absolute bottom-0 inset-x-0 p-5 md:p-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div className="max-w-xl">
                        <h3 className="font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-[0.95] text-[var(--ink)] mb-4 group-hover:text-[var(--acid)] transition-colors duration-300">
                            {project.title.split(":")[0]}
                        </h3>
                        <p className="text-[var(--muted)] text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                            {project.description}
                        </p>
                        <p className="font-mono text-[10px] tracking-[0.08em] text-[var(--dim)] uppercase">
                            {project.stack.slice(0, 4).join(" / ")}
                        </p>
                    </div>

                    <div className="flex items-center gap-5 shrink-0">
                        <span className="label-lg text-[var(--ink)] border-b border-[var(--acid)] pb-1 flex items-center gap-2 group-hover:text-[var(--acid)] transition-colors">
                            OPEN CASE STUDY
                            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </span>
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="VISIT"
                                onClick={(e) => e.stopPropagation()}
                                className="p-3 hairline text-[var(--muted)] hover:text-[#070707] hover:bg-[var(--acid)] hover:border-[var(--acid)] transition-colors"
                            >
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

function Counter({ progress, total }: { progress: MotionValue<number>; total: number }) {
    const [current, setCurrent] = useState(1);
    useMotionValueEvent(progress, "change", (v) => {
        const next = Math.min(total, Math.max(1, Math.round(v * (total - 1)) + 1));
        setCurrent(next);
    });
    return (
        <span className="font-display font-bold text-2xl md:text-3xl text-[var(--ink)] tabular-nums">
            {String(current).padStart(2, "0")}
            <span className="text-[var(--dim)] text-base md:text-lg"> / {String(total).padStart(2, "0")}</span>
        </span>
    );
}

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    // "start start" → "end end" maps progress 0→1 to exactly the pinned
    // window, so the horizontal track travels its full distance while the
    // section is stuck to the viewport (all cards visible, none wasted on
    // the enter/leave phases).
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });
    // Translate in explicit viewport units (each slide is min-w-[100vw]) so the
    // distance is unambiguous — a % translate resolves against the flex track's
    // own box width (~100vw), which stalls the track after a card or two.
    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0vw", `-${(projects.length - 1) * 100}vw`]
    );

    return (
        <section
            id="work"
            ref={sectionRef}
            className="relative"
            style={{ height: `${projects.length * 100}vh` }}
        >
            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                {/* header */}
                <div className="flex items-end justify-between px-6 md:px-12 lg:px-20 pt-24 md:pt-28 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-3">
                            <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                            <ScrambleText text="CH.03 — SELECTED WORK" className="label" />
                        </div>
                        <h2 className="font-display font-bold text-3xl md:text-5xl leading-none text-[var(--ink)]">
                            Deployed <em className="font-serif-it font-normal text-[var(--acid)]">systems</em>
                        </h2>
                    </div>
                    <Counter progress={scrollYProgress} total={projects.length} />
                </div>

                {/* horizontal track */}
                <div className="flex-1 relative">
                    <motion.div style={{ x }} className="flex h-full will-change-transform">
                        {projects.map((project, i) => (
                            <Slide
                                key={project.title}
                                project={project}
                                index={i}
                                onOpen={() => {
                                    setSelectedProject(project);
                                    setIsModalOpen(true);
                                }}
                            />
                        ))}
                    </motion.div>
                </div>

                {/* progress rail */}
                <div className="px-6 md:px-12 lg:px-20 py-6 flex items-center gap-6">
                    <span className="label hidden md:block shrink-0">KEEP SCROLLING</span>
                    <div className="h-px flex-1 bg-[var(--line)] overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--acid)] origin-left"
                            style={{ scaleX: scrollYProgress }}
                        />
                    </div>
                    <span className="label hidden md:block shrink-0">CASE STUDIES OPEN ON CLICK</span>
                </div>
            </div>

            <ProjectModal
                project={selectedProject as any}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
