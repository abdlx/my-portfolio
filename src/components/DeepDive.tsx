"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/fx/ScrambleText";

/* ------------------------------------------------------------------ */
/* Manifesto — pinned chapter where the thesis decodes word by word    */
/* as you scroll. The scroll is the animation.                         */
/* ------------------------------------------------------------------ */

type Token = { t: string; em?: boolean; strong?: boolean };

const MANIFESTO: Token[] = [
    { t: "Anyone" }, { t: "can" }, { t: "demo" }, { t: "AI." },
    { t: "Shipping", strong: true }, { t: "it" }, { t: "is" }, { t: "a" },
    { t: "different" }, { t: "sport." },
    { t: "I" }, { t: "design" }, { t: "the" }, { t: "pipelines," },
    { t: "guardrails" }, { t: "and" }, { t: "interfaces" },
    { t: "that" }, { t: "turn" }, { t: "a" }, { t: "model's" },
    { t: "maybe", em: true }, { t: "into" }, { t: "a" }, { t: "product's" },
    { t: "yes", em: true }, { t: "—" },
    { t: "measured," }, { t: "fast," }, { t: "and" }, { t: "boring" },
    { t: "where" }, { t: "it" }, { t: "matters.", strong: true },
];

const PHASES = [
    { at: 0.05, label: "PHASE 01 — PARSE INTENT" },
    { at: 0.38, label: "PHASE 02 — DESIGN THE SYSTEM" },
    { at: 0.72, label: "PHASE 03 — SHIP TO PRODUCTION" },
];

function Word({
    token,
    index,
    total,
    progress,
}: {
    token: Token;
    index: number;
    total: number;
    progress: MotionValue<number>;
}) {
    const start = (index / total) * 0.78;
    const end = start + 0.05;
    const opacity = useTransform(progress, [start, end], [0.1, 1]);
    const y = useTransform(progress, [start, end], [8, 0]);

    return (
        <motion.span
            style={{ opacity, y }}
            className={cn(
                "inline-block will-change-transform mr-[0.28em]",
                token.em && "font-serif-it font-normal text-[var(--acid)] text-[1.15em]",
                token.strong && "text-[var(--acid)]"
            )}
        >
            {token.t}
        </motion.span>
    );
}

function PhaseLabel({
    phase,
    next,
    progress,
}: {
    phase: { at: number; label: string };
    next: number;
    progress: MotionValue<number>;
}) {
    const opacity = useTransform(
        progress,
        [phase.at, phase.at + 0.04, next - 0.05, next],
        [0, 1, 1, 0]
    );
    return (
        <motion.span style={{ opacity }} className="label text-[var(--acid)] absolute left-0 bottom-0">
            {phase.label}
        </motion.span>
    );
}

export function DeepDive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // finale terminal line
    const finaleOpacity = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);
    const finaleY = useTransform(scrollYProgress, [0.82, 0.92], [16, 0]);

    // watermark index drifts as you scroll
    const wmY = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);
    const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

    return (
        <section id="approach" ref={containerRef} className="relative h-[260vh]">
            <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12 lg:px-20">
                {/* watermark chapter number */}
                <motion.span
                    aria-hidden="true"
                    style={{ y: wmY }}
                    className="absolute -right-4 top-1/2 font-display font-bold text-[38vh] leading-none text-stroke select-none pointer-events-none"
                >
                    02
                </motion.span>

                {/* chapter label */}
                <div className="absolute top-24 md:top-28 left-6 md:left-12 lg:left-20 flex items-center gap-3">
                    <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                    <ScrambleText text="CH.02 — THE APPROACH" className="label" />
                </div>

                {/* manifesto */}
                <p className="relative z-10 max-w-5xl font-display font-medium text-[7.2vw] md:text-5xl lg:text-[3.6rem] leading-[1.18] text-[var(--ink)]">
                    {MANIFESTO.map((token, i) => (
                        <Word
                            key={i}
                            token={token}
                            index={i}
                            total={MANIFESTO.length}
                            progress={scrollYProgress}
                        />
                    ))}
                </p>

                {/* finale — the receipt */}
                <motion.p
                    style={{ opacity: finaleOpacity, y: finaleY }}
                    className="relative z-10 mt-10 font-mono text-xs md:text-sm text-[var(--muted)]"
                >
                    <span className="text-[var(--acid)]">$</span> deploy --prod
                    <span className="text-[var(--ink)] ml-3">✓ 200 OK</span>
                    <span className="inline-block h-3 w-[6px] bg-[var(--acid)] ml-2 blink align-middle" />
                </motion.p>

                {/* bottom HUD: phase indicator + progress rail */}
                <div className="absolute bottom-10 left-6 md:left-12 lg:left-20 right-6 md:right-12 lg:right-20">
                    <div className="relative h-4 mb-3">
                        {PHASES.map((phase, i) => (
                            <PhaseLabel
                                key={phase.label}
                                phase={phase}
                                next={PHASES[i + 1]?.at ?? 1.05}
                                progress={scrollYProgress}
                            />
                        ))}
                    </div>
                    <div className="h-px w-full bg-[var(--line)] overflow-hidden">
                        <motion.div
                            className="h-full bg-[var(--acid)] origin-left"
                            style={{ scaleX: barScale }}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
