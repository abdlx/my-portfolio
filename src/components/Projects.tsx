"use client";
import React, { useState, useRef } from "react";
import { ProjectModal } from "./ProjectModal";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowRight, Zap, Play } from "lucide-react";
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
    icon?: React.ReactNode;
    className?: string;
    header?: React.ReactNode;
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

const categories = [
    "All",
    "AI Agents & RAG Systems",
    "Web Apps & SaaS",
    "Automation & Scraping",
    "UI/UX & Design",
];

const ProjectCard = ({ project, onClick }: { project: ProjectData, onClick: () => void }) => {
    const { playHover, playClick } = useUiSounds();

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -5 }}
            onClick={() => {
                playClick();
                onClick();
            }}
            onMouseEnter={() => playHover()}
            className="group relative w-full h-full rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-neutral-900/50 backdrop-blur-sm"
        >
            {/* Background Media */}
            <div className="absolute inset-0 z-0">
                {project.videoUrl ? (
                    <video
                        src={project.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-700"
                    />
                ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-800 to-neutral-950 opacity-40" />
                )}
                {/* Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <div className="flex gap-2">
                            {project.categories.slice(0, 1).map(cat => (
                                <span key={cat} className="px-3 py-1 rounded-full bg-white/10 border border-white/10 text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
                                    {cat}
                                </span>
                            ))}
                        </div>
                        <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                            {project.title}
                        </h3>
                    </div>

                    {project.kpiHighlight && (
                        <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                            <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-mono block mb-0.5 opacity-60">Impact</span>
                            <span className="text-lg font-bold text-white tabular-nums">{project.kpiHighlight}</span>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="space-y-6">
                        <p className="text-neutral-400 text-lg leading-relaxed max-w-lg line-clamp-3 md:line-clamp-none">
                            {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {project.stack.slice(0, 4).map(tech => (
                                <span key={tech} className="text-[11px] font-mono text-neutral-500">
                                    // {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-6 pt-4">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                            >
                                View Case Study
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </motion.button>

                            <div className="flex gap-4">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="p-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all"
                                    >
                                        <Github className="w-5 h-5" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="hidden md:flex flex-col items-end gap-4 opacity-40 group-hover:opacity-100 transition-opacity">
                        <div className="w-32 h-32 rounded-full border border-white/10 flex items-center justify-center relative">
                            <Play className="w-8 h-8 text-white fill-white ml-1" />
                            <div className="absolute inset-0 rounded-full border border-white/20 animate-ping" />
                        </div>
                    </div>
                </div>
            </div>

            {project.isUnderDevelopment && (
                <div className="absolute top-6 right-6 z-30">
                    <span className="px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-[10px] font-mono uppercase tracking-widest text-amber-500 backdrop-blur-md">
                        System Optimizing...
                    </span>
                </div>
            )}
        </motion.div>
    );
};

const ProgressIndicator = ({ i, total, scrollYProgress }: { i: number, total: number, scrollYProgress: any }) => {
    const scaleX = useTransform(
        scrollYProgress,
        [i / total, (i + 1) / total],
        [0, 1],
        { clamp: true }
    );

    return (
        <div className="h-1 w-8 md:w-12 rounded-full bg-white/10 overflow-hidden">
            <motion.div
                className="h-full bg-teal-500"
                style={{
                    scaleX,
                    transformOrigin: "left"
                }}
            />
        </div>
    );
};

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const sectionRef = useRef<HTMLDivElement>(null);

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.categories.includes(activeCategory));

    const { scrollYProgress } = useScroll({
        target: sectionRef,
    });

    const x = useTransform(
        scrollYProgress,
        [0, 1],
        ["0%", `-${((filteredProjects.length - 1) / filteredProjects.length) * 100}%`]
    );

    const handleProjectClick = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section
            id="projects"
            ref={sectionRef}
            className="relative bg-black w-full"
            style={{ height: `${filteredProjects.length * 100}vh` }}
        >
            {/* Vertical Snap Points */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {filteredProjects.map((_, i) => (
                    <div key={i} className="h-screen w-full snap-start" />
                ))}
            </div>

            <div className="sticky top-0 h-screen flex flex-col overflow-hidden">
                {/* Header Container - Simplified without tabs */}
                <div className="w-full px-4 md:px-8 pt-12 md:pt-16 pb-8 z-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl md:text-6xl font-bold text-white font-mono mb-2">
                            Deployed <span className="heading-highlight">Systems</span>
                        </h2>
                        <p className="text-neutral-500 text-base md:text-lg max-w-xl">
                            High-performance AI infrastructures and production-grade applications.
                        </p>
                    </div>
                </div>

                {/* Main Content Area: Slider + Vertical Tabs */}
                <div className="flex-1 relative flex items-center pr-8 md:pr-[20vw]">
                    {/* Vertical Category Tabs (Right Side) */}
                    <div className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3 items-end">
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-neutral-600 rotate-90 translate-y-16 translate-x-12 mb-20 opacity-50">
                            Sector_Filter
                        </span>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => {
                                    setActiveCategory(cat);
                                    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }}
                                className={`px-5 py-2.5 rounded-full text-[10px] md:text-xs font-bold transition-all duration-300 border uppercase tracking-wider whitespace-nowrap ${activeCategory === cat
                                    ? "bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)] scale-105"
                                    : "bg-white/5 border-white/10 text-neutral-500 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Horizontal Slider */}
                    <motion.div
                        style={{ x }}
                        className="flex items-center"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project) => (
                                <div
                                    key={project.title}
                                    className="min-w-[100vw] flex justify-center px-4 md:px-[5vw] lg:px-[8vw]"
                                >
                                    <div className="w-full max-w-6xl h-[55vh] md:h-[65vh]">
                                        <ProjectCard
                                            project={project}
                                            onClick={() => handleProjectClick(project)}
                                        />
                                    </div>
                                </div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {/* Progress Indicators */}
                <div className="w-full py-8 md:py-12 flex justify-center z-50">
                    <div className="flex gap-3 md:gap-4">
                        {filteredProjects.map((_, i) => (
                            <ProgressIndicator
                                key={i}
                                i={i}
                                total={filteredProjects.length}
                                scrollYProgress={scrollYProgress}
                            />
                        ))}
                    </div>
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
