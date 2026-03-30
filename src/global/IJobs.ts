export interface    IJob {
    applicants?: string,
    dateCreated: string,
    description: string,
    fileRequirements: string,
    id: number,
    jobId: string,
    roles: string,
    title: string,
}
export interface FetchJobs{
    jobs: IJob[]
    totalPages: number,
    totalRecords: number
}