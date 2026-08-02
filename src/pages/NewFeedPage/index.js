import React from "react"
import { Outlet, useParams } from "react-router"
import { Link } from "react-router-dom"

const TABS = [
   { key: "Viet-Nam", to: "/newfeed/Viet-Nam/IWZ9Z08I", label: "Việt Nam" },
   { key: "Au-My", to: "/newfeed/Au-My/IWZ9Z08O", label: "US-UK" },
   { key: "Han-Quoc", to: "/newfeed/Han-Quoc/IWZ9Z08W", label: "K-POP" },
   { key: "Hoa-Ngu", to: "/newfeed/Hoa-Ngu/IWZ9Z08U", label: "Hoa Ngữ" },
]

const NewFeedPage = () => {
   const { nation } = useParams()

   return (
      <div>
         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               {TABS.map((tab) => (
                  <li key={tab.key} className={`zm-navbar-item ${nation === tab.key ? "is-active" : ""}  `}>
                     <div className="navbar-link">
                        <Link to={tab.to}>{tab.label}</Link>
                     </div>
                  </li>
               ))}
            </ul>
         </div>
         <Outlet />
      </div>
   )
}

export default NewFeedPage
