"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { useAnimationSettings } from "@/hooks/useAnimationSettings";

export const BackgroundParticles = () => {
    const [init, setInit] = useState(false);
    const { animationsEnabled, reducedMotion } = useAnimationSettings();

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = async (container?: Container): Promise<void> => {
        // console.log(container);
    };

    const options: ISourceOptions = useMemo(
        () => ({
            fpsLimit: reducedMotion ? 30 : 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: false,
                        mode: "push",
                    },
                    onHover: {
                        enable: !reducedMotion,
                        mode: "bubble",
                    },
                },
                modes: {
                    bubble: {
                        distance: 200,
                        duration: 2,
                        opacity: 0.8,
                        size: 3,
                        color: "#6366f1",
                    },
                },
            },
            particles: {
                color: {
                    value: "#6366f1",
                },
                links: {
                    color: "#6366f1",
                    distance: 150,
                    enable: true,
                    opacity: reducedMotion ? 0.08 : 0.15,
                    width: 1,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: reducedMotion ? 0.3 : 0.8,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                    },
                    value: reducedMotion ? 40 : 80,
                },
                opacity: {
                    value: reducedMotion ? 0.05 : 0.1,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: { min: 1, max: 2 },
                },
            },
            detectRetina: !reducedMotion,
        }),
        [reducedMotion]
    );

    if (!init || !animationsEnabled) {
        return null;
    }

    return (
        <Particles
            id="tsparticles"
            particlesLoaded={particlesLoaded}
            options={options}
            className="absolute inset-0 z-0"
        />
    );
};
