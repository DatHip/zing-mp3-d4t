/* eslint-disable react-hooks/rules-of-hooks */

import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { tmdAPI } from "../config"

export const getNewSongRelease = () => {
   return useQuery(
      ["getNewSongRelease"],
      async () => {
         const data = await axios.get(tmdAPI.getNewSong())
         return data.data
      },
      { keepPreviousData: true }
   )
}
