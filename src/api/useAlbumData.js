import { useQuery } from "@tanstack/react-query"
import { fetchAlbum, fetchSuggestedAlbum } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useAlbumData(id) {
   const albumQuery = useQuery(queryKeys.album(id), () => fetchAlbum(id), {
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
   })
   const suggestedQuery = useQuery(queryKeys.suggestedAlbum(id), () => fetchSuggestedAlbum(id), {
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
   })

   return {
      album: albumQuery.data,
      suggested: suggestedQuery.data,
      isLoading: albumQuery.isLoading || suggestedQuery.isLoading,
      isError: albumQuery.isError || suggestedQuery.isError,
   }
}
