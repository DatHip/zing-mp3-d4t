import { useInfiniteQuery } from "@tanstack/react-query"
import { fetchNewFeed } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

/**
 * Paged feed for a nation. React Query owns the page cursor and the
 * accumulated pages; callers just render `data.pages`.
 */
export function useNewFeedInfinite(id) {
   return useInfiniteQuery(
      queryKeys.newFeed(id, "infinite"),
      ({ pageParam = 1 }) => fetchNewFeed(id, pageParam),
      {
         enabled: !!id,
         staleTime: 5 * 60 * 1000,
         getNextPageParam: (lastPage, pages) => {
            const loaded = pages.reduce((n, page) => n + (page.items?.length || 0), 0)
            return loaded >= (lastPage.total ?? 0) ? undefined : pages.length + 1
         },
      }
   )
}
