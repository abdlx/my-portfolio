"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useBooted } from "@/components/fx/Preloader";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { Magnetic } from "@/components/fx/Magnetic";
import { useUiSounds } from "@/hooks/useUiSounds";

const GLSLHills = dynamic(() => import("@/components/ui/glsl-hills").then(mod => mod.GLSLHills), {
    ssr: false,
    loading: () => <div className="absolute inset-0 bg-[#070707]" />,
});

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** A headline word whose letters jump when the pointer grazes them. */
function LiveWord({ word, className }: { word: string; className?: string }) {
    return (
        <span className={className} aria-label={word}>
            {word.split("").map((ch, i) => (
                <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block will-change-transform"
                    whileHover={{ y: -14, color: "var(--acid)", transition: { type: "spring", stiffness: 500, damping: 12 } }}
                >
                    {ch}
                </motion.span>
            ))}
        </span>
    );
}

function KarachiClock() {
    const [time, setTime] = useState("--:--:--");
    useEffect(() => {
        const update = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Karachi",
                }).format(new Date())
            );
        update();
        const id = setInterval(update, 1000);
        return () => clearInterval(id);
    }, []);
    return <span className="tabular-nums">{time}</span>;
}

export function Hero() {
    const booted = useBooted();
    const { playHover, playClick } = useUiSounds();
    const sectionRef = useRef<HTMLElement>(null);

    // parallax exit — content drifts up and dissolves as you leave
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });
    const contentY = useTransform(scrollYProgress, [0, 1], [0, -160]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
    const hillsOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.15]);

    const lineReveal = (delay: number) => ({
        initial: { y: "112%" },
        animate: booted ? { y: 0 } : { y: "112%" },
        transition: { duration: 1, ease: EASE, delay },
    });

    return (
        <section
            id="home"
            ref={sectionRef}
            className="relative min-h-[100svh] w-full overflow-hidden flex flex-col"
        >
            {/* WebGL terrain, dimmed into the canvas */}
            <motion.div className="absolute inset-0 opacity-60" style={{ opacity: hillsOpacity }}>
                <GLSLHills />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#070707_85%)]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070707] to-transparent" />
            </motion.div>

            <motion.div
                style={{ y: contentY, opacity: contentOpacity }}
                className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-28 pb-24"
            >
                {/* status line */}
                <motion.a
                    href="https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={() => playHover()}
                    onClick={() => playClick()}
                    data-cursor="OPEN"
                    initial={{ opacity: 0 }}
                    animate={booted ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="inline-flex w-fit items-center gap-3 mb-8 md:mb-12 group"
                >
                    <span className="h-[6px] w-[6px] rounded-full bg-[var(--acid)] pulse-dot" />
                    <ScrambleText
                        text="OPEN TO WORK — REMOTE / WORLDWIDE"
                        trigger="mount"
                        delay={400}
                        className="label text-[var(--muted)] group-hover:text-[var(--acid)] transition-colors"
                    />
                    <ArrowUpRight className="h-3 w-3 text-[var(--dim)] group-hover:text-[var(--acid)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </motion.a>

                {/* headline */}
                <h1 className="font-display font-bold leading-[0.92] tracking-[-0.04em] text-[var(--ink)] text-[15.5vw] md:text-[11.5vw]">
                    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                        <motion.span className="block" {...lineReveal(0.1)}>
                            <LiveWord word="I" />&nbsp;<LiveWord word="BUILD" />
                            <span className="hidden md:inline-block align-super ml-6 label text-[var(--dim)] tracking-[0.28em]">
                                (EST. 2021)
                            </span>
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                        <motion.span className="block" {...lineReveal(0.22)}>
                            <LiveWord word="SOFTWARE" />
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.12em]">
                        <motion.span className="block" {...lineReveal(0.34)}>
                            <LiveWord word="THAT" />&nbsp;
                            <em className="font-serif-it font-normal text-[var(--acid)] tracking-normal">
                                thinks.
                            </em>
                        </motion.span>
                    </span>
                </h1>

                {/* sub row */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
                    transition={{ delay: 0.55, duration: 0.8, ease: EASE }}
                    className="mt-8 md:mt-12 flex flex-col md:flex-row md:items-end md:justify-between gap-8"
                >
                    <div className="max-w-md">
                        <p className="label-lg text-[var(--acid)] mb-4">
                            FULL-STACK ENGINEER × AI PIPELINE ARCHITECT
                        </p>
                        <p className="text-[var(--muted)] text-base md:text-lg leading-relaxed">
                            The gap between demo and production is engineering.
                            I close it — wiring LLMs, data and interfaces into
                            systems that survive real users.
                        </p>
                    </div>

                    <div className="flex items-center gap-4">
                        <Magnetic>
                            <a
                                href="#work"
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                                data-cursor="GO"
                                className="group inline-flex items-center gap-3 bg-[var(--acid)] text-[#070707] font-mono text-xs font-bold uppercase tracking-[0.18em] px-7 py-4 hover:bg-[var(--ink)] transition-colors"
                            >
                                See the work
                                <ArrowDown className="h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
                            </a>
                        </Magnetic>
                        <Magnetic>
                            <a
                                href="#contact"
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                                className="inline-flex items-center gap-3 hairline text-[var(--ink)] font-mono text-xs uppercase tracking-[0.18em] px-7 py-4 hover:border-[var(--acid)] hover:text-[var(--acid)] transition-colors"
                            >
                                Start a project
                            </a>
                        </Magnetic>
                    </div>
                </motion.div>
            </motion.div>

            {/* bottom HUD row */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={booted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                className="relative z-10 hairline-t mx-6 md:mx-12 lg:mx-20 py-4 flex items-center justify-between gap-4"
            >
                <span className="label hidden sm:block">24.86°N / 67.00°E — KARACHI</span>
                <span className="label flex items-center gap-2">
                    SCROLL TO INITIALIZE
                    <span className="inline-block h-3 w-px bg-[var(--acid)] blink" />
                </span>
                <span className="label hidden sm:block">
                    LOCAL <KarachiClock /> GMT+5
                </span>
            </motion.div>
        </section>
    );
}
