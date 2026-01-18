"use client";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { CardContainer, CardItem } from "@/components/ui/3d-card";
import { Paintbrush } from "lucide-react";

const projects = [
    {
        title: "Fulfix",
        description:
            "The E-commerce Operating System. A SaaS for courier management and tracking with real-time updates and analytics.",
        stack: ["Next.js", "Supabase", "TypeScript"],
        icon: null,
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
        title: "Asas Forge",
        description:
            "High-conversion hardware storefront. Scaling sales in Karachi with optimized funnels and targeted advertising.",
        stack: ["Shopify", "Meta Ads"],
        icon: null,
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group/image">
                        <img
                            src="/projects/asas-forge.png"
                            alt="Sales performance chart"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
    {
        title: "Web Scrapers",
        description:
            "Automated data harvesting pipelines using Python & Puppeteer. Built for scale and reliability.",
        stack: ["Python", "Puppeteer", "PostgreSQL"],
        icon: null,
        className: "",
        header: (
            <CardContainer className="inter-var w-full h-full">
                <CardItem translateZ="50" className="w-full h-full">
                    <div className="w-full aspect-video rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 group/image">
                        <img
                            src="/projects/scraper.png"
                            alt="Code editor with scraping script"
                            className="w-full h-full object-cover opacity-60 group-hover/image:opacity-80 transition-opacity duration-500"
                        />
                    </div>
                </CardItem>
            </CardContainer>
        ),
    },
    {
        title: "Interior & Spatial Design",
        description:
            "Designing digital and physical spaces with precision. Blending technology with aesthetics for immersive experiences.",
        stack: ["3D Modeling", "Visualization"],
        icon: <Paintbrush className="h-5 w-5 text-rose-400" />,
        className: "",
        header: (
            <div className="w-full aspect-video rounded-xl bg-gradient-to-br from-rose-950 via-neutral-900 to-neutral-950 flex items-center justify-center">
                <Paintbrush className="h-16 w-16 text-rose-500 opacity-50" />
            </div>
        ),
    },
];

export function Projects() {
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
                            description={
                                <div className="space-y-3">
                                    <p>{project.description}</p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {project.stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-0.5 rounded text-xs font-mono bg-neutral-800 text-neutral-300 border border-neutral-700"
                                            >
                                                {tech}
                                            </span>
                                        ))}
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
        </section>
    );
}
