"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading, Em } from "@/components/fx/SectionHeading";

interface Process {
    pid: string;
    task: string;
    tag: string;
    status: "RUNNING" | "IDLE" | "LOOPING";
}

const PROCESSES: Process[] = [
    { pid: "0x01", task: "Running Llama-3 locally on Ryzen 7 5850U", tag: "EDGE AI", status: "RUNNING" },
    { pid: "0x02", task: "Shipping Portfolio V3 — the one you're scrolling", tag: "META", status: "RUNNING" },
    { pid: "0x03", task: "Refurbishing dual Xeon X5670 workstation", tag: "HARDWARE", status: "IDLE" },
    { pid: "0x04", task: "Testing OpenAI Realtime API latency", tag: "RESEARCH", status: "RUNNING" },
    { pid: "0x05", task: "Multi-agent orchestration experiments", tag: "LANGGRAPH", status: "RUNNING" },
    { pid: "0x06", task: "Hardening Supabase RLS policies", tag: "SECURITY", status: "IDLE" },
    { pid: "0x07", task: "Phonk & funk carioca on loop", tag: "AUDIO", status: "LOOPING" },
];

const STATUS_COLOR: Record<Process["status"], string> = {
    RUNNING: "text-[var(--acid)]",
    IDLE: "text-[var(--muted)]",
    LOOPING: "text-[var(--signal)]",
};

export function Lab() {
    const listRef = useRef<HTMLDivElement>(null);
    const inView = useInView(listRef, { once: true, margin: "-15% 0px" });

    return (
        <section id="lab" className="relative py-28 md:py-40 px-6 md:px-12 lg:px-20">
            <SectionHeading index="06" label="BACKGROUND PROCESSES" className="mb-12 md:mb-16">
                Running <Em>right now.</Em>
            </SectionHeading>

            <div ref={listRef} className="hairline bg-[var(--panel)]/60 font-mono text-xs md:text-sm">
                {/* terminal chrome */}
                <div className="flex items-center justify-between px-4 md:px-6 py-3 hairline-b">
                    <span className="text-[var(--muted)]">abdullah@workstation ~ % ps -signal</span>
                    <span className="flex items-center gap-2 text-[var(--acid)]">
                        <span className="h-[6px] w-[6px] rounded-full bg-[var(--acid)] pulse-dot" />
                        LIVE
                    </span>
                </div>

                {/* process table */}
                <div>
                    {PROCESSES.map((proc, i) => (
                        <motion.div
                            key={proc.pid}
                            initial={{ opacity: 0, x: -12 }}
                            animate={inView ? { opacity: 1, x: 0 } : {}}
                            transition={{ delay: i * 0.12, duration: 0.4 }}
                            className="grid grid-cols-[auto_1fr_auto] md:grid-cols-[80px_1fr_140px_110px] items-center gap-3 md:gap-6 px-4 md:px-6 py-3.5 hairline-b last:border-b-0 hover:bg-[rgba(203,255,74,0.04)] transition-colors group"
                        >
                            <span className="text-[var(--dim)] tabular-nums">{proc.pid}</span>
                            <span className="text-[var(--ink)] truncate group-hover:text-[var(--acid)] transition-colors">
                                {proc.task}
                            </span>
                            <span className="label hidden md:block">{proc.tag}</span>
                            <span className={`${STATUS_COLOR[proc.status]} text-right tabular-nums`}>
                                ● {proc.status}
                            </span>
                        </motion.div>
                    ))}
                </div>

                {/* footer line */}
                <div className="px-4 md:px-6 py-3 text-[var(--muted)] flex items-center gap-2">
                    <span className="text-[var(--acid)]">$</span>
                    <span>systemctl status creativity — active (running) since 2021</span>
                    <span className="inline-block h-3 w-[6px] bg-[var(--acid)] blink" />
                </div>
            </div>
        </section>
    );
}
