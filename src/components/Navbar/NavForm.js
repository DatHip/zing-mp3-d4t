import "tippy.js/animations/perspective-extreme.css"

import React, { useRef, useState } from "react"
import SuggestList from "./SuggestList"
import Tippy from "@tippyjs/react"
import { useDispatch } from "react-redux"
import { fetchHotKey } from "../../features/formSearch/formSearch"

const NavForm = () => {
   const [open, setOpen] = useState(false)
   const [value, setValue] = useState("")
   const inputRef = useRef(0)

   const dispatch = useDispatch()

   const handleFocus = () => {
      setOpen(true)
      if (inputRef.current > 0) return
      inputRef.current++
      dispatch(fetchHotKey())
   }

   return (
      <form className={open ? "is-collapse" : ""}>
         <Tippy
            animation={"perspective-extreme"}
            onClickOutside={() => setOpen(false)}
            visible={open}
            content={<SuggestList></SuggestList>}
            interactive={true}
            arrow={false}
            offset={[0, 0]}
            placement={"bottom-start"}
            maxWidth={"auto"}
         >
            <div className="form-level">
               <button type="button" className="header_btn-search">
                  <i className="icon ic-search"></i>
               </button>
               <input
                  type="text"
                  value={value}
                  onChange={(e) => {
                     setValue(e.target.value)
                  }}
                  onFocus={handleFocus}
                  className="header_search"
                  placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát..."
               />
               {value && open && (
                  <button className="header_btn-remove ">
                     <i className="icon ic-close"></i>
                  </button>
               )}
            </div>
         </Tippy>
      </form>
   )
}

export default NavForm
