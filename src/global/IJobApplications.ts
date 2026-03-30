import type { IJob } from "./IJobs"

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
    job : IJob
}
export interface FetchApplications{
    applications : IJobApplication[]
    totalPages : number
    totalRecords : number
}