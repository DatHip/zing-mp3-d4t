import { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import { useZingChartData } from "../../api/useZingChartData"

export const TOP_CHART_PLAYLIST_ID = "ZO68OC68"

export function useZingChartPage() {
   const { data, isLoading } = useZingChartData()
   const dispatch = useDispatch()

   const handlePlayAll = useCallback(async () => {
      dispatch(setReady(false))
      dispatch(setPlay(false))
      await dispatch(fetchPlayList(TOP_CHART_PLAYLIST_ID))
      dispatch(setPlay(true))
   }, [dispatch])

   const ranks = useMemo(() => {
      const items = data?.RTChart?.items || []
      return [items[0]?.title, items[1]?.title, items[2]?.title]
   }, [data])

   return { data, isLoading, handlePlayAll, ranks }
}
