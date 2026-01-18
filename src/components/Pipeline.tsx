"use client";
import React, { forwardRef, useRef } from "react";
import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import { Brain, User, Database, Globe, Monitor, FileText, Zap } from "lucide-react";

const InputNode = forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; label: string }
>(({ children, label }, ref) => (
    <div className="flex flex-col items-center gap-2">
        <Circle ref={ref}>{children}</Circle>
        <span className="text-xs text-neutral-500 font-mono">{label}</span>
    </div>
));
InputNode.displayName = "InputNode";

const OutputNode = forwardRef<
    HTMLDivElement,
    { children: React.ReactNode; label: string }
>(({ children, label }, ref) => (
    <div className="flex flex-col items-center gap-2">
        <Circle ref={ref} className="border-emerald-700 shadow-[0_0_20px_-12px_rgba(16,185,129,0.8)]">
            {children}
        </Circle>
        <span className="text-xs text-neutral-500 font-mono">{label}</span>
    </div>
));
OutputNode.displayName = "OutputNode";

export function Pipeline() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Input refs
    const userRef = useRef<HTMLDivElement>(null);
    const dbRef = useRef<HTMLDivElement>(null);
    const apiRef = useRef<HTMLDivElement>(null);

    // Center ref
    const brainRef = useRef<HTMLDivElement>(null);

    // Output refs
    const uiRef = useRef<HTMLDivElement>(null);
    const reportRef = useRef<HTMLDivElement>(null);
    const actionRef = useRef<HTMLDivElement>(null);

    return (
        <section id="logic" className="w-full bg-black py-32 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-mono">
                            Orchestrating <span className="text-indigo-500">Chaos</span>
                        </h2>
                        <p className="text-neutral-400 text-lg leading-relaxed max-w-xl">
                            Modern apps aren&apos;t just databases anymore. They are multi-agent systems.
                            I wire up the nervous system for your next product—connecting User Intent
                            to LLM Logic to Actual Results.
                        </p>
                        <div className="flex flex-wrap gap-3 pt-4">
                            {["Next.js", "Python", "LangChain", "Supabase", "OpenAI"].map((tech) => (
                                <span
                                    key={tech}
                                    className="px-3 py-1 rounded-full border border-neutral-700 text-neutral-300 text-sm font-mono bg-neutral-900/50"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right side - Visualization */}
                    <div
                        className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/50 p-8 md:p-12"
                        ref={containerRef}
                    >
                        <div className="flex h-full w-full flex-col items-stretch justify-between gap-8">
                            {/* Input Row */}
                            <div className="flex flex-row justify-between px-4">
                                <InputNode ref={userRef} label="User">
                                    <User className="h-6 w-6 text-neutral-200" />
                                </InputNode>
                                <InputNode ref={dbRef} label="Database">
                                    <Database className="h-6 w-6 text-neutral-200" />
                                </InputNode>
                                <InputNode ref={apiRef} label="API">
                                    <Globe className="h-6 w-6 text-neutral-200" />
                                </InputNode>
                            </div>

                            {/* Center - Brain */}
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center gap-2">
                                    <Circle
                                        ref={brainRef}
                                        className="size-20 border-indigo-500 bg-indigo-950 shadow-[0_0_30px_-10px_rgba(99,102,241,0.8)]"
                                    >
                                        <Brain className="h-10 w-10 text-indigo-400" />
                                    </Circle>
                                    <span className="text-sm text-indigo-400 font-mono font-semibold">The Brain</span>
                                </div>
                            </div>

                            {/* Output Row */}
                            <div className="flex flex-row justify-between px-4">
                                <OutputNode ref={uiRef} label="UI">
                                    <Monitor className="h-6 w-6 text-emerald-400" />
                                </OutputNode>
                                <OutputNode ref={reportRef} label="Report">
                                    <FileText className="h-6 w-6 text-emerald-400" />
                                </OutputNode>
                                <OutputNode ref={actionRef} label="Action">
                                    <Zap className="h-6 w-6 text-emerald-400" />
                                </OutputNode>
                            </div>
                        </div>

                        {/* Animated Beams - Inputs to Brain */}
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={userRef}
                            toRef={brainRef}
                            curvature={-50}
                            duration={3}
                        />
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={dbRef}
                            toRef={brainRef}
                            duration={3}
                            delay={0.3}
                        />
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={apiRef}
                            toRef={brainRef}
                            curvature={50}
                            duration={3}
                            delay={0.6}
                        />

                        {/* Animated Beams - Brain to Outputs */}
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={brainRef}
                            toRef={uiRef}
                            curvature={50}
                            duration={3}
                            delay={0.9}
                            gradientStartColor="#10b981"
                            gradientStopColor="#6366f1"
                        />
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={brainRef}
                            toRef={reportRef}
                            duration={3}
                            delay={1.2}
                            gradientStartColor="#10b981"
                            gradientStopColor="#6366f1"
                        />
                        <AnimatedBeam
                            containerRef={containerRef}
                            fromRef={brainRef}
                            toRef={actionRef}
                            curvature={-50}
                            duration={3}
                            delay={1.5}
                            gradientStartColor="#10b981"
                            gradientStopColor="#6366f1"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
