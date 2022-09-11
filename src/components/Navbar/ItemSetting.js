import Tippy from "@tippyjs/react"
import React, { useState } from "react"
import SettingPortal from "../Portal/SettingPortal"

const ItemSetting = () => {
   const [open, setOpen] = useState(false)

   return (
      <Tippy
         animation={"perspective-extreme"}
         onClickOutside={() => setOpen(false)}
         visible={open}
         content={<SettingPortal></SettingPortal>}
         interactive={true}
         arrow={false}
         offset={[0, 2]}
         placement={"bottom-end"}
      >
         <div className="relative">
            <div className="setting_item setting_item-set relative" onClick={() => setOpen((value) => !value)}>
               <i className="icon ic-settings  pointer-events-none"></i>
               {!open && <span className="setting_item-title">Cài Đặt</span>}
            </div>
         </div>
      </Tippy>
   )
}

export default ItemSetting
