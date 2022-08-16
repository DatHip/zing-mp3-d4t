import React from "react"
import { useNavigate } from "react-router-dom"

const NavLinkArow = () => {
   const navigate = useNavigate()

   return (
      <>
         <button
            type="button"
            onClick={() => {
               navigate(-1)
            }}
            className="header_btn-back "
         >
            <span className="material-icons-outlined"> west </span>
         </button>
         <button
            type="button"
            onClick={() => {
               navigate(+1)
            }}
            className="header_btn-next  mr-8"
            // btn_disabled
         >
            <span className="material-icons-outlined"> east </span>
         </button>
      </>
   )
}

export default NavLinkArow
