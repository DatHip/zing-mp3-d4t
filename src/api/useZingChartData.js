import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

export function useZingChartData() {
   return useQuery(
      ["home-chart"],
      async () => {
         const { data } = await axios.get(zingApi.getTopChart())
         return data.data
      },
      { staleTime: 10 * 60 * 1000, keepPreviousData: true }
   )
}
