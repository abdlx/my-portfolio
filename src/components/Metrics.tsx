"use client";
import React from "react";
import { NumberTicker } from "@/components/ui/number-ticker";

export function Metrics() {
    return (
        <section className="py-32 bg-black relative">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
                    <div className="text-center">
                        <p className="text-neutral-500 font-mono text-sm mb-2 uppercase tracking-widest">Requests Processed</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center">
                            <NumberTicker value={100} />
                            <span>M+</span>
                        </div>
                    </div>

                    <div className="h-px w-20 md:h-20 md:w-px bg-neutral-800" />

                    <div className="text-center">
                        <p className="text-neutral-500 font-mono text-sm mb-2 uppercase tracking-widest">System Uptime</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center">
                            <NumberTicker value={99.9} decimalPlaces={1} />
                            <span>%</span>
                        </div>
                    </div>

                    <div className="h-px w-20 md:h-20 md:w-px bg-neutral-800" />

                    <div className="text-center">
                        <p className="text-neutral-500 font-mono text-sm mb-2 uppercase tracking-widest">Models Integrated</p>
                        <div className="text-5xl md:text-7xl font-bold text-white flex items-center justify-center">
                            <NumberTicker value={12} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
