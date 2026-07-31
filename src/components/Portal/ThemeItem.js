import "react-lazy-load-image-component/src/effects/blur.css"
import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useSelector, useDispatch } from "react-redux"
import { setThemes } from "../../features/setTheme/themeSetFeatures"

const Items = memo(({ item }) => {
   const { name, itemS } = item
   const dispatch = useDispatch()

   const dataTheme = useSelector((state) => state.themetoggle)
   const handleClickApply = () => {
      dispatch(setThemes(item))
   }

   const img = itemS.slice(itemS.lastIndexOf("/"))
   return (
      <div className="column mb-[20px] is-fullhd-2 is-widescreen-2 is-desktop-20 is-touch-3 is-tablet-4 mobile-12">
         <div className="zm-card zm-card-theme">
            <div className="zm-card-image theme-image">
               <figure className="image image is-48x48">
                  <LazyLoadImage visibleByDefault={itemS === img} effect={"blur"} src={itemS} alt={name} />
               </figure>
               {dataTheme.name === name && dataTheme.itemS === itemS && <i className="icon ic-check" />}
               <div className="opacity" />
               <div className="zm-box zm-actions theme-actions">
                  <div className="zm-btn mar-b-10">
                     <div>
                        <button
                           onClick={() => handleClickApply()}
                           className="zm-btn active is-small is-outlined is-upper button hover:brightness-90 "
                           tabIndex={0}
                        >
                           Áp dụng
                        </button>
                     </div>
                  </div>
                  <button className="zm-btn is-small is-outlined is-upper button" tabIndex={0}>
                     Xem trước
                  </button>
               </div>
            </div>
            <div className="zm-card-content">
               <h4 className="title is-6">{name}</h4>
            </div>
         </div>
      </div>
   )
})

const ThemeItem = ({ item }) => {
   const { items, title } = item

   return (
      <>
         <h3 className="title">{title}</h3>
         <div className="columns is-multiline">
            {items.map((e, index) => (
               <Items key={index} item={e}></Items>
            ))}
         </div>
      </>
   )
}

export default memo(ThemeItem)
