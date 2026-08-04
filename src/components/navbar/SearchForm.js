import "tippy.js/animations/perspective-extreme.css"
import React, { useRef, useState } from "react"
import SuggestList from "components/navbar/SuggestList"
import Tippy from "@tippyjs/react"
import { useDispatch } from "react-redux"
import { fetchDataSearch, fetchHotKey, setName, setValueNew } from "features/search/searchSlice"
import { useEffect } from "react"
import debounce from "lodash/debounce"
import { useNavigate } from "react-router-dom"

const SearchForm = () => {
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState("")
   const navigate = useNavigate()
   const inputRef = useRef(0)
   const refinput = useRef()

   useEffect(() => {
      if (inputRef.current === 0 || !value) return
      dispatch(fetchDataSearch(value))
   }, [value])

   const dispatch = useDispatch()

   const handleFocus = () => {
      setOpen(true)
      if (inputRef.current > 0) return
      inputRef.current++
      dispatch(fetchHotKey())
   }

   const handleUpdateQuery = debounce((e) => {
      if (e.target.value === "") {
         dispatch(setValueNew())
      }
      dispatch(setName(e.target.value))

      if (e.target.value) setValue(e.target.value)
   }, 500)

   const handleSubmit = (e) => {
      e.preventDefault()
      navigate(`/tim-kiem/tatca/${refinput.current.value}`)
      setOpen(false)
   }
   return (
      <form onSubmit={handleSubmit} className={open ? "is-collapse" : ""}>
         <Tippy
            animation={"perspective-extreme"}
            onClickOutside={() => setOpen(false)}
            visible={open}
            content={<SuggestList refinput={refinput} value={value} setValue={setValue} setOpen={setOpen}></SuggestList>}
            interactive={true}
            arrow={false}
            offset={[0, 0]}
            placement={"bottom-start"}
            maxWidth={"auto"}
            // The wrapper below holds a button and an input, so it cannot take a
            // button role — and aria-expanded is invalid on a plain div. The
            // combobox state belongs on the input, which is what a screen reader
            // actually lands on.
            aria={{ expanded: false }}
         >
            <div className="form-level">
               <button type="submit" className="header_btn-search" aria-label="Tìm kiếm">
                  <i className="icon ic-search"></i>
               </button>
               <input
                  type="search"
                  ref={refinput}
                  // value={value}
                  onChange={handleUpdateQuery}
                  onFocus={handleFocus}
                  className="header_search"
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
                  aria-label="Tìm kiếm bài hát, nghệ sĩ, lời bài hát"
                  role="combobox"
                  aria-expanded={open}
                  // Tippy only mounts the suggestion list while open. A dangling
                  // aria-controls is tolerated precisely because aria-expanded is
                  // false in that state, which is the pairing the spec expects.
                  aria-controls="search-suggestions"
                  aria-autocomplete="list"
               />
               {refinput?.current?.value?.length > 2 && open && (
                  <button
                     onClick={() => {
                        refinput.current.value = ""
                        dispatch(setValueNew())
                     }}
                     type="button"
                     className="header_btn-remove "
                     aria-label="Xoá từ khoá"
                  >
                     <i className="icon ic-close"></i>
                  </button>
               )}
            </div>
         </Tippy>
      </form>
   )
}

export default SearchForm
