import apiClient from "./ApiClient"

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
    FilterEmail?: string, 
    FilterJob?: string, 
    FilterStatus?: string
) => {
    const res = await apiClient.get("/api/Applications", {
        params:{
            Page : Page,
            PageSize : PageSize,
            FilterEmail : FilterEmail,
            FilterJob : FilterJob,
            FilterStatus : FilterStatus,
        }
    })
    return res.data.data
}