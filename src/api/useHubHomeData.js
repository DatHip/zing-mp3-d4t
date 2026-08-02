import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useHubHomeData() {
   return useQuery(
      ["hub-home"],
      async () => {
         const { data } = await axios.get(zingApi.getHubHome())
         return data.data
      },
      { staleTime: 30 * 60 * 1000, keepPreviousData: true }
   )
}
