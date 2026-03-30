import axios from "axios";

export interface ILoginResponse {
    adminId: string
    email: string
    userNAme: string
}
export interface ILoginData {
    password: string
    username: string
    remember: boolean
}
export const login = async (data: ILoginData): Promise<ILoginResponse> => {
    return (await axios.post(`${import.meta.env.VITE_API_URL}/api/Authentication/Login`, data)).data.data
}

export interface IVerifyOtpResponse {
    accessToken: string
    accessTokenEpiry: string
}
export interface IVerifyOtpData{
    code: string
    email: string
}
export const verifyOtp = async (data: IVerifyOtpData): Promise<IVerifyOtpResponse> => {
    return (await axios.post(`${import.meta.env.VITE_API_URL}/api/Authentication/VerifyOtp`, data)).data.data
}