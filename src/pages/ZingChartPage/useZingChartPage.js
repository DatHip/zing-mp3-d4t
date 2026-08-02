import { useCallback, useMemo } from "react"
import { useZingChartData } from "api/useZingChartData"
import { usePlayback } from "hook/usePlayback"
import { TOP_CHART_PLAYLIST_ID } from "data/playlistIds"


export function useZingChartPage() {
   const { data, isLoading } = useZingChartData()
   const { playAlbum } = usePlayback()

   const handlePlayAll = useCallback(() => playAlbum(TOP_CHART_PLAYLIST_ID), [playAlbum])

   const ranks = useMemo(() => {
      const items = data?.RTChart?.items || []
      return [items[0]?.title, items[1]?.title, items[2]?.title]
   }, [data])

   return { data, isLoading, handlePlayAll, ranks }
}

export { TOP_CHART_PLAYLIST_ID }
