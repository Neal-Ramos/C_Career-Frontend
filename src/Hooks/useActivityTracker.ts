import { useIdleTimer } from "react-idle-timer"
import { rotateToken } from "../API/Authentication"
import { useEffect, useRef } from "react";


const useActivityTracker = () => {
    const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleActivity = async () => {
        localStorage.removeItem("idleStart");
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
            logoutTimerRef.current = null;
        }
        const accessToken = localStorage.getItem("AccessToken")
        if(accessToken){
            try {
                localStorage.setItem("AccessToken", (
                    await rotateToken(accessToken)
                ).data.newAccessToken)
            } catch (error) {
                localStorage.clear();
                window.location.href = "/login";
            }
        }
    }
    const handleIdle = () => {
        localStorage.setItem("idleStart", Date.now().toString());
        logoutTimerRef.current = setTimeout(() => {
            console.log("5 mins passed - logging out");
            localStorage.clear();
            window.location.href = "/login";
        }, 5 * 60 * 1000);
    }

    useEffect(() => {
    const idleStart = localStorage.getItem("idleStart");
    if (idleStart) {
        const elapsed = Date.now() - parseInt(idleStart);
        const remaining = 5 * 60 * 1000 - elapsed;

        if (remaining <= 0) {
            localStorage.clear();
            window.location.href = "/login";
        } else {
            logoutTimerRef.current = setTimeout(() => {
                localStorage.clear();
                window.location.href = "/login";
            }, remaining);
        }
    }
    return () => {
        if (logoutTimerRef.current) {
            clearTimeout(logoutTimerRef.current);
        }
    };
    }, []);

    useIdleTimer({
        timeout: 8 * 60 * 1000,
        onIdle: handleIdle,
        onActive: handleActivity,
        throttle: 1000,
    })
}
export default useActivityTracker