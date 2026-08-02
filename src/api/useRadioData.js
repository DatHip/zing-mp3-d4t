import { useQuery } from "@tanstack/react-query"
import { fetchRadioPage } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useRadioData() {
   return useQuery(queryKeys.radio(), fetchRadioPage, {
      staleTime: 15 * 60 * 1000,
      keepPreviousData: true,
   })
}
