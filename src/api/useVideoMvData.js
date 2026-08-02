import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "config"

export function useVideoMvData(id) {
   return useQuery(
      ["video-mv", id],
      async () => {
         const { data } = await axios.get(tmdAPI.getVideoMv(id))
         return data.data
      },
      { enabled: !!id, staleTime: 30 * 60 * 1000, keepPreviousData: true }
   )
}
