import React, { Suspense } from "react"

import ItemSetting from "./ItemSetting"
import ItemThemes from "./ItemThemes"

const ItemLogin = React.lazy(() => import("./ItemLogin"))

const LoginFallback = () => (
   <div className="setting_item setting_item-login" style={{ width: 32, height: 32 }} />
)

const HeaderRight = () => {
   return (
      <div className="header_content-right">
         <ItemThemes></ItemThemes>
         <ItemSetting></ItemSetting>
         <Suspense fallback={<LoginFallback />}>
            <ItemLogin></ItemLogin>
         </Suspense>
      </div>
   )
}

export default HeaderRight
