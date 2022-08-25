/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const useGetHomeChart = () => {
   return useQuery(
      ["getChartPage"],
      async () => {
         const data = await axios.get(tmdAPI.getTopChart())
         return data.data
      },
      { keepPreviousData: true }
   )
}
