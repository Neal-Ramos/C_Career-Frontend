import { useMutation } from "@tanstack/react-query"
import { NoShowInterview, RescheduleInterview } from "../API/ApplicantInterview"

export const useReschedInterview = () => {
    return useMutation({
        mutationFn: RescheduleInterview
    })
}
export const useNoShowInterview = () => {
    return useMutation({
        mutationFn: NoShowInterview
    })
}