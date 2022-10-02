import { createSlice } from "@reduxjs/toolkit"

let initialState = JSON.parse(localStorage.getItem("d4tmp3_user")) || {
   activeUser: false,
   name: "",
   img: "",
   email: "",
   id: "",
   infoFirebase: {},
}

export const users = createSlice({
   name: "users",
   initialState,
   reducers: {
      setUser: (state, action) => {
         state.infoFirebase = action.payload
         // state.name = action.displayName,
         // state.img =
      },
   },
})

export const { setUser } = users.actions

export default users.reducer
