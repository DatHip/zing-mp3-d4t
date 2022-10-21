import { doc, getDoc } from "firebase/firestore"
import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { memo } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { database } from "../firebase/firebase-config"

const MyMusicPage = () => {
   const { pathname: id } = useLocation()
   const users = useSelector((state) => state.users)

   const navigate = useNavigate()
   const { activeUser, name, id: ids } = useSelector((state) => state.users)
   const [docs, setDocs] = useState()

   useEffect(() => {
      if (!activeUser) {
         navigate("/auth")
      }
   }, [])

   useEffect(() => {
      if (activeUser) {
         const docRef = doc(database, "users", ids)
         getDoc(docRef).then((value) => {
            setDocs(value.data())
         })
      }
   }, [])

   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px] shadow-sm border border-dashed ">
               <figure>
                  <img
                     className="object-cover h-[60px]"
                     src={users.imgUrl ? users.imgUrl : "https://avatar.talk.zdn.vn/default"}
                     alt=""
                  />
               </figure>
            </div>
            <h3>{name || "User"}</h3>
         </div>

         <div className="flex items-center min-h-[52px] my-[30px]">
            <ul className="zm-navbar-menu flex items-center justify-center gap-[10px]">
               <li className={`zm-navbar-item ${id === "/mymusic/" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/mymusic/">TỔNG QUAN</Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${id === "/mymusic/song" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/mymusic/song">BÀI HÁT</Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${id === "/mymusic/playlist" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/mymusic/playlist">PLAYLIST</Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${id === "/mymusic/nghe-si" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/mymusic/nghe-si">NGHỆ SĨ</Link>
                  </div>
               </li>
               <li className={`zm-navbar-item ${id === "/mymusic/info" ? "is-active" : ""}  `}>
                  <div className="navbar-link">
                     <Link to="/mymusic/info">Thông tin</Link>
                  </div>
               </li>
            </ul>
         </div>

         <Outlet context={{ docs }}></Outlet>
      </div>
   )
}

export default memo(MyMusicPage)
