export interface analyzeApplicationRes{
    score: number
    verdict: "Pass"|"Fail"
    reason: string
    interviewSuggestion: string
}