/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getTop100page = () => {
   return useQuery(
      ["getTop100Page"],
      async () => {
         const data = await axios.get(tmdAPI.getTop100Page())
         return data.data
      },
      { keepPreviousData: true }
   )
}
