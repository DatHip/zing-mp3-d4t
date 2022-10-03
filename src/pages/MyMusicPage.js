import React from "react"
import { useEffect } from "react"
import { memo } from "react"
import { useSelector } from "react-redux"
import { Link, Outlet, useLocation, useNavigate, useParams } from "react-router-dom"

const MyMusicPage = () => {
   const { pathname: id } = useLocation()
   const navigate = useNavigate()
   const { activeUser, name } = useSelector((state) => state.users)

   useEffect(() => {
      if (!activeUser) {
         navigate("/auth")
      }
   }, [])

   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px]">
               <figure>
                  <img src="https://avatar.talk.zdn.vn/default" alt="" />
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

         <Outlet></Outlet>
      </div>
   )
}

export default memo(MyMusicPage)
