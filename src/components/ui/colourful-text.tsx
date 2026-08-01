"use client";
import React from "react";
import { motion } from "motion/react";

const COLORS = [
    "rgb(45, 212, 191)", // Mint
    "rgb(34, 211, 238)", // Cyan
    "rgb(59, 130, 246)", // Blue
    "rgb(129, 140, 248)", // Indigo
    "rgb(167, 139, 250)", // Violet
    "rgb(34, 211, 238)", // Cyan (Repeat for distribution)
];

export function ColourfulText({ text }: { text: string }) {
    const [currentColors, setCurrentColors] = React.useState(COLORS);
    const [count, setCount] = React.useState(0);
    const [isMounted, setIsMounted] = React.useState(false);

    React.useEffect(() => {
        setIsMounted(true);
        const interval = setInterval(() => {
            const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
            setCurrentColors(shuffled);
            setCount((prev) => prev + 1);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    if (!isMounted) {
        return text.split("").map((char, index) => (
            <span key={`${char}-${index}`} className="inline-block whitespace-pre font-sans tracking-tight">
                {char}
            </span>
        ));
    }

    return text.split("").map((char, index) => (
        <motion.span
            key={`${char}-${count}-${index}`}
            initial={{ y: 0 }}
            animate={{
                color: currentColors[index % currentColors.length],
                y: [0, -3, 0],
                scale: [1, 1.01, 1],
                filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
                opacity: [1, 0.8, 1],
            }}
            transition={{
                duration: 0.5,
                delay: index * 0.05,
            }}
            className="inline-block whitespace-pre font-sans tracking-tight"
        >
            {char}
        </motion.span>
    ));
}
