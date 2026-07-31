/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getAlbumPage = (id) => {
   return useQuery(
      ["GetAlbumPage"],
      async () => {
         const data = await axios.get(tmdAPI.getAlbumPage(id))
         return data.data
      },
      { keepPreviousData: true }
   )
}
