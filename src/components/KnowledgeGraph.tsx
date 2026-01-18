"use client";
import React from "react";
import { IconCloud } from "@/components/ui/icon-cloud";

const slugs = [
    "typescript",
    "javascript",
    "react",
    "html5",
    "css3",
    "nodedotjs",
    "nextdotjs",
    "prisma",
    "amazonaws",
    "postgresql",
    "nginx",
    "docker",
    "git",
    "python",
    "supabase",
    "openai",
];

export function KnowledgeGraph() {
    return (
        <section id="knowledge-graph" className="py-32 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        The <span className="text-indigo-500">Arsenal</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        A neural network of technologies I use to build robust systems
                    </p>
                </div>

                <div className="relative flex size-full items-center justify-center">
                    <IconCloud iconSlugs={slugs} />
                </div>
            </div>
        </section>
    );
}
