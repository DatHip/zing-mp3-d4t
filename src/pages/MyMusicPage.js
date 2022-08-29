import React from "react"
import { memo } from "react"
import { Link, Outlet, useLocation, useParams } from "react-router-dom"

const MyMusicPage = () => {
   const { pathname: id } = useLocation()

   return (
      <div className="main_personal text-white">
         <div className="personal_user">
            <div className="personal_user-img w-[60px] h-[60px]">
               <figure>
                  <img
                     src="https://scontent.fhph2-1.fna.fbcdn.net/v/t39.30808-6/247626715_666350100997661_669949583673348293_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=GxJ2uKj8nKUAX9RZevX&_nc_ht=scontent.fhph2-1.fna&oh=00_AT9_rrjOIAN6CB2qJMh6hsV4eGiuznr2r1W0kTeA6v5aXg&oe=630CE24F"
                     alt=""
                  />
               </figure>
            </div>
            <h3>Đạt Huỳnh</h3>
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
            </ul>
         </div>

         <Outlet></Outlet>
      </div>
   )
}

export default memo(MyMusicPage)
