"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
    children: React.ReactNode;
    className?: string;
    /** how far the element chases the pointer, 0–1 */
    strength?: number;
}

/**
 * Wraps any element so it's magnetically pulled toward the pointer
 * while hovered and springs back on leave.
 */
export function Magnetic({ children, className, strength = 0.35 }: MagneticProps) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

    const onMouseMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
    };

    const onMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            className={className}
            style={{ x: sx, y: sy, display: "inline-block" }}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </motion.div>
    );
}
