import { useQuery } from "@tanstack/react-query"
import { fetchNewSong } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useNewMusicData() {
   return useQuery(queryKeys.newMusic(), fetchNewSong, {
      staleTime: 10 * 60 * 1000,
      keepPreviousData: true,
   })
}
