"use client";
import React, { useRef, useEffect, useState, useMemo } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

// Reduced particle count and simplified animation using CSS
const FloatingParticles = React.memo(({ progress }: { progress: MotionValue<number> }) => {
    const [isMounted, setIsMounted] = useState(false);

    // Reduced to 12 particles (from 30) for better performance
    const particles = useMemo(() =>
        Array.from({ length: 12 }, (_, i) => ({
            id: i,
            size: 3 + (i % 3),
            x: (i * 8.3) % 100,
            y: (i * 7.7) % 100,
            animationDuration: 15 + (i % 3) * 5,
            animationDelay: i * 0.5,
        })), []
    );

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const opacity = useTransform(progress, [0, 0.3, 0.7, 1], [0.3, 0.8, 0.5, 0]);

    if (!isMounted) return null;

    return (
        <motion.div
            className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
            style={{ opacity }}
        >
            {particles.map((p) => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-emerald-500/30 particle-float"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        boxShadow: `0 0 ${p.size * 2}px rgba(16, 185, 129, 0.5)`,
                        animationDuration: `${p.animationDuration}s`,
                        animationDelay: `${p.animationDelay}s`,
                    }}
                />
            ))}
            <style jsx>{`
                @keyframes particle-float {
                    0%, 100% { transform: translate3d(0, 0, 0); opacity: 0.2; }
                    50% { transform: translate3d(10px, -50px, 0); opacity: 0.6; }
                }
                .particle-float {
                    animation: particle-float linear infinite;
                    will-change: transform, opacity;
                }
            `}</style>
        </motion.div>
    );
});

FloatingParticles.displayName = "FloatingParticles";

// Simplified code line - removed blur filter animation (very expensive)
const CodeLine = React.memo(({
    children,
    delay,
    indent = 0,
    isVisible,
}: {
    children: React.ReactNode;
    delay: number;
    indent?: number;
    isVisible: boolean;
}) => {
    return (
        <motion.div
            className={cn("flex gap-1 flex-wrap will-change-transform")}
            style={{ paddingLeft: indent * 24 }}
            initial={{ opacity: 0, x: -20 }}
            animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{
                duration: 0.4,
                delay: delay * 0.05,
                ease: "easeOut"
            }}
        >
            {children}
        </motion.div>
    );
});

CodeLine.displayName = "CodeLine";

// Simplified cursor using CSS animation instead of Framer Motion
const BlinkingCursor = React.memo(({ isVisible }: { isVisible: boolean }) => {
    if (!isVisible) return null;
    return (
        <span className="inline-block w-2 h-5 bg-emerald-500 ml-1 cursor-blink" />
    );
});

BlinkingCursor.displayName = "BlinkingCursor";

// Static bar heights - no re-renders needed
const BAR_HEIGHTS = [40, 70, 45, 90, 65, 80, 50, 60, 85, 40, 60, 75, 55];
const STATS = [
    { label: "Active Users", value: "12.4K", trend: "+24%" },
    { label: "Response Time", value: "42ms", trend: "-8%" },
    { label: "Uptime", value: "99.9%", trend: "+0.1%" },
];
const METRICS = [85, 65, 90, 45, 75];

// Optimized Dashboard UI with minimal animations
const DashboardUI = React.memo(() => {
    return (
        <div className="aspect-[16/9] rounded-2xl border border-neutral-700/50 bg-gradient-to-br from-neutral-900/90 via-neutral-900/70 to-neutral-950/90 backdrop-blur-xl shadow-[0_0_120px_-20px_rgba(16,185,129,0.15),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden p-4 md:p-8 flex flex-col gap-6 will-change-transform">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500/30 to-emerald-600/10 flex items-center justify-center border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.3)] logo-pulse">
                        <div className="h-4 w-4 rounded-sm bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]" />
                    </div>
                    <div className="space-y-1.5">
                        <div className="h-4 w-32 bg-gradient-to-r from-neutral-700 to-neutral-800 rounded-lg" />
                        <div className="h-2 w-20 bg-neutral-800/60 rounded-lg" />
                    </div>
                </div>
                <div className="flex gap-3">
                    <div className="h-9 w-28 rounded-full bg-gradient-to-r from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center">
                        <div className="h-2 w-16 bg-emerald-500/50 rounded" />
                    </div>
                    <div className="h-9 w-9 rounded-full bg-neutral-800/60 border border-neutral-700/50" />
                </div>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-4 gap-4 md:gap-6 flex-1">
                <div className="col-span-3 space-y-4 md:space-y-6">
                    {/* Chart Area - Static bars with CSS animation */}
                    <div className="h-40 md:h-52 w-full rounded-2xl bg-gradient-to-br from-neutral-950/80 to-neutral-900/50 border border-neutral-800/60 p-4 md:p-6 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent" />
                        <div className="relative flex h-full items-end gap-1 md:gap-2">
                            {BAR_HEIGHTS.map((h, i) => (
                                <div
                                    key={i}
                                    className="flex-1 relative bar-animate"
                                    style={{
                                        height: `${h}%`,
                                        animationDelay: `${i * 0.04}s`
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/50 via-emerald-500/30 to-emerald-400/20 rounded-t-md" />
                                    <div className="absolute inset-x-0 top-0 h-1 bg-emerald-400 rounded-t shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
                                </div>
                            ))}
                        </div>

                        {/* Grid lines - static */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[25, 50, 75].map((y) => (
                                <div
                                    key={y}
                                    className="absolute w-full h-px bg-neutral-800/50"
                                    style={{ top: `${100 - y}%` }}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Stats Cards - CSS animation instead of Framer Motion */}
                    <div className="grid grid-cols-3 gap-3 md:gap-6">
                        {STATS.map((stat, i) => (
                            <div
                                key={i}
                                className="h-20 md:h-24 rounded-xl bg-gradient-to-br from-neutral-900/80 to-neutral-950/60 border border-neutral-800/50 p-3 md:p-4 flex flex-col justify-between relative overflow-hidden stat-card"
                                style={{ animationDelay: `${0.6 + i * 0.1}s` }}
                            >
                                <div className="text-[10px] md:text-xs text-neutral-500 font-mono">{stat.label}</div>
                                <div className="flex items-end justify-between">
                                    <span className="text-lg md:text-2xl font-bold text-white font-mono">{stat.value}</span>
                                    <span className={cn(
                                        "text-[10px] md:text-xs font-mono",
                                        stat.trend.startsWith("+") ? "text-emerald-500" : "text-orange-400"
                                    )}>
                                        {stat.trend}
                                    </span>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="col-span-1 h-full rounded-2xl bg-gradient-to-br from-neutral-950/60 to-neutral-900/30 border border-neutral-800/40 p-3 md:p-4 space-y-4 relative overflow-hidden">
                    <div className="h-4 w-full bg-neutral-800 rounded-lg" />
                    <div className="h-3 w-2/3 bg-neutral-800/60 rounded-lg" />

                    <div className="pt-4 space-y-3">
                        {METRICS.map((w, i) => (
                            <div key={i} className="space-y-1.5">
                                <div className="flex justify-between text-[8px] md:text-[10px] text-neutral-600 font-mono">
                                    <span>Metric {i + 1}</span>
                                    <span>{w}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-neutral-900 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full progress-bar"
                                        style={{
                                            width: `${w}%`,
                                            animationDelay: `${1 + i * 0.1}s`
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pulse indicator - CSS animation */}
                    <div className="absolute top-3 right-3">
                        <div className="h-2 w-2 rounded-full bg-emerald-500 pulse-indicator" />
                    </div>
                </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes logo-pulse {
                    0%, 100% { box-shadow: 0 0 20px rgba(16,185,129,0.3); }
                    50% { box-shadow: 0 0 30px rgba(16,185,129,0.5); }
                }
                .logo-pulse {
                    animation: logo-pulse 3s ease-in-out infinite;
                }
                @keyframes bar-animate {
                    from { transform: scaleY(0); opacity: 0; }
                    to { transform: scaleY(1); opacity: 1; }
                }
                .bar-animate {
                    animation: bar-animate 0.8s ease-out forwards;
                    transform-origin: bottom;
                }
                @keyframes stat-card {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .stat-card {
                    animation: stat-card 0.5s ease-out forwards;
                    opacity: 0;
                }
                @keyframes progress-bar {
                    from { width: 0; }
                }
                .progress-bar {
                    animation: progress-bar 1s ease-out forwards;
                }
                @keyframes pulse-indicator {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.6; }
                }
                .pulse-indicator {
                    animation: pulse-indicator 2.5s ease-in-out infinite;
                }
            `}</style>
        </div>
    );
});

DashboardUI.displayName = "DashboardUI";

export function DeepDive() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [codeVisible, setCodeVisible] = useState(false);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Simplified transforms - removed blur (expensive) and reduced complexity
    const dashboardScale = useTransform(scrollYProgress, [0, 0.3, 0.55], [1, 2.5, 10]);
    const dashboardOpacity = useTransform(scrollYProgress, [0, 0.35, 0.5], [1, 1, 0]);

    // Code panel transformations
    const codeScale = useTransform(scrollYProgress, [0.4, 0.7], [0.95, 1]);
    const codeOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const codeY = useTransform(scrollYProgress, [0.4, 0.7], [30, 0]);

    // Text animations
    const introOpacity = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const introY = useTransform(scrollYProgress, [0, 0.25], [0, -30]);

    const headingOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
    const headingY = useTransform(scrollYProgress, [0.5, 0.7], [20, 0]);

    const subheadingOpacity = useTransform(scrollYProgress, [0.6, 0.75], [0, 1]);

    // Progress indicator
    const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    // Background effects
    const gridOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.15, 0.25, 0.1]);
    const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 0.8, 0.4]);

    // Track when code should be visible
    useEffect(() => {
        return scrollYProgress.on("change", (latest) => {
            setCodeVisible(latest > 0.35);
        });
    }, [scrollYProgress]);

    return (
        <section ref={containerRef} className="h-[400vh] bg-black relative">
            {/* Global CSS animations */}
            <style jsx global>{`
                @keyframes cursor-blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }
                .cursor-blink {
                    animation: cursor-blink 0.8s step-end infinite;
                }
                @keyframes scroll-indicator {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(10px); }
                }
                .scroll-indicator {
                    animation: scroll-indicator 1.5s ease-in-out infinite;
                }
                @keyframes scan-line {
                    0% { top: -15%; }
                    100% { top: 115%; }
                }
                .scan-line {
                    animation: scan-line 5s ease-in-out infinite;
                }
            `}</style>

            {/* Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 h-1 bg-gradient-to-r from-emerald-600 via-emerald-400 to-emerald-500 z-50 will-change-transform"
                style={{ width: progressWidth }}
            />

            <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center" style={{ perspective: "1500px" }}>
                {/* Background Effects - reduced motion */}
                <div className="absolute inset-0">
                    {/* Grid pattern */}
                    <motion.div
                        className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_40%,#000_40%,transparent_100%)]"
                        style={{ opacity: gridOpacity }}
                    />

                    {/* Radial glow */}
                    <motion.div
                        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.15)_0%,transparent_70%)]"
                        style={{ opacity: glowOpacity }}
                    />

                    {/* Vignette */}
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                </div>

                {/* Floating Particles */}
                <FloatingParticles progress={scrollYProgress} />

                {/* Intro Text (visible at start) */}
                <motion.div
                    className="absolute z-30 text-center pointer-events-none will-change-transform"
                    style={{ opacity: introOpacity, y: introY }}
                >
                    <p className="text-neutral-500 font-mono text-sm md:text-base mb-2 tracking-widest uppercase">
                        Scroll to explore
                    </p>
                    <div className="flex flex-col items-center gap-2 scroll-indicator">
                        <div className="w-6 h-10 rounded-full border-2 border-neutral-700 flex items-start justify-center p-1">
                            <div className="w-1.5 h-3 bg-emerald-500 rounded-full scroll-indicator" style={{ animationDelay: "0.1s" }} />
                        </div>
                    </div>
                </motion.div>

                {/* Dashboard Layer (The Surface) */}
                <motion.div
                    style={{
                        scale: dashboardScale,
                        opacity: dashboardOpacity,
                    }}
                    className="relative z-20 w-full max-w-5xl px-4 pointer-events-none will-change-transform"
                >
                    <DashboardUI />
                </motion.div>

                {/* Code Layer (The Backend) */}
                <motion.div
                    style={{
                        scale: codeScale,
                        opacity: codeOpacity,
                        y: codeY,
                    }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-4 z-10 will-change-transform"
                >
                    {/* Heading */}
                    <motion.div
                        className="mb-8 md:mb-12 text-center space-y-4"
                        style={{ opacity: headingOpacity, y: headingY }}
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-mono tracking-tight">
                            Diving into{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-400">
                                Core Logic
                            </span>
                        </h2>
                        <motion.p
                            className="text-neutral-500 font-mono text-sm md:text-lg"
                            style={{ opacity: subheadingOpacity }}
                        >
                            <span className="text-emerald-500">&gt;</span> Analyzing architectural patterns...
                        </motion.p>
                    </motion.div>

                    {/* Code Terminal */}
                    <div className="w-full max-w-4xl font-mono text-xs md:text-sm space-y-1.5 p-6 md:p-8 rounded-2xl border border-neutral-800/80 bg-gradient-to-br from-neutral-950/95 via-black/95 to-neutral-950/95 backdrop-blur-lg overflow-hidden shadow-[0_0_80px_-30px_rgba(16,185,129,0.4),inset_0_1px_0_rgba(255,255,255,0.05)] relative">
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-neutral-800/50">
                            <div className="flex gap-2">
                                <div className="h-3 w-3 rounded-full bg-red-500/80" />
                                <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                                <div className="h-3 w-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="ml-4 text-neutral-500 text-xs">src/core/orchestrator.ts</span>
                            <div className="ml-auto flex items-center gap-2 text-neutral-600 text-xs">
                                <span className="px-2 py-0.5 rounded bg-neutral-800/50 border border-neutral-700/50">TypeScript</span>
                            </div>
                        </div>

                        {/* Code Content */}
                        <div className="space-y-1 text-emerald-400/90">
                            <CodeLine delay={0} isVisible={codeVisible}>
                                <span className="text-neutral-600">{`/**`}</span>
                            </CodeLine>
                            <CodeLine delay={1} isVisible={codeVisible}>
                                <span className="text-neutral-600">{` * Neural Pipeline Orchestrator v2.4.0`}</span>
                            </CodeLine>
                            <CodeLine delay={2} isVisible={codeVisible}>
                                <span className="text-neutral-600">{` * @author Abdullah | AI Systems Architect`}</span>
                            </CodeLine>
                            <CodeLine delay={3} isVisible={codeVisible}>
                                <span className="text-neutral-600">{` */`}</span>
                            </CodeLine>

                            <div className="h-3" />

                            <CodeLine delay={4} isVisible={codeVisible}>
                                <span className="text-violet-400">export</span>
                                <span className="text-violet-400 ml-1">const</span>
                                <span className="text-white font-semibold ml-1">BridgeSystem</span>
                                <span className="text-neutral-400 ml-1">=</span>
                                <span className="text-violet-400 ml-1">async</span>
                                <span className="text-neutral-400">(</span>
                                <span className="text-orange-400">context</span>
                                <span className="text-neutral-500 ml-1">:</span>
                                <span className="text-cyan-400 ml-1">SystemContext</span>
                                <span className="text-neutral-400">)</span>
                                <span className="text-violet-400 ml-1">{`=>`}</span>
                                <span className="text-neutral-400 ml-1">{`{`}</span>
                            </CodeLine>

                            <CodeLine delay={5} indent={1} isVisible={codeVisible}>
                                <span className="text-violet-400">const</span>
                                <span className="text-white ml-1">telemetry</span>
                                <span className="text-neutral-400 ml-1">=</span>
                                <span className="text-violet-400 ml-1">await</span>
                                <span className="text-cyan-400 ml-1">Sensor</span>
                                <span className="text-neutral-400">.</span>
                                <span className="text-emerald-400">collectMetrics</span>
                                <span className="text-neutral-400">();</span>
                            </CodeLine>

                            <CodeLine delay={6} indent={1} isVisible={codeVisible}>
                                <span className="text-violet-400">const</span>
                                <span className="text-white ml-1">optimizer</span>
                                <span className="text-neutral-400 ml-1">=</span>
                                <span className="text-violet-400 ml-1">new</span>
                                <span className="text-emerald-400 font-semibold ml-1">LogicEngine</span>
                                <span className="text-neutral-400">(</span>
                                <span className="text-white">telemetry</span>
                                <span className="text-neutral-400">);</span>
                            </CodeLine>

                            <div className="h-2" />

                            <CodeLine delay={7} indent={1} isVisible={codeVisible}>
                                <span className="text-neutral-600 italic">{`// Parallel execution across 32 clusters`}</span>
                            </CodeLine>

                            <CodeLine delay={8} indent={1} isVisible={codeVisible}>
                                <span className="text-violet-400">const</span>
                                <span className="text-neutral-400 ml-1">[</span>
                                <span className="text-orange-400">ui</span>
                                <span className="text-neutral-400">,</span>
                                <span className="text-orange-400 ml-1">infra</span>
                                <span className="text-neutral-400">]</span>
                                <span className="text-neutral-400 ml-1">=</span>
                                <span className="text-violet-400 ml-1">await</span>
                                <span className="text-cyan-400 ml-1">Promise</span>
                                <span className="text-neutral-400">.</span>
                                <span className="text-emerald-400">all</span>
                                <span className="text-neutral-400">([</span>
                            </CodeLine>

                            <CodeLine delay={9} indent={2} isVisible={codeVisible}>
                                <span className="text-white">optimizer</span>
                                <span className="text-neutral-400">.</span>
                                <span className="text-emerald-400">renderInterface</span>
                                <span className="text-neutral-400">(),</span>
                            </CodeLine>

                            <CodeLine delay={10} indent={2} isVisible={codeVisible}>
                                <span className="text-white">optimizer</span>
                                <span className="text-neutral-400">.</span>
                                <span className="text-emerald-400">deployInfrastructure</span>
                                <span className="text-neutral-400">()</span>
                            </CodeLine>

                            <CodeLine delay={11} indent={1} isVisible={codeVisible}>
                                <span className="text-neutral-400">]);</span>
                            </CodeLine>

                            <div className="h-2" />

                            <CodeLine delay={12} indent={1} isVisible={codeVisible}>
                                <span className="text-violet-400">return</span>
                                <span className="text-neutral-400 ml-1">{`{`}</span>
                                <span className="text-white ml-1">status:</span>
                                <span className="text-orange-300 ml-1">"ARCHITECTED"</span>
                                <span className="text-neutral-400">,</span>
                                <span className="text-white ml-1">score:</span>
                                <span className="text-emerald-400 ml-1">0.99</span>
                                <span className="text-neutral-400 ml-1">{`};`}</span>
                                <BlinkingCursor isVisible={codeVisible} />
                            </CodeLine>

                            <CodeLine delay={13} isVisible={codeVisible}>
                                <span className="text-neutral-400">{`};`}</span>
                            </CodeLine>
                        </div>

                        {/* Scanline effect - static, no animation needed */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-30"
                            style={{
                                background: "linear-gradient(transparent 50%, rgba(0,0,0,0.03) 50%)",
                                backgroundSize: "100% 4px",
                            }}
                        />

                        {/* Animated scan line - CSS animation */}
                        <div className="absolute left-0 right-0 h-16 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent pointer-events-none scan-line" />

                        {/* Corner decorations - static */}
                        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-emerald-500/30 rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-emerald-500/30 rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-emerald-500/30 rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-emerald-500/30 rounded-br-lg" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
