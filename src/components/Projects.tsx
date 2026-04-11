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
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    icon?: React.ReactNode;
    className?: string;
    header?: React.ReactNode;
    impactMetrics?: ImpactMetric[];
    kpiHighlight?: string;
}

const projects: ProjectData[] = [
    {
        title: "Fulfix",
        description:
            "Reduced RTO risk by 15% using Llama 3 address scoring. Engineered a unified OMS with Shopify and multi-courier API integrations.",
        longDescription:
            "Fulfix is a sophisticated, multi-service 'Agency-Grade' Order Management System (OMS) specifically tailored for the Pakistani e-commerce market. It uses a modern, high-performance tech stack focused on scalability, real-time analytics, and AI integration.\n\nKey capabilities include the AI TrustScore™, which uses Google Gemini and Llama 3 models via OpenRouter to predict delivery success by scanning customer addresses and phone numbers. The system integrates deeply with Shopify, WooCommerce, and local couriers like TCS, Leopards, and BlueEx, while managing SaaS billing through Paddle and automated customer communication via the Meta WhatsApp Business API.",
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
        image: "/projects/fulfix.png",
        liveUrl: "https://fulfix.pk",
        kpiHighlight: "15% RTO Reduction",
        impactMetrics: [
            { label: "RTO Optimization", value: "15% Reduction" },
            { label: "Order Volume", value: "$10k+ processed" },
            { label: "Address Scans", value: "5000+ daily" },
        ],
    },
    {
        title: "ASAS Forge",
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
        image: "/projects/asas-forge.png",
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
        description:
            "High-precision AI recommendation engine for clinical-grade skincare. Engineered a Hybrid RAG pipeline with BullMQ/Redis for asynchronous token processing.",
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
        image: "/projects/glow.png",
        kpiHighlight: "85% Recommendation Accuracy",
        impactMetrics: [
            { label: "Accuracy", value: "85% Mapping Precision" },
            { label: "Processing", value: "BullMQ / Redis" },
            { label: "Latency", value: "Sub-second Responses" },
        ],
    },
    {
        title: "EchoHarvest",
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
        image: "/projects/Echo-Harvest.png",
        githubUrl: "https://github.com/abdlx",
        kpiHighlight: "99.9% Success Rate",
        impactMetrics: [
            { label: "Downtime", value: "0.01%" },
            { label: "Bot Evasion", value: "Ghost Protocol" },
            { label: "Infrastructure", value: "Docker Swarm" },
        ],
    },
];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectClick = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    const bentoData = [
        ...projects.map((p) => ({
            title: p.title,
            description: p.description,
            label: "Deployed System",
            color: "#000000",
            onClick: () => handleProjectClick(p),
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl
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
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        High-performance AI infrastructures and production-grade applications
                    </p>
                </div>

                {/* Magic Bento Integration */}
                <div className="flex justify-center w-full">
                    <MagicBento
                        textAutoHide={true}
                        enableStars
                        enableSpotlight
                        enableBorderGlow={true}
                        enableTilt={true}
                        enableMagnetism={true}
                        clickEffect
                        spotlightRadius={400}
                        particleCount={12}
                        glowColor="45, 212, 191"
                        disableAnimations={false}
                        cardData={bentoData}
                    />
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
