"use client";

import React from "react";
import { FileText, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useUiSounds } from "@/hooks/useUiSounds";

export function CVWindow({ 
    isOpen, 
    setIsOpen 
}: { 
    isOpen: boolean; 
    setIsOpen: (open: boolean) => void 
}) {
    const { playHover, playClick } = useUiSounds();
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Mac Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-[900px] h-[850px] max-h-[90vh] bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
                    >
                        {/* macOS Header */}
                        <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-5 relative flex-shrink-0 select-none">
                            {/* Traffic Lights */}
                            <div className="flex gap-2 group/lights z-10">
                                <button 
                                    onClick={() => {
                                        playClick();
                                        setIsOpen(false);
                                    }}
                                    onMouseEnter={() => playHover()}
                                    className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center overflow-hidden"
                                >
                                    <X className="w-2 h-2 text-black/60 opacity-0 group-hover/lights:opacity-100 transition-opacity" />
                                </button>
                                <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]" />
                                <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]" />
                            </div>
                            
                            {/* Centered Title */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="flex items-center gap-2">
                                    <FileText size={14} className="text-neutral-500" />
                                    <span className="text-[13px] font-semibold text-neutral-400 font-sans tracking-wide">
                                        abdullah-cv.pdf — Preview
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="ml-auto z-10 flex items-center gap-4">
                                <a 
                                    href="/abdullah-cv/index.html" 
                                    target="_blank"
                                    onMouseEnter={() => playHover()}
                                    onClick={() => playClick()}
                                    className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2 text-xs font-medium"
                                >
                                    <ExternalLink size={14} />
                                    <span>Open Full</span>
                                </a>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 bg-white overflow-hidden relative">
                             <iframe 
                                src="/abdullah-cv/index.html" 
                                title="Abdullah CV"
                                className="w-full h-full border-none"
                                loading="lazy"
                            />
                        </div>

                        {/* Footer / Status */}
                        <div className="h-8 bg-neutral-900/50 border-t border-white/5 flex items-center justify-between px-4 text-[10px] text-neutral-500 font-mono uppercase tracking-[0.1em]">
                            <span>1 of 1 pages</span>
                            <span>Secure Document Viewer</span>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
