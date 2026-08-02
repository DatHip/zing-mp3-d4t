import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useRadioData() {
   return useQuery(
      ["radio"],
      async () => {
         const { data } = await axios.get(zingApi.getRadioPage())
         return data.data
      },
      { staleTime: 15 * 60 * 1000, keepPreviousData: true }
   )
}
