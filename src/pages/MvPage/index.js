import React from "react"
import { NavLink, Outlet } from "react-router-dom"

const TABS = [
   { to: "/mv/IWZ9Z08I", label: "Việt Nam" },
   { to: "/mv/IWZ9Z08O", label: "US-UK" },
   { to: "/mv/IWZ9Z08W", label: "KPOP" },
   { to: "/mv/IWZ9Z086", label: "HÒA TẤu", id: "navHoaTau" },
]

const tabClass = ({ isActive }) => (isActive ? "main_mv-header-item active" : "main_mv-header-item")

const MvPage = () => (
   <div className="main_mv main-page-item active">
      <div className="main_mv-header mb-[30px]">
         <h3>MV</h3>
         <nav className="main_mv-header_navbar">
            {TABS.map((t) => (
               <NavLink key={t.to} id={t.id} className={tabClass} to={t.to}>
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

export default MvPage
