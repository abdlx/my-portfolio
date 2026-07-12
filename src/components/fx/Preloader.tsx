"use client";

import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ------------------------------------------------------------------ */
/* Boot context — lets the hero hold its entrance until the boot ends */
/* ------------------------------------------------------------------ */

const BootContext = createContext(true);

export function useBooted() {
    return useContext(BootContext);
}

const BOOT_LINES = [
    "MOUNTING INTERFACE",
    "COMPILING SHADERS",
    "CALIBRATING CURSOR",
    "HYDRATING PIPELINES",
    "INJECTING DOPAMINE",
    "SIGNAL ACQUIRED",
];

const EASE_OUT: [number, number, number, number] = [0.76, 0, 0.24, 1];

/**
 * One-time boot sequence per session: a percentage counter races to
 * 100 over mono log lines, then the whole shroud wipes upward.
 */
export function BootProvider({ children }: { children: React.ReactNode }) {
    const [phase, setPhase] = useState<"idle" | "booting" | "done">("idle");
    const [progress, setProgress] = useState(0);
    const rafRef = useRef(0);

    useEffect(() => {
        const alreadyBooted = sessionStorage.getItem("signal-booted") === "1";
        const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (alreadyBooted || reduced) {
            setPhase("done");
            return;
        }

        setPhase("booting");
        document.documentElement.style.overflow = "hidden";

        const duration = 1900;
        const start = performance.now();
        const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            // ease with tiny stalls so it feels like real work
            const eased = t < 1 ? 1 - Math.pow(1 - t, 2.4) : 1;
            setProgress(Math.min(100, Math.floor(eased * 100 + (t < 1 ? Math.sin(t * 40) * 1.5 : 0))));
            if (t < 1) {
                rafRef.current = requestAnimationFrame(tick);
            } else {
                setProgress(100);
                setTimeout(() => {
                    sessionStorage.setItem("signal-booted", "1");
                    document.documentElement.style.overflow = "";
                    setPhase("done");
                }, 350);
            }
        };
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(rafRef.current);
            document.documentElement.style.overflow = "";
        };
    }, []);

    const lineIndex = Math.min(
        BOOT_LINES.length - 1,
        Math.floor((progress / 100) * BOOT_LINES.length)
    );

    return (
        <BootContext.Provider value={phase === "done"}>
            {children}
            <AnimatePresence>
                {phase === "booting" && (
                    <motion.div
                        key="boot"
                        className="fixed inset-0 z-[100] bg-[#070707] flex flex-col justify-between p-6 md:p-10"
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.9, ease: EASE_OUT }}
                    >
                        {/* top row */}
                        <div className="flex items-center justify-between">
                            <span className="label text-[var(--ink)]">ABDULLAH©2026</span>
                            <span className="label">PORTFOLIO — V3.0</span>
                        </div>

                        {/* center log */}
                        <div className="flex flex-col items-center gap-4">
                            <span className="label text-[var(--acid)]">
                                {BOOT_LINES[lineIndex]}
                                <span className="blink">_</span>
                            </span>
                            <div className="h-px w-48 md:w-72 bg-[var(--line)] relative overflow-hidden">
                                <div
                                    className="absolute inset-y-0 left-0 bg-[var(--acid)]"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>

                        {/* bottom counter */}
                        <div className="flex items-end justify-between">
                            <span className="label">EST. 0.002ms LATENCY</span>
                            <span className="font-display text-7xl md:text-9xl font-bold leading-none tabular-nums text-[var(--ink)]">
                                {progress}
                            </span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </BootContext.Provider>
    );
}
