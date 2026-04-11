"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AnimationSettings {
    animationsEnabled: boolean;
    soundEnabled: boolean;
    reducedMotion: boolean;
}

interface AnimationSettingsContextType extends AnimationSettings {
    toggleAnimations: () => void;
    toggleSound: () => void;
    isHydrated: boolean;
}

const STORAGE_KEY = "portfolio-animation-settings";

const AnimationSettingsContext = createContext<AnimationSettingsContextType | null>(null);

export function AnimationSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AnimationSettings>({
        animationsEnabled: true,
        soundEnabled: true,
        reducedMotion: false,
    });
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const prefersReducedMotion = mediaQuery.matches;

        const savedSettings = localStorage.getItem(STORAGE_KEY);
        if (savedSettings) {
            try {
                const parsed = JSON.parse(savedSettings);
                setSettings({
                    animationsEnabled: parsed.animationsEnabled ?? true,
                    soundEnabled: parsed.soundEnabled ?? true,
                    reducedMotion: prefersReducedMotion,
                });
            } catch {
                setSettings({
                    animationsEnabled: true,
                    soundEnabled: true,
                    reducedMotion: prefersReducedMotion,
                });
            }
        } else {
            setSettings({
                animationsEnabled: true,
                soundEnabled: true,
                reducedMotion: prefersReducedMotion,
            });
        }

        const handleChange = (e: MediaQueryListEvent) => {
            setSettings((prev) => ({ ...prev, reducedMotion: e.matches }));
        };

        mediaQuery.addEventListener("change", handleChange);
        setIsHydrated(true);

        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    animationsEnabled: settings.animationsEnabled,
                    soundEnabled: settings.soundEnabled,
                })
            );
        }
    }, [settings.animationsEnabled, settings.soundEnabled, isHydrated]);

    const toggleAnimations = () => {
        setSettings((prev) => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
    };

    const toggleSound = () => {
        setSettings((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
    };

    const value: AnimationSettingsContextType = {
        ...settings,
        toggleAnimations,
        toggleSound,
        isHydrated,
    };

    return (
        React.createElement(AnimationSettingsContext.Provider, { value }, children)
    );
}

export function useAnimationSettings() {
    const context = useContext(AnimationSettingsContext);
    if (context === null) {
        throw new Error("useAnimationSettings must be used within AnimationSettingsProvider");
    }
    return context;
}
