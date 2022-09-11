import "tippy.js/animations/perspective-extreme.css"
import React, { useRef, useState } from "react"
import SuggestList from "./SuggestList"
import Tippy from "@tippyjs/react"
import { useDispatch } from "react-redux"
import { fetchDataSearch, fetchHotKey, setName, setValueNew } from "../../features/formSearch/formSearch"
import { useEffect } from "react"
import lodash from "lodash"
import { useNavigate } from "react-router-dom"

const NavForm = () => {
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

   const handleUpdateQuery = lodash.debounce((e) => {
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
         >
            <div className="form-level">
               <button type="submit" className="header_btn-search">
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
               />
               {refinput?.current?.value?.length > 2 && open && (
                  <button
                     onClick={() => {
                        refinput.current.value = ""
                        dispatch(setValueNew())
                     }}
                     type="button"
                     className="header_btn-remove "
                  >
                     <i className="icon ic-close"></i>
                  </button>
               )}
            </div>
         </Tippy>
      </form>
   )
}

export default NavForm
