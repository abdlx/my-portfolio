"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ProjectModal } from "./ProjectModal";
import MagicBento from "./MagicBento";

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
    },
    {
        title: "Arsalan Malik (Pitch)",
        description:
            "Engineered immersive Spline 3D environments with scroll-synced Framer Motion animations. Deployed custom AI mentorship agents.",
        longDescription:
            "This project is a proactive visual identity and platform overhaul for Arsalan Malik, a leading crypto/forex expert. The goal was to replace traditional financial web design with a 'state-of-the-art' immersive hub.\n\nKey highlights include a 'dark-mode-first' design language using Tailwind CSS v4 and OKLCH color spaces for a premium aesthetic. I integrated interactive Spline 3D environments to provide a tactile Web3 experience and developed complex, scroll-triggered animations using Framer Motion (including a 'Macbook Scroll' showcase). The platform also features an AI-enhanced UX via a custom Vercel AI SDK chat widget to handle user queries for his 10k+ community.",
        stack: [
            "Next.js 16",
            "Tailwind CSS 4",
            "Spline 3D",
            "Framer Motion",
            "Vercel AI SDK",
            "HeroUI",
            "TypeScript",
        ],
        image: "/projects/arsalan-malik.png",
        liveUrl: "https://crypto-guru-omega.vercel.app/",
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
        githubUrl: "https://github.com",
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
            color: "#060010",
            onClick: () => handleProjectClick(p),
            liveUrl: p.liveUrl,
            githubUrl: p.githubUrl
        })),
        {
            title: "Autonomous Agents",
            description: "Researching multi-agent orchestration for enterprise automation.",
            label: "Research",
            color: "#060010"
        },
        {
            title: "Next.js 16 Preview",
            description: "Exploring advanced React Server Component patterns and hydration tech.",
            label: "Learning",
            color: "#060010"
        }
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
                        enableTilt={false}
                        enableMagnetism={false}
                        clickEffect
                        spotlightRadius={400}
                        particleCount={12}
                        glowColor="132, 0, 255"
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
