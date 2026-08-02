import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { zingApi } from "config"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_lyrics")) || {
   defaultIBGUrls: [],
   lyricByLine: [],
   lyricKara: [],
   isLoading: false,
   isSeek: false,
   word0: 0,
   word1: 1,
}

const fetchDataLyrics = createAsyncThunk("lyrics/fetchDataLyrics", async (id) => {
   const res = await axios.get(zingApi.getLyrics(id))
   return res.data.data
})

// Persisted by app/persistMiddleware.js — see the note in SettingPlay/settingPlay.js.
export const lyrics = createSlice({
   name: "lyrics",
   initialState,
   reducers: {
      setIsSeek: (state, action) => {
         state.isSeek = action.payload
      },
   },
   extraReducers: (builer) => {
      builer.addCase(fetchDataLyrics.pending, (state, action) => {
         state.isLoading = true
      })
      builer.addCase(fetchDataLyrics.rejected, (state, action) => {
         state.isLoading = false
      })
      builer.addCase(fetchDataLyrics.fulfilled, (state, action) => {
         state.defaultIBGUrls = action.payload.defaultIBGUrls

         if (action.payload.sentences) {
            state.lyricByLine = action.payload.sentences
         } else {
            state.lyricByLine = false
         }
         state.isLoading = false
      })
   },
})

export const { setIsSeek } = lyrics.actions
export { fetchDataLyrics }
export default lyrics.reducer
