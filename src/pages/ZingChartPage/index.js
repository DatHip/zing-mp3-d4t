import React from "react"

import ChartSongList from "components/song/ChartSongList"
import WeekChartList from "components/song/WeekChartList"
import LoadingSvg from "components/ui/LoadingSvg"

import { useZingChartPage } from "./useZingChartPage"

const ChartCard = React.lazy(() => import("components/card/ChartCard"))

const ZingChartPage = () => {
   const { data, isLoading, handlePlayAll, ranks } = useZingChartPage()

   if (isLoading || !data) return <LoadingSvg />

   return (
      <div className="main_topchart  main-page-item ">
         <div className="container_zing-chart">
            <div className="container_zing-chart-pos">
               <div className="zing-chart_top">
                  <div className="cursor-pointer zing-chartBtn">
                     <p>Top Chart</p>
                     <span onClick={handlePlayAll} className="material-icons-round">
                        play_circle
                     </span>
                  </div>
               </div>

               <div className="row zing-chart_bottom">
                  <div className="col l-12 m-12 c-12">
                     <div className="zing-chart_right">
                        <div className="zing-chart_right-top">
                           {ranks.map((title, i) => (
                              <div key={i} className="zing-chart_right-top_item">
                                 <div className="zing-chart_right-top_box" />
                                 <p>{title}</p>
                              </div>
                           ))}
                        </div>
                        <React.Suspense fallback={<div className="h-[250px] flex items-center justify-center">Loading chart...</div>}>
                           <ChartCard id="myChart2" />
                        </React.Suspense>
                     </div>
                  </div>
                  <ChartSongList data={data} />
               </div>
            </div>
         </div>
         <WeekChartList data={data.weekChart} />
      </div>
   )
}

export default ZingChartPage
