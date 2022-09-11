import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setAciteTheme, setSizeText } from "../../features/SettingPlay/settingPlay"

const PortalSetting = () => {
   const dispatch = useDispatch()
   const isBgFull = useSelector((state) => state.setting.isBgFull)
   const textSize = useSelector((state) => state.setting.text)

   const handleChangeInput = (e) => {
      dispatch(setAciteTheme(e.target.checked))
   }

   const onClickTextSize = (e) => {
      dispatch(setSizeText(e))
   }

   return (
      <ul className="nowplaying-header_setting-item-list">
         <li>
            <p>Hình nền</p>
            <input onChange={handleChangeInput} id="nowPlayingTheme" defaultChecked={isBgFull} type="checkbox" />
         </li>
         <li>
            <p>Cỡ chữ lời nhạc</p>
            <div className={`list text-white `}>
               <button
                  onClick={() => onClickTextSize(1)}
                  className={`nowplaying-header_setting-item-font-text ${textSize === 1 ? "active" : ""}`}
               >
                  A
               </button>
               <button
                  onClick={() => onClickTextSize(2)}
                  className={`nowplaying-header_setting-item-font-text ${textSize === 2 ? "active" : ""}`}
               >
                  A
               </button>
               <button
                  onClick={() => onClickTextSize(3)}
                  className={`nowplaying-header_setting-item-font-text ${textSize === 3 ? "active" : ""}`}
               >
                  A
               </button>
            </div>
         </li>
      </ul>
   )
}

export default PortalSetting
