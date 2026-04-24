import { useMutation, useQuery } from "@tanstack/react-query"
import { addApplication, GetApplicationFile, GetApplications, GetApplicationsById, PatchApplicationStatus } from "../API/Applications"
import type { FetchApplications, GetApplicationsByIdResponse, PatchApplicationStatusReq } from "../global/IJobApplications"
import type { AxiosError } from "axios"


export const useAddApplication = () => {
    return useMutation({
        mutationFn: addApplication
    }) 
}
export const useApplication = (
    Page: number, 
    PageSize: number, 
    Search?: string,
    FilterStatus?: string
) => {
    return useQuery<FetchApplications>({
        queryKey: [
            ["GetApplications"],
            Page,
            PageSize,
            Search,
            FilterStatus,
        ],
        queryFn: () => GetApplications(
            Page,
            PageSize,
            Search,
            FilterStatus,
        ),
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
    })
}
export const useApplicationById = (
    applicationId: string
) => {
    return useQuery<GetApplicationsByIdResponse>({
        queryKey: [["GetApplications"], applicationId],
        queryFn: () => GetApplicationsById(applicationId),
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
    })
}
export const useGetApplicationFile = (publicId: string, showFileModal: boolean) => {
    return useQuery({
        queryKey: ["file", publicId],
        queryFn: () => GetApplicationFile(publicId),
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
        enabled: showFileModal && !!publicId
    })
}
export const usePatchApplicationStatus = () => {
    return useMutation<void, AxiosError, PatchApplicationStatusReq>({
        mutationFn: PatchApplicationStatus
    })
}