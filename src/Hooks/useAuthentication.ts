import { useMutation } from "@tanstack/react-query"
import { login, logout } from "../API/Authentication"
import type { AxiosError } from "axios"
import type { IErrorInterface } from "../global/IErrorResponse"
import type { ILoginData, ILoginResponse } from "../global/IAuthentication"

export const useLogin = () => {
    return useMutation<ILoginResponse, AxiosError<IErrorInterface>, ILoginData>({
        mutationFn: login
    })
}
export const useLogout = () => {
    return useMutation({
        mutationFn: logout
    })
}