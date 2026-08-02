import { useQuery } from "@tanstack/react-query"
import { fetchHubDetail } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useHubDetailData(id) {
   return useQuery(queryKeys.hubDetail(id), () => fetchHubDetail(id), {
      enabled: !!id,
      staleTime: 30 * 60 * 1000,
      keepPreviousData: true,
   })
}
