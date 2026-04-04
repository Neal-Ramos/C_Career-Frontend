import type { AdminAccount } from "../Types/AdminAccounts";
import apiClient from "./ApiClient";

export interface ILoginResponse {
    message: string
    data: AdminAccount
    meta: {
        AccessToken: string
        AccessTokenExpiration: Date
    }
}
export interface ILoginData {
    password: string
    username: string
    otpCode?: string
    remember: boolean
}
export const login = async (data: ILoginData): Promise<ILoginResponse> => {
    return (await apiClient.post("/api/Authentication/login", data)).data
}