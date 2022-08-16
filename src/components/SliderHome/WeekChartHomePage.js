import React, { memo, useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { useGetHomePage } from "../../api/getHomePage"

const WeekChartHomePage = memo(() => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.sectionType === "weekChart")

   useEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
   }, [status])

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
