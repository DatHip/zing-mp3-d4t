import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { setAciteTheme, setSizeText } from "features/setting/settingSlice"
import { selectIsBgFull, selectLyricTextSize } from "features/setting/settingSelectors"

const SettingPanel = () => {
   const dispatch = useDispatch()
   const isBgFull = useSelector(selectIsBgFull)
   const textSize = useSelector(selectLyricTextSize)

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
            <div className={`list  `}>
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

export default SettingPanel
