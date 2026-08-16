"use client";

import React, { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, FileText, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useUiSounds } from "@/hooks/useUiSounds";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";
import { NETWORK } from "@/lib/network";

const CVWindow = dynamic(() => import("./CVWindow").then((mod) => mod.CVWindow), { ssr: false });

const CHAPTERS = [
    { index: "01", title: "HELLO", href: "#home", id: "home" },
    { index: "02", title: "APPROACH", href: "#approach", id: "approach" },
    { index: "02B", title: "SIGNAL", href: "#signal", id: "signal" },
    { index: "03", title: "WORK", href: "#work", id: "work" },
    { index: "04", title: "PROOF", href: "#proof", id: "proof" },
    { index: "05", title: "ARSENAL", href: "#arsenal", id: "arsenal" },
    { index: "06", title: "LAB", href: "#lab", id: "lab" },
    { index: "07", title: "TRANSMIT", href: "#contact", id: "contact" },
];

const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isCVOpen, setIsCVOpen] = useState(false);
    const [activeId, setActiveId] = useState("home");
    const { playHover, playClick } = useUiSounds();
    const { animationsEnabled, toggleAnimations, isHydrated } = useAnimationSettings();

    // global scroll progress bar
    const { scrollYProgress } = useScroll();
    const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });

    // active chapter tracking
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
        );
        CHAPTERS.forEach((chapter) => {
            const el = document.getElementById(chapter.id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, []);

    // lock scroll while the menu is open
    useEffect(() => {
        document.documentElement.style.overflow = menuOpen ? "hidden" : "";
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [menuOpen]);

    const activeChapter = useMemo(
        () => CHAPTERS.find((chapter) => chapter.id === activeId) ?? CHAPTERS[0],
        [activeId]
    );

    return (
        <>
            {/* scroll progress */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-[2px] bg-[var(--acid)] origin-left z-[70]"
                style={{ scaleX: progress }}
            />

            {/* top HUD bar */}
            <div className="fixed top-0 inset-x-0 z-[88] flex items-center justify-between px-6 md:px-12 lg:px-20 py-5 md:py-6 pointer-events-none">
                <a
                    href="#home"
                    onMouseEnter={() => playHover()}
                    onClick={() => {
                        playClick();
                        setMenuOpen(false);
                    }}
                    className="pointer-events-auto"
                >
                    <ScrambleText
                        text="abdlx."
                        trigger="hover"
                        className="font-mono text-xs font-bold tracking-[0.22em] text-[var(--ink)]"
                    />
                </a>

                <div className="hidden md:block">
                    <span className="label text-[var(--dim)]">
                        CH.{activeChapter.index} — {activeChapter.title}
                    </span>
                </div>

                <button
                    onClick={() => {
                        playClick();
                        setMenuOpen((prev) => !prev);
                    }}
                    onMouseEnter={() => playHover()}
                    data-cursor={menuOpen ? "CLOSE" : "OPEN"}
                    className="pointer-events-auto group flex items-center gap-3"
                    aria-label={menuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={menuOpen}
                >
                    <span className="font-mono text-xs tracking-[0.22em] text-[var(--muted)] group-hover:text-[var(--acid)] transition-colors">
                        {menuOpen ? "CLOSE" : "MENU"}
                    </span>
                    <span className="relative h-3 w-6">
                        <span
                            className={cn(
                                "absolute left-0 top-0 h-px w-full bg-current text-[var(--ink)] group-hover:text-[var(--acid)] transition-all duration-300",
                                menuOpen && "top-1/2 rotate-45"
                            )}
                        />
                        <span
                            className={cn(
                                "absolute left-0 bottom-0 h-px w-full bg-current text-[var(--ink)] group-hover:text-[var(--acid)] transition-all duration-300",
                                menuOpen && "bottom-auto top-1/2 -rotate-45"
                            )}
                        />
                    </span>
                </button>
            </div>

            {/* fullscreen menu */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        key="menu"
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.7, ease: EASE }}
                        className="fixed inset-0 z-[85] bg-[#070707] flex flex-col justify-between px-6 md:px-12 lg:px-20 pt-28 pb-8 overflow-y-auto"
                    >
                        <nav className="flex flex-col">
                            {CHAPTERS.map((chapter, i) => (
                                <motion.div
                                    key={chapter.id}
                                    initial={{ y: 48, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: 24, opacity: 0, transition: { delay: 0 } }}
                                    transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                >
                                    <a
                                        href={chapter.href}
                                        onMouseEnter={() => playHover()}
                                        onClick={() => {
                                            playClick();
                                            setMenuOpen(false);
                                        }}
                                        className="group flex items-baseline gap-5 md:gap-8 py-2.5 md:py-3 hairline-b border-[var(--line)]"
                                    >
                                        <span className="font-mono text-xs tabular-nums text-[var(--dim)] group-hover:text-[var(--acid)] transition-colors">
                                            {chapter.index}
                                        </span>
                                        <span
                                            className={cn(
                                                "font-display font-bold text-4xl md:text-6xl lg:text-7xl leading-none tracking-normal transition-all duration-300 group-hover:translate-x-3 group-hover:text-[var(--acid)]",
                                                activeId === chapter.id ? "text-[var(--acid)]" : "text-[var(--ink)]"
                                            )}
                                        >
                                            {chapter.title}
                                        </span>
                                        {activeId === chapter.id && (
                                            <span className="label text-[var(--dim)] hidden md:block">← YOU ARE HERE</span>
                                        )}
                                    </a>
                                </motion.div>
                            ))}
                        </nav>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                            className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-8"
                        >
                            <div className="flex items-center gap-6">
                                <button
                                    onClick={() => {
                                        playClick();
                                        setIsCVOpen(true);
                                        setMenuOpen(false);
                                    }}
                                    onMouseEnter={() => playHover()}
                                    data-cursor="CV"
                                    className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-2"
                                >
                                    <FileText className="h-3.5 w-3.5" /> CURRICULUM VITAE
                                </button>
                                {isHydrated && (
                                    <button
                                        onClick={() => {
                                            playClick();
                                            toggleAnimations();
                                        }}
                                        onMouseEnter={() => playHover()}
                                        className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-2"
                                    >
                                        {animationsEnabled ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                                        MOTION: {animationsEnabled ? "ON" : "OFF"}
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                                {/* The other two sites, ahead of the profiles and
                                    fenced off from them by a rule: these are mine,
                                    those are accounts I hold somewhere else. The
                                    chapters above are anchors on this page, so
                                    anything that actually leaves belongs down here
                                    with an arrow on it. */}
                                {NETWORK.filter((site) => !site.here).map((site) => (
                                    <a
                                        key={site.domain}
                                        href={site.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={`${site.domain} — ${site.line}`}
                                        onMouseEnter={() => playHover()}
                                        onClick={() => playClick()}
                                        data-cursor="VISIT"
                                        className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
                                    >
                                        {site.label} <ArrowUpRight className="h-3 w-3" />
                                    </a>
                                ))}

                                <span className="hidden md:block h-3 w-px bg-[var(--line)]" aria-hidden="true" />

                                <a
                                    href="https://github.com/abdlx"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => playHover()}
                                    className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
                                >
                                    GITHUB <ArrowUpRight className="h-3 w-3" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onMouseEnter={() => playHover()}
                                    className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
                                >
                                    LINKEDIN <ArrowUpRight className="h-3 w-3" />
                                </a>
                                <span className="label text-[var(--dim)] hidden md:block">V3.0 — 2026</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* CV window */}
            <CVWindow isOpen={isCVOpen} setIsOpen={setIsCVOpen} />
        </>
    );
}
