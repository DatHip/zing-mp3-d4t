import Tippy from "@tippyjs/react"
import "tippy.js/animations/perspective-extreme.css"
import React, { useState } from "react"
import styled from "styled-components"
import { useLocation, useNavigate } from "react-router"
import { signOut } from "firebase/auth"
import { auth } from "../../firebase/firebase-config"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { logOut } from "../../features/User/userFeatures"
import { useSelector } from "react-redux"

const LoginPortalStyyles = styled.div`
   background-color: var(--primary-bg);
   border-radius: 8px;
   box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
   width: 240px;
   z-index: 101;
   padding-top: 10px;
   padding-bottom: 10px;
   .menu-list {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      li.is-active,
      li:hover {
         background-color: var(--alpha-bg);
         color: var(--text-item-hover);
      }
      li {
         width: 100%;
      }

      li button {
         font-size: 14px;
         color: var(--navigation-text);
         display: flex;
         justify-content: start;
         align-items: center;
         padding: 12px 20px;
         i {
            margin-right: 10px;
            font-size: 20px;
         }
      }
      li a {
         color: var(--text-secondary);
      }
   }

   .tippy-box {
      background-color: transparent;
      border: none;

      .tippy-content {
         padding: 0;
      }
   }
`

const LoginPortal = ({ setOpen }) => {
   const { pathname } = useLocation()
   const navigate = useNavigate()
   const dispatch = useDispatch()
   const activeUser = useSelector((state) => state.users.activeUser)

   const handleSignOut = async () => {
      signOut(auth)
         .then(() => {
            let path = pathname.search("mymusic")
            setOpen(false)
            dispatch(logOut())

            if (path > 0) {
               navigate("/")
            }

            toast("Đã đăng xuất")
         })
         .catch((err) => console.log(err))
   }

   return (
      <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
         <ul className="menu-list">
            <li className="header-player-setting">
               <a
                  target="_blank"
                  href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s"
                  rel="noreferrer"
               >
                  <button className="zm-btn button w-full" tabIndex={0}>
                     <i className="icon ic-20-VIP-2" />
                     <span>Nâng cấp VIP</span>
                  </button>
               </a>
            </li>
            <li className="header-player-setting">
               {activeUser && (
                  <button onClick={() => {}} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                     <i className="icon ic-24-Privacy"></i>
                     <span>Thông tin tài khoản</span>
                  </button>
               )}
            </li>

            <li className="header-player-setting logout-header">
               <div>
                  {activeUser && (
                     <button onClick={handleSignOut} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                        <i className="icon ic-log-out" />
                        <span>Đăng xuất</span>
                     </button>
                  )}

                  {!activeUser && (
                     <button
                        onClick={() => {
                           navigate("/auth")
                        }}
                        className="w-full zm-btn button cursor-pointer"
                        tabIndex={0}
                     >
                        <i className="icon ic-log-out" />
                        <span>Đăng Nhập</span>
                     </button>
                  )}
               </div>
            </li>
         </ul>
      </LoginPortalStyyles>
   )
}

const ItemLogin = ({ isTitle = true, width = 38, height = 38 }) => {
   const [open, setOpen] = useState(false)
   const users = useSelector((state) => state.users)

   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         content={<LoginPortal setOpen={setOpen}></LoginPortal>}
         interactive={true}
         arrow={false}
         offset={[0, 10]}
         placement={"bottom-end"}
      >
         <div onClick={() => setOpen((value) => !value)} className="setting_item setting_item-user">
            <div className={`w-[${width}px] h-[${height}px] setting_item-user-img  overflow-hidden rounded-full`}>
               <figure>
                  <img
                     className={`object-cover h-[40px] w-[40px]`}
                     src={users.imgUrl ? users.imgUrl : "https://avatar.talk.zdn.vn/default"}
                     alt=""
                  />
               </figure>
               {/* <img src="https://avatar.talk.zdn.vn/default.jpg" alt=""></img> */}
            </div>
            {isTitle && !open && <span className="setting_item-title">Cá Nhân</span>}
         </div>
      </Tippy>
   )
}

export default ItemLogin
