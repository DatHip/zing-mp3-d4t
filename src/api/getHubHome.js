/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getHubHome = () => {
   return useQuery(
      ["getHubHome"],
      async () => {
         const data = await axios.get(tmdAPI.getHubHome())
         return data.data
      },
      { keepPreviousData: true }
   )
}
