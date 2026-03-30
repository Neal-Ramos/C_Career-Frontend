import { useMutation } from "@tanstack/react-query"
import { login, verifyOtp, type ILoginData, type ILoginResponse, type IVerifyOtpData, type IVerifyOtpResponse } from "../API/Authentication"
import type { AxiosError } from "axios"
import type { IErrorInterface } from "../global/IErrorResponse"

export const useLogin = () => {
    return useMutation<ILoginResponse, AxiosError<IErrorInterface>, ILoginData>({
        mutationFn: login
    })
}
export const useVerifyOtp = () => {
    return useMutation<IVerifyOtpResponse, AxiosError<IErrorInterface>, IVerifyOtpData>({
        mutationFn: verifyOtp
    })
}