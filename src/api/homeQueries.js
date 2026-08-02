import { useQuery } from "@tanstack/react-query"
import { fetchHomePage } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useHomePageData() {
   return useQuery(queryKeys.home(), fetchHomePage, {
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
   })
}
