import { useMutation } from "@tanstack/react-query"
import { UpdateAdminAccount } from "../API/AdminAccounts"

export const useUpdateAdminAccount = () => {
    return useMutation({
        mutationFn: UpdateAdminAccount
    })
}