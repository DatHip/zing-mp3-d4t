import React from "react"

import SettingMenu from "components/navbar/SettingMenu"
import ThemeMenu from "components/navbar/ThemeMenu"
import UserMenu from "components/navbar/UserMenuLazy"

const HeaderRight = () => {
   return (
      <div className="header_content-right">
         <ThemeMenu></ThemeMenu>
         <SettingMenu></SettingMenu>
         <UserMenu></UserMenu>
      </div>
   )
}

export default HeaderRight
