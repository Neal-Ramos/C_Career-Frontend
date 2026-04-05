import { useIdleTimer } from "react-idle-timer"
import { rotateToken } from "../API/Authentication"
import { useRef } from "react";


const useActivityTracker = () => {
    const logoutTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const handleActivity = async () => {
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
        logoutTimerRef.current = setTimeout(() => {
            console.log("5 mins passed - logging out");
            localStorage.clear();
            window.location.href = "/login";
        }, 5 * 60 * 1000);
    }

    useIdleTimer({
        timeout: 10 * 60 * 1000,
        onIdle: handleIdle,
        onActive: handleActivity,
        throttle: 1000,
    })
}
export default useActivityTracker