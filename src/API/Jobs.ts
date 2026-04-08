import type { IAddJobReq } from "../global/IJobs"
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