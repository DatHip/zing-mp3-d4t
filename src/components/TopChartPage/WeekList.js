import React, { memo } from "react"
import ItemChartList from "./ItemChartList"

const WeekList = memo(({ data }) => {
   const vn = data?.vn
   const us = data?.us
   const korea = data?.korea

   return (
      <div className="main_topchart-week">
         <h3>Bảng Xếp Hạng Tuần</h3>
         <div className="main_topchart-week3 row">
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box vn">
                  <div className="week-chart-box-title">
                     <p>Việt Nam</p>
                     <span id="btn-play_vn-week" className="material-icons-round">
                        play_circle
                     </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        {vn?.items.slice(0, 5).map((e, index) => {
                           return <ItemChartList isChildren key={e.encodeId} item={e} index={index}></ItemChartList>
                        })}
                     </div>
                     <div className="zing-chart_item-bottom">
                        <button className="zing-chart_btn">Xem Thêm</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box usuk">
                  <div className="week-chart-box-title">
                     <p>US-UK</p>
                     <span id="btn-play_us-week" className="material-icons-round">
                        play_circle
                     </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        <div className="zing-chart_list week">
                           {us?.items.slice(0, 5).map((e, index) => {
                              return <ItemChartList isChildren key={e.encodeId} item={e} index={index}></ItemChartList>
                           })}
                        </div>
                        <div className="zing-chart_item-bottom">
                           <button className="zing-chart_btn">Xem Thêm</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box kpop">
                  <div className="week-chart-box-title">
                     <p>Korea</p>
                     <span className="material-icons-round"> play_circle </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        <div className="zing-chart_list week">
                           {korea?.items.slice(0, 5).map((e, index) => {
                              return <ItemChartList isChildren key={e.encodeId} item={e} index={index}></ItemChartList>
                           })}
                        </div>
                        <div className="zing-chart_item-bottom">
                           <button className="zing-chart_btn">Xem Thêm</button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
})

export default WeekList
