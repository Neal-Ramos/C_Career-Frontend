import { useMutation } from "@tanstack/react-query"
import { ChangePassword, UpdateAdminAccount } from "../API/AdminAccounts"
import type { AxiosError } from "axios"
import type { IAdminChangePasswordReq } from "../global/IAdminAccount"

export const useUpdateAdminAccount = () => {
    return useMutation({
        mutationFn: UpdateAdminAccount
    })
}
export const useAdminChangePassword = () => {
    return useMutation<void, AxiosError, IAdminChangePasswordReq>({
        mutationFn: ChangePassword
    })
}