import React, { useState } from "react"
import styled from "styled-components"
import Tippy from "@tippyjs/react"

import "tippy.js/dist/tippy.css" // optional
const SettingPortalStyles = styled.div`
   background-color: var(--primary-bg);
   border-radius: 8px;
   position: absolute;
   box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
   width: 240px;
   z-index: 101;
   top: calc(100% + 8px);
   right: 0;
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

      li a,
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
`

const SettingPortalChildrenStylle = styled.ul`
   z-index: 111;
   border-radius: 8px;
   width: 274px;
   height: auto;
   padding: 10px 0;
   box-shadow: 0 0 5px 0 rgb(0 0 0 / 20%);
   background-color: var(--primary-bg);

   li:hover {
      background-color: var(--alpha-bg);
      color: var(--text-item-hover);
   }
   li {
      color: var(--navigation-text);
   }
   .option {
      height: auto;
      padding: 5px 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: var(--text-primary);
      cursor: pointer;
   }
   .option .left {
      width: 87%;
      text-align: left;
   }

   .icon {
      font-size: 20px;
   }
   .desc {
      margin-top: 6px;
      line-height: 1.5;
      font-size: 12px;
      color: var(--text-secondary);
   }
`

const SettingPortalChildren = () => {
   const [state, setSate] = useState(false)

   return (
      <SettingPortalChildrenStylle className="menu-list quality-list">
         <li onClick={() => setSate(false)} className="">
            <div className="option">
               <div className="left">
                  <div>
                     <b>SQ • 128</b>
                  </div>
                  <div className="desc">Giảm sử dụng dữ liệu cho các kết nối chậm hơn.</div>
               </div>
               <i className={`icon !mr-0 ml-auto ${!state && "ic-check"}`} />
            </div>
         </li>
         <li onClick={() => setSate(true)}>
            <div className="option">
               <div className="left">
                  <div>
                     <b>HQ • 320</b>
                  </div>
                  <div className="desc">Kết hợp tốt nhất giữa việc sử dụng dữ liệu và chất lượng âm thanh.</div>
               </div>
               <i className={`icon !mr-0 ml-auto ${state && "ic-check"}`} />
            </div>
         </li>
      </SettingPortalChildrenStylle>
   )
}

const SettingPortal = () => {
   return (
      <SettingPortalStyles className="setting-portal">
         <ul className="menu-list relative">
            <Tippy
               interactiveBorder={0}
               offset={[-10, 0]}
               interactive={true}
               arrow={false}
               content={<SettingPortalChildren></SettingPortalChildren>}
               placement={"left-start"}
            >
               <li className="quality-setting">
                  <button className="zm-btn button flex n w-full items-center" tabIndex={0}>
                     <i className="icon ic-20-quaility-SQ" />
                     Chất lượng nhạc
                     <i className="icon ic-go-right !mr-0 flex-1 !pr-0 !justify-end" />
                  </button>
               </li>
            </Tippy>
         </ul>
         <footer className="footer">
            <ul className="menu-list zm-nav-footer">
               <li>
                  <a
                     target="_blank"
                     href="https://github.com/DatHip"
                     className="z-link zm-btn"
                     title="Giới thiệu"
                     rel="noreferrer"
                  >
                     <i className="icon ic-20-info" />
                     <div>Giới thiệu</div>
                  </a>
               </li>
               <li>
                  <a
                     target="_blank"
                     className="z-link zm-btn"
                     href="https://forms.gle/Nvh7kthdvr4a5SBd7"
                     title="Góp ý"
                     rel="noreferrer"
                  >
                     <i className="icon ic-20-Report" />
                     <div>Góp ý</div>
                  </a>
               </li>
               <li>
                  <a
                     className="z-link zm-btn"
                     href="https://mp3.zing.vn/huong-dan/contact"
                     title="Liên hệ"
                     target="_blank"
                     rel="noreferrer"
                  >
                     <i className="icon ic-20-Call" />
                     <div>Liên hệ</div>
                  </a>
               </li>
            </ul>
         </footer>
      </SettingPortalStyles>
   )
}

export default SettingPortal
