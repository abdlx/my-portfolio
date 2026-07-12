"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Lenis-powered inertial scrolling. Mounts nothing visual —
 * it hijacks wheel/touch and eases window scroll so every
 * scroll-driven animation on the page feels fluid.
 */
export function SmoothScroll() {
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const lenis = new Lenis({
            lerp: 0.09,
            wheelMultiplier: 1,
            touchMultiplier: 1.4,
            anchors: true,
        });

        let rafId = 0;
        const raf = (time: number) => {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        };
        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenis.destroy();
        };
    }, []);

    return null;
}
