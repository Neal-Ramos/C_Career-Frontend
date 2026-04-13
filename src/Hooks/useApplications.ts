import { useMutation, useQuery } from "@tanstack/react-query"
import { addApplication, GetApplications, GetApplicationsById } from "../API/JobApplications"
import type { FetchApplications, GetApplicationsByIdResponse } from "../global/IJobApplications"


export const AddApplication = () => {
    return useMutation({
        mutationFn: addApplication
    }) 
}
export const useApplication = (
    Page: number, 
    PageSize: number, 
    FilterEmail?: string, 
    FilterJob?: string, 
    FilterStatus?: string
) => {
    return useQuery<FetchApplications>({
        queryKey: [
            ["GetApplications"],
            Page,
            PageSize,
            FilterEmail,
            FilterJob,
            FilterStatus,
        ],
        queryFn: () => GetApplications(
            Page,
            PageSize,
            FilterEmail,
            FilterJob,
            FilterStatus,
        ),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}
export const useApplicationById = (
    applicationId: string
) => {
    return useQuery<GetApplicationsByIdResponse>({
        queryKey: [["GetApplications"], applicationId],
        queryFn: () => GetApplicationsById(applicationId),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
    })
}