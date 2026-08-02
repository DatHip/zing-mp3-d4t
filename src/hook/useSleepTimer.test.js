import { renderHook, act } from "@testing-library/react"
import { useSleepTimer } from "./useSleepTimer"
import { setClockOff, setPlay } from "features/setting/settingSlice"

const mockDispatch = jest.fn()
jest.mock("react-redux", () => ({ useDispatch: () => mockDispatch }))

describe("useSleepTimer", () => {
   beforeEach(() => {
      jest.useFakeTimers()
      mockDispatch.mockClear()
   })
   afterEach(() => {
      jest.useRealTimers()
   })

   it("pauses playback once the delay elapses", () => {
      const { result } = renderHook(() => useSleepTimer())

      act(() => {
         result.current.start(0, 30)
      })
      expect(mockDispatch).toHaveBeenCalledWith(setClockOff(true))
      expect(mockDispatch).not.toHaveBeenCalledWith(setPlay(false))

      act(() => {
         jest.advanceTimersByTime(30 * 60 * 1000)
      })
      expect(mockDispatch).toHaveBeenCalledWith(setPlay(false))
      expect(mockDispatch).toHaveBeenCalledWith(setClockOff(false))
   })

   it("does not fire early", () => {
      const { result } = renderHook(() => useSleepTimer())

      act(() => {
         result.current.start(1, 0)
      })
      act(() => {
         jest.advanceTimersByTime(59 * 60 * 1000)
      })

      expect(mockDispatch).not.toHaveBeenCalledWith(setPlay(false))
   })

   it("cancel stops the pending timer", () => {
      const { result } = renderHook(() => useSleepTimer())

      act(() => {
         result.current.start(0, 10)
         result.current.cancel()
      })
      act(() => {
         jest.advanceTimersByTime(60 * 60 * 1000)
      })

      expect(mockDispatch).not.toHaveBeenCalledWith(setPlay(false))
   })

   it("rejects a zero delay instead of pausing immediately", () => {
      const { result } = renderHook(() => useSleepTimer())

      let armed
      act(() => {
         armed = result.current.start(0, 0)
      })

      expect(armed).toBe(false)
      expect(mockDispatch).not.toHaveBeenCalledWith(setClockOff(true))
   })

   it("arming a second timer replaces the first", () => {
      const { result } = renderHook(() => useSleepTimer())

      act(() => {
         result.current.start(0, 10)
         result.current.start(0, 20)
      })
      act(() => {
         jest.advanceTimersByTime(10 * 60 * 1000)
      })
      expect(mockDispatch).not.toHaveBeenCalledWith(setPlay(false))

      act(() => {
         jest.advanceTimersByTime(10 * 60 * 1000)
      })
      expect(mockDispatch).toHaveBeenCalledWith(setPlay(false))
   })
})
