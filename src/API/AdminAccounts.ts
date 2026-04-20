import type { IAdminChangePasswordReq, IUpdateAdminAccountReq } from "../global/IAdminAccount"
import { apiClient } from "./ApiClient"


export const UpdateAdminAccount = async (data: IUpdateAdminAccountReq) => {
    return (await apiClient.put("/api/AdminAccount", data)).data
}
export const ChangePassword = async (data: IAdminChangePasswordReq): Promise<void> => {
    return (await apiClient.post("/api/AdminAccount/ChangePassword", data))
}