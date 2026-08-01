"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Github, ArrowUpRight, Volume2, VolumeX, ShieldAlert } from "lucide-react";
import { useUiSounds } from "@/hooks/useUiSounds";

interface ImpactMetric {
    label: string;
    value: string;
}

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    stack: string[];
    imageUrl?: string;
    videoUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    impactMetrics?: ImpactMetric[];
    kpiHighlight?: string;
    isUnderDevelopment?: boolean;
    categories?: string[];
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const { playHover, playClick } = useUiSounds();
    const [isMuted, setIsMuted] = React.useState(true);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.documentElement.style.overflow = "hidden";
        } else {
            document.documentElement.style.overflow = "";
        }
        return () => {
            document.documentElement.style.overflow = "";
        };
    }, [isOpen]);

    // esc to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[96] flex items-center justify-center p-3 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#070707]/85 backdrop-blur-md"
                    />

                    {/* Dossier */}
                    <motion.div
                        initial={{ opacity: 0, y: 48 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 48 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="relative w-full max-w-6xl h-full max-h-[92vh] overflow-hidden bg-[#0b0b0c] hairline flex flex-col"
                    >
                        {/* header bar */}
                        <div className="flex items-center justify-between px-5 md:px-8 py-4 hairline-b shrink-0">
                            <span className="label text-[var(--muted)]">
                                CASE STUDY — {project.categories?.[0]?.toUpperCase() ?? "SYSTEM"}
                            </span>
                            <button
                                onClick={() => {
                                    playClick();
                                    onClose();
                                }}
                                onMouseEnter={() => playHover()}
                                data-cursor="CLOSE"
                                aria-label="Close case study"
                                className="p-2 hairline text-[var(--muted)] hover:text-[#070707] hover:bg-[var(--acid)] hover:border-[var(--acid)] transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Scrollable Area */}
                        <div className="overflow-y-auto" data-lenis-prevent>
                            {/* media */}
                            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-[#070707] group">
                                {project.imageUrl && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={project.imageUrl}
                                        alt=""
                                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                                    />
                                )}
                                {project.videoUrl ? (
                                    <>
                                        <video
                                            src={project.videoUrl}
                                            autoPlay
                                            loop
                                            muted={isMuted}
                                            playsInline
                                            poster={project.imageUrl}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsMuted(!isMuted);
                                                playClick();
                                            }}
                                            onMouseEnter={() => playHover()}
                                            aria-label={isMuted ? "Unmute video" : "Mute video"}
                                            className="absolute bottom-4 right-4 z-10 p-2.5 hairline bg-[#070707]/60 text-[var(--muted)] hover:text-[var(--acid)] transition-colors backdrop-blur-sm opacity-0 group-hover:opacity-100"
                                        >
                                            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                                        </button>
                                    </>
                                ) : !project.imageUrl ? (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-[var(--dim)] font-mono relative">
                                        <ShieldAlert className="w-10 h-10 mb-4 opacity-30" />
                                        <span className="tracking-[0.3em] opacity-50 animate-pulse text-xs">[ SIGNAL_LOST ]</span>
                                    </div>
                                ) : null}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c] via-transparent to-transparent pointer-events-none" />
                            </div>

                            {/* content */}
                            <div className="p-5 md:p-10 space-y-10">
                                {/* title row */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 hairline-b pb-8">
                                    <div className="space-y-4 min-w-0">
                                        <h2 className="font-display font-bold text-4xl md:text-6xl leading-[0.98] tracking-normal text-[var(--ink)]">
                                            {project.title}
                                        </h2>
                                        {project.isUnderDevelopment && (
                                            <span className="label text-[var(--signal)] flex items-center gap-2">
                                                <span className="h-[5px] w-[5px] rounded-full bg-[var(--signal)] pulse-dot" />
                                                IN ACTIVE DEVELOPMENT
                                            </span>
                                        )}
                                    </div>
                                    {project.kpiHighlight && (
                                        <div className="shrink-0 bg-[var(--acid)] text-[#070707] px-5 py-3">
                                            <span className="block font-mono text-[9px] font-bold uppercase tracking-[0.2em] mb-1 opacity-70">
                                                Key impact
                                            </span>
                                            <span className="font-display font-bold text-xl md:text-2xl whitespace-nowrap tabular-nums">
                                                {project.kpiHighlight}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                                    {/* left — deep dive */}
                                    <div className="md:col-span-2 space-y-8">
                                        <section>
                                            <h3 className="label text-[var(--acid)] mb-5">ENGINEERING DEEP DIVE</h3>
                                            <p className="text-[var(--muted)] leading-relaxed whitespace-pre-wrap text-base md:text-lg">
                                                {project.longDescription || project.description}
                                            </p>
                                        </section>

                                        <div className="pt-2 flex flex-wrap gap-3 items-center">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onMouseEnter={() => playHover()}
                                                    onClick={() => playClick()}
                                                    data-cursor="VISIT"
                                                    className="group inline-flex items-center gap-2 bg-[var(--acid)] text-[#070707] font-mono text-xs font-bold uppercase tracking-[0.16em] px-6 py-4 hover:bg-[var(--ink)] transition-colors"
                                                >
                                                    Explore product
                                                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onMouseEnter={() => playHover()}
                                                    onClick={() => playClick()}
                                                    className="inline-flex items-center gap-2 hairline text-[var(--ink)] font-mono text-xs uppercase tracking-[0.16em] px-6 py-4 hover:border-[var(--acid)] hover:text-[var(--acid)] transition-colors"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    View architecture
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* right — spec sheet */}
                                    <div className="space-y-px">
                                        {project.impactMetrics && project.impactMetrics.length > 0 && (
                                            <div className="hairline p-6 mb-4">
                                                <h4 className="label text-[var(--acid)] mb-5">MEASURED IMPACT</h4>
                                                <div className="space-y-4">
                                                    {project.impactMetrics.map((metric) => (
                                                        <div key={metric.label} className="flex items-baseline justify-between gap-4">
                                                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--dim)]">
                                                                {metric.label}
                                                            </span>
                                                            <span className="font-display font-bold text-sm text-[var(--ink)] text-right">
                                                                {metric.value}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="hairline p-6">
                                            <h4 className="label text-[var(--acid)] mb-5">TECH STACK</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="font-mono text-[10px] uppercase tracking-[0.1em] hairline text-[var(--muted)] px-2.5 py-1.5"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
