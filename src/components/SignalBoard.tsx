"use client";

import React, { useRef, useState } from "react";
import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
    type MotionStyle,
} from "framer-motion";
import {
    BrainCircuit,
    Cpu,
    Database,
    Gauge,
    MousePointer2,
    ShieldCheck,
    Sparkles,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useUiSounds } from "@/hooks/useUiSounds";
import { cn } from "@/lib/utils";

type SignalStage = {
    id: string;
    title: string;
    short: string;
    description: string;
    stat: string;
    accent: string;
    icon: LucideIcon;
    chips: string[];
};

const STAGES: SignalStage[] = [
    {
        id: "01",
        title: "Capture",
        short: "Intent enters clean",
        description: "Raw requests, order data, product catalogs, and support context become structured signals the system can trust.",
        stat: "12 inputs",
        accent: "var(--cyan)",
        icon: MousePointer2,
        chips: ["Forms", "Chat", "Voice", "Events"],
    },
    {
        id: "02",
        title: "Reason",
        short: "Models stay useful",
        description: "LLMs, retrieval, scoring, and tool calls are boxed into deterministic paths instead of free-floating guesses.",
        stat: "4 loops",
        accent: "var(--acid)",
        icon: BrainCircuit,
        chips: ["RAG", "Agents", "Rules", "Eval"],
    },
    {
        id: "03",
        title: "Ship",
        short: "Real users touch it",
        description: "Queues, auth, billing, dashboards, and responsive interfaces turn the intelligence into product behavior.",
        stat: "99.9%",
        accent: "var(--rose)",
        icon: Cpu,
        chips: ["Queues", "UI", "Billing", "Ops"],
    },
    {
        id: "04",
        title: "Prove",
        short: "Impact stays visible",
        description: "Metrics, traces, client proof, and case studies show whether the system is actually moving the business.",
        stat: "live proof",
        accent: "var(--gold)",
        icon: Gauge,
        chips: ["KPIs", "Logs", "Replay", "ROI"],
    },
];

const NODE_POSITIONS = [
    { x: "18%", y: "26%" },
    { x: "48%", y: "18%" },
    { x: "76%", y: "36%" },
    { x: "64%", y: "72%" },
    { x: "28%", y: "70%" },
];

export function SignalBoard() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState<number | null>(null);
    const [pointer, setPointer] = useState({ x: 50, y: 50 });
    const { playHover, playClick } = useUiSounds();

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 32,
        mass: 0.2,
    });

    useMotionValueEvent(scrollYProgress, "change", (value) => {
        const next = Math.min(
            STAGES.length - 1,
            Math.max(0, Math.floor(value * STAGES.length))
        );
        setActiveIndex(next);
    });

    const selectedIndex = hoverIndex ?? activeIndex;
    const selected = STAGES[selectedIndex];
    const SelectedIcon = selected.icon;

    const boardRotate = useTransform(smoothProgress, [0, 1], [-7, 7]);
    const boardY = useTransform(smoothProgress, [0, 1], [26, -26]);
    const packetX = useTransform(smoothProgress, [0, 1], ["10%", "86%"]);
    const packetY = useTransform(
        smoothProgress,
        [0, 0.25, 0.5, 0.75, 1],
        ["26%", "18%", "36%", "72%", "70%"]
    );
    const sweepY = useTransform(smoothProgress, [0, 1], ["6%", "92%"]);
    const proofScale = useTransform(smoothProgress, [0, 1], [0.15, 1]);

    return (
        <section id="signal" ref={sectionRef} className="relative h-[390vh]">
            <div className="sticky top-0 min-h-[100svh] overflow-hidden px-5 py-20 md:px-12 md:py-24 lg:h-screen lg:px-20">
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-[var(--acid)]"
                    style={{ scaleX: smoothProgress, transformOrigin: "left" }}
                />

                <div className="relative z-10 grid h-full w-full items-center gap-7 lg:grid-cols-[0.85fr_1.35fr_0.82fr] lg:gap-10">
                    <div className="max-w-xl">
                        <div className="mb-5 flex items-center gap-3">
                            <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                            <ScrambleText text="CH.02B - SIGNAL BOARD" className="label" />
                        </div>
                        <h2 className="font-display text-5xl font-bold leading-[0.98] text-[var(--ink)] sm:text-6xl lg:text-7xl">
                            A portfolio that behaves like the systems I build.
                        </h2>
                        <p className="mt-6 max-w-md text-base leading-relaxed text-[var(--muted)] md:text-lg">
                            The page is not a brochure. It is a working model: signals enter,
                            intelligence routes them, the interface responds, and proof closes
                            the loop.
                        </p>

                        <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden hairline bg-[var(--line)]">
                            {STAGES.map((stage, index) => {
                                const Icon = stage.icon;
                                const isActive = selectedIndex === index;
                                return (
                                    <button
                                        key={stage.id}
                                        type="button"
                                        onMouseEnter={() => {
                                            playHover();
                                            setHoverIndex(index);
                                        }}
                                        onMouseLeave={() => setHoverIndex(null)}
                                        onClick={() => {
                                            playClick();
                                            setActiveIndex(index);
                                        }}
                                        data-cursor="TUNE"
                                        className={cn(
                                            "group min-h-24 bg-[#070707] p-4 text-left transition-colors duration-300",
                                            isActive && "bg-[var(--ink)] text-[#070707]"
                                        )}
                                        aria-pressed={isActive}
                                    >
                                        <div className="mb-4 flex items-center justify-between gap-3">
                                            <span
                                                className={cn(
                                                    "font-mono text-[10px] tabular-nums text-[var(--dim)]",
                                                    isActive && "text-[#070707]/55"
                                                )}
                                            >
                                                {stage.id}
                                            </span>
                                            <Icon
                                                className={cn(
                                                    "h-4 w-4 text-[var(--muted)] transition-colors",
                                                    isActive && "text-[#070707]"
                                                )}
                                            />
                                        </div>
                                        <span className="block font-display text-2xl font-bold leading-none">
                                            {stage.title}
                                        </span>
                                        <span
                                            className={cn(
                                                "mt-2 block font-mono text-[10px] uppercase text-[var(--muted)]",
                                                isActive && "text-[#070707]/70"
                                            )}
                                        >
                                            {stage.short}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        className="signal-field relative h-[48svh] min-h-[410px] overflow-hidden hairline bg-[var(--panel)] lg:h-[72vh]"
                        data-cursor="LIVE"
                        style={{
                            "--mx": `${pointer.x}%`,
                            "--my": `${pointer.y}%`,
                            rotate: boardRotate,
                            y: boardY,
                        } as MotionStyle & Record<"--mx" | "--my", string>}
                        onPointerMove={(event) => {
                            const rect = event.currentTarget.getBoundingClientRect();
                            setPointer({
                                x: ((event.clientX - rect.left) / rect.width) * 100,
                                y: ((event.clientY - rect.top) / rect.height) * 100,
                            });
                        }}
                    >
                        <motion.div
                            aria-hidden="true"
                            className="absolute left-0 right-0 z-20 h-px bg-[var(--acid)]/70 shadow-[0_0_26px_var(--acid)]"
                            style={{ top: sweepY }}
                        />

                        <div className="absolute inset-8 md:inset-12">
                            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                                <motion.path
                                    d="M18 26 C32 6, 48 18, 48 18 S65 23, 76 36 S72 58, 64 72 S43 83, 28 70 S10 47, 18 26"
                                    fill="none"
                                    stroke="rgba(241,240,233,0.16)"
                                    strokeWidth="0.35"
                                />
                                <motion.path
                                    d="M18 26 C32 6, 48 18, 48 18 S65 23, 76 36 S72 58, 64 72 S43 83, 28 70 S10 47, 18 26"
                                    fill="none"
                                    stroke="var(--acid)"
                                    strokeWidth="0.55"
                                    strokeLinecap="round"
                                    pathLength={1}
                                    style={{ pathLength: smoothProgress }}
                                />
                            </svg>

                            {NODE_POSITIONS.map((position, index) => {
                                const stage = STAGES[index] ?? STAGES[0];
                                const isActive = selectedIndex === index;
                                return (
                                    <motion.button
                                        key={`${position.x}-${position.y}`}
                                        type="button"
                                        aria-label={stage.title}
                                        data-cursor="LOCK"
                                        onMouseEnter={() => {
                                            playHover();
                                            setHoverIndex(index);
                                        }}
                                        onMouseLeave={() => setHoverIndex(null)}
                                        onClick={() => {
                                            playClick();
                                            setActiveIndex(index);
                                        }}
                                        className={cn(
                                            "absolute z-30 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border bg-[#070707] font-mono text-xs font-bold tabular-nums transition-colors md:h-20 md:w-20",
                                            isActive
                                                ? "border-[var(--acid)] text-[#070707]"
                                                : "border-[rgba(241,240,233,0.18)] text-[var(--muted)]"
                                        )}
                                        style={{
                                            left: position.x,
                                            top: position.y,
                                            backgroundColor: isActive ? stage.accent : "#070707",
                                            boxShadow: isActive ? `0 0 36px ${stage.accent}` : "none",
                                        }}
                                        animate={{
                                            scale: isActive ? 1.12 : 1,
                                        }}
                                        transition={{ type: "spring", stiffness: 260, damping: 18 }}
                                    >
                                        {index < STAGES.length ? stage.id : <Sparkles className="h-5 w-5" />}
                                    </motion.button>
                                );
                            })}

                            <motion.div
                                aria-hidden="true"
                                className="absolute z-40 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--acid)] shadow-[0_0_34px_var(--acid)]"
                                style={{ left: packetX, top: packetY }}
                            />

                            <div className="absolute left-1/2 top-1/2 z-20 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[rgba(241,240,233,0.12)] bg-[#070707]/70 backdrop-blur-md md:h-52 md:w-52">
                                <motion.div
                                    className="absolute inset-3 rounded-full border border-dashed border-[rgba(203,255,74,0.24)]"
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                                    aria-hidden="true"
                                />
                                <div className="relative text-center">
                                    <SelectedIcon className="mx-auto mb-4 h-9 w-9" style={{ color: selected.accent }} />
                                    <div className="font-display text-3xl font-bold text-[var(--ink)]">
                                        {selected.title}
                                    </div>
                                    <div className="mt-2 font-mono text-[10px] uppercase text-[var(--muted)]">
                                        {selected.stat}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute bottom-5 left-5 right-5 z-30 grid grid-cols-4 gap-px overflow-hidden hairline bg-[var(--line)]">
                            {STAGES.map((stage, index) => (
                                <div
                                    key={stage.title}
                                    className={cn(
                                        "bg-[#070707]/85 px-3 py-2 font-mono text-[9px] uppercase text-[var(--dim)] backdrop-blur",
                                        selectedIndex === index && "text-[#070707]"
                                    )}
                                    style={{
                                        backgroundColor: selectedIndex === index ? stage.accent : undefined,
                                    }}
                                >
                                    {stage.title}
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <div className="hidden lg:block">
                        <div className="hairline bg-[var(--panel)]/70 p-6">
                            <div className="mb-8 flex items-center justify-between gap-4">
                                <span className="label text-[var(--muted)]">ACTIVE SIGNAL</span>
                                <Zap className="h-4 w-4" style={{ color: selected.accent }} />
                            </div>

                            <div className="mb-8">
                                <div className="font-display text-5xl font-bold leading-none text-[var(--ink)]">
                                    {selected.title}
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-[var(--muted)]">
                                    {selected.description}
                                </p>
                            </div>

                            <div className="space-y-5">
                                {selected.chips.map((chip, index) => (
                                    <div key={chip}>
                                        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase text-[var(--muted)]">
                                            <span>{chip}</span>
                                            <span>{String(72 + index * 7)}%</span>
                                        </div>
                                        <div className="h-1 bg-[var(--line)]">
                                            <motion.div
                                                className="h-full origin-left"
                                                style={{
                                                    backgroundColor: selected.accent,
                                                    scaleX: proofScale,
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden hairline bg-[var(--line)]">
                                <div className="bg-[#070707] p-4">
                                    <Database className="mb-5 h-4 w-4 text-[var(--muted)]" />
                                    <span className="block font-display text-2xl font-bold text-[var(--ink)]">10k+</span>
                                    <span className="label text-[var(--dim)]">CATALOG ITEMS</span>
                                </div>
                                <div className="bg-[#070707] p-4">
                                    <ShieldCheck className="mb-5 h-4 w-4 text-[var(--muted)]" />
                                    <span className="block font-display text-2xl font-bold text-[var(--ink)]">RLS</span>
                                    <span className="label text-[var(--dim)]">GUARDED DATA</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-10 left-4 font-display text-[10rem] font-bold leading-none text-stroke opacity-70 md:left-10 md:text-[18rem]"
                >
                    LOOP
                </span>
            </div>
        </section>
    );
}
