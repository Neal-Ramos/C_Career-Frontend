import type { ILoginData, ILoginResponse, IRotateTokenResponse } from "../global/IAuthentication";
import { authClient } from "./ApiClient";


export const login = async (data: ILoginData): Promise<ILoginResponse> => {
    return (await authClient.post("/api/Authentication/login", data)).data
}
export const rotateToken = async(): Promise<IRotateTokenResponse> => {
    return (await authClient.post("/api/Authentication/rotateToken")).data
}
export const logout = async () => {
    return await authClient.post("/api/Authentication/logout")
}