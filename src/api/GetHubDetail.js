/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const GetHubDetail = (id) => {
   return useQuery(
      ["GetHubDetail"],
      async () => {
         const data = await axios.get(tmdAPI.getHubDetail(id))
         return data.data
      },
      { keepPreviousData: true }
   )
}
