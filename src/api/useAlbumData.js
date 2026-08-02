import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { zingApi } from "config"

const fetchAlbum = async (id) => {
   const { data } = await axios.get(zingApi.getAlbumPage(id))
   return data.data
}

const fetchSuggested = async (id) => {
   const { data } = await axios.get(zingApi.getSuggestedAlbum(id))
   return data.data
}

export function useAlbumData(id) {
   const albumQuery = useQuery(["album", id], () => fetchAlbum(id), {
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
   })
   const suggestedQuery = useQuery(["album-suggested", id], () => fetchSuggested(id), {
      enabled: !!id,
      keepPreviousData: true,
      staleTime: 5 * 60 * 1000,
   })

   return {
      album: albumQuery.data,
      suggested: suggestedQuery.data,
      isLoading: albumQuery.isLoading || suggestedQuery.isLoading,
      isError: albumQuery.isError || suggestedQuery.isError,
   }
}
