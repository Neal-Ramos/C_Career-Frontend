import type { IAdminDashboardRes } from "../global/IDashboard"
import { apiClient } from "./ApiClient"

export const AdminDashboard = async (): Promise<IAdminDashboardRes> => {
    return (await apiClient.get("/api/Dashboard", {})).data
}