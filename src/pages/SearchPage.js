import React from "react"
import { Outlet, useLocation, useParams } from "react-router"
import { Link } from "react-router-dom"

const SearchPage = () => {
   const { id } = useParams()
   let ids = id.replace(/\s/g, "%20")
   let location = useLocation()

   return (
      <div className="main_mv main-page-item active">
         <div className="main_search main_mv-header mb-[30px]">
            <h3 className="!inline-block">Kết Quả Tìm Kiếm</h3>
            <nav className="main_mv-header_navbar">
               <Link
                  className={`main_mv-header-item ${location.pathname.indexOf("/tim-kiem/tatca/") >= 0 ? "active" : ""}`}
                  to={`/tim-kiem/tatca/${ids}`}
               >
                  TẤT CẢ
               </Link>
               <Link
                  className={`main_mv-header-item ${location.pathname.indexOf("/tim-kiem/baihat/") >= 0 ? "active" : ""}`}
                  to={`/tim-kiem/baihat/${ids}`}
               >
                  BÀI HÁT
               </Link>

               <Link
                  className={`main_mv-header-item ${location.pathname.indexOf("/tim-kiem/playlist/") >= 0 ? "active" : ""}`}
                  to={`/tim-kiem/playlist/${ids}`}
               >
                  PLAYLIST/ALBUM
               </Link>
               <Link
                  className={`main_mv-header-item ${location.pathname.indexOf("/tim-kiem/artist/") >= 0 ? "active" : ""}`}
                  to={`/tim-kiem/artist/${ids}`}
               >
                  NGHỆ SĨ/OA
               </Link>
               <Link
                  className={`main_mv-header-item ${location.pathname.indexOf("/tim-kiem/video/") >= 0 ? "active" : ""}`}
                  to={`/tim-kiem/video/${ids}`}
               >
                  MV
               </Link>
            </nav>
         </div>
         <div className="main_mv-container ">
            <Outlet></Outlet>
         </div>
      </div>
   )
}

export default SearchPage
