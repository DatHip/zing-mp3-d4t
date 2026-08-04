import Tippy from "@tippyjs/react"
import React, { useCallback, useState } from "react"
import SettingPortal from "components/portal/SettingPortal"
import menuTriggerProps from "utils/menuTriggerProps"

const SettingMenu = () => {
   const [open, setOpen] = useState(false)
   const toggle = useCallback(() => setOpen((value) => !value), [])

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
         // Tippy would put aria-expanded on the wrapper div below, which has no
         // role to hang it on. The trigger declares its own state instead.
         aria={{ expanded: false }}
      >
         <div className="relative">
            <div
               className="setting_item setting_item-set relative"
               {...menuTriggerProps({ expanded: open, onToggle: toggle, label: "Cài đặt" })}
            >
               <i className="icon ic-settings  pointer-events-none"></i>
               {!open && <span className="setting_item-title">Cài Đặt</span>}
            </div>
         </div>
      </Tippy>
   )
}

export default SettingMenu
