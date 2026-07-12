"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface TickerProps {
    items: React.ReactNode[];
    className?: string;
    /** seconds per loop */
    duration?: number;
    reverse?: boolean;
    separator?: React.ReactNode;
}

/**
 * Full-bleed marquee band used as chapter dividers.
 * Content is duplicated once and translated -50% for a seamless loop.
 */
export function Ticker({
    items,
    className,
    duration = 28,
    reverse = false,
    separator = <span className="text-[var(--acid)] mx-6 md:mx-10">✦</span>,
}: TickerProps) {
    const row = (key: string) => (
        <div key={key} className="flex items-center shrink-0">
            {items.map((item, i) => (
                <React.Fragment key={i}>
                    <span className="shrink-0 whitespace-nowrap">{item}</span>
                    {separator}
                </React.Fragment>
            ))}
        </div>
    );

    return (
        <div
            className={cn("overflow-hidden select-none ticker-paused", className)}
            aria-hidden="true"
        >
            <div
                className={cn("ticker-track items-center", reverse && "reverse")}
                style={{ "--ticker-duration": `${duration}s` } as React.CSSProperties}
            >
                {row("a")}
                {row("b")}
            </div>
        </div>
    );
}
