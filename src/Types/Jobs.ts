export type Jobs = {
    jobId: string
    title: string
    description: string
    roles: string
    fileRequirements: string
    dateCreated: string
    adminId: string
    customFields: string
}
export type ParsedRolesJobs = string[]
export type ParsedCustomFieldsJobs = {
    label: string
    required: boolean
}
export type ParsedFileRequirementsJobs = {
    label: string
    required: boolean
}