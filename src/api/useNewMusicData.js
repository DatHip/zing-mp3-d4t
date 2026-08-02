import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useNewMusicData() {
   return useQuery(
      ["new-release-chart"],
      async () => {
         const { data } = await axios.get(zingApi.getNewSong())
         return data.data
      },
      { staleTime: 10 * 60 * 1000, keepPreviousData: true }
   )
}
