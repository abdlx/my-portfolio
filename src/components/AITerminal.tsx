"use client";

import React, { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { Terminal, X, ChevronRight, Send, User, Bot, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useUiSounds } from "@/hooks/useUiSounds";

export function AITerminal({
    isOpen,
    setIsOpen
}: {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void
}) {
    console.log("AITerminal isOpen:", isOpen);
    const { playHover, playClick, playNotify } = useUiSounds();
    const [input, setInput] = useState("");
    const { messages, sendMessage, status, stop } = useChat() as any;
    const isLoading = status === 'streaming' || status === 'submitting';
    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!input || isLoading) return;
        
        // Vercel AI SDK 4+ sendMessage handles the user message
        const currentInput = input;
        setInput(""); // Promptly clear input for better UX
        try {
            await sendMessage({ role: 'user', content: currentInput });
        } catch (err) {
            console.error("Failed to send message:", err);
            setInput(currentInput); // Restore on failure
        }
    };
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length > 0 && messages[messages.length - 1].role === 'assistant') {
            playNotify();
        }
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, playNotify]);

    const suggestions = [
        "What is Abdullah's tech stack?",
        "Tell me about his SaaS projects.",
        "What's his experience with AI?",
        "How do I hire him?"
    ];

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
                        className="relative w-full max-w-[650px] h-[750px] max-h-[85vh] bg-[#1c1c1e]/90 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] flex flex-col overflow-hidden"
                    >
                        {/* macOS Header */}
                        <div className="h-12 border-b border-white/5 bg-white/5 flex items-center px-5 relative flex-shrink-0 select-none">
                            {/* Traffic Lights */}
                            <div className="flex gap-2 group/lights z-10">
                                <button
                                    onClick={() => setIsOpen(false)}
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
                                    <Terminal size={14} className="text-neutral-500" />
                                    <span className="text-[13px] font-semibold text-neutral-400 font-sans tracking-wide">
                                        AI Clone Terminal — bash
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Chat Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-none"
                        >
                            {messages.length === 0 && (
                                <div className="space-y-8 py-4">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                                            <Bot className="text-indigo-400" size={24} />
                                        </div>
                                        <div className="space-y-2">
                                            <h3 className="text-white font-semibold text-lg">System Initialized</h3>
                                            <p className="text-neutral-400 text-sm leading-relaxed max-w-md">
                                                Abdullah's neural twin is online. Synthesized from repositories, publications, and strategic frameworks.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {suggestions.map((s) => (
                                            <button
                                                key={s}
                                                onClick={() => {
                                                    setInput(s);
                                                }}
                                                className="text-left p-4 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.08] hover:border-white/10 hover:translate-y-[-2px] transition-all duration-300 text-neutral-400 hover:text-white group"
                                            >
                                                <span className="text-[10px] block text-indigo-500 font-mono mb-1 uppercase tracking-wider">Execute Query</span>
                                                <span className="text-sm font-sans font-medium">{s}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(messages as any[]).map((m: any) => (
                                <div key={m.id} className={cn(
                                    "flex gap-4",
                                    m.role === 'user' ? "flex-row-reverse" : "flex-row"
                                )}>
                                    <div className={cn(
                                        "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                                        m.role === 'user'
                                            ? "bg-neutral-800 border-neutral-700"
                                            : "bg-indigo-500/10 border-indigo-500/20"
                                    )}>
                                        {m.role === 'user'
                                            ? <User className="text-neutral-400" size={14} />
                                            : <Bot className="text-indigo-400" size={14} />}
                                    </div>
                                    <div className={cn(
                                        "max-w-[85%] rounded-2xl px-5 py-3.5 text-sm leading-relaxed shadow-lg",
                                        m.role === 'user'
                                            ? "bg-indigo-600 text-white rounded-tr-none"
                                            : "bg-white/[0.04] border border-white/5 text-neutral-200 rounded-tl-none font-mono text-[13px]"
                                    )}>
                                        {m.role === 'assistant' && (
                                            <span className="text-indigo-400/40 block mb-2 text-[10px] font-mono tracking-tighter uppercase">Processor Output //</span>
                                        )}
                                        {m.content}
                                    </div>
                                </div>
                            ))}

                            {isLoading && (
                                <div className="flex items-center gap-3 text-indigo-400 px-2">
                                    <Loader2 size={16} className="animate-spin" />
                                    <span className="text-xs font-mono tracking-widest uppercase opacity-60">Neural Synthesis in progress...</span>
                                </div>
                            )}
                        </div>

                        {/* macOS style Input */}
                        <div className="p-6 md:p-8 bg-transparent border-t border-white/5 bg-white/[0.02]">
                            <form onSubmit={handleSubmit} className="relative group">
                                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center pointer-events-none opacity-40 group-focus-within:opacity-100 transition-opacity">
                                    <ChevronRight size={18} className="text-indigo-500" />
                                </div>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            // Handled by form onSubmit
                                        }
                                    }}
                                    placeholder="Ask a technical or professional question..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4.5 pl-12 pr-16 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/50 text-white font-mono text-[14px] transition-all placeholder:text-neutral-600 shadow-inner"
                                />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-20 flex items-center justify-center transition-all duration-300 text-white shadow-[0_5_15_rgba(79,70,229,0.4)] hover:scale-105 active:scale-95"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                            <div className="mt-4 flex items-center justify-between px-2">
                                <div className="flex gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.1em]">AI Engine Status: Optimal</span>
                                </div>
                                <span className="text-[10px] text-neutral-600 font-mono uppercase tracking-[0.1em]">v2.4.0-STABLE</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
