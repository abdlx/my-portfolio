"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ScrambleText } from "./ScrambleText";

/** Serif-italic accent word used inside display headlines. */
export function Em({ children, className }: { children: React.ReactNode; className?: string }) {
    return (
        <em className={cn("font-serif-it font-normal text-[var(--acid)]", className)}>
            {children}
        </em>
    );
}

interface SectionHeadingProps {
    index: string;
    label: string;
    children: React.ReactNode;
    className?: string;
    align?: "left" | "center";
}

/**
 * Unified chapter header: mono index label that decodes into view,
 * then a big display headline that rises out of a clip mask.
 */
export function SectionHeading({
    index,
    label,
    children,
    className,
    align = "left",
}: SectionHeadingProps) {
    return (
        <header className={cn(align === "center" && "text-center", className)}>
            <div
                className={cn(
                    "flex items-center gap-3 mb-5 md:mb-7",
                    align === "center" && "justify-center"
                )}
            >
                <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                <ScrambleText
                    text={`CH.${index} — ${label}`}
                    className="label text-[var(--muted)]"
                />
            </div>
            <div className="overflow-hidden">
                <motion.h2
                    initial={{ y: "110%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-15% 0px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="font-display text-5xl leading-[0.98] sm:text-6xl md:text-7xl lg:text-8xl font-bold text-[var(--ink)]"
                >
                    {children}
                </motion.h2>
            </div>
        </header>
    );
}
