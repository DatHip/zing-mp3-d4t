import React from "react"
import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import { useSearchPage } from "./useSearchPage"

const SearchPage = () => {
   const { tabs } = useSearchPage()

   return (
      <div className="main_mv main-page-item active">
         <div className="main_search main_mv-header mb-[30px]">
            <h3 className="!inline-block">Kết Quả Tìm Kiếm</h3>
            <nav className="main_mv-header_navbar">
               {tabs.map((tab) => (
                  <Link
                     key={tab.key}
                     className={`main_mv-header-item ${tab.active ? "active" : ""}`}
                     to={tab.to}
                  >
                     {tab.label}
                  </Link>
               ))}
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet />
         </div>
      </div>
   )
}

export default SearchPage
