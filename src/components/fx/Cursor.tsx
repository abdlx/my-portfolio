"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Custom cursor: an acid dot with a lagging ring.
 * Any element with a `data-cursor="LABEL"` attribute morphs the
 * ring into a labelled chip (OPEN, DRAG, COPY, PLAY…).
 * Renders nothing on touch devices / reduced motion.
 */
export function Cursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const labelRef = useRef<HTMLDivElement>(null);
    const [enabled, setEnabled] = useState(false);

    useEffect(() => {
        const fine = window.matchMedia("(pointer: fine)").matches;
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!fine || reduced) return;

        setEnabled(true);
        document.documentElement.classList.add("has-cursor");

        const pos = { x: -100, y: -100 };
        const ring = { x: -100, y: -100 };
        let label = "";
        let down = false;
        let visible = false;
        let rafId = 0;

        const onMove = (e: MouseEvent) => {
            pos.x = e.clientX;
            pos.y = e.clientY;
            visible = true;

            const target = (e.target as HTMLElement)?.closest?.("[data-cursor]");
            const next = target?.getAttribute("data-cursor") ?? "";
            if (next !== label) {
                label = next;
                if (labelRef.current) labelRef.current.textContent = label;
            }
        };

        const onDown = () => { down = true; };
        const onUp = () => { down = false; };
        const onLeave = () => { visible = false; };

        const tick = () => {
            ring.x += (pos.x - ring.x) * 0.16;
            ring.y += (pos.y - ring.y) * 0.16;

            const dot = dotRef.current;
            const ringEl = ringRef.current;
            if (dot && ringEl) {
                dot.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%) scale(${down ? 0.5 : 1})`;
                dot.style.opacity = visible && !label ? "1" : "0";

                const hasLabel = label !== "";
                ringEl.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${down ? 0.9 : 1})`;
                ringEl.style.opacity = visible ? "1" : "0";
                ringEl.style.width = hasLabel ? "auto" : "36px";
                ringEl.style.height = hasLabel ? "auto" : "36px";
                ringEl.style.padding = hasLabel ? "10px 16px" : "0";
                ringEl.style.background = hasLabel ? "var(--acid)" : "transparent";
                ringEl.style.borderColor = hasLabel ? "var(--acid)" : "rgba(241,240,233,0.35)";
                if (labelRef.current) {
                    labelRef.current.style.display = hasLabel ? "block" : "none";
                }
            }
            rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);

        window.addEventListener("mousemove", onMove, { passive: true });
        window.addEventListener("mousedown", onDown);
        window.addEventListener("mouseup", onUp);
        document.documentElement.addEventListener("mouseleave", onLeave);

        return () => {
            cancelAnimationFrame(rafId);
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("mousedown", onDown);
            window.removeEventListener("mouseup", onUp);
            document.documentElement.removeEventListener("mouseleave", onLeave);
            document.documentElement.classList.remove("has-cursor");
        };
    }, []);

    if (!enabled) return null;

    return (
        <>
            <div
                ref={dotRef}
                className="fixed top-0 left-0 z-[99] pointer-events-none h-[6px] w-[6px] rounded-full bg-[var(--acid)] transition-opacity duration-150"
                style={{ opacity: 0 }}
            />
            <div
                ref={ringRef}
                className="fixed top-0 left-0 z-[98] pointer-events-none flex items-center justify-center rounded-full border transition-[opacity,background,border-color] duration-200"
                style={{ opacity: 0, width: 36, height: 36, borderColor: "rgba(241,240,233,0.35)" }}
            >
                <div
                    ref={labelRef}
                    className="hidden font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#070707] whitespace-nowrap"
                />
            </div>
        </>
    );
}
