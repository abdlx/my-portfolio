"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code2, Layers, Globe, Zap, BarChart3, Target } from "lucide-react";
import { cn } from "@/lib/utils";
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
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    impactMetrics?: ImpactMetric[];
    kpiHighlight?: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const { playHover, playClick } = useUiSounds();
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
                            <div className="relative w-full aspect-[4/3] md:aspect-[21/9] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                                        <div>
                                            <motion.h2
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 }}
                                                className="text-3xl md:text-5xl font-bold text-white mb-3"
                                            >
                                                {project.title}
                                            </motion.h2>
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.2 }}
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
                                                transition={{ delay: 0.3 }}
                                                className="flex flex-col items-end"
                                            >
                                                <div className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex flex-col items-end">
                                                    <span className="text-[10px] uppercase tracking-widest text-emerald-500 font-mono mb-1">Key Impact</span>
                                                    <span className="text-xl md:text-2xl font-bold text-white whitespace-nowrap">{project.kpiHighlight}</span>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 md:p-12 space-y-12">
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


                                        <div className="pt-4 flex flex-wrap gap-4">
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
