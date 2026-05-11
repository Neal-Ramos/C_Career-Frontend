import type { analyzeApplicationRes } from "../global/IAI"
import { apiClient } from "./ApiClient"

export const analyzeApplication = async (applicationId: string): Promise<analyzeApplicationRes> => {
    return (await apiClient.post("/api/AI/AnalyzeApplication", {applicationId})).data.data
}