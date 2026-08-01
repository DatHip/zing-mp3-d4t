import React, { useEffect } from "react"
import { NavLink, Outlet } from "react-router-dom"
import scrollTop from "utils/scrollToTop"

const TABS = [
   { to: "/history/song", label: "Bài Hát" },
   { to: "/history/playlist", label: "PLAYLIST" },
   { to: "/history/video", label: "MV" },
]

const tabClass = ({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")

const HistoryPage = () => {
   useEffect(() => {
      scrollTop()
   }, [])

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-header mb-[30px]">
            <h3>Phát Gần Đây</h3>
            <nav className="main_mv-header_navbar">
               {TABS.map((t) => (
                  <NavLink key={t.to} className={tabClass} to={t.to}>
                     {t.label}
                  </NavLink>
               ))}
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet />
         </div>
      </div>
   )
}

export default HistoryPage
