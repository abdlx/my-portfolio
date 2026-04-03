"use client";

import React, { useEffect, useState, useMemo } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Terminal, FlaskConical, Mail, Cpu, Github, Linkedin, MessageSquare, FileText, Bot } from "lucide-react";
import GlassSurface from "./GlassSurface";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { AITerminal } from "./AITerminal";
import { CVWindow } from "./CVWindow";

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

const externalItems = [
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
            {/* Top Glass Navbar */}
            <div className="fixed top-8 left-1/2 -translate-x-1/2 z-50">
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
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </GlassSurface>
            </div>

            {/* AI Terminal Window */}
            <AITerminal isOpen={isTerminalOpen} setIsOpen={setIsTerminalOpen} />

            {/* CV Preview Window */}
            <CVWindow isOpen={isCVOpen} setIsOpen={setIsCVOpen} />

            {/* Bottom External Dock */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                <FloatingDock items={dockItems} />
            </div>
        </>
    );
}
