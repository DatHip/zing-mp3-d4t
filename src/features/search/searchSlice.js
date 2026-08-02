import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchHotKey as fetchHotKeyApi, fetchSuggestKeyword } from "api/zingClient"

const initialState = {
   entities: "",
   loading: false,
   entitiesNew: "",
   names: "",
}

const fetchHotKey = createAsyncThunk("formSearch/fetchHotKey", fetchHotKeyApi)

const fetchDataSearch = createAsyncThunk("formSearch/fetchDataSearch", async (name) => {
   const data = await fetchSuggestKeyword(name)
   return data.items
})

const formSearch = createSlice({
   name: "formSearch",
   initialState,
   reducers: {
      setName: (state, action) => {
         state.names = action.payload
      },

      setValueNew: (state, action) => {
         state.entitiesNew = ""
      },
   },
   extraReducers: (builder) => {
      builder.addCase(fetchDataSearch.fulfilled, (state, action) => {
         state.entitiesNew = action.payload
         state.loading = false
      })

      builder.addCase(fetchDataSearch.pending, (state, action) => {
         state.loading = true
      })
      builder.addCase(fetchDataSearch.rejected, (state, action) => {
         state.loading = false
      })

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

export const { setName, setValueNew } = formSearch.actions
export { fetchHotKey, formSearch, fetchDataSearch }
