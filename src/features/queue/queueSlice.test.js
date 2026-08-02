import reducer, {
   fetchPlayList,
   playSongNotAlbum,
   pushSongHistoryPlayList,
   removeList,
   setCurrentIndexSong,
   setCurrentIndexSongShuffle,
   setDraggUpdateList,
   setListSongShuffle,
} from "./queueSlice"

const song = (id, extra = {}) => ({
   encodeId: id,
   title: `song-${id}`,
   duration: 200,
   streamingStatus: 1,
   ...extra,
})

const emptyState = () => reducer(undefined, removeList())

describe("queueNowPlay reducer", () => {
   it("plays a standalone song and clears any album context", () => {
      const state = reducer(emptyState(), playSongNotAlbum(song("A")))

      expect(state.currentEncodeId).toBe("A")
      expect(state.listSong).toHaveLength(1)
      expect(state.currentIndexSong).toBe(0)
      expect(state.currentTime).toBe(0)
      expect(state.duration).toBe(200)
      expect(state.playlistEncodeId).toBeNull()
      expect(state.listSongShuffle).toEqual([])
   })

   it("removeList wipes the queue back to empty", () => {
      const playing = reducer(emptyState(), playSongNotAlbum(song("A")))
      const state = reducer(playing, removeList())

      expect(state.currentEncodeId).toBe("")
      expect(state.listSong).toEqual([])
      expect(state.infoSongCurrent).toEqual({})
      expect(state.duration).toBe(0)
   })
})

describe("queue navigation", () => {
   const withList = () =>
      reducer(emptyState(), setDraggUpdateList([song("A"), song("B"), song("C")]))

   it("next: advancing the index syncs current song, duration and encodeId", () => {
      const state = reducer(withList(), setCurrentIndexSong(1))

      expect(state.currentIndexSong).toBe(1)
      expect(state.currentEncodeId).toBe("B")
      expect(state.infoSongCurrent.encodeId).toBe("B")
      expect(state.infoSongNext.encodeId).toBe("C")
      expect(state.currentTime).toBe(0)
   })

   it("prev: stepping back syncs the same derived fields", () => {
      const atSecond = reducer(withList(), setCurrentIndexSong(1))
      const state = reducer(atSecond, setCurrentIndexSong(0))

      expect(state.currentEncodeId).toBe("A")
      expect(state.infoSongNext.encodeId).toBe("B")
   })

   it("last song has no next song", () => {
      const state = reducer(withList(), setCurrentIndexSong(2))

      expect(state.currentEncodeId).toBe("C")
      expect(state.infoSongNext).toBeUndefined()
   })

   it("an out-of-range index leaves the playing song untouched", () => {
      const playing = reducer(withList(), setCurrentIndexSong(1))
      const state = reducer(playing, setCurrentIndexSong(99))

      expect(state.currentEncodeId).toBe("B")
      expect(state.infoSongCurrent.encodeId).toBe("B")
   })
})

describe("shuffle queue", () => {
   it("setting a shuffled list restarts at index 0 and points at the next song", () => {
      const state = reducer(emptyState(), setListSongShuffle([song("C"), song("A"), song("B")]))

      expect(state.currentIndexSong).toBe(0)
      expect(state.infoSongNext.encodeId).toBe("A")
   })

   it("shuffle navigation reads from listSongShuffle, not listSong", () => {
      const shuffled = reducer(emptyState(), setListSongShuffle([song("C"), song("A"), song("B")]))
      const state = reducer(shuffled, setCurrentIndexSongShuffle(1))

      expect(state.currentEncodeId).toBe("A")
      expect(state.infoSongNext.encodeId).toBe("B")
   })
})

describe("history playlist", () => {
   it("replaces the queue and jumps to the clicked item", () => {
      const list = [song("A"), song("B"), song("C")]
      const state = reducer(
         emptyState(),
         pushSongHistoryPlayList({ list, index: 2, item: list[2] })
      )

      expect(state.listSong).toHaveLength(3)
      expect(state.currentIndexSong).toBe(2)
      expect(state.currentEncodeId).toBe("C")
      expect(state.duration).toBe(200)
   })
})

describe("fetchPlayList.fulfilled — VIP filtering", () => {
   const album = (items) => ({ encodeId: "PL1", song: { items } })

   it("drops VIP songs (streamingStatus 2) from the queue", () => {
      const payload = album([
         song("A"),
         song("VIP", { streamingStatus: 2 }),
         song("B"),
      ])
      const state = reducer(emptyState(), { type: fetchPlayList.fulfilled.type, payload })

      expect(state.listSong.map((s) => s.encodeId)).toEqual(["A", "B"])
      expect(state.currentEncodeId).toBe("A")
      expect(state.infoSongNext.encodeId).toBe("B")
      expect(state.playlistEncodeId).toBe("PL1")
      expect(state.loading).toBe(false)
   })

   it("an all-VIP playlist yields an empty queue instead of a broken player", () => {
      const payload = album([
         song("V1", { streamingStatus: 2 }),
         song("V2", { streamingStatus: 2 }),
      ])
      const state = reducer(emptyState(), { type: fetchPlayList.fulfilled.type, payload })

      expect(state.listSong).toEqual([])
      expect(state.currentEncodeId).toBe("")
      expect(state.infoSongCurrent).toEqual({})
      expect(state.duration).toBe(0)
   })

   it("a single-song playlist has no next song", () => {
      const payload = album([song("A")])
      const state = reducer(emptyState(), { type: fetchPlayList.fulfilled.type, payload })

      expect(state.infoSongNext).toEqual({})
   })

   it("pending sets loading, rejected clears it", () => {
      const pending = reducer(emptyState(), { type: fetchPlayList.pending.type })
      expect(pending.loading).toBe(true)

      const rejected = reducer(pending, { type: fetchPlayList.rejected.type })
      expect(rejected.loading).toBe(false)
   })
})
