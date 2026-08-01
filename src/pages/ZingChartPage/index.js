import React, { useCallback } from "react"
import { useDispatch } from "react-redux"

import CharHomeItem from "../../components/Selection/CharHomeItem"
import ChartList from "../../components/TopChartPage/ChartList"
import WeekList from "../../components/TopChartPage/WeekList"
import LoadingSvg from "../../components/loading/LoadingSvg"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"

import { useZingChartData } from "./useZingChartData"

const TOP_CHART_PLAYLIST_ID = "ZO68OC68"

const ZingChartPage = () => {
   const { data, isLoading } = useZingChartData()
   const dispatch = useDispatch()

   const handlePlayAll = useCallback(async () => {
      dispatch(setReady(false))
      dispatch(setPlay(false))
      await dispatch(fetchPlayList(TOP_CHART_PLAYLIST_ID))
      dispatch(setPlay(true))
   }, [dispatch])

   if (isLoading || !data) return <LoadingSvg />

   const topItems = data?.RTChart?.items || []
   const [rank1, rank2, rank3] = [topItems[0]?.title, topItems[1]?.title, topItems[2]?.title]

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
                           {[rank1, rank2, rank3].map((title, i) => (
                              <div key={i} className="zing-chart_right-top_item">
                                 <div className="zing-chart_right-top_box" />
                                 <p>{title}</p>
                              </div>
                           ))}
                        </div>
                        <CharHomeItem id="myChart2" />
                     </div>
                  </div>
                  <ChartList data={data} />
               </div>
            </div>
         </div>
         <WeekList data={data.weekChart} />
      </div>
   )
}

export default ZingChartPage
