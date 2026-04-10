import { useIdleTimer } from "react-idle-timer"
import { rotateToken } from "../API/Authentication"
import { useEffect, useRef } from "react";

const idleTimeout = 15 * 60 * 1000
const tokenRotate = 14 * 60 * 1000

const useActivityTracker = () => {
    const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    const handleLogOut = async () => {
        console.log("handle logout fired")
        if(rotateTimerRef.current) clearTimeout(rotateTimerRef.current)
        localStorage.clear()
        window.location.href = "/login"
    }
    const rotateAccessToken = async () => {
        try {
            localStorage.setItem("AccessToken", (await rotateToken()).data.newAccessToken)
            rotateTimerRef.current = setTimeout(rotateAccessToken, tokenRotate)
        } catch (error) {
            handleLogOut()
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
        onIdle: () => {
            console.log("User idled for 15 minutes. Logging out...")
            handleLogOut()
        },
        debounce: 5000,
        crossTab: true
    })
}
export default useActivityTracker