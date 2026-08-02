import React from "react"

import ItemSetting from "./ItemSetting"
import ItemThemes from "./ItemThemes"
import ItemLogin from "./ItemLoginLazy"

const HeaderRight = () => {
   return (
      <div className="header_content-right">
         <ItemThemes></ItemThemes>
         <ItemSetting></ItemSetting>
         <ItemLogin></ItemLogin>
      </div>
   )
}

export default HeaderRight
