import React, { Suspense } from "react"

// ItemLogin pulls in Tippy + the Firebase Auth SDK. Both header slots go through
// this wrapper so they share one async chunk instead of anchoring it in main.js.
const ItemLogin = React.lazy(() => import("./ItemLogin"))

// Mirrors ItemLogin's outer markup so swapping in the real component is layout-neutral.
const ItemLoginFallback = ({ width, height }) => (
   <div className="setting_item setting_item-user">
      <div className={`w-[${width}px] h-[${height}px] setting_item-user-img  overflow-hidden rounded-full`}>
         <figure>
            <img className="object-cover h-[40px] w-[40px]" src="https://avatar.talk.zdn.vn/default" alt="" />
         </figure>
      </div>
   </div>
)

const ItemLoginLazy = ({ isTitle = true, width = 38, height = 38 }) => (
   <Suspense fallback={<ItemLoginFallback width={width} height={height} />}>
      <ItemLogin isTitle={isTitle} width={width} height={height} />
   </Suspense>
)

export default ItemLoginLazy
