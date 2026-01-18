"use client";
import React from "react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const labItems = [
    {
        quote: "Running Llama-3 locally on Ryzen 7 5850U...",
        name: "Local AI",
        title: "Edge Computing"
    },
    {
        quote: "Building Portfolio V2 with Next.js 15...",
        name: "Development",
        title: "Personal Project"
    },
    {
        quote: "Refurbishing Dual Xeon X5670 Workstation...",
        name: "Hardware",
        title: "Server Build"
    },
    {
        quote: "Listening to Phonk & Funk Carioca...",
        name: "Vibes",
        title: "Background Music"
    },
    {
        quote: "Testing OpenAI Realtime API latency...",
        name: "Research",
        title: "API Testing"
    },
    {
        quote: "Experimenting with multi-agent orchestration...",
        name: "AI Research",
        title: "LangGraph"
    },
    {
        quote: "Optimizing Supabase RLS policies...",
        name: "Backend",
        title: "Security"
    },
];

export function Lab() {
    return (
        <section id="lab" className="w-full bg-black py-32 px-4 md:px-8 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-mono mb-4">
                        Current <span className="text-emerald-500">Processes</span>
                    </h2>
                    <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
                        What&apos;s running in the background right now
                    </p>
                </div>

                {/* Infinite Moving Cards */}
                <div className="flex">
                    <InfiniteMovingCards
                        items={labItems}
                        direction="left"
                        speed="slow"
                    />
                </div>

                {/* Terminal-style footer */}
                <div className="mt-16 max-w-2xl mx-auto">
                    <div className="rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 font-mono text-sm">
                        <div className="flex items-center gap-2 mb-4 pb-4 border-b border-neutral-800">
                            <div className="h-3 w-3 rounded-full bg-red-500" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500" />
                            <div className="h-3 w-3 rounded-full bg-green-500" />
                            <span className="ml-2 text-neutral-500">abdullah@workstation</span>
                        </div>
                        <div className="space-y-2 text-neutral-400">
                            <p><span className="text-emerald-400">$</span> uptime</p>
                            <p className="text-neutral-300">8:22PM up 127 days, 14:32, 1 user, load averages: 0.42, 0.38, 0.35</p>
                            <p className="mt-4"><span className="text-emerald-400">$</span> systemctl status creativity</p>
                            <p className="text-emerald-400">● creativity.service - Creative Process Daemon</p>
                            <p className="pl-4">Active: <span className="text-emerald-400">active (running)</span></p>
                            <p className="mt-4"><span className="text-emerald-400">$</span> <span className="animate-pulse">▋</span></p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
