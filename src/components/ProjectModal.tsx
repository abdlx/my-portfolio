"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code2, Layers, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

interface Project {
    title: string;
    description: string;
    longDescription?: string;
    stack: string[];
    image: string;
    liveUrl?: string;
    githubUrl?: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
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
                        className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-neutral-950 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 border border-white/10 text-white hover:bg-neutral-800 transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        {/* Scrollable Area */}
                        <div className="overflow-y-auto custom-scrollbar">
                            {/* Hero Image */}
                            <div className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <motion.h2
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-3xl md:text-4xl font-bold text-white mb-2"
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
                                                className="px-2 py-1 rounded-md text-[10px] uppercase tracking-wider font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </motion.div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-6 md:p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                    {/* Left Column: Description */}
                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                                                <Code2 className="w-5 h-5 text-indigo-500" />
                                                Project Overview
                                            </h3>
                                            <p className="text-neutral-400 leading-relaxed whitespace-pre-wrap">
                                                {project.longDescription || project.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 flex flex-wrap gap-4">
                                            {project.liveUrl && (
                                                <a
                                                    href={project.liveUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-all group"
                                                >
                                                    <Globe className="w-4 h-4" />
                                                    View Live Project
                                                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                                </a>
                                            )}
                                            {project.githubUrl && (
                                                <a
                                                    href={project.githubUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition-all"
                                                >
                                                    <Github className="w-4 h-4" />
                                                    Source Code
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Right Column: Meta Info */}
                                    <div className="space-y-6">
                                        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800">
                                            <h4 className="text-sm font-semibold text-neutral-300 mb-4 flex items-center gap-2">
                                                <Layers className="w-4 h-4 text-emerald-500" />
                                                Key Technologies
                                            </h4>
                                            <div className="space-y-3">
                                                {project.stack.map((tech) => (
                                                    <div key={tech} className="flex items-center gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50" />
                                                        <span className="text-sm text-neutral-400 font-mono italic">{tech}</span>
                                                    </div>
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
