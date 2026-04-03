"use client";
import React from "react";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

import { Marquee } from "@/components/ui/marquee";
import { BackgroundLines } from "@/components/ui/background-lines";
import { ColourfulText } from "@/components/ui/colourful-text";
import { cn } from "@/lib/utils";
import { FileText, Terminal } from "lucide-react";
import { BackgroundParticles } from "@/components/ui/background-particles";
import { useUiSounds } from "@/hooks/useUiSounds";

export function Hero() {
    const { playHover, playClick } = useUiSounds();

    return (
        <section
            id="home"
            className="relative min-h-[100svh] w-full bg-black antialiased flex flex-col justify-center"
        >
            <BackgroundParticles />
            <BackgroundLines className="flex items-center justify-center w-full flex-col px-4 py-20 md:py-0">
                <div className="p-4 max-w-7xl mx-auto relative z-10 w-full text-center">
                    {/* Status Badge */}
                    <a
                        href="https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-800 bg-neutral-950/50 backdrop-blur-sm mb-8 hover:border-emerald-500/50 hover:bg-neutral-900/50 transition-all duration-300 group cursor-pointer"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="text-neutral-300 text-sm font-mono group-hover:text-emerald-400 transition-colors">
                            System Online | Open to Work
                        </span>
                    </a>

                    {/* Main Heading */}
                    <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 leading-tight">
                        I build software
                        <br />
                        that <span className="whitespace-nowrap"><ColourfulText text="thinks" /></span>.
                    </h1>

                    {/* Sub-heading with text generate effect */}
                    <div className="mt-6 max-w-lg mx-auto">
                        <TextGenerateEffect
                            words="Full-Stack Engineer. AI Pipeline Architect. SaaS Builder."
                            className="text-center"
                        />
                    </div>

                    {/* Description */}
                    <p className="mt-4 md:mt-6 text-neutral-400 text-sm md:text-lg max-w-2xl mx-auto leading-relaxed px-2 md:px-0">
                        The gap between &apos;Demo&apos; and &apos;Production&apos; is engineering. I bridge that gap by
                        connecting advanced AI models with intuitive, high-performance interfaces.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-8 md:mt-10 flex flex-wrap justify-center gap-4 pb-20 md:pb-0">
                        <a href="#projects">
                            <button className="group relative px-6 md:px-10 py-4 rounded-xl font-mono text-sm md:text-base text-neutral-300 hover:text-white transition-all duration-500 overflow-hidden">
                                {/* Glass Background */}
                                <div className="absolute inset-0 bg-neutral-900/50 backdrop-blur-md border border-neutral-800 group-hover:border-neutral-600 transition-all duration-500" />
                                {/* Shine Effect */}
                                <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                <span className="relative flex items-center gap-2">
                                    <Terminal size={18} className="text-emerald-500 group-hover:rotate-12 transition-transform duration-300" />
                                    Explore the Architecture
                                </span>
                            </button>
                        </a>
                    </div>
                </div>
            </BackgroundLines>

            {/* Tech Stack Marquee at Bottom */}
            <div className="absolute bottom-4 md:bottom-10 left-0 w-full overflow-hidden z-20">
                <Marquee className="py-2 md:py-4" pauseOnHover reverse repeat={4}>
                    {["Next.js", "Python", "Supabase", "Docker", "Stripe", "OpenAI", "LangChain", "Framer Motion"].map((tech) => (
                        <span key={tech} className="mx-4 md:mx-8 text-lg md:text-2xl font-bold text-neutral-500 opacity-50 font-mono">
                            {tech}
                        </span>
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
