import type { AdminAccount } from "../Types/AdminAccounts"
import type { IResponse } from "./IResponse"

export interface IRotateTokenResponse extends IResponse {
    data:{
        newAccessToken: string
        adminAccount: AdminAccount
    }
}
export interface ILoginResponse extends IResponse {
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