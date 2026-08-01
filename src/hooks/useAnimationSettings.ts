"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AnimationSettings {
    animationsEnabled: boolean;
    reducedMotion: boolean;
}

interface AnimationSettingsContextType extends AnimationSettings {
    toggleAnimations: () => void;
    isHydrated: boolean;
}

const STORAGE_KEY = "portfolio-animation-settings";

const AnimationSettingsContext = createContext<AnimationSettingsContextType | null>(null);

const readStoredSettings = (prefersReducedMotion: boolean): AnimationSettings => {
    const fallback = {
        animationsEnabled: true,
        reducedMotion: prefersReducedMotion,
    };

    const savedSettings = localStorage.getItem(STORAGE_KEY);
    if (!savedSettings) return fallback;

    try {
        const parsed = JSON.parse(savedSettings) as Partial<AnimationSettings>;
        return {
            animationsEnabled: parsed.animationsEnabled ?? true,
            reducedMotion: prefersReducedMotion,
        };
    } catch {
        return fallback;
    }
};

export function AnimationSettingsProvider({ children }: { children: React.ReactNode }) {
    const [settings, setSettings] = useState<AnimationSettings>({
        animationsEnabled: true,
        reducedMotion: false,
    });
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        const frame = requestAnimationFrame(() => {
            setSettings(readStoredSettings(mediaQuery.matches));
            setIsHydrated(true);
        });

        const handleChange = (e: MediaQueryListEvent) => {
            setSettings((prev) => ({ ...prev, reducedMotion: e.matches }));
        };

        mediaQuery.addEventListener("change", handleChange);

        return () => {
            cancelAnimationFrame(frame);
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    useEffect(() => {
        if (isHydrated) {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({
                    animationsEnabled: settings.animationsEnabled,
                })
            );
        }
    }, [settings.animationsEnabled, isHydrated]);

    const toggleAnimations = () => {
        setSettings((prev) => ({ ...prev, animationsEnabled: !prev.animationsEnabled }));
    };

    const value: AnimationSettingsContextType = {
        ...settings,
        toggleAnimations,
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
