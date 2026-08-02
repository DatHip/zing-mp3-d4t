import { useCallback } from "react"
import { useNewMusicData } from "api/useNewMusicData"
import { usePlayback } from "hook/usePlayback"
import { NEW_RELEASE_PLAYLIST_ID } from "data/playlistIds"


export function useNewMusicPage() {
   const { data, isLoading } = useNewMusicData()
   const { playAlbum } = usePlayback()

   const handlePlayAll = useCallback(() => playAlbum(NEW_RELEASE_PLAYLIST_ID), [playAlbum])

   return {
      items: data?.items,
      isLoading,
      handlePlayAll,
      playlistId: NEW_RELEASE_PLAYLIST_ID,
   }
}

export { NEW_RELEASE_PLAYLIST_ID }
