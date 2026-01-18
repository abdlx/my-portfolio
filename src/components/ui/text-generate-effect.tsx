"use client";
import { useEffect, useState } from "react";
import { motion, stagger, useAnimate } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
}) => {
    const [scope, animate] = useAnimate();
    const [isClient, setIsClient] = useState(false);
    const wordsArray = words.split(" ");

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (isClient) {
            animate(
                "span",
                {
                    opacity: 1,
                    filter: filter ? "blur(0px)" : "none",
                },
                {
                    duration: duration ? duration : 1,
                    delay: stagger(0.1),
                }
            );
        }
    }, [scope.current, isClient, animate, duration, filter]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className={cn(
                                "opacity-0",
                                filter ? "blur-sm" : ""
                            )}
                            style={{
                                filter: filter ? "blur(10px)" : "none",
                            }}
                        >
                            {word}{" "}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn("font-normal", className)}>
            <div className="mt-4">
                <div className="text-neutral-300 text-base md:text-lg leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
