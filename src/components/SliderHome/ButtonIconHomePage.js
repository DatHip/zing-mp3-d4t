import React from "react"
import { Link } from "react-router-dom"

const ButtonIconHomePage = () => {
   return (
      <div className="container_btn-icon-c ">
         <div className="sider_menu-list row">
            <div id="btnNhacMoiC" title="Nhạc mới" className="sider_menu-item col c-2-4">
               <Link to={"moi-phat-hanh"}>
                  <span className="material-icons-outlined"> music_note </span>
                  <span className="sider_menu-item-title">Nhạc Mới</span>
               </Link>
            </div>
            <div title="Thể Loại" className="sider_menu-item col c-2-4">
               <Link to={"hub"}>
                  <span className="material-icons-outlined"> category </span>
                  <span className="sider_menu-item-title">Thể Loại</span>
               </Link>
            </div>
            <div id="btnTop100C" title="#Top100" className="sider_menu-item col c-2-4">
               <Link to={"top100"}>
                  <span className="material-icons-outlined"> star_outline </span>
                  <span className="sider_menu-item-title">Top 100</span>
               </Link>
            </div>
            <div id="btnMvC" title="MV" className="sider_menu-item col c-2-4">
               <Link to={"mv/IWZ9Z08I"}>
                  <span className="material-icons-outlined"> movie_filter </span>
                  <span className="sider_menu-item-title">MV</span>
               </Link>
            </div>
            <div title="diamond" className="sider_menu-item col c-2-4">
               <Link to={"history/playlist"}>
                  <span className="">
                     <img
                        className="w-[42px] h-[42px] mb-[6px] history-icon-c"
                        src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg"
                        alt=""
                     />
                  </span>
                  <span className="sider_menu-item-title">Gần Đây</span>
               </Link>
            </div>
         </div>
      </div>
   )
}

export default ButtonIconHomePage
