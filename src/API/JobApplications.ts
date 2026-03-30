import axios from "axios"

export const addApplication = async (formData: any) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/AddApplication`, formData, {
        headers:{
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}
export const GetApplications = async (
    Page: number, 
    PageSize: number, 
    FilterEmail?: string, 
    FilterJob?: string, 
    FilterStatus?: string
) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/JobApplications/GetApplications`, {
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