import { useQuery } from "@tanstack/react-query"
import { fetchSearchAll, fetchSearchByType } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

/**
 * Results for one tab of the search page.
 *
 * The five tabs used to each keep their own useState + useEffect + axios call,
 * which meant five slightly different loading guards and a refetch every time
 * a tab was revisited.
 *
 * @param {string} keyword
 * @param {"song"|"artist"|"playlist"|"video"} type
 */
export function useSearchByType(keyword, type) {
   return useQuery(
      queryKeys.searchByType(keyword, type),
      () => fetchSearchByType(keyword, type),
      { enabled: !!keyword, staleTime: 5 * 60 * 1000, keepPreviousData: true }
   )
}

export function useSearchAll(keyword) {
   return useQuery(queryKeys.searchAll(keyword), () => fetchSearchAll(keyword), {
      enabled: !!keyword,
      staleTime: 5 * 60 * 1000,
      keepPreviousData: true,
   })
}
