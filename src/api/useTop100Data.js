import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useTop100Data() {
   return useQuery(
      ["top100"],
      async () => {
         const { data } = await axios.get(zingApi.getTop100Page())
         return data.data
      },
      { staleTime: 15 * 60 * 1000, keepPreviousData: true }
   )
}
