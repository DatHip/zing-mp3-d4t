import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { setPlay, setReady } from "features/setting/settingSlice"
import { fetchPlayList } from "features/queue/queueSlice"
import { useNewMusicData } from "api/useNewMusicData"

export const NEW_RELEASE_PLAYLIST_ID = "ZDB6EB9C"

export function useNewMusicPage() {
   const { data, isLoading } = useNewMusicData()
   const dispatch = useDispatch()

   const handlePlayAll = useCallback(async () => {
      dispatch(setReady(false))
      dispatch(setPlay(false))
      await dispatch(fetchPlayList(NEW_RELEASE_PLAYLIST_ID))
      dispatch(setPlay(true))
   }, [dispatch])

   return {
      items: data?.items,
      isLoading,
      handlePlayAll,
      playlistId: NEW_RELEASE_PLAYLIST_ID,
   }
}
