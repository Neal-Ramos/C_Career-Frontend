import type { RescheduleInterviewReq } from "../global/IApplicantInterview"
import { apiClient } from "./ApiClient"

export const RescheduleInterview = async (data: RescheduleInterviewReq) => {
    return (await apiClient.patch(`/api/ApplicantInterviews/${data.applicationId}/Reschedule`, {newSchedule: data.newSchedule})).data
}
export const NoShowInterview = async (req: {applicationId: string}) => {
    return (await apiClient.patch(`/api/ApplicantInterviews/${req.applicationId}/NoShow`, {})).data
}