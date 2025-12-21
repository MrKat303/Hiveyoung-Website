"use client";

import { useEffect } from "react";

export default function DisableRightClick() {
    useEffect(() => {
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable right-click globally
        document.addEventListener('contextmenu', handleContextMenu);

        // Cleanup on unmount
        return () => {
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    return null;
}
