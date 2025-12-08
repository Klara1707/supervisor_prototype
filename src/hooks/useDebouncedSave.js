import { useEffect, useRef } from "react";

const DEBOUNCE_DELAY = 500; // ms

export function useDebouncedSave(popupId, progressChecks, userToken) {
    const timeoutRef = useRef();

    useEffect(() => {
        if (!popupId) return;

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
        fetch("/api/training-progress/", {
            method: "POST",
            headers: {
            "Authorization": "Bearer " + userToken,
            "Content-Type": "application/json"
            },
            body: JSON.stringify({
            popup_id: popupId,
            checked_items: progressChecks
            })
        });
        }, DEBOUNCE_DELAY);

        return () => clearTimeout(timeoutRef.current);
    }, [progressChecks, popupId, userToken]);
}
