"use client";

import useSound from "use-sound";

export const useUiSounds = () => {
    // Transitioned to local assets in /public/sounds/ to avoid 403 errors.
    const [playHover] = useSound("/sounds/hover.mp3", { volume: 0.2 });
    const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
    const [playNotify] = useSound("/sounds/notify.mp3", { volume: 0.4 });

    return { playHover, playClick, playNotify };
};
