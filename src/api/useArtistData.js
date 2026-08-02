import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useArtistData(name) {
   return useQuery(
      ["artist", name],
      async () => {
         const { data } = await axios.get(zingApi.getArtistPage(name))
         return data.data
      },
      { enabled: !!name, staleTime: 30 * 60 * 1000, keepPreviousData: true }
   )
}
