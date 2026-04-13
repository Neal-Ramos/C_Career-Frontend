import type { Jobs } from "../Types/Jobs"
import type { IResponse } from "./IResponse"

export interface GetJobsByIdResponse {
    message: string
    data: Jobs
    error: unknown
    meta: Record<string, string>
}
export interface FetchJobs extends IResponse{
    data: Jobs[]
    meta: {
        TotalRecords: number
        TotalPages: number
    }
}
export interface IAddJobReq {
    title: string
    description: string
    roles: string
    customFields: string
    fileRequirements: string
}
export interface IUpdateJobReq extends IAddJobReq {
    jobId: string
    editSummary: string
}