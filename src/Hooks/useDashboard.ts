import { useQuery } from "@tanstack/react-query"
import { AdminDashboard } from "../API/Dashboard"


export const useAdminDashboard = () => {
    return useQuery({
        queryKey: [["GetApplications"]],
        queryFn: AdminDashboard,
        staleTime: 1000 * 30,
        refetchOnWindowFocus: false,
    })
}