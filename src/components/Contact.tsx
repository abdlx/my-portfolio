"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowUp, Copy, Check } from "lucide-react";
import { Ticker } from "@/components/fx/Ticker";
import { Magnetic } from "@/components/fx/Magnetic";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { useUiSounds } from "@/hooks/useUiSounds";

const EMAIL = "mirzaabdulla300@gmail.com";

const SOCIALS = [
    { label: "GITHUB", href: "https://github.com/abdlx" },
    { label: "LINKEDIN", href: "https://www.linkedin.com/in/mirza-abdullah-baig-ai-dev/" },
    { label: "EMAIL", href: `mailto:${EMAIL}` },
];

function FooterClock() {
    const [time, setTime] = useState("--:--");
    useEffect(() => {
        const update = () =>
            setTime(
                new Intl.DateTimeFormat("en-GB", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                    timeZone: "Asia/Karachi",
                }).format(new Date())
            );
        update();
        const id = setInterval(update, 10_000);
        return () => clearInterval(id);
    }, []);
    return <span className="tabular-nums">{time}</span>;
}

export function Contact() {
    const [copied, setCopied] = useState(false);
    const { playHover, playClick } = useUiSounds();
    const sectionRef = useRef<HTMLElement>(null);

    // watermark parallax
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end end"],
    });
    const wmY = useTransform(scrollYProgress, [0, 1], ["40%", "0%"]);

    const copyEmail = async () => {
        playClick();
        try {
            await navigator.clipboard.writeText(EMAIL);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            window.location.href = `mailto:${EMAIL}`;
        }
    };

    return (
        <section id="contact" ref={sectionRef} className="relative overflow-hidden">
            {/* acid transmission band */}
            <Ticker
                className="bg-[var(--acid)] py-3 md:py-4"
                duration={22}
                separator={<span className="mx-6 md:mx-10 text-[#070707]">✺</span>}
                items={[
                    <span key="a" className="font-display font-bold text-lg md:text-2xl text-[#070707] uppercase">Available for work</span>,
                    <span key="b" className="font-serif-it text-lg md:text-2xl text-[#070707]">let&apos;s build something that thinks</span>,
                    <span key="c" className="font-mono text-sm md:text-base text-[#070707] uppercase tracking-widest">signal open</span>,
                ]}
            />

            <div className="relative px-6 md:px-12 lg:px-20 pt-24 md:pt-36 pb-16">
                <div className="flex items-center gap-3 mb-8">
                    <span className="h-[6px] w-[6px] bg-[var(--acid)]" />
                    <ScrambleText text="CH.07 — TRANSMIT" className="label" />
                </div>

                {/* headline */}
                <h2 className="font-display font-bold leading-[0.95] tracking-[-0.03em] text-[var(--ink)] text-[13vw] md:text-[8.5vw] mb-14 md:mb-20">
                    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
                        <motion.span
                            className="block"
                            initial={{ y: "112%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                        >
                            GOT A PROBLEM
                        </motion.span>
                    </span>
                    <span className="block overflow-hidden pb-[0.12em]">
                        <motion.span
                            className="block"
                            initial={{ y: "112%" }}
                            whileInView={{ y: 0 }}
                            viewport={{ once: true, margin: "-10% 0px" }}
                            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                        >
                            WORTH <em className="font-serif-it font-normal text-[var(--acid)] tracking-normal">solving?</em>
                        </motion.span>
                    </span>
                </h2>

                {/* actions */}
                <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-14">
                    <Magnetic strength={0.25}>
                        <a
                            href={`mailto:${EMAIL}`}
                            onMouseEnter={() => playHover()}
                            onClick={() => playClick()}
                            data-cursor="SEND"
                            className="group inline-flex items-center gap-3 bg-[var(--acid)] text-[#070707] font-mono text-xs md:text-sm font-bold uppercase tracking-[0.18em] px-8 py-5 hover:bg-[var(--ink)] transition-colors"
                        >
                            Start a project
                            <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    </Magnetic>

                    <button
                        onClick={copyEmail}
                        onMouseEnter={() => playHover()}
                        data-cursor="COPY"
                        className="group text-left"
                        aria-label="Copy email address"
                    >
                        <span className="label block mb-2">
                            {copied ? (
                                <span className="text-[var(--acid)] flex items-center gap-2">
                                    <Check className="h-3 w-3" /> COPIED TO CLIPBOARD
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Copy className="h-3 w-3" /> OR COPY THE ADDRESS
                                </span>
                            )}
                        </span>
                        <span className="font-mono text-base md:text-2xl text-[var(--ink)] border-b border-[var(--line)] group-hover:border-[var(--acid)] group-hover:text-[var(--acid)] transition-colors pb-1 break-all">
                            {EMAIL}
                        </span>
                    </button>
                </div>
            </div>

            {/* footer */}
            <footer className="relative px-6 md:px-12 lg:px-20 pt-16 pb-8">
                <div className="hairline-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start relative z-10">
                    <div className="label leading-relaxed">
                        © {new Date().getFullYear()} ABDULLAH
                        <br />
                        <span className="text-[var(--dim)]">ENGINEERED, NOT DECORATED.</span>
                    </div>

                    <div className="flex md:justify-center gap-8">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target={social.href.startsWith("http") ? "_blank" : undefined}
                                rel="noopener noreferrer"
                                onMouseEnter={() => playHover()}
                                onClick={() => playClick()}
                                className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
                            >
                                {social.label}
                                <ArrowUpRight className="h-3 w-3" />
                            </a>
                        ))}
                    </div>

                    <div className="flex md:justify-end items-center gap-8">
                        <span className="label text-[var(--dim)]">
                            KHI <FooterClock /> GMT+5
                        </span>
                        <button
                            onClick={() => {
                                playClick();
                                window.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                            onMouseEnter={() => playHover()}
                            data-cursor="TOP"
                            className="label text-[var(--muted)] hover:text-[var(--acid)] transition-colors flex items-center gap-1"
                        >
                            BACK TO SIGNAL <ArrowUp className="h-3 w-3" />
                        </button>
                    </div>
                </div>

                {/* giant watermark */}
                <motion.div
                    aria-hidden="true"
                    style={{ y: wmY }}
                    className="relative mt-10 select-none pointer-events-none text-center"
                >
                    <span className="font-display font-bold text-[18.5vw] leading-[0.8] text-stroke whitespace-nowrap">
                        ABDULLAH
                    </span>
                </motion.div>
            </footer>
        </section>
    );
}
