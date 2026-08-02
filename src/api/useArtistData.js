import { useQuery } from "@tanstack/react-query"
import { fetchArtist } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useArtistData(name) {
   return useQuery(queryKeys.artist(name), () => fetchArtist(name), {
      enabled: !!name,
      staleTime: 30 * 60 * 1000,
      keepPreviousData: true,
   })
}
