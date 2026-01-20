"use client";
import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

export function Metrics() {
    return (
        <section className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    <div className="text-center max-w-xs">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-2 uppercase tracking-widest">Avg. AI Latency</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-3">
                            <span className="text-4xl md:text-6xl mr-1">&lt;</span>
                            <NumberTicker value={800} />
                            <span className="text-2xl md:text-4xl ml-1">ms</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4">
                            Prompt optimization and model selection for high-speed inference.
                        </p>
                    </div>

                    <div className="h-px w-20 md:h-20 md:w-px bg-neutral-800" />

                    <div className="text-center max-w-xs">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-2 uppercase tracking-widest">Vectors Indexed</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-3">
                            <NumberTicker value={10000} />
                            <span className="text-2xl md:text-4xl ml-1">+</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4">
                            Knowledge retrieval using Supabase pgvector and custom embeddings.
                        </p>
                    </div>

                    <div className="h-px w-20 md:h-20 md:w-px bg-neutral-800" />

                    <div className="text-center max-w-xs">
                        <p className="text-neutral-500 font-mono text-xs md:text-sm mb-2 uppercase tracking-widest">Serverless Uptime</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center mb-3">
                            <NumberTicker value={99.9} decimalPlaces={1} />
                            <span className="text-2xl md:text-4xl ml-1">%</span>
                        </div>
                        <p className="text-neutral-600 text-xs px-4">
                            Highly available infrastructure on Vercel and Supabase.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
