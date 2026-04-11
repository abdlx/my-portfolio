"use client";

import useSound from "use-sound";
import { useAnimationSettings } from "./useAnimationSettings";

export const useUiSounds = () => {
    const { soundEnabled } = useAnimationSettings();

    // Transitioned to local assets in /public/sounds/ to avoid 403 errors.
    const [playHover] = useSound("/sounds/hover.mp3", { 
        volume: 0.2,
        soundEnabled,
    });
    const [playClick] = useSound("/sounds/click.mp3", { 
        volume: 0.5,
        soundEnabled,
    });
    const [playNotify] = useSound("/sounds/notify.mp3", { 
        volume: 0.4,
        soundEnabled,
    });

    return { playHover, playClick, playNotify };
};
