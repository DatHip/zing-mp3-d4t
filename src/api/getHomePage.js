/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export function useGetHomePage() {
   return useQuery(
      ["getHotKey"],
      async () => {
         const data = await axios.get(tmdAPI.getHomePage())
         return data.data
      },
      { keepPreviousData: true }
   )
}

const getHomePage = async () => {
   const res = await axios.get(tmdAPI.getHomePage())
   return res.data
}

export default getHomePage
