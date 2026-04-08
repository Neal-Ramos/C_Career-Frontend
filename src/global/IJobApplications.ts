import type { Jobs } from "../Types/Jobs"


export interface IJobApplication{
    id : number
    applicationId : string
    firstName : string
    middleName : string
    lastName : string
    email : string
    contactNumber : string
    universityName : string
    degree : string
    graduationYear : number
    fileSubmitted : string
    status : string
    dateSubmitted : Date
    dateReviewed : Date
    jobId : string
    job : Jobs
}
export interface FetchApplications{
    applications : IJobApplication[]
    totalPages : number
    totalRecords : number
}