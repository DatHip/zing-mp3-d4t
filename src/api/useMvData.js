import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { fetchCategoryMv, fetchListMv } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

/**
 * Paged MV list for a category.
 *
 * The hand-rolled version stopped paging on `hasMore` alone: it also compared
 * the loaded count against `data.toltal`, a misspelling that always read
 * undefined and so never terminated the list on its own.
 */
export function useListMvInfinite(id) {
   return useInfiniteQuery(
      queryKeys.listMv(id, "infinite"),
      ({ pageParam = 1 }) => fetchListMv(id, pageParam),
      {
         enabled: !!id,
         staleTime: 15 * 60 * 1000,
         getNextPageParam: (lastPage, pages) => (lastPage.hasMore ? pages.length + 1 : undefined),
      }
   )
}

export function useCategoryMvData(id) {
   return useQuery(queryKeys.categoryMv(id), () => fetchCategoryMv(id), {
      enabled: !!id,
      staleTime: 30 * 60 * 1000,
      keepPreviousData: true,
   })
}

export function useListMvData(id, page) {
   return useQuery(queryKeys.listMv(id, page), () => fetchListMv(id, page), {
      enabled: !!id,
      staleTime: 15 * 60 * 1000,
      keepPreviousData: true,
   })
}
