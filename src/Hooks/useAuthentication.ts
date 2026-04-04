import { useMutation } from "@tanstack/react-query"
import { login, type ILoginData, type ILoginResponse } from "../API/Authentication"
import type { AxiosError } from "axios"
import type { IErrorInterface } from "../global/IErrorResponse"

export const useLogin = () => {
    return useMutation<ILoginResponse, AxiosError<IErrorInterface>, ILoginData>({
        mutationFn: login
    })
}