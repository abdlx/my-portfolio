"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&/<>_";

interface ScrambleTextProps {
    text: string;
    className?: string;
    as?: React.ElementType;
    /** "inview" decodes once when visible, "hover" re-decodes on pointer enter, "mount" runs immediately */
    trigger?: "inview" | "hover" | "mount";
    /** ms per character reveal step */
    speed?: number;
    delay?: number;
}

/**
 * Terminal-style decode effect: characters resolve left-to-right
 * out of random glyph noise.
 */
export function ScrambleText({
    text,
    className,
    as: Tag = "span",
    trigger = "inview",
    speed = 28,
    delay = 0,
}: ScrambleTextProps) {
    const [display, setDisplay] = useState(text);
    const elRef = useRef<HTMLElement | null>(null);
    const frameRef = useRef<number>(0);
    const playedRef = useRef(false);

    const run = useCallback(() => {
        cancelAnimationFrame(frameRef.current);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            setDisplay(text);
            return;
        }
        const start = performance.now() + delay;
        const total = text.length;

        const tick = (now: number) => {
            const elapsed = now - start;
            if (elapsed < 0) {
                frameRef.current = requestAnimationFrame(tick);
                return;
            }
            const resolved = Math.floor(elapsed / speed);
            if (resolved >= total) {
                setDisplay(text);
                return;
            }
            let out = "";
            for (let i = 0; i < total; i++) {
                const ch = text[i];
                if (i < resolved || ch === " ") out += ch;
                else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }
            setDisplay(out);
            frameRef.current = requestAnimationFrame(tick);
        };
        frameRef.current = requestAnimationFrame(tick);
    }, [text, speed, delay]);

    useEffect(() => {
        const frame = requestAnimationFrame(() => {
            setDisplay(text);
            playedRef.current = false;
        });
        return () => cancelAnimationFrame(frame);
    }, [text]);

    useEffect(() => {
        if (trigger === "mount") {
            const frame = requestAnimationFrame(run);
            return () => {
                cancelAnimationFrame(frame);
                cancelAnimationFrame(frameRef.current);
            };
        }
        if (trigger === "inview") {
            const el = elRef.current;
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting && !playedRef.current) {
                        playedRef.current = true;
                        run();
                        observer.disconnect();
                    }
                },
                { threshold: 0.4 }
            );
            observer.observe(el);
            return () => {
                observer.disconnect();
                cancelAnimationFrame(frameRef.current);
            };
        }
        return () => cancelAnimationFrame(frameRef.current);
    }, [trigger, run]);

    return (
        <Tag
            ref={elRef}
            className={className}
            onMouseEnter={trigger === "hover" ? run : undefined}
            aria-label={text}
        >
            {display}
        </Tag>
    );
}
