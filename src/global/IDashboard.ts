import type { IResponse } from "./IResponse";

export interface IAdminDashboardRes extends IResponse{
    data: {
        totalApplication: number
        totalPendingApplication: number
        totalAcceptedApplication: number
        totalJobs: number
    }
}