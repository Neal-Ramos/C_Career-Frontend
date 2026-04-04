import { useQuery } from "@tanstack/react-query"
import { fetchJobs, fetchJobsById } from "../API/Jobs"
import type { FetchJobs, GetJobsByIdResponse } from "../global/IJobs"


export const useJobs = (Page: number, PageSize: number, Search?: string) => {
    return useQuery<FetchJobs>({
        queryKey: ["Jobs", Page, PageSize, Search],
        queryFn: () => fetchJobs(Page, PageSize, Search),
        staleTime: Search? 0:1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}
export const useJobsById = (jobGuid: string) => {
    return useQuery<GetJobsByIdResponse>({
        queryKey: ["jobById", jobGuid],
        queryFn: () => fetchJobsById(jobGuid),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}