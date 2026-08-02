import React, { memo } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { byType, useHomeSection } from "hook/useHomeSection"

const WeekChartHomePage = memo(() => {
   const { section, isLoading } = useHomeSection(byType("weekChart"))
   const datas = section?.items

   if (!section && !isLoading) return null

   return (
      <div className="container_chart-weekend">
         <div className="chart-weekend_list row">
            {datas &&
               datas.map((e, index) => {
                  const img = e.cover.slice(e.cover.lastIndexOf("/"))

                  return (
                     <div key={index} className="chart-weekend_list-item col l-4 m-4 c-5">
                        <a className="chart-weekend_list-item-link main-page_list-item main_page-hover" href="#">
                           <div className="chart-weekend_list-item-link main-page_list-item_img">
                              <LazyLoadImage visibleByDefault={e.cover === img} src={e.cover} alt="" />
                           </div>
                        </a>
                     </div>
                  )
               })}
         </div>
      </div>
   )
})

export default WeekChartHomePage
