import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { setClockOff, setPlay } from "features/setting/settingSlice"

/**
 * The sleep timer.
 *
 * Held at module scope, not in a ref: the dialog that arms the timer unmounts
 * as soon as it closes, so a ref would be gone before the timer ever fired and
 * nothing could cancel it afterwards.
 */
let timerId = null

export function useSleepTimer() {
   const dispatch = useDispatch()

   /**
    * Pause playback after the given delay.
    *
    * The previous implementation kept the id in a `let` inside the component
    * body — re-created on every render — and called clearTimeout on the very
    * next line after scheduling it. The timer was cancelled the instant it was
    * set, so the UI reported an armed timer that could never fire, and the
    * cancel button cleared a variable that was always undefined.
    *
    * @param {number} hours
    * @param {number} minutes
    */
   const start = useCallback(
      (hours, minutes) => {
         const delay = (Number(hours) * 60 + Number(minutes)) * 60 * 1000
         if (!delay) return false

         clearTimeout(timerId)
         timerId = setTimeout(() => {
            dispatch(setPlay(false))
            dispatch(setClockOff(false))
            timerId = null
         }, delay)

         dispatch(setClockOff(true))
         return true
      },
      [dispatch]
   )

   const cancel = useCallback(() => {
      clearTimeout(timerId)
      timerId = null
      dispatch(setClockOff(false))
   }, [dispatch])

   return { start, cancel }
}
