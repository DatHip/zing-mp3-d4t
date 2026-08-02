import { useQuery } from "@tanstack/react-query"
import { fetchHubHome } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useHubHomeData() {
   return useQuery(queryKeys.hubHome(), fetchHubHome, {
      staleTime: 30 * 60 * 1000,
      keepPreviousData: true,
   })
}
