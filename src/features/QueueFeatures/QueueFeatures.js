import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tmdAPI } from "../../config"

const initialState = JSON.parse(localStorage.getItem("queue_nowplay")) || {
   currentEncodeId: "",
   playlistEncodeId: "",
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

const fetchPlayList = createAsyncThunk("queueNowPlay/fetchPlayList", async (id) => {
   const res = await axios.get(tmdAPI.getAlbumPage(id))
   return res.data.data
})

export const queueNowPlay = createSlice({
   name: "queueNowPlay",
   initialState,
   reducers: {
      pushSongHistoryPlayList: (state, action) => {
         let isExists = action.payload.list.filter((e) => action.payload.item.encodeId === e.encodeId)
         let index = action.payload.list.indexOf(isExists)
         state.listSong.splice(index, 1)
         state.listSong = action.payload.list
         state.currentIndexSong = action.payload.index
         state.currentTime = 0
         state.currentEncodeId = action.payload.item.encodeId
         state.infoSongCurrent = action.payload.item
         state.duration = state.infoSongCurrent.duration
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      pushSongHistoryPlayListShuffle: (state, action) => {
         let isExists = action.payload.list.filter((e) => action.payload.item.encodeId === e.encodeId)
         let index = action.payload.list.indexOf(isExists)
         state.listSongShuffle.splice(index, 1)
         state.listSongShuffle = action.payload.list
         state.currentIndexSong = action.payload.index
         state.currentTime = 0
         state.currentEncodeId = action.payload.item.encodeId
         state.infoSongCurrent = action.payload.item
         state.duration = state.infoSongCurrent.duration
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setInfoCurrentMv: (state, action) => {
         state.infoCurrentMv = action.payload
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setcurrentIndexSong: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
            localStorage.setItem("queue_nowplay", JSON.stringify(state))
         }
      },

      setNextSong: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
            state.infoSongNext = state.listSong[state.currentIndexSong + 1]
            localStorage.setItem("queue_nowplay", JSON.stringify(state))
         }
      },
      setNextSongShuffle: (state, action) => {
         if (action.payload !== -1) {
            state.currentIndexSong = action.payload
            state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
            localStorage.setItem("queue_nowplay", JSON.stringify(state))
         }
      },
      setListSongShuffle: (state, action) => {
         state.listSongShuffle = action.payload
         state.currentIndexSong = 0
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setListSong: (state, action) => {
         state.listSong = action.payload
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },
      setDuration: (state, action) => {
         state.duration = action.payload
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setCurrentTime: (state, action) => {
         state.currentTime = action.payload
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setCurrentIndexSong: (state, action) => {
         // set current
         state.currentTime = 0
         state.currentIndexSong = action.payload
         state.infoSongCurrent = state.listSong[state.currentIndexSong]
         state.duration = state.infoSongCurrent.duration
         state.currentEncodeId = state.infoSongCurrent.encodeId
         // set next
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setCurrentIndexSongShuffle: (state, action) => {
         // set current
         state.currentTime = 0
         state.currentIndexSong = action.payload
         state.infoSongCurrent = state.listSongShuffle[state.currentIndexSong]
         state.duration = state.infoSongCurrent.duration
         state.currentEncodeId = state.infoSongCurrent.encodeId
         // set next
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setDraggItemActive: (state, action) => {
         state.currentIndexSong = action.payload
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setDraggUpdateList: (state, action) => {
         state.listSong = action.payload

         state.infoSongNext = state.listSong[state.currentIndexSong + 1]

         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },
      setDraggItemActiveShuffle: (state, action) => {
         state.currentIndexSong = action.payload
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },

      setDraggUpdateListShuffle: (state, action) => {
         state.listSongShuffle = action.payload
         state.infoSongNext = state.listSongShuffle[state.currentIndexSong + 1]

         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      },
   },
   extraReducers: (builer) => {
      builer.addCase(fetchPlayList.pending, (state) => {
         state.loading = true
      })

      builer.addCase(fetchPlayList.rejected, (state) => {
         state.loading = false
      })
      builer.addCase(fetchPlayList.fulfilled, (state, action) => {
         state.infoCurrenAlbum = action.payload
         state.listSong = action.payload.song.items.filter((e) => e.streamingStatus === 1)
         state.loading = false
         state.currentTime = 0
         state.currentIndexSong = 0
         state.playlistEncodeId = action.payload.encodeId
         state.infoSongCurrent = state.listSong[state.currentIndexSong]
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
         state.currentEncodeId = state.infoSongCurrent.encodeId
         state.duration = state.infoSongCurrent.duration
         state.listSongShuffle = state.listSong
         localStorage.setItem("queue_nowplay", JSON.stringify(state))
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
   setCurrentTimeLocal,
   setDraggItemActiveShuffle,
   setDraggUpdateListShuffle,
   setcurrentIndexSong,
   setNextSongShuffle,
   setInfoCurrentMv,
   pushSongHistoryPlayList,
   pushSongHistoryPlayListShuffle,
} = queueNowPlay.actions

export default queueNowPlay.reducer
export { fetchPlayList }
