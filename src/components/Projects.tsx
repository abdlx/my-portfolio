"use client";
import React, { useState } from "react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { Paintbrush } from "lucide-react";
import { ProjectModal } from "./ProjectModal";

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
            "Agency-Grade Order Management System (OMS) for the Pakistani market, featuring AI-driven RTO risk analysis and deep courier integrations.",
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
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 relative group/image">
                        <img
                            src="/projects/fulfix.png"
                            alt="Fulfix Dashboard"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
    {
        title: "ASAS Forge",
        description:
            "High-end digital catalog and architectural hardware platform for precision stainless steel products, featuring Generative AI search.",
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
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group/image">
                        <img
                            src="/projects/asas-forge.png"
                            alt="ASAS Forge Dashboard"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
    {
        title: "Arsalan Malik (Pitch)",
        description:
            "A proactive redesign of a premier crypto mentorship platform, featuring interactive Spline 3D assets and AI-enhanced mentorship tools.",
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
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group/image relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
                        <img
                            src="/projects/arsalan-malik.png"
                            alt="Arsalan Malik Concept"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
    {
        title: "EchoHarvest",
        description:
            "Distributed data intelligence engine capable of harvesting market insights from 10k+ sources via a serverless swarm.",
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
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group/image relative">
                        <div className="absolute inset-0 bg-emerald-500/10 mix-blend-overlay" />
                        <img
                            src="/projects/Echo-Harvest.png"
                            alt="EchoHarvest Dashboard"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
];

export function Projects() {
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleProjectClick = (project: ProjectData) => {
        setSelectedProject(project);
        setIsModalOpen(true);
    };

    return (
        <section id="projects" className="w-full bg-black py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        Deployed <span className="text-indigo-500">Systems</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        Production-ready projects that solve real problems
                    </p>
                </div>

                {/* Bento Grid - Standard 2-column layout */}
                <BentoGrid className="max-w-5xl mx-auto md:grid-cols-2 md:auto-rows-auto gap-8">
                    {projects.map((project) => (
                        <BentoGridItem
                            key={project.title}
                            title={project.title}
                            onClick={() => handleProjectClick(project)}
                            description={
                                <div className="space-y-3">
                                    <p>{project.description}</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.stack.slice(0, 3).map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                        {project.stack.length > 3 && (
                                            <span className="text-xs text-neutral-500 font-mono">
                                                +{project.stack.length - 3} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            }
                            header={project.header}
                            icon={project.icon}
                            className={project.className}
                        />
                    ))}
                </BentoGrid>
            </div>

            <ProjectModal
                project={selectedProject as any}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    );
}
