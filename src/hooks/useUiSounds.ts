"use client";

import { useHaptics } from "./useHaptics";

export const useUiSounds = () => {
    const haptics = useHaptics();
    return haptics;
};
