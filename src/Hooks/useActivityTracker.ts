import { useIdleTimer } from "react-idle-timer"
import { rotateToken } from "../API/Authentication"
import { useEffect, useRef } from "react";

const idleTimeout = 15 * 60 * 1000


const useActivityTracker = () => {
    const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    const logout = () => {
        if(rotateTimerRef.current) clearTimeout(rotateTimerRef.current)
        localStorage.clear()
        window.location.href = "/login"
    }
    const rotateAccessToken = async () => {
        try {
            localStorage.setItem("AccessToken", (await rotateToken()).data.newAccessToken)
            rotateTimerRef.current = setTimeout(rotateAccessToken, idleTimeout - 10 * 60 * 1000)
        } catch (error) {
            logout()
        }
    }

    useEffect(() => {
        rotateAccessToken()
        return () => {
            if(rotateTimerRef.current) clearTimeout(rotateTimerRef.current)
        }
    }, [])

    useIdleTimer({
        timeout: idleTimeout,
        onIdle: logout
    })
}
export default useActivityTracker