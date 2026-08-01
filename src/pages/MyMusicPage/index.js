import React, { memo } from "react"
import { Link, Outlet } from "react-router-dom"
import { useMyMusicPage } from "./useMyMusicPage"

const MyMusicPage = () => {
   const { users, name, docs, tabs } = useMyMusicPage()

   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px] shadow-sm border border-dashed ">
               <figure>
                  <img
                     className="object-cover h-[60px]"
                     src={users.imgUrl || "https://avatar.talk.zdn.vn/default"}
                     alt=""
                  />
               </figure>
            </div>
            <h3>{name || "User"}</h3>
         </div>

         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               {tabs.map((tab) => (
                  <li key={tab.path} className={`zm-navbar-item ${tab.active ? "is-active" : ""}  `}>
                     <div className="navbar-link">
                        <Link to={tab.path}>{tab.label}</Link>
                     </div>
                  </li>
               ))}
            </ul>
         </div>

         <Outlet context={{ docs }} />
      </div>
   )
}

export default memo(MyMusicPage)
