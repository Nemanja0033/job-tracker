import { useQuery } from "@tanstack/react-query"
import { fetchStats } from "../service/stats-service"
import { StatsData } from "@/app/stats/page"

export function useStats(startDate: string, endDate: string) {
  return useQuery<StatsData>({
    queryKey: ['stats', startDate, endDate],
    queryFn: () => fetchStats(startDate, endDate),
    staleTime: 1000 * 60 * 5, 
  })
}
