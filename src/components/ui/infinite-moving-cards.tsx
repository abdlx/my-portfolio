"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "fast",
    pauseOnHover = true,
    className,
}: {
    items: {
        quote: string;
        name?: string;
        title?: string;
    }[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";
    pauseOnHover?: boolean;
    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [start, setStart] = useState(false);
    const duplicatedItems = React.useMemo(() => [...items, ...items], [items]);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        container.style.setProperty(
            "--animation-direction",
            direction === "left" ? "forwards" : "reverse"
        );
        container.style.setProperty(
            "--animation-duration",
            speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s"
        );

        const frame = requestAnimationFrame(() => setStart(true));
        return () => cancelAnimationFrame(frame);
    }, [direction, speed]);

    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap",
                    start && "animate-scroll",
                    pauseOnHover && "hover:[animation-play-state:paused]"
                )}
            >
                {duplicatedItems.map((item, idx) => (
                    <li
                        className="w-[350px] max-w-full relative rounded-2xl border border-neutral-700 flex-shrink-0 px-8 py-6 md:w-[450px] bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950"
                        key={item.name || idx}
                    >
                        <blockquote>
                            <div
                                aria-hidden="true"
                                className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                            ></div>
                            <span className="relative z-20 text-sm leading-[1.6] text-neutral-200 font-mono">
                                {item.quote}
                            </span>
                            {item.name && (
                                <div className="relative z-20 mt-6 flex flex-row items-center">
                                    <span className="flex flex-col gap-1">
                                        <span className="text-sm leading-[1.6] text-neutral-400 font-normal">
                                            {item.name}
                                        </span>
                                        {item.title && (
                                            <span className="text-sm leading-[1.6] text-neutral-500 font-normal">
                                                {item.title}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}
                        </blockquote>
                    </li>
                ))}
            </ul>
        </div>
    );
};
