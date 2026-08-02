import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import {
   fetchPlayList,
   playSongNotAlbum,
   playSongNotAlbumById,
   setCurrentIndexSong,
   setCurrentIndexSongShuffle,
} from "features/queue/queueSlice"
import { pushPlayListsLogged } from "features/logged/loggedSlice"
import { setPlay, setRandomSongs, setReady } from "features/setting/settingSlice"

/** @typedef {import("types").Song} Song */
/** @typedef {import("types").Album} Album */

/**
 * Starting playback, in one place.
 *
 * Every "press play on this thing" handler in the app spelled out the same
 * four dispatches — clear the ready flag, stop, load, start — inline inside
 * JSX, more than thirty times. They had drifted: some stopped before clearing
 * ready, some after; some remembered to log the playlist to history, some
 * forgot; the VIP check was present at some entry points and missing at
 * others, so a VIP-only track could be loaded into the queue and then stall.
 */
export function usePlayback() {
   const dispatch = useDispatch()

   /**
    * Zing marks VIP-only tracks with streamingStatus 2. They have no playable
    * URL for a free account, so refuse them at the entry point rather than
    * letting the player fail silently.
    *
    * @type {(song: Song) => boolean}
    */
   const rejectIfVip = useCallback((song) => {
      if (song?.streamingStatus === 2) {
         toast("Dành Cho Tài Khoản VIP", { type: "info" })
         return true
      }
      return false
   }, [])

   const rejectIfRadio = useCallback((isRadio) => {
      if (isRadio) {
         toast("Radio đang phát triển , vui lòng thông cảm !", { type: "info" })
         return true
      }
      return false
   }, [])

   /**
    * Replace the queue with one song and play it.
    * @type {(song: Song) => Promise<void>}
    */
   const playSong = useCallback(
      async (song) => {
         if (rejectIfVip(song)) return
         dispatch(setReady(false))
         dispatch(setPlay(false))
         await dispatch(playSongNotAlbum(song))
         dispatch(setPlay(true))
      },
      [dispatch, rejectIfVip]
   )

   /**
    * Same, for payloads that carry `id` rather than `encodeId`.
    * @type {(song: Song) => Promise<void>}
    */
   const playSongById = useCallback(
      async (song) => {
         if (rejectIfVip(song)) return
         dispatch(setReady(false))
         dispatch(setPlay(false))
         await dispatch(playSongNotAlbumById(song))
         dispatch(setPlay(true))
      },
      [dispatch, rejectIfVip]
   )

   /**
    * Load an album into the queue and play it.
    *
    * @param {string} encodeId
    * @param {object} [options]
    * @param {number} [options.startIndex] - track to start on
    * @param {object} [options.logAs] - playlist to record in recently-played
    * @param {boolean} [options.logLoaded] - record the album that was just
    *        fetched. Call sites used to pass the album read from the store at
    *        render time, which is the *previous* album: the read happens before
    *        the await that replaces it, so history recorded the wrong entry.
    * @param {boolean} [options.reshuffle] - re-roll the shuffle order afterwards
    */
   const playAlbum = useCallback(
      async (encodeId, { startIndex, logAs, logLoaded, reshuffle } = {}) => {
         if (!encodeId) return
         dispatch(setReady(false))
         dispatch(setPlay(false))
         const loaded = await dispatch(fetchPlayList(encodeId))
         if (typeof startIndex === "number") {
            dispatch(setCurrentIndexSong(startIndex))
         }
         dispatch(setPlay(true))
         if (logAs) dispatch(pushPlayListsLogged(logAs))
         if (logLoaded && loaded?.payload) dispatch(pushPlayListsLogged(loaded.payload))
         if (reshuffle) dispatch(setRandomSongs())
      },
      [dispatch]
   )

   /** Jump to a track already in the queue, honouring the shuffle order. */
   const playQueueIndex = useCallback(
      (index, { shuffled } = {}) => {
         dispatch(setReady(false))
         dispatch(shuffled ? setCurrentIndexSongShuffle(index) : setCurrentIndexSong(index))
         dispatch(setPlay(true))
      },
      [dispatch]
   )

   const resume = useCallback(() => dispatch(setPlay(true)), [dispatch])
   const pause = useCallback(() => dispatch(setPlay(false)), [dispatch])

   return { playSong, playSongById, playAlbum, playQueueIndex, resume, pause, rejectIfVip, rejectIfRadio }
}

export default usePlayback
