import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { tmdAPI } from "../../config"

const initialState = JSON.parse(localStorage.getItem("queue_nowplay")) || {
   currentEncodeId: "",
   playlistEncodeId: "",
   listSong: [],
   infoCurrenAlbum: {},
   currentIndexSong: 0,
   infoSongCurrent: {},
   infoSongNext: {},
   infoCurrentTime: 0,
   duration: 0,
   currentTime: 0,
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
      setCurrentIndexSong: (state, action) => {
         // set current
         state.currentIndexSong = action.payload
         // set next
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
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
         state.playlistEncodeId = action.payload.encodeId
         state.infoSongCurrent = state.listSong[state.currentIndexSong]
         state.infoSongNext = state.listSong[state.currentIndexSong + 1]
         state.currentEncodeId = state.infoSongCurrent.encodeId
         state.duration = state.infoSongCurrent.duration

         localStorage.setItem("queue_nowplay", JSON.stringify(state))
      })
   },
})

export const { setCurrentIndexSong } = queueNowPlay.actions

export default queueNowPlay.reducer
export { fetchPlayList }
