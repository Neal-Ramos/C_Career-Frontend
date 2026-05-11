import type { ApplicantInterview } from "./ApplicantInterviewsType"
import type { Jobs } from "./Jobs"

export type Application = {
    applicationId: string
    firstName: string
    middleName: string
    lastName: string
    email: string
    contactNumber: string
    universityName: string
    degree: string
    customFields: string
    graduationYear: number
    fileSubmitted: string
    status: string
    dateSubmitted: string
    dateReviewed: string
    jobId: string
    job: Jobs
    aiResults?: string
    interviewRemarks: string
    interviews?: ApplicantInterview[]
}
export type ParsedAiResultApplication = {
    Verdict: "Pass" | "Fail"
    Score: number
    Reason: string
    InterviewSuggestion: string
}
export type ParsedFileSubmittedApplication = {
    DocumentName: string
    FileName: string
    ContentType: string
    Format: string
    PublicId: string
    Path: string
}
export type ParsedCustomFieldApplication = {
    [key: string]: string
}