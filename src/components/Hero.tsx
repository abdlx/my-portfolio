"use client";
import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Marquee } from "@/components/ui/marquee";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ColourfulText } from "@/components/ui/colourful-text";
import { cn } from "@/lib/utils";

export function Hero() {
    return (
        <section
            id="home"
            className="relative h-screen w-full overflow-hidden bg-black antialiased"
        >
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
                <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center">
                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm mb-8">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-neutral-300 text-sm font-mono">System Online | Open to Work</span>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                        I build software
                        <br />
                        that <ColourfulText text="thinks" />.
                    </h1>

                    {/* Sub-heading with text generate effect */}
                    <div className="mt-6 max-w-lg mx-auto">
                        <TextGenerateEffect
                            words="Full-Stack Engineer. AI Pipeline Architect. SaaS Builder."
                            className="text-center"
                        />
                    </div>

                    {/* Description */}
                    <p className="mt-6 text-neutral-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                        The gap between &apos;Demo&apos; and &apos;Production&apos; is engineering. I bridge that gap by
                        connecting advanced AI models with intuitive, high-performance interfaces.
                    </p>

                    {/* CTA Button */}
                    <div className="mt-10 flex justify-center">
                        <a href="#projects">
                            <ShimmerButton
                                shimmerColor="#ffffff"
                                background="rgba(99, 102, 241, 0.9)"
                                borderRadius="12px"
                                className="font-mono text-sm md:text-base"
                            >
                                Explore the Architecture
                            </ShimmerButton>
                        </a>
                    </div>
                </div>
            </BackgroundLines>

            {/* Tech Stack Marquee at Bottom */}
            <div className="absolute bottom-10 left-0 w-full overflow-hidden z-20">
                <Marquee className="py-4" pauseOnHover reverse repeat={4}>
                    {["Next.js", "Python", "Supabase", "Docker", "Stripe", "OpenAI", "LangChain", "Framer Motion"].map((tech) => (
                        <span key={tech} className="mx-8 text-2xl font-bold text-neutral-500 opacity-50 font-mono">
                            {tech}
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
