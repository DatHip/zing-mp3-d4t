import { createSlice } from "@reduxjs/toolkit"

let initialState = "Tất Cả"

export const setTextBtn = createSlice({
   name: "setTextBtn",
   initialState,
   reducers: {
      setText: (state, action) => {
         return action.payload
      },
   },
})

export const { setText } = setTextBtn.actions

export default setTextBtn.reducer
