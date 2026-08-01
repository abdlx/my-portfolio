"use client";

import { useAnimationSettings } from "./useAnimationSettings";

export const useHaptics = () => {
    const { animationsEnabled } = useAnimationSettings();

    const triggerHaptic = (pattern: number | number[]) => {
        if (!animationsEnabled || typeof window === "undefined" || !("vibrate" in navigator)) {
            return;
        }

        try {
            navigator.vibrate(pattern);
        } catch {
            // Silently fail if vibration not supported or denied
        }
    };

    const playHover = () => {
        // Light haptic for hover
        triggerHaptic(5);
    };

    const playClick = () => {
        // Stronger haptic for click
        triggerHaptic(15);
    };

    const playNotify = () => {
        // Pattern for notifications
        triggerHaptic([10, 50, 10]);
    };

    return { playHover, playClick, playNotify };
};
