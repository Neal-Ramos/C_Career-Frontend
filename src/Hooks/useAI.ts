import { useMutation } from "@tanstack/react-query"
import { analyzeApplication } from "../API/AI"

export const useAnalyzeApplication = () => {
    return useMutation({
        mutationFn: analyzeApplication
    })
}