"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { SectionHeading, Em } from "@/components/fx/SectionHeading";
import { useUiSounds } from "@/hooks/useUiSounds";
import { cn } from "@/lib/utils";

interface Domain {
    id: string;
    name: string;
    blurb: string;
    tools: string[];
}

const DOMAINS: Domain[] = [
    {
        id: "01",
        name: "INTERFACE",
        blurb: "Interfaces that feel engineered, not decorated.",
        tools: ["Next.js 16", "React 19", "TypeScript", "Tailwind 4", "Framer Motion", "GSAP", "Three.js / WebGL", "Lenis"],
    },
    {
        id: "02",
        name: "INTELLIGENCE",
        blurb: "Pipelines that turn model output into product behavior.",
        tools: ["OpenAI", "OpenRouter", "Llama 3", "LangChain", "RAG Pipelines", "Vercel AI SDK", "pgvector", "Prompt Orchestration"],
    },
    {
        id: "03",
        name: "BACKBONE",
        blurb: "Boring-by-design backends that survive real traffic.",
        tools: ["Node.js", "Python", "Supabase", "PostgreSQL", "Redis", "BullMQ", "Stripe / Paddle", "WhatsApp Business API"],
    },
    {
        id: "04",
        name: "OPERATIONS",
        blurb: "Automation that keeps running while I sleep.",
        tools: ["Docker", "Playwright Swarms", "Vercel", "Hetzner", "Nginx", "Zod", "Upstash QStash", "GitHub Actions"],
    },
];

function DomainRow({
    domain,
    active,
    onActivate,
    onToggle,
}: {
    domain: Domain;
    active: boolean;
    onActivate: () => void;
    onToggle: () => void;
}) {
    const { playHover, playClick } = useUiSounds();

    return (
        <div
            className={cn(
                "hairline-t last:border-b border-[var(--line)] transition-colors duration-300",
                active ? "bg-[var(--acid)]" : "bg-transparent"
            )}
            onMouseEnter={() => {
                playHover();
                onActivate();
            }}
        >
            <button
                onClick={() => {
                    playClick();
                    onToggle();
                }}
                className="w-full flex items-center justify-between gap-4 px-2 md:px-6 py-6 md:py-8 text-left"
                aria-expanded={active}
            >
                <div className="flex items-baseline gap-4 md:gap-8 min-w-0">
                    <span
                        className={cn(
                            "font-mono text-xs tabular-nums shrink-0",
                            active ? "text-[#070707]" : "text-[var(--dim)]"
                        )}
                    >
                        {domain.id}
                    </span>
                    <span
                        className={cn(
                            "font-display font-bold text-3xl md:text-6xl leading-none tracking-normal truncate",
                            active ? "text-[#070707]" : "text-[var(--ink)]"
                        )}
                    >
                        {domain.name}
                    </span>
                </div>
                <div className="flex items-center gap-4 md:gap-8 shrink-0">
                    <span
                        className={cn(
                            "label hidden md:block",
                            active ? "text-[#070707]" : "text-[var(--dim)]"
                        )}
                    >
                        {String(domain.tools.length).padStart(2, "0")} TOOLS
                    </span>
                    <Plus
                        className={cn(
                            "h-5 w-5 md:h-6 md:w-6 transition-transform duration-300",
                            active ? "rotate-45 text-[#070707]" : "text-[var(--muted)]"
                        )}
                    />
                </div>
            </button>

            <AnimatePresence initial={false}>
                {active && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="px-2 md:px-6 pb-8 md:pl-[4.5rem]">
                            <p className="font-serif-it text-lg md:text-2xl text-[#070707]/80 mb-5 max-w-xl">
                                {domain.blurb}
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {domain.tools.map((tool, i) => (
                                    <motion.span
                                        key={tool}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.08 + i * 0.03 }}
                                        className="font-mono text-[10px] md:text-xs uppercase tracking-[0.12em] border border-[#070707]/30 text-[#070707] px-3 py-1.5"
                                    >
                                        {tool}
                                    </motion.span>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function KnowledgeGraph() {
    const [active, setActive] = useState<string | null>(null);

    return (
        <section id="arsenal" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
            <SectionHeading index="05" label="ARSENAL" className="mb-12 md:mb-16">
                Tools I <Em>trust</Em> in production.
            </SectionHeading>

            <div onMouseLeave={() => setActive(null)}>
                {DOMAINS.map((domain) => (
                    <DomainRow
                        key={domain.id}
                        domain={domain}
                        active={active === domain.id}
                        onActivate={() => setActive(domain.id)}
                        onToggle={() => setActive(active === domain.id ? null : domain.id)}
                    />
                ))}
            </div>

            <p className="label mt-8 text-[var(--dim)]">
                HOVER / TAP A DOMAIN TO DECOMPRESS IT
            </p>
        </section>
    );
}
