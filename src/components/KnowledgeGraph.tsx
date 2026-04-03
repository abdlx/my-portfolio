"use client";
import React from "react";
import LogoLoop from "./LogoLoop";
import { 
    SiReact, 
    SiNextdotjs, 
    SiTypescript, 
    SiTailwindcss, 
    SiNodedotjs, 
    SiPython, 
    SiSupabase, 
    SiOpenai, 
    SiPostgresql, 
    SiDocker, 
    SiFramer, 
    SiPrisma, 
    SiRedis, 
    SiShopify,
    SiVercel,
    SiTypescript as SiTs,
    SiJavascript,
    SiNginx
} from "react-icons/si";

const techLogos = [
    { node: <SiReact title="React" />, title: "React" },
    { node: <SiNextdotjs title="Next.js" />, title: "Next.js" },
    { node: <SiTs title="TypeScript" />, title: "TypeScript" },
    { node: <SiTailwindcss title="Tailwind CSS" />, title: "Tailwind CSS" },
    { node: <SiNodedotjs title="Node.js" />, title: "Node.js" },
    { node: <SiPython title="Python" />, title: "Python" },
    { node: <SiSupabase title="Supabase" />, title: "Supabase" },
    { node: <SiOpenai title="OpenAI" />, title: "OpenAI" },
    { node: <SiPostgresql title="PostgreSQL" />, title: "PostgreSQL" },
    { node: <SiDocker title="Docker" />, title: "Docker" },
    { node: <SiFramer title="Framer Motion" />, title: "Framer Motion" },
    { node: <SiPrisma title="Prisma" />, title: "Prisma" },
    { node: <SiRedis title="Redis" />, title: "Redis" },
    { node: <SiShopify title="Shopify" />, title: "Shopify" },
    { node: <SiVercel title="Vercel" />, title: "Vercel" },
    { node: <SiJavascript title="JavaScript" />, title: "JavaScript" },
    { node: <SiNginx title="Nginx" />, title: "Nginx" },
];

export function KnowledgeGraph() {
    return (
        <section id="knowledge-graph" className="py-32 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        The <span className="text-indigo-500">Stack</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        High-performance toolset used to architect scalable AI systems and production-grade applications.
                    </p>
                </div>

                <div className="relative w-full py-10">
                    <LogoLoop
                        logos={techLogos}
                        speed={50}
                        direction="left"
                        logoHeight={48}
                        gap={80}
                        scaleOnHover
                        fadeOut
                        fadeOutColor="#000000"
                        ariaLabel="Technology Stack"
                        className="text-neutral-500 hover:text-indigo-500 transition-colors duration-500"
                    />
                </div>
            </div>
        </section>
    );
}
