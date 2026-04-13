import type { Application } from "../Types/Applications"
import type { IResponse } from "./IResponse"

export interface FetchApplications extends IResponse{
    data : Application[]
    meta: {
        TotalRecord: number,
        TotalPages: number
    }
}
export interface GetApplicationsByIdResponse extends IResponse{
    data: Application
}