import { selectActiveQueue, selectCurrentSong, selectQueueLength } from "./queueSelectors"

const song = (id) => ({ encodeId: id, title: `song-${id}`, duration: 200, streamingStatus: 1 })

const state = (isRandom) => ({
   queueNowPlay: {
      listSong: [song("A"), song("B")],
      listSongShuffle: [song("B"), song("A"), song("C")],
      infoSongCurrent: song("A"),
   },
   setting: { isRandom },
})

describe("queue selectors", () => {
   it("reads the current song through the slice's legacy field name", () => {
      expect(selectCurrentSong(state(false)).encodeId).toBe("A")
   })

   it("selectActiveQueue follows the shuffle flag", () => {
      expect(selectActiveQueue(state(false)).map((s) => s.encodeId)).toEqual(["A", "B"])
      expect(selectActiveQueue(state(true)).map((s) => s.encodeId)).toEqual(["B", "A", "C"])
   })

   it("selectActiveQueue returns a stable reference for an unchanged state", () => {
      const s = state(false)
      expect(selectActiveQueue(s)).toBe(selectActiveQueue(s))
   })

   it("selectQueueLength counts the active queue, not both lists", () => {
      expect(selectQueueLength(state(false))).toBe(2)
      expect(selectQueueLength(state(true))).toBe(3)
   })
})
