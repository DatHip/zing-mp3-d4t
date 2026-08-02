import { useQuery } from "@tanstack/react-query"
import { fetchTop100 } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useTop100Data() {
   return useQuery(queryKeys.top100(), fetchTop100, {
      staleTime: 15 * 60 * 1000,
      keepPreviousData: true,
   })
}
