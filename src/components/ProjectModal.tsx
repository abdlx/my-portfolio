"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code2, Layers, Globe, Zap, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUiSounds } from "@/hooks/useUiSounds";
import { Play, Pause, Volume2, VolumeX, Maximize2, Activity, ShieldAlert, Cpu } from "lucide-react";

interface ImpactMetric {
    label: string;
    value: string;
}

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    stack: string[];
    videoUrl?: string;
    liveUrl?: string;
    githubUrl?: string;
    impactMetrics?: ImpactMetric[];
    kpiHighlight?: string;
    isUnderDevelopment?: boolean;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const { playHover, playClick } = useUiSounds();
    const [isMuted, setIsMuted] = React.useState(true);
    const [isPlaying, setIsPlaying] = React.useState(true);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    if (!project) return null;

    const TerminalVideoPlayer = ({ videoUrl, title }: { videoUrl: string; title: string }) => {
        const videoRef = React.useRef<HTMLVideoElement>(null);

        useEffect(() => {
            if (videoRef.current) {
                videoRef.current.muted = isMuted;
            }
        }, [isMuted]);

        return (
            <div className="relative w-full h-full bg-black group">
                <video
                    ref={videoRef}
                    src={videoUrl}
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    className="w-full h-full object-cover"
                />

                {/* Minimalist Audio Toggle */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMuted(!isMuted);
                        playClick();
                    }}
                    onMouseEnter={() => playHover()}
                    className="absolute bottom-4 right-4 z-50 p-2.5 rounded-full bg-black/40 border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all backdrop-blur-sm opacity-0 group-hover:opacity-100"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
            </div>
        );
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[95vw] lg:max-w-7xl h-full max-h-[95vh] overflow-hidden bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => {
                                playClick();
                                onClose();
                            }}
                            onMouseEnter={() => playHover()}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Scrollable Area */}
                        <div className="overflow-y-auto custom-scrollbar">
                            {/* Hero Image */}
                            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden bg-black">
                                {project.videoUrl ? (
                                    <TerminalVideoPlayer videoUrl={project.videoUrl} title={project.title} />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-neutral-800 font-mono bg-neutral-950/50 relative">
                                        <ShieldAlert className="w-12 h-12 mb-4 opacity-20" />
                                        <span className="tracking-[0.3em] opacity-40 animate-pulse">[ SIGNAL_LOST ]</span>
                                        <div className="absolute inset-0 border border-white/5 m-4" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/10 to-transparent pointer-events-none z-40" />

                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12 space-y-12">
                                {/* Project Header Info - Moved out of overlay */}
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-12">
                                    <div className="space-y-4">
                                        <motion.h2
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="text-3xl md:text-6xl font-bold text-white tracking-tight"
                                        >
                                            {project.title}
                                        </motion.h2>
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.1 }}
                                            className="flex flex-wrap gap-2"
                                        >
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-white/5 text-neutral-400 border border-white/10"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </motion.div>
                                    </div>

                                    {project.kpiHighlight && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="flex flex-col items-end"
                                        >
                                            <div className="px-6 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex flex-col items-end backdrop-blur-sm">
                                                <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-500/60 font-mono mb-1">Key Impact</span>
                                                <span className="text-2xl md:text-3xl font-bold text-white whitespace-nowrap tabular-nums">{project.kpiHighlight}</span>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-300">
                                    {/* Left Column: Description */}
                                    <div className="md:col-span-2 space-y-8">
                                        <section>
                                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                                <Code2 className="w-5 h-5 text-indigo-500" />
                                                Engineering Deep Dive
                                            </h3>
                                            <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap font-sans text-lg">
                                                {project.longDescription || project.description}
                                            </p>
                                        </section>


                                        <div className="pt-4 flex flex-wrap gap-4 items-center">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onMouseEnter={() => playHover()}
                                                    onClick={() => playClick()}
                                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-black font-semibold hover:bg-neutral-200 transition-all group"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    Explore Product
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    onMouseEnter={() => playHover()}
                                                    onClick={() => playClick()}
                                                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 text-white font-medium transition-all"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    View Architecture
                                                </a>
                                            )}
                                            {project.isUnderDevelopment && (
                                                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500/5 border border-amber-500/20 text-amber-500 font-mono text-sm tracking-wider uppercase">
                                                    <Zap className="w-4 h-4" />
                                                    Under Development
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column: Meta Info */}
                                    <div className="space-y-6">
                                        <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 space-y-6">
                                            <div>
                                                <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-4 flex items-center gap-2">
                                                    <Zap className="w-3.5 h-3.5" />
                                                    Tech Stack
                                                </h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.stack.map((tech) => (
                                                        <span key={tech} className="text-[11px] font-mono text-neutral-400">
                                                            // {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="pt-4 border-t border-white/5">
                                                <h4 className="text-xs font-mono uppercase tracking-widest text-emerald-400 mb-4 flex items-center gap-2">
                                                    <Target className="w-3.5 h-3.5" />
                                                    Core Objectives
                                                </h4>
                                                <ul className="space-y-2">
                                                    <li className="text-xs text-neutral-500 flex items-start gap-2">
                                                        <span className="text-emerald-500 mt-0.5">▹</span>
                                                        Scalable Performance
                                                    </li>
                                                    <li className="text-xs text-neutral-500 flex items-start gap-2">
                                                        <span className="text-emerald-500 mt-0.5">▹</span>
                                                        AI-First Architecture
                                                    </li>
                                                    <li className="text-xs text-neutral-500 flex items-start gap-2">
                                                        <span className="text-emerald-500 mt-0.5">▹</span>
                                                        High Reliability Swarms
                                                    </li>
                                                </ul>
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
