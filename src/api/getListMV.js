/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getListMV = (id, page) => {
   return useQuery(
      ["getListMv"],
      async () => {
         const data = await axios.get(tmdAPI.getListMv(id, page))
         return data.data
      },
      { keepPreviousData: true }
   )
}
