/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const useGetRadioPage = () => {
   return useQuery(
      ["getRadioPage"],
      async () => {
         const data = await axios.get(tmdAPI.getRadioPage())
         return data.data
      },
      { keepPreviousData: true }
   )
}
