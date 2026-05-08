"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";
import MagicBento from "./MagicBento";

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

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState("All");

    const handleProjectClick = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const filteredProjects = activeCategory === "All"
        ? projects
        : projects.filter(p => p.categories.includes(activeCategory));

    const bentoData = [
        ...filteredProjects.map((p) => ({
            title: p.title,
            description: p.description,
            label: p.categories[0], // Display primary category as label
            color: "#000000",
            onClick: () => handleProjectClick(p),
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl,
            isUnderDevelopment: p.isUnderDevelopment
        })),
    ];

    return (
        <section id="projects" className="w-full bg-black py-32 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        Deployed <span className="heading-highlight">Systems</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto mb-12">
                        High-performance AI infrastructures and production-grade applications
                    </p>

                    {/* Category Tabs */}
                    <div className="flex flex-wrap justify-center gap-2 mb-12">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                                        ? "bg-teal-500/10 border-teal-500/50 text-teal-400 shadow-[0_0_20px_rgba(20,184,166,0.2)]"
                                        : "bg-white/5 border-white/10 text-neutral-400 hover:bg-white/10 hover:border-white/20"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Magic Bento Integration */}
                <div className="flex justify-center w-full min-h-[600px]">
                    {bentoData.length > 0 ? (
                        <MagicBento
                            textAutoHide={true}
                            enableSpotlight
                            enableBorderGlow={true}
                            enableTilt={false}
                            enableMagnetism={false}
                            clickEffect
                            spotlightRadius={400}
                            particleCount={12}
                            glowColor="45, 212, 191"
                            disableAnimations={false}
                            cardData={bentoData}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-neutral-500 font-mono">
                            <p>No systems deployed in this sector yet.</p>
                            <div className="mt-4 w-12 h-1px bg-neutral-800" />
                        </div>
                    )}
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
