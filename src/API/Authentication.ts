import type { AdminAccount } from "../Types/AdminAccounts";
import { authClient } from "./ApiClient";

export interface ILoginResponse {
    message: string
    data: AdminAccount
    meta: {
        AccessToken: string
    }
}
export interface ILoginData {
    password: string
    username: string
    otpCode?: string
    remember: boolean
}
export const login = async (data: ILoginData): Promise<ILoginResponse> => {
    return (await authClient.post("/api/Authentication/login", data)).data
}

export interface IRotateTokenResponse {
    data:{
        newAccessToken: string
    }
}

export const rotateToken = async(AccessToken: string): Promise<IRotateTokenResponse> => {
    return (await authClient.post("/api/Authentication/rotateToken", {AccessToken: AccessToken},
        {
            withCredentials: true,
            headers: {
                Authorization: `bearer: ${AccessToken}`
            }
        },
    )).data
}