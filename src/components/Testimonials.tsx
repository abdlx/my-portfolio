"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useUiSounds } from "@/hooks/useUiSounds";

const testimonials = [
    {
        quote:
            "The sales agent is absolutely fantastic. Very professional work and exceeded our expectations. Highly satisfied!",
        name: "Mirza Amin Baig",
        designation: "CEO, ASAS Forge",
        src: "/testimonials/amin.png",
    },
    {
        quote:
            "Yaar 3 weeks mai pura MVP bana diya, AI integration bhi bilkul smooth chal raha hai. Worth every penny bhai 💯",
        name: "Fahad",
        designation: "Co-Founder, Fulfix",
        src: "/testimonials/fahad.png",
    },
    {
        quote:
            "Mashallah bohot detailed kaam kia hai. Har cheez explain karte gaye setup k time. Would definitely recommend to others 👍",
        name: "Anas Naeem",
        designation: "Manager, NASLW",
        src: "/testimonials/anas.png",
    },
];

export function Testimonials() {
    const [index, setIndex] = useState(0);
    const [direction, setDirection] = useState(1);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const { playHover, playClick } = useUiSounds();

    const go = useCallback((dir: number) => {
        setDirection(dir);
        setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
    }, []);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        timerRef.current = setInterval(() => go(1), 6000);
    }, [go]);

    useEffect(() => {
        resetTimer();
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [resetTimer]);

    const t = testimonials[index];

    return (
        <section className="relative px-6 md:px-12 lg:px-20 pb-28 md:pb-40">
            <div className="hairline p-8 md:p-14 relative overflow-hidden bg-[var(--panel)]/40">
                {/* giant quotation mark */}
                <span
                    aria-hidden="true"
                    className="absolute -top-8 right-4 font-serif-it text-[10rem] md:text-[16rem] leading-none text-[var(--line)] select-none pointer-events-none"
                >
                    ”
                </span>

                <div className="flex items-center gap-3 mb-10">
                    <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                    <ScrambleText text="FIELD REPORTS — VERIFIED CLIENTS" className="label" />
                </div>

                <div className="min-h-[220px] md:min-h-[240px] relative">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.figure
                            key={index}
                            initial={{ opacity: 0, y: 24 * direction }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -24 * direction }}
                            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <blockquote className="font-serif-it text-2xl md:text-4xl lg:text-[2.6rem] leading-snug text-[var(--ink)] max-w-4xl mb-8 md:mb-10">
                                “{t.quote}”
                            </blockquote>
                            <figcaption className="flex items-center gap-4">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={t.src}
                                    alt={t.name}
                                    className="h-12 w-12 object-cover hairline grayscale"
                                />
                                <div>
                                    <div className="font-display font-bold text-[var(--ink)]">{t.name}</div>
                                    <div className="label mt-1">{t.designation}</div>
                                </div>
                            </figcaption>
                        </motion.figure>
                    </AnimatePresence>
                </div>

                {/* controls */}
                <div className="flex items-center justify-between mt-10 pt-6 hairline-t">
                    <span className="font-mono text-xs text-[var(--muted)] tabular-nums">
                        {String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
                    </span>
                    <div className="flex gap-2">
                        <button
                            aria-label="Previous testimonial"
                            data-cursor="PREV"
                            onMouseEnter={() => playHover()}
                            onClick={() => {
                                playClick();
                                go(-1);
                                resetTimer();
                            }}
                            className="p-3 hairline text-[var(--muted)] hover:text-[#070707] hover:bg-[var(--acid)] hover:border-[var(--acid)] transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>
                        <button
                            aria-label="Next testimonial"
                            data-cursor="NEXT"
                            onMouseEnter={() => playHover()}
                            onClick={() => {
                                playClick();
                                go(1);
                                resetTimer();
                            }}
                            className="p-3 hairline text-[var(--muted)] hover:text-[#070707] hover:bg-[var(--acid)] hover:border-[var(--acid)] transition-colors"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}
