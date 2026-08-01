import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export function useZingChartData() {
   return useQuery(
      ["home-chart"],
      async () => {
         const { data } = await axios.get(tmdAPI.getTopChart())
         return data.data
      },
      { staleTime: 10 * 60 * 1000, keepPreviousData: true }
   )
}
