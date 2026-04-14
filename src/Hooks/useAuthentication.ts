import { useMutation } from "@tanstack/react-query"
import { login } from "../API/Authentication"
import type { AxiosError } from "axios"
import type { IErrorInterface } from "../global/IErrorResponse"
import type { ILoginData, ILoginResponse } from "../global/IAuthentication"

export const useLogin = () => {
    return useMutation<ILoginResponse, AxiosError<IErrorInterface>, ILoginData>({
        mutationFn: login
    })
}