import axios from "axios"


export const fetchJobs = async(Page: number, PageSize: number, Search?: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/Jobs/GetJobs`, {
        params:{
            Page: Page,
            PageSize: PageSize,
            Search: Search
        }
    })
    return res.data.data
}

export const fetchJobsById = async(jobGuid: string) => {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/Jobs/GetJobById`,{
        params: {
            JobId: jobGuid
        }
    })
    return res.data.data
}