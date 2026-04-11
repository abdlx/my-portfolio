"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Terminal, FlaskConical, Mail, Cpu, Github, Linkedin, MessageSquare, FileText, Bot, Menu, X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import GlassSurface from "./GlassSurface";
import Link from "next/link";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const AITerminal = dynamic(() => import("./AITerminal").then(mod => mod.AITerminal), { ssr: false });
const CVWindow = dynamic(() => import("./CVWindow").then(mod => mod.CVWindow), { ssr: false });
import { motion, AnimatePresence } from "framer-motion";
import { useUiSounds } from "@/hooks/useUiSounds";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";

const IconLayoutNavbarCollapse = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
        </svg>
    );
};

const internalItems = [
    {
        title: "Home",
        href: "#home",
    },
    {
        title: "Systems",
        href: "#projects",
    },
    {
        title: "Stack",
        href: "#knowledge-graph",
    },
    {
        title: "Lab",
        href: "#lab",
    },
];

const externalItems: { title: string; icon: React.ReactNode; href: string; onClick?: (e: React.MouseEvent) => void }[] = [
    {
        title: "GitHub",
        icon: <Github className="h-full w-full" />,
        href: "https://github.com/abdlx/",
    },
    {
        title: "LinkedIn",
        icon: <Linkedin className="h-full w-full" />,
        href: "https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/",
    },
    {
        title: "Contact",
        icon: <MessageSquare className="h-full w-full" />,
        href: "mailto:mirzaabdulla300@gmail.com",
    },
];

export function Navigation() {
    const [activeSection, setActiveSection] = useState("#home");
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isCVOpen, setIsCVOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { playHover, playClick } = useUiSounds();
    const { animationsEnabled, toggleAnimations, soundEnabled, toggleSound, isHydrated } = useAnimationSettings();

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -65% 0px",
            threshold: 0,
        };

        const handleIntersect = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(`#${entry.target.id}`);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        internalItems.forEach((item) => {
            const element = document.querySelector(item.href);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const toggleTerminal = (e: React.MouseEvent) => {
        console.log("Toggle Terminal Clicked!");
        e.preventDefault();
        setIsTerminalOpen(prev => !prev);
    };

    const toggleCV = (e: React.MouseEvent) => {
        console.log("Toggle CV Clicked!");
        e.preventDefault();
        setIsCVOpen(prev => !prev);
    };

    const dockItems = useMemo(() => [
        ...externalItems,
        {
            title: "Curriculum Vitae",
            icon: <FileText className="h-full w-full" />,
            href: "#",
            onClick: toggleCV
        },
        {
            title: "AI Clone",
            icon: <Bot className="h-full w-full" />,
            href: "#",
            onClick: toggleTerminal
        }
    ], [isTerminalOpen, isCVOpen]);

    return (
        <>
            {/* Desktop Navigation & Brand */}
            <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-3 will-change-transform">
                {/* Brand Pill */}
                <GlassSurface
                    width="auto"
                    height={46}
                    borderRadius={23}
                    className="flex items-center px-6"
                    brightness={15}
                    opacity={0.8}
                    backgroundOpacity={0.4}
                >
                    <span className="text-sm font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        Abdullah
                    </span>
                </GlassSurface>

                {/* Main Navbar */}
                <GlassSurface
                    width="auto"
                    height={46}
                    borderRadius={23}
                    className="flex items-center px-2"
                    brightness={15}
                    opacity={0.8}
                    backgroundOpacity={0.4}
                >
                    <div className="flex items-center gap-1">
                        {internalItems.map((item) => (
                            <Link
                                key={item.title}
                                href={item.href}
                                className={cn(
                                    "px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase transition-all duration-300",
                                    activeSection === item.href
                                        ? "bg-[#818CF8]/20 text-[#818CF8] shadow-[0_0_10px_rgba(129,140,248,0.2)]"
                                        : "text-neutral-400 hover:text-white"
                                )}
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </GlassSurface>

                {/* Animation Toggle */}
                {isHydrated && (
                    <GlassSurface
                        width="auto"
                        height={46}
                        borderRadius={23}
                        className="flex items-center px-2 gap-1"
                        brightness={15}
                        opacity={0.8}
                        backgroundOpacity={0.4}
                    >
                        <button
                            onClick={() => {
                                toggleAnimations();
                                playClick();
                            }}
                            onMouseEnter={() => playHover()}
                            className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                animationsEnabled ? "text-emerald-400" : "text-neutral-500"
                            )}
                            title={animationsEnabled ? "Disable animations" : "Enable animations"}
                        >
                            {animationsEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </button>
                        <div className="w-px h-4 bg-neutral-700" />
                        <button
                            onClick={() => {
                                toggleSound();
                                playClick();
                            }}
                            onMouseEnter={() => playHover()}
                            className={cn(
                                "p-2 rounded-full transition-all duration-300",
                                soundEnabled ? "text-emerald-400" : "text-neutral-500"
                            )}
                            title={soundEnabled ? "Disable sound" : "Enable sound"}
                        >
                            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </button>
                    </GlassSurface>
                )}
            </div>

            {/* Mobile Brand Pill */}
            <div className={cn(
                "fixed top-8 left-6 z-50 md:hidden transition-opacity duration-300 will-change-transform",
                isMobileMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            )}>
                <GlassSurface
                    width="auto"
                    height={48}
                    borderRadius={24}
                    className="flex items-center px-4"
                    brightness={15}
                    opacity={0.8}
                    backgroundOpacity={0.4}
                >
                    <span className="text-sm font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
                        Abdullah
                    </span>
                </GlassSurface>
            </div>

            {/* Mobile Consolidated Menu */}
            <div className="fixed top-8 right-6 z-50 md:hidden">
                <div className="flex flex-col items-end gap-4 relative">
                    {/* Top Row: Nav Links + Animation Toggle + Hamburger */}
                    <div className="flex items-center gap-3">
                        {/* Animation Toggle - Left of Hamburger */}
                        {isHydrated && (
                            <motion.button
                                onClick={() => {
                                    toggleAnimations();
                                    playClick();
                                }}
                                onMouseEnter={() => playHover()}
                                className="relative z-[60] flex items-center justify-center h-10 w-10 rounded-full overflow-hidden"
                                whileTap={{ scale: 0.95 }}
                            >
                                <GlassSurface
                                    width={40}
                                    height={40}
                                    borderRadius={20}
                                    className="flex items-center justify-center p-0"
                                    brightness={15}
                                    opacity={0.8}
                                    backgroundOpacity={0.4}
                                >
                                    <div className={cn(
                                        "transition-colors duration-300",
                                        animationsEnabled ? "text-emerald-400" : "text-neutral-500"
                                    )}>
                                        {animationsEnabled ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                                    </div>
                                </GlassSurface>
                            </motion.button>
                        )}

                        <AnimatePresence>
                            {isMobileMenuOpen && (
                                <motion.div 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center gap-1 bg-neutral-900/40 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/5 shadow-2xl mr-1"
                                >
                                    {internalItems.map((item) => (
                                        <Link
                                            key={item.title}
                                            href={item.href}
                                            onMouseEnter={() => playHover()}
                                            onClick={() => {
                                                playClick();
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className={cn(
                                                "px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase transition-all duration-300",
                                                activeSection === item.href
                                                    ? "bg-[#818CF8]/20 text-[#818CF8]"
                                                    : "text-neutral-400"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <motion.button
                            onClick={() => {
                                playClick();
                                setIsMobileMenuOpen(!isMobileMenuOpen);
                            }}
                            onMouseEnter={() => playHover()}
                            className="relative z-[60] flex items-center justify-center h-12 w-12 rounded-full overflow-hidden"
                            whileTap={{ scale: 0.95 }}
                        >
                            <GlassSurface
                                width={48}
                                height={48}
                                borderRadius={24}
                                className="flex items-center justify-center p-0"
                                brightness={15}
                                opacity={0.8}
                                backgroundOpacity={0.4}
                            >
                                <AnimatePresence mode="wait">
                                    {isMobileMenuOpen ? (
                                        <motion.div
                                            key="close"
                                            initial={{ opacity: 0, rotate: -90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: 90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <X className="h-5 w-5 text-neutral-300" />
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="menu"
                                            initial={{ opacity: 0, rotate: 90 }}
                                            animate={{ opacity: 1, rotate: 0 }}
                                            exit={{ opacity: 0, rotate: -90 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <IconLayoutNavbarCollapse className="h-5 w-5 text-neutral-300" />
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </GlassSurface>
                        </motion.button>
                    </div>

                    {/* Bottom Area: Dock Items */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <div className="flex flex-col gap-3 pr-1">
                                {dockItems.map((item, idx) => (
                                    <motion.div
                                        key={item.title}
                                        initial={{ opacity: 0, y: -20, scale: 0.8 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                                        transition={{ 
                                            delay: idx * 0.05,
                                            type: "spring",
                                            stiffness: 300,
                                            damping: 20
                                        }}
                                    >
                                        {item.onClick ? (
                                            <button
                                                onClick={(e) => {
                                                    playClick();
                                                    item.onClick?.(e);
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                onMouseEnter={() => playHover()}
                                                className="h-10 w-10 rounded-full flex items-center justify-center bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-90 transition-transform"
                                            >
                                                <div className="h-4 w-4 text-neutral-200">
                                                    {item.icon}
                                                </div>
                                            </button>
                                        ) : (
                                            <Link
                                                href={item.href}
                                                onMouseEnter={() => playHover()}
                                                onClick={() => {
                                                    playClick();
                                                    setIsMobileMenuOpen(false);
                                                }}
                                                className="h-10 w-10 rounded-full flex items-center justify-center bg-neutral-900/80 backdrop-blur-md border border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)] active:scale-90 transition-transform"
                                            >
                                                <div className="h-4 w-4 text-neutral-200">
                                                    {item.icon}
                                                </div>
                                            </Link>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* AI Terminal Window */}
            <AITerminal isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />

            {/* CV Preview Window */}
            <CVWindow isOpen={isCVOpen} setIsOpen={setIsCVOpen} />

            {/* Bottom External Dock */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 hidden md:block">
                <FloatingDock items={dockItems} />
            </div>
        </>
    );
}
