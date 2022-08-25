/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getCategoryMv = (id) => {
   return useQuery(
      ["getCategoryMvs"],
      async () => {
         const data = await axios.get(tmdAPI.getCategoryMv(id))
         return data.data
      },
      { keepPreviousData: true }
   )
}
