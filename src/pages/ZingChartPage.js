import React from "react"
import CharHomeItem from "../components/Selection/CharHomeItem"

const ZingChartPage = () => {
   return (
      <div className="main_topchart  main-page-item ">
         <div className="container_zing-chart">
            <div className="container_zing-chart-pos">
               <div className="zing-chart_top">
                  <a href="#">
                     Top Chart <span className="material-icons-round"> play_circle </span>
                  </a>
               </div>

               <div className="row zing-chart_bottom">
                  <div className="col l-12 m-12 c-12">
                     <div className="zing-chart_right">
                        <div className="zing-chart_right-top"></div>
                        <CharHomeItem id="myChart2"></CharHomeItem>
                     </div>
                  </div>
                  <div className="col l-12 m-12 c-12 ">
                     <div className="zing-chart_list"></div>
                     <div className="zing-chart_item-bottom">
                        <button id="btn_chart-more100" className="zing-chart_btn">
                           Xem Top 100
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div className="main_topchart-week">
            <h3>Bảng Xếp Hạng Tuần</h3>
            <div className="main_topchart-week3 row">
               <div className="col l-4 m-12 c-12">
                  <div className="week-chart-box vn">
                     <div className="week-chart-box-title">
                        <p>Việt Nam</p>
                        <span encodeid="6BWFIAE8" id="btn-play_vn-week" className="material-icons-round">
                           {" "}
                           play_circle{" "}
                        </span>
                     </div>
                     <div className="container_zing-chart">
                        <div className="zing-chart_list week"></div>
                     </div>
                  </div>
               </div>
               <div className="col l-4 m-12 c-12">
                  <div className="week-chart-box usuk">
                     <div className="week-chart-box-title">
                        <p>US-UK</p>
                        <span encodeid="6BWCBFDF" id="btn-play_us-week" className="material-icons-round">
                           {" "}
                           play_circle{" "}
                        </span>
                     </div>
                     <div className="container_zing-chart">
                        <div className="zing-chart_list week"></div>
                     </div>
                  </div>
               </div>
               <div className="col l-4 m-12 c-12">
                  <div className="week-chart-box kpop">
                     <div className="week-chart-box-title">
                        <p>Korea</p>
                        <span encodeid="6BWF7Z70" className="material-icons-round">
                           {" "}
                           play_circle{" "}
                        </span>
                     </div>
                     <div className="container_zing-chart">
                        <div className="zing-chart_list week"></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default ZingChartPage
