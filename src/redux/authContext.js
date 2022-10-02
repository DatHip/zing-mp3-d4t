import { createSlice } from "@reduxjs/toolkit"

const initialState = {
   value: 0,
}

export const authContext = createSlice({
   name: "authContext",
   initialState,
   reducers: {},
})

// Action creators are generated for each case reducer function
export const {} = authContext.actions

export default authContext.reducer
