import { useQuery } from "@tanstack/react-query"
import { fetchTopChart } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useZingChartData() {
   return useQuery(queryKeys.zingChart(), fetchTopChart, {
      staleTime: 10 * 60 * 1000,
      keepPreviousData: true,
   })
}
