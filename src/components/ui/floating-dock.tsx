"use client";

import { cn } from "@/lib/utils";
import {
    AnimatePresence,
    MotionValue,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
    items,
    activeHref,
    desktopClassName,
    mobileClassName,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    activeHref?: string;
    desktopClassName?: string;
    mobileClassName?: string;
}) => {
    return (
        <>
            <FloatingDockDesktop items={items} activeHref={activeHref} className={desktopClassName} />
            <FloatingDockMobile items={items} activeHref={activeHref} className={mobileClassName} />
        </>
    );
};

const FloatingDockMobile = ({
    items,
    activeHref,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    activeHref?: string;
    className?: string;
}) => {
    const [open, setOpen] = useState(false);
    return (
        <div className={cn("relative block md:hidden", className)}>
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                }}
                                exit={{
                                    opacity: 0,
                                    y: 10,
                                    transition: {
                                        delay: idx * 0.05,
                                    },
                                }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    key={item.title}
                                    className={cn(
                                        "h-10 w-10 rounded-full flex items-center justify-center transition-colors duration-200",
                                        activeHref === item.href
                                            ? "bg-emerald-500/20 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                                            : "bg-neutral-900/80 backdrop-blur-md border-white/10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                                    )}
                                >
                                    <div className={cn("h-4 w-4 transition-colors duration-300", activeHref === item.href ? "text-emerald-400" : "text-neutral-200")}>
                                        {item.icon}
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="h-12 w-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_15px_rgba(99,102,241,0.15)] flex items-center justify-center"
            >
                <IconLayoutNavbarCollapse className="h-6 w-6 text-neutral-300" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({
    items,
    activeHref,
    className,
}: {
    items: { title: string; icon: React.ReactNode; href: string }[];
    activeHref?: string;
    className?: string;
}) => {
    const mouseX = useMotionValue(Infinity);
    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className={cn(
                "mx-auto hidden md:flex h-16 gap-4 items-end rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.8),0_0_15px_rgba(99,102,241,0.15)] px-4 pb-3",
                className
            )}
        >
            {items.map((item) => (
                <IconContainer
                    mouseX={mouseX}
                    key={item.title}
                    active={activeHref === item.href}
                    {...item}
                />
            ))}
        </motion.div>
    );
};

function IconContainer({
    mouseX,
    title,
    icon,
    href,
    active,
}: {
    mouseX: MotionValue;
    title: string;
    icon: React.ReactNode;
    href: string;
    active?: boolean;
}) {
    const ref = useRef<HTMLDivElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

        return val - bounds.x - bounds.width / 2;
    });

    const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

    const widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
    const heightTransformIcon = useTransform(
        distance,
        [-150, 0, 150],
        [20, 40, 20]
    );

    const width = useSpring(widthTransform, {
        mass: 0.1,
        stiffness: 280,
        damping: 18,
    });
    const height = useSpring(heightTransform, {
        mass: 0.1,
        stiffness: 280,
        damping: 18,
    });

    const widthIcon = useSpring(widthTransformIcon, {
        mass: 0.1,
        stiffness: 280,
        damping: 18,
    });
    const heightIcon = useSpring(heightTransformIcon, {
        mass: 0.1,
        stiffness: 280,
        damping: 18,
    });

    const [hovered, setHovered] = useState(false);

    return (
        <Link href={href}>
            <motion.div
                ref={ref}
                style={{ width, height }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className={cn(
                    "aspect-square rounded-full border flex items-center justify-center relative shadow-inner",
                    active
                        ? "bg-gradient-to-b from-emerald-500/10 to-emerald-950/20 border-emerald-500/40 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
                        : "bg-gradient-to-b from-neutral-800/50 to-neutral-950/50 border-white/5 shadow-black/50"
                )}
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-900/90 backdrop-blur-md border border-white/10 text-white absolute left-1/2 -translate-x-1/2 -top-10 w-fit text-[10px] uppercase tracking-widest font-bold shadow-xl"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: widthIcon, height: heightIcon }}
                    className={cn(
                        "flex items-center justify-center transition-colors duration-300",
                        active ? "text-emerald-400" : "text-neutral-200"
                    )}
                >
                    {icon}
                </motion.div>
                {active && (
                    <motion.div
                        layoutId="active-indicator"
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-0.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                )}
            </motion.div>
        </Link>
    );
}

const IconLayoutNavbarCollapse = ({ className }: { className?: string }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="M4 6h16" />
            <path d="M4 12h16" />
            <path d="M4 18h16" />
        </svg>
    );
};
