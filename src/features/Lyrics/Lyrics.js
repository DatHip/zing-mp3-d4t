import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { tmdAPI } from "../../config"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_lyrics")) || {
   defaultIBGUrls: [],
   lyricByLine: [],
   lyricKara: [],
   isLoading: false,
}

const fetchDataLyrics = createAsyncThunk("lyrics/fetchDataLyrics", async (id) => {
   const res = await axios.get(tmdAPI.getLyrics(id))
   return res.data.data
})

export const lyrics = createSlice({
   name: "lyrics",
   initialState,
   reducers: {
      setThemes: (state, action) => {},
   },
   extraReducers: (builer) => {
      builer.addCase(fetchDataLyrics.fulfilled, (state, action) => {
         state.defaultIBGUrls = action.payload.defaultIBGUrls
         state.lyricByLine = action.payload.sentences

         localStorage.setItem("d4tmp3_lyrics", JSON.stringify(state))
      })
   },
})

export const { setThemes } = lyrics.actions
export { fetchDataLyrics }
export default lyrics.reducer
