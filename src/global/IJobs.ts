import type { Jobs } from "../Types/Jobs"

export interface GetJobsByIdResponse {
    message: string
    data: Jobs
    error: unknown
    meta: Record<string, string>
}
export interface FetchJobs{
    data: Jobs[]
    error: unknown,
    message: string
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