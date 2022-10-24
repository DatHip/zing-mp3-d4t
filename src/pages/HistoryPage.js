import React from "react"
import { useEffect } from "react"
import scrollTop from "../utils/scrollToTop"

import { NavLink, Outlet } from "react-router-dom"
const HistoryPage = () => {
   useEffect(() => {
      scrollTop()
   }, [])

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-header mb-[30px]">
            <h3>Phát Gần Đây</h3>
            <nav className="main_mv-header_navbar">
               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/history/song"
               >
                  Bài Hát
               </NavLink>
               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/history/playlist"
               >
                  PLAYLIST
               </NavLink>

               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/history/video"
               >
                  MV
               </NavLink>
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet></Outlet>
         </div>
      </div>
   )
}

export default HistoryPage
