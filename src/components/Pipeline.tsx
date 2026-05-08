"use client";
import React, { forwardRef, useRef } from "react";
import { AnimatedBeam, Circle } from "@/components/ui/animated-beam";
import { Brain, User, Database, Globe, Monitor, FileText, Zap } from "lucide-react";
import { InteractivePipeline } from "./InteractivePipeline";

export function Pipeline() {
    return (
        <section id="logic" className="w-full bg-black py-32 px-4 md:px-8 snap-start">
            <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left side - Text */}
                    <div className="space-y-6">
                        <h2 className="text-3xl md:text-5xl font-bold text-white font-mono">
                            Orchestrating <span className="heading-highlight">Chaos</span>
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
                        className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950/50 p-4 md:p-8"
                    >
                        <div className="w-full flex-col items-stretch justify-between gap-8 h-full"> 
                            <InteractivePipeline/>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
