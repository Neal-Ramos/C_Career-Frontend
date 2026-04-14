import { useIdleTimer } from "react-idle-timer"
import { rotateToken } from "../API/Authentication"
import { useEffect, useRef } from "react";
import { useAdminStore } from "../store/useAdminStore";

const idleTimeout = 15 * 60 * 1000
const tokenRotate = 14 * 60 * 1000

const useActivityTracker = () => {
    const { clearAdminContext } = useAdminStore()
    const rotateTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    
    const handleLogOut = async () => {
        if(rotateTimerRef.current) clearTimeout(rotateTimerRef.current)
        clearAdminContext()
        localStorage.clear()
        window.location.href = "/login"
    }
    const rotateAccessToken = async () => {
        try {
            const rotate = (await rotateToken()).data
            
            localStorage.setItem("AccessToken", rotate.newAccessToken)
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
            handleLogOut()
        },
        debounce: 5000,
        crossTab: true
    })
}
export default useActivityTracker