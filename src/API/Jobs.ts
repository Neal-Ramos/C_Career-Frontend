import type { IAddJobReq, IUpdateJobReq } from "../global/IJobs"
import { apiClient } from "./ApiClient"

export const fetchJobs = async(Page: number, PageSize: number, Search?: string) => {
    return (await apiClient.get("/api/Jobs", {
        params:{
            Page: Page,
            PageSize: PageSize,
            Search: Search
        }
    })).data
}
export const fetchJobsById = async(jobGuid: string) => {
    return (await apiClient.get(`/api/Jobs/${jobGuid}`)).data
}

export const postJob = async (req: IAddJobReq) => {
    return (await apiClient.post(`/api/Jobs`, req)).data
}
export const updateJob = async (req: IUpdateJobReq) => {
    return (await apiClient.put("/api/Jobs", req)).data
}
export const deleteJob = async (jobId: string) => {
    return (await apiClient.delete("/api/Jobs", {
        data: {
            jobId
        }
    }))
}