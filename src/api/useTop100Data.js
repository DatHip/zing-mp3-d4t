import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "config"

export function useTop100Data() {
   return useQuery(
      ["top100"],
      async () => {
         const { data } = await axios.get(tmdAPI.getTop100Page())
         return data.data
      },
      { staleTime: 15 * 60 * 1000, keepPreviousData: true }
   )
}
