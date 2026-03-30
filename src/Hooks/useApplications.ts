import { useMutation, useQuery } from "@tanstack/react-query"
import { addApplication, GetApplications } from "../API/JobApplications"
import type { FetchApplications } from "../global/IJobApplications"


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