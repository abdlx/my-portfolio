"use client";

import React, { useEffect, useState } from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { Home, Terminal, FlaskConical, Mail, Cpu, Github, Linkedin, MessageSquare } from "lucide-react";

const navItems = [
    {
        title: "Home",
        icon: <Home className="h-full w-full" />,
        href: "#home",
    },
    {
        title: "Systems",
        icon: <Terminal className="h-full w-full" />,
        href: "#projects",
    },
    {
        title: "The Arsenal",
        icon: <Cpu className="h-full w-full" />,
        href: "#knowledge-graph",
    },
    {
        title: "Lab",
        icon: <FlaskConical className="h-full w-full" />,
        href: "#lab",
    },
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

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-25% 0px -65% 0px", // Focus on the upper-middle of the screen
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

        // Define sections to observe from internal links
        const targetIds = navItems
            .map(item => item.href)
            .filter(href => href.startsWith("#"));

        targetIds.forEach((id) => {
            const element = document.querySelector(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <FloatingDock items={navItems} activeHref={activeSection} />
        </div>
    );
}
