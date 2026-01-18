"use client";
import React from "react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function Contact() {
    return (
        <section id="contact" className="relative w-full">
            <BackgroundBeamsWithCollision>
                <div className="relative z-20 flex flex-col items-center justify-center px-4">
                    <h2 className="text-4xl md:text-7xl font-bold text-center text-white font-mono tracking-tight mb-8">
                        Ready to <span className="text-indigo-500">Deploy?</span>
                    </h2>

                    <div className="flex justify-center">
                        <a href="mailto:abdullah@example.com">
                            <ShimmerButton
                                shimmerColor="#ffffff"
                                background="rgba(99, 102, 241, 0.9)"
                                borderRadius="12px"
                                className="font-mono text-base md:text-lg px-8 py-4"
                            >
                                Initiate Sequence
                            </ShimmerButton>
                        </a>
                    </div>

                    <p className="mt-8 text-neutral-500 font-mono text-sm uppercase tracking-widest">
                        Available for major architectural shifts
                    </p>
                </div>
            </BackgroundBeamsWithCollision>
        </section>
    );
}
