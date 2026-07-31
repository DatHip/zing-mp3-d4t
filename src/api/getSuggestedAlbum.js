/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getSuggestedAlbum = (id) => {
   return useQuery(
      ["getSuggestedAlbum"],
      async () => {
         const data = await axios.get(tmdAPI.getSuggestedAlbum(id))
         return data.data
      },
      { keepPreviousData: true }
   )
}
