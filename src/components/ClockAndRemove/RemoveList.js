import Tippy from "@tippyjs/react"
import React, { memo } from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import styled from "styled-components"
import { removeList } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay } from "../../features/SettingPlay/settingPlay"

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
   const dispatch = useDispatch()

   const handlRemoveList = () => {
      dispatch(setPlay(false))
      dispatch(removeList())

      setTimeout(() => {
         setOpen(false)
      }, 200)
   }

   return (
      <LoginPortalStyyles className="menu menu-settings setting-header header-dropdown pad-t-0">
         <ul className="menu-list">
            <li className="header-player-setting">
               <button onClick={handlRemoveList} className="w-full zm-btn button cursor-pointer" tabIndex={0}>
                  <i className="icon ic-delete"></i>
                  <span>Xoá danh sách phát</span>
               </button>
            </li>
         </ul>
      </LoginPortalStyyles>
   )
}
const RemoveList = memo(() => {
   const [open, setOpen] = useState(false)
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
         <div onClick={() => setOpen((value) => !value)} className="player_btn queue_more">
            <span className="material-icons-outlined"> more_horiz </span>
            <div className="playing_title-hover">Khác</div>
         </div>
      </Tippy>
   )
})

export default RemoveList
