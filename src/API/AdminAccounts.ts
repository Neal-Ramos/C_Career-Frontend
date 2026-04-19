import type { IUpdateAdminAccountReq } from "../global/IAdminAccount"
import { apiClient } from "./ApiClient"


export const UpdateAdminAccount = async (data: IUpdateAdminAccountReq) => {
    return (await apiClient.put("/api/AdminAccount", data)).data
}