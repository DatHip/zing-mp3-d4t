import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tmdAPI } from "../../config"

const initialState = (() => {
   try {
      return (
         JSON.parse(localStorage.getItem("queue_nowplay")) || {
            currentEncodeId: "",
            playlistEncodeId: null,
            listSong: [],
            listSongShuffle: [],
            infoCurrenAlbum: {},
            currentIndexSong: 0,
            infoSongCurrent: {},
            infoSongNext: {},
            duration: 0,
            currentTime: 0,
            infoCurrentMv: {},
            loading: false,
         }
      )
   } catch {
      return {
         currentEncodeId: "",
         playlistEncodeId: null,
         listSong: [],
         listSongShuffle: [],
         infoCurrenAlbum: {},
         currentIndexSong: 0,
         infoSongCurrent: {},
         infoSongNext: {},
         duration: 0,
         currentTime: 0,
         infoCurrentMv: {},
         loading: false,
      }
   }
})()

const fetchPlayList = createAsyncThunk("queueNowPlay/fetchPlayList", async (id) => {
   const res = await axios.get(tmdAPI.getAlbumPage(id))
   return res.data.data
})

export const queueNowPlay = createSlice({
   name: "queueNowPlay",
   initialState,
   reducers: {
      playSongNotAlbum: (state, action) => {
         state.infoCurrenAlbum = []
         state.listSong = [action.payload]
         state.currentTime = 0
         state.currentIndexSong = 0
         state.playlistEncodeId = null
         state.infoSongCurrent = state.listSong[state.currentIndexSong]
         state.infoSongNext = {}
         state.currentEncodeId = action.payload.encodeId
         state.duration = action.payload.duration
         state.listSongShuffle = []
      },
      removeList: (state) => {
         state.currentEncodeId = ""
         state.playlistEncodeId = null
         state.listSong = []
         state.listSongShuffle = []
         state.infoCurrenAlbum = {}
         state.currentIndexSong = 0
         state.infoSongCurrent = {}
         state.infoSongNext = {}
         state.duration = 0
         state.currentTime = 0
         state.infoCurrentMv = {}
         state.loading = false
      },
      playSongNotAlbumById: (state, action) => {
         state.infoCurrenAlbum = []
         state.listSong = [action.payload]
         state.currentTime = 0
         state.currentIndexSong = 0
         state.playlistEncodeId = null
         state.infoSongCurrent = state.listSong[state.currentIndexSong]
         state.infoSongNext = {}
         state.currentEncodeId = action.payload.id
         state.duration = action.payload.duration
         state.listSongShuffle = []
      },

      pushSongHistoryPlayList: (state, action) => {
         // Fix: was `filter().indexOf()` which always returned -1 (indexOf on an array).
         // Replace whole list with new payload list, index to clicked item.
         state.listSong = action.payload.list
         state.currentIndexSong = action.payload.index
         state.currentTime = 0
         state.currentEncodeId = action.payload.item.encodeId
         state.infoSongCurrent = action.payload.item
         state.duration = state.infoSongCurrent.duration
      },

      pushSongHistoryPlayListShuffle: (state, action) => {
         state.listSongShuffle = action.payload.list
         state.currentIndexSong = action.payload.index
         state.currentTime = 0
         state.currentEncodeId = action.payload.item.encodeId
         state.infoSongCurrent = action.payload.item
         state.duration = state.infoSongCurrent.duration
      },

      setInfoCurrentMv: (state, action) => {
         state.infoCurrentMv = action.payload
      },

      setcurrentIndexSong: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
         }
      },

      setNextSong: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
            state.infoSongNext = state.listSong[state.currentIndexSong + 1]
         }
      },
      setNextSongShuffle: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
            state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
         }
      },
      setListSongShuffle: (state, action) => {
         state.listSongShuffle = action.payload
         state.currentIndexSong = 0
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
      },

      setListSong: (state, action) => {
         state.listSong = action.payload
      },
      setDuration: (state, action) => {
         state.duration = action.payload
      },

      setCurrentTime: (state, action) => {
         state.currentTime = action.payload
      },

      setCurrentIndexSong: (state, action) => {
         state.currentTime = 0
         state.currentIndexSong = action.payload
         const song = state.listSong[state.currentIndexSong]
         if (!song) return
         state.infoSongCurrent = song
         state.duration = song.duration
         state.currentEncodeId = song.encodeId
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
      },

      setCurrentIndexSongShuffle: (state, action) => {
         state.currentTime = 0
         state.currentIndexSong = action.payload
         const song = state.listSongShuffle[state.currentIndexSong]
         if (!song) return
         state.infoSongCurrent = song
         state.duration = song.duration
         state.currentEncodeId = song.encodeId
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
      },

      setDraggItemActive: (state, action) => {
         state.currentIndexSong = action.payload
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
      },

      setDraggUpdateList: (state, action) => {
         state.listSong = action.payload
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
      },
      setDraggItemActiveShuffle: (state, action) => {
         state.currentIndexSong = action.payload
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
      },

      setDraggUpdateListShuffle: (state, action) => {
         state.listSongShuffle = action.payload
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchPlayList.pending, (state) => {
         state.loading = true
      })

      builder.addCase(fetchPlayList.rejected, (state) => {
         state.loading = false
      })
      builder.addCase(fetchPlayList.fulfilled, (state, action) => {
         const items = action.payload?.song?.items || []
         const free = items.filter((e) => e.streamingStatus === 1)

         state.loading = false
         state.infoCurrenAlbum = action.payload
         state.listSong = free
         state.currentTime = 0
         state.currentIndexSong = 0
         state.playlistEncodeId = action.payload.encodeId
         state.listSongShuffle = free

         if (free.length === 0) {
            state.infoSongCurrent = {}
            state.infoSongNext = {}
            state.currentEncodeId = ""
            state.duration = 0
            return
         }

         state.infoSongCurrent = free[0]
         state.infoSongNext = free[1] || {}
         state.currentEncodeId = free[0].encodeId
         state.duration = free[0].duration
      })
   },
})

export const {
   setDraggUpdateList,
   setDraggItemActive,
   setCurrentIndexSong,
   setDuration,
   setCurrentTime,
   setListSong,
   setListSongShuffle,
   setNextSong,
   setCurrentIndexSongShuffle,
   setDraggItemActiveShuffle,
   setDraggUpdateListShuffle,
   setcurrentIndexSong,
   setNextSongShuffle,
   setInfoCurrentMv,
   pushSongHistoryPlayList,
   pushSongHistoryPlayListShuffle,
   playSongNotAlbum,
   playSongNotAlbumById,
   removeList,
} = queueNowPlay.actions

export default queueNowPlay.reducer
export { fetchPlayList }
