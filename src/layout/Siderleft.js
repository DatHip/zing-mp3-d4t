import React, { memo } from "react"
import { useSelector } from "react-redux"
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom"
import useWindowSize from "../hook/useResizeHook"
import useToggle from "../hook/useToggleHook"

const Siderleft = () => {
   const { width } = useWindowSize()
   const navigate = useNavigate()
   const { pathname } = useLocation()

   let pathMyMusic = pathname.indexOf("mymusic")

   const [isToggle, setIsToggle] = useToggle(false)
   const activeUser = useSelector((state) => state.users.activeUser)

   return (
      <aside
         className={`sider-navbar ${
            width <= 1225 && !isToggle ? "navbar-left-actice" : width <= 1225 && isToggle && "navbar-exanded-active"
         } `}
      >
         <div className="sider">
            <Link to={"/"} id="logo-sider" className="sider_brand-item">
               <div className="sider_brand-item-img">
                  <img src="/pabicon.webp" alt="logo-dat-mp3" />
               </div>
               <p className="sider_brand-item-text">
                  D4T <span>MP3</span>
               </p>
            </Link>
         </div>
         <div className="sider_menu sider_menu-c">
            <ul className="sider_menu-list">
               <div
                  onClick={() => {
                     if (!activeUser) {
                        // eslint-disable-next-line no-restricted-globals
                        if (confirm("Bạn cần đăng nhập") === true) {
                           navigate("/auth")
                        } else {
                           return
                        }
                     } else {
                        navigate("/mymusic/")
                     }
                  }}
                  to="/mymusic/"
                  title="Cá nhân"
                  className={`sider_menu-item sider_menu-item-acitve ${pathMyMusic > 0 ? "sider_active" : ""} `}
               >
                  <div>
                     <i className="icon  ic-24-LibraryTab"></i>
                     <span className="sider_menu-item-title">Cá Nhân</span>
                  </div>
               </div>

               <NavLink
                  to="/"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="Khám phá"
               >
                  <div>
                     <i className="icon  ic-24-HomeTab"></i>
                     <span className="sider_menu-item-title">Khám Phá</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/zing-chart"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="#topchart"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-ChartTab"></i>
                     <span className="sider_menu-item-title"> Top Chart</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/radio"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="Radio"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-RadioTab"></i>
                     <span className="sider_menu-item-title">Radio</span>
                  </div>
               </NavLink>
               <NavLink
                  to="/newfeed/Viet-Nam/IWZ9Z08I"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="Theo Dõi"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-FeedTab"></i>
                     <span className="sider_menu-item-title">Theo Dõi</span>
                  </div>
               </NavLink>
            </ul>
         </div>
         <div className="sider_divide" />
         <div className="sider_menu sider_menu-bottom">
            <ul className="sider_menu-list">
               <NavLink
                  to="moi-phat-hanh"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="Nhạc mới"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-NewReleaseTab"></i>
                     <span className="sider_menu-item-title">Nhạc Mới</span>
                  </div>
               </NavLink>
               <NavLink
                  to="hub"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="Thể Loại"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-GenreTab"></i>
                     <span className="sider_menu-item-title">Thể Loại</span>
                  </div>
               </NavLink>
               <NavLink
                  to="top100"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="#Top100"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-Top100Tab"></i>
                     <span className="sider_menu-item-title">Top 100</span>
                  </div>
               </NavLink>
               <NavLink
                  to="mv/IWZ9Z08I"
                  className={({ isActive }) =>
                     isActive ? "sider_menu-item sider_menu-item-acitve sider_active" : "sider_menu-item sider_menu-item-acitve "
                  }
                  title="MV"
               >
                  <div className="cursor-pointer">
                     <i className="icon  ic-24-MVTab"></i>
                     <span className="sider_menu-item-title">MV</span>
                  </div>
               </NavLink>
            </ul>
         </div>
         {!activeUser && (
            <div className="sider_vip !pt-0 !pb-0 ">
               <div className="sider_vip-main">
                  <p>Đăng nhập để khám phá playlist dành riêng cho bạn</p>
                  <button
                     onClick={() => {
                        navigate("/auth")
                     }}
                  >
                     Đăng Nhập
                  </button>
               </div>
            </div>
         )}
         {activeUser && <div className="sider_divide" />}

         <NavLink
            to="history/playlist"
            className={({ isActive }) =>
               isActive
                  ? "slider-history sider_menu-item sider_menu-item-acitve sider_active !mb-[2rem] !mt-[.6rem]"
                  : "sider_menu-item sider_menu-item-acitve slider-history !mt-[.6rem] !mb-[2rem]"
            }
            title="Nhạc mới"
         >
            <div className="cursor-pointer">
               <i className="icon">
                  <img src="https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.0.13/static/media/my-history.374cb625.svg" alt="" />
               </i>
               <span className="sider_menu-item-title font-normal">Gần đây</span>
            </div>
         </NavLink>

         <button onClick={setIsToggle} className="sider-navbar-exanded">
            <span className="material-icons-outlined navbar-exanded-btn-left"> navigate_next </span>
            <span className="material-icons-outlined navbar-exanded-btn-right"> navigate_before </span>
         </button>
      </aside>
   )
}

export default memo(Siderleft)
