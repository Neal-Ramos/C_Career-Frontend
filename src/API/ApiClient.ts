import axios from "axios";


export const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    timeout: 30000,
})
apiClient.interceptors.request.use(async (config) => {
    const currentAccessToken = localStorage.getItem("AccessToken");
    if (currentAccessToken) {
        config.headers.Authorization = `Bearer ${currentAccessToken}`;
    }

    return config;
})
apiClient.interceptors.response.use(async (config) => {
    if(config.status === 401){
        window.location.href = "/login"
    }

    return config
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