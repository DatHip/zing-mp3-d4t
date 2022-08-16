import Tippy from "@tippyjs/react"
import "tippy.js/animations/perspective-extreme.css"
import React, { useState } from "react"
import styled from "styled-components"

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

const LoginPortal = () => {
   return (
      <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
         <ul className="menu-list">
            <li className="header-player-setting">
               <a
                  target="_blank"
                  href="https://zingmp3.vn/vip?utm_source=desktop&utm_campaign=VIP&utm_medium=%s"
                  rel="noreferrer"
               >
                  <button className="zm-btn button" tabIndex={0}>
                     <i className="icon ic-20-VIP-2" />
                     <span>Nâng cấp VIP</span>
                  </button>
               </a>
            </li>

            <li className="header-player-setting logout-header">
               <a>
                  <button className="zm-btn button" tabIndex={0}>
                     <i className="icon ic-log-out" />
                     <span>Đăng xuất</span>
                  </button>
               </a>
            </li>
         </ul>
      </LoginPortalStyyles>
   )
}

const ItemLogin = ({ isTitle = true, width = 38, height = 38 }) => {
   const [open, setOpen] = useState(false)

   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         content={<LoginPortal></LoginPortal>}
         interactive={true}
         arrow={false}
         offset={[0, 10]}
         placement={"bottom-end"}
      >
         <div onClick={() => setOpen((value) => !value)} className="setting_item setting_item-user">
            <div className={`w-[${width}px] h-[${height}px] setting_item-user-img  overflow-hidden rounded-full`}>
               {/* <img
                        src="https://s120-ava-talk-zmp3.zmdcdn.me/4/8/a/7/2/120/15dc5dc4244b6e7bef603c69a042f13d.jpg"
                        alt=""
                     ></img> */}
               <img src="https://avatar.talk.zdn.vn/default.jpg" alt=""></img>
            </div>
            {isTitle && !open && <span className="setting_item-title">Cá Nhân</span>}
         </div>
      </Tippy>
   )
}

export default ItemLogin
