/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getArtistPage = (name) => {
   return useQuery(
      ["getArtistPage"],
      async () => {
         const data = await axios.get(tmdAPI.getArtistPage(name))
         return data.data
      },
      { keepPreviousData: true }
   )
}
