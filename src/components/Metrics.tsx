"use client";
import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

export function Metrics() {
    return (
        <section className="py-32 bg-black relative overflow-hidden snap-start">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] aspect-square bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
            
            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] md:text-xs font-mono text-emerald-500 uppercase tracking-widest">Systems Online & Performing</span>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    <div className="text-center max-w-xs group">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-4 uppercase tracking-widest group-hover:text-indigo-400 transition-colors">Client ROI Boost</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-4">
                            <span className="text-4xl md:text-6xl mr-1">+</span>
                            <NumberTicker value={15} />
                            <span className="text-2xl md:text-4xl ml-1">%</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4 leading-relaxed font-mono">
                            Average reduction in RTO (Return to Origin) via AI address validation.
                        </p>
                    </div>

                    <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

                    <div className="text-center max-w-xs group">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-4 uppercase tracking-widest group-hover:text-emerald-400 transition-colors">Data Throughput</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-4">
                            <NumberTicker value={100} />
                            <span className="text-2xl md:text-4xl ml-1">k+</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4 leading-relaxed font-mono">
                            Monthly data points harvested & processed via distributed swarm pipelines.
                        </p>
                    </div>

                    <div className="hidden md:block h-20 w-px bg-gradient-to-b from-transparent via-neutral-800 to-transparent" />

                    <div className="text-center max-w-xs group">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-4 uppercase tracking-widest group-hover:text-amber-400 transition-colors">Inference Efficiency</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-4">
                            <span className="text-4xl md:text-6xl mr-1">&lt;</span>
                            <NumberTicker value={1.2} decimalPlaces={1} />
                            <span className="text-2xl md:text-4xl ml-1">s</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4 leading-relaxed font-mono">
                            Sub-second RAG response times for high-volume architectural hardware catalogs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
