"use client";

import React, { useEffect, useRef } from "react";
import {
    motion,
    animate,
    useInView,
    useMotionValue,
    useTransform,
} from "framer-motion";
import { SectionHeading, Em } from "@/components/fx/SectionHeading";

interface Stat {
    value: number;
    decimals?: number;
    prefix?: string;
    suffix?: string;
    label: string;
    note: string;
}

const STATS: Stat[] = [
    {
        value: 15,
        prefix: "−",
        suffix: "%",
        label: "RTO RISK",
        note: "AI address scoring on live e-commerce orders (Fulfix).",
    },
    {
        value: 1.2,
        decimals: 1,
        prefix: "<",
        suffix: "s",
        label: "RAG LATENCY",
        note: "Conversational answers across a 10k+ SKU hardware catalog.",
    },
    {
        value: 100,
        suffix: "k+",
        label: "DATA / MONTH",
        note: "Points harvested by a distributed Playwright swarm.",
    },
    {
        value: 99.9,
        decimals: 1,
        suffix: "%",
        label: "SWARM SUCCESS",
        note: "Job completion rate across scraping infrastructure.",
    },
];

function StatCell({ stat, index }: { stat: Stat; index: number }) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-15% 0px" });
    const mv = useMotionValue(0);
    const display = useTransform(mv, (v) => v.toFixed(stat.decimals ?? 0));

    useEffect(() => {
        if (inView) {
            const controls = animate(mv, stat.value, {
                duration: 1.8,
                ease: [0.22, 1, 0.36, 1],
                delay: index * 0.12,
            });
            return controls.stop;
        }
    }, [inView, mv, stat.value, index]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative p-6 md:p-10 hairline -ml-px -mt-px hover:bg-[var(--panel)] transition-colors duration-300"
        >
            <span className="label block mb-6 md:mb-10 group-hover:text-[var(--acid)] transition-colors">
                {stat.label}
            </span>
            <div className="font-display font-bold leading-none text-[var(--ink)] text-5xl md:text-7xl lg:text-8xl mb-4 whitespace-nowrap">
                {stat.prefix && <span className="text-[var(--acid)]">{stat.prefix}</span>}
                <motion.span className="tabular-nums">{display}</motion.span>
                {stat.suffix && (
                    <span className="text-[var(--acid)] text-3xl md:text-5xl align-baseline">{stat.suffix}</span>
                )}
            </div>
            <p className="text-[var(--muted)] text-xs md:text-sm leading-relaxed max-w-[26ch]">
                {stat.note}
            </p>
            <span
                aria-hidden="true"
                className="absolute top-4 right-4 h-[6px] w-[6px] bg-[var(--line)] group-hover:bg-[var(--acid)] transition-colors"
            />
        </motion.div>
    );
}

export function Metrics() {
    return (
        <section id="proof" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
            <SectionHeading index="04" label="PROOF" className="mb-14 md:mb-20">
                Numbers, <Em>not adjectives.</Em>
            </SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {STATS.map((stat, i) => (
                    <StatCell key={stat.label} stat={stat} index={i} />
                ))}
            </div>
        </section>
    );
}
