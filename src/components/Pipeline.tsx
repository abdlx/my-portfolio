"use client";

import React from "react";
import { motion } from "framer-motion";
import { InteractivePipeline } from "./InteractivePipeline";
import { ScrambleText } from "@/components/fx/ScrambleText";

/**
 * System map — the hands-on toy that closes chapter 02.
 * The ReactFlow diagram is fully draggable and re-wirable.
 */
export function Pipeline() {
    return (
        <section className="w-full py-24 md:py-32 px-6 md:px-12 lg:px-20">
            <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-center">
                {/* left — text */}
                <motion.div
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="space-y-6"
                >
                    <div className="flex items-center gap-3">
                        <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                        <ScrambleText text="SYSTEM MAP — HANDS ON" className="label" />
                    </div>
                    <h3 className="font-display font-bold text-3xl md:text-5xl leading-[1.02] text-[var(--ink)]">
                        Orchestrating{" "}
                        <em className="font-serif-it font-normal text-[var(--acid)]">chaos.</em>
                    </h3>
                    <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed max-w-md">
                        Modern apps aren&apos;t just databases anymore — they&apos;re
                        multi-agent systems. I wire the nervous system that connects
                        user intent to LLM logic to actual results.
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--dim)]">
                        ↳ This diagram is live. Drag the nodes. Re-wire the edges.
                    </p>
                </motion.div>

                {/* right — the toy */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                    className="relative hairline bg-[var(--panel)]/50 overflow-hidden"
                >
                    <InteractivePipeline />
                </motion.div>
            </div>
        </section>
    );
}
