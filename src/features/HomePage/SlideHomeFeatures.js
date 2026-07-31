import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import getHotKey from "../../api/getHotKey"

const initialState = {
   entities: "",
   loading: false,
}

const fetchHotKey = createAsyncThunk("formSearch/fetchHotKey", async () => {
   const response = await getHotKey()
   return response.data
})

const formSearch = createSlice({
   name: "formSearch",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchHotKey.fulfilled, (state, action) => {
         state.entities = action.payload
         state.loading = false
      })
      builder.addCase(fetchHotKey.pending, (state, action) => {
         state.loading = true
      })
      builder.addCase(fetchHotKey.rejected, (state, action) => {
         state.loading = false
      })
   },
})

export default formSearch.reducer

export { fetchHotKey, formSearch }
