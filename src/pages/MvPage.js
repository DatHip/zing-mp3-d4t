import React from "react"

import { NavLink, Outlet } from "react-router-dom"

const MvPage = () => {
   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-header mb-[30px]">
            <h3>MV</h3>
            <nav className="main_mv-header_navbar">
               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/mv/IWZ9Z08I"
               >
                  Việt Nam
               </NavLink>
               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/mv/IWZ9Z08O"
               >
                  US-UK
               </NavLink>

               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/mv/IWZ9Z08W"
               >
                  KPOP
               </NavLink>
               <NavLink
                  className={({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")}
                  to="/mv/IWZ9Z086"
                  id="navHoaTau"
               >
                  HÒA TẤu
               </NavLink>
            </nav>
         </div>
         <div className="main_mv-container text-white">
            <Outlet></Outlet>
         </div>
      </div>
   )
}

export default MvPage

//  border-bottom: 2px solid var(--purple-primary);
