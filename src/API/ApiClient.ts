import axios from "axios";
import { isTokenExpiringSoon } from "../helpers/JwtDecode";
import { rotateToken } from "./Authentication";
import { useNavigate } from "react-router-dom";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
})
apiClient.interceptors.request.use(async (config) => {
    const currentAccessToken = localStorage.getItem("AccessToken");
    const navigate = useNavigate()

    if (currentAccessToken && isTokenExpiringSoon(currentAccessToken)) {
        try {
            const newAccessToken = (await rotateToken(currentAccessToken)).data.newAccessToken
            localStorage.setItem("AccessToken", newAccessToken)
        } catch (err) {
            localStorage.clear();
            navigate("/login")
            return Promise.reject(err);
        }
    }

    if (currentAccessToken) {
        config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
})

export const authClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 30000
})
authClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("AccessToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})