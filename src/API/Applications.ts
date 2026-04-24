import type { PatchApplicationStatusReq } from "../global/IJobApplications"
import { apiClient } from "./ApiClient"

export const addApplication = async (formData: any) => {
    return (await apiClient.post("/api/Applications", formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })).data
}
export const GetApplications = async (
    Page: number, 
    PageSize: number, 
    Search?: string, 
    FilterStatus?: string
) => {
    return (await apiClient.get("/api/Applications", {
        params:{
            Page : Page,
            PageSize : PageSize,
            Search : Search,
            FilterStatus : FilterStatus,
        }
    })).data
}
export const GetApplicationsById = async (
    applicationId: string
) => {
    return (await apiClient.get(`/api/Applications/${applicationId}`)).data
}
export const PatchApplicationStatus = async ({status, applicationId, dateInterview, interviewRemarks}: PatchApplicationStatusReq) => {
    return (await apiClient.patch(`/api/Applications/${applicationId}`,{status, dateInterview, interviewRemarks})).data
}
export const GetApplicationFile = async (publicId: string): Promise<Blob> => {
    return (await apiClient.get(`/api/Applications/File`, {
        params: {
            PublicId: publicId
        },
        responseType: "blob"
    })).data
}