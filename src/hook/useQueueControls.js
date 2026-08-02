import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentIndexSong, setCurrentIndexSongShuffle } from "features/queue/queueSlice"
import { setPlay, setReady } from "features/setting/settingSlice"
import { selectCurrentIndex } from "features/queue/queueSelectors"
import { selectIsRandom, selectPlaying } from "features/setting/settingSelectors"

/**
 * Queue navigation. The shuffle-vs-sequential branch below was copy-pasted at
 * five call sites (next button, prev button, track ended, VIP skip, stream
 * failure), so a fix to one never reached the others.
 *
 * Adds no subscriptions in practice: every current caller already reads
 * isRandom, currentIndexSong and playing.
 */
export function useQueueControls() {
   const dispatch = useDispatch()
   const isRandom = useSelector(selectIsRandom)
   const playing = useSelector(selectPlaying)
   const currentIndexSong = useSelector(selectCurrentIndex)

   /** Move the queue pointer only — no playback side effects. */
   const goToIndex = useCallback(
      (index) => {
         dispatch(isRandom ? setCurrentIndexSongShuffle(index) : setCurrentIndexSong(index))
      },
      [dispatch, isRandom]
   )

   /** Move the pointer and start playback: what a user-driven skip should do. */
   const playAtIndex = useCallback(
      (index) => {
         goToIndex(index)
         dispatch(setReady(false))
         if (!playing) dispatch(setPlay(true))
      },
      [goToIndex, dispatch, playing]
   )

   const playNext = useCallback(() => playAtIndex(currentIndexSong + 1), [playAtIndex, currentIndexSong])
   const playPrev = useCallback(() => playAtIndex(currentIndexSong - 1), [playAtIndex, currentIndexSong])
   const skipToNext = useCallback(() => goToIndex(currentIndexSong + 1), [goToIndex, currentIndexSong])

   return { goToIndex, playAtIndex, playNext, playPrev, skipToNext, currentIndexSong, isRandom, playing }
}

export default useQueueControls
