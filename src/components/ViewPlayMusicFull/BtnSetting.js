import Tippy from "@tippyjs/react"
import React, { memo } from "react"
import { useState } from "react"
import PortalSetting from "./PortalSetting"

const BtnSetting = memo(() => {
   const [open, setOpen] = useState(false)

   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         interactive={true}
         arrow={false}
         content={<PortalSetting></PortalSetting>}
         placement={"bottom-end"}
         offset={[0, 12]}
      >
         <div onClick={() => setOpen((value) => !value)} className="nowplaying-header_setting-item item-setting">
            <button className="nowplaying-header_setting-btn setting">
               <span className="material-icons-outlined">settings</span>
            </button>
         </div>
      </Tippy>
   )
})

export default BtnSetting
