import React, { useEffect, useState } from "react"
import { getNewSongRelease } from "../api/getNewSongRelease"
import ItemChartList from "../components/TopChartPage/ItemChartList"
import { v4 as uuidv4 } from "uuid"
import LoadingSvg from "../components/loading/LoadingSvg"
import { useDispatch } from "react-redux"
import { setPlay, setReady } from "../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../features/QueueFeatures/QueueFeatures"
const NewMusicPage = () => {
   const [datas, setData] = useState([])
   const { data, status } = getNewSongRelease()
   const dispatch = useDispatch()

   useEffect(() => {
      if (data) {
         setData(data.data.items)
      }
   }, [status])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   let indexItem = -1

   return (
      <div className="main_topchart songnew">
         <div className="container_zing-chart">
            <div className="zing-chart_top">
               {/* <div className="zing-chart_top-item">
                  <a href="#">
                     Nhạc Mới
                     <span className="material-icons-round" encodeid="ZDB6EB9C">
                        play_circle
                     </span>
                  </a>
               </div> */}
               <div className="cursor-pointer zing-chartBtn">
                  <p className="">Mới Phát Hành</p>
                  <span
                     onClick={async () => {
                        dispatch(setReady(false))
                        dispatch(setPlay(false))
                        await dispatch(fetchPlayList("ZDB6EB9C"))
                        dispatch(setPlay(true))
                     }}
                     className="material-icons-round"
                  >
                     {" "}
                     play_circle
                  </span>
               </div>
            </div>
            <div className="zing-chart_bottom">
               <div className="zing-chart_list text-white">
                  {datas &&
                     datas.length > 0 &&
                     datas.map((e, index) => {
                        if (e.streamingStatus === 1) {
                           indexItem++
                        }

                        return (
                           <ItemChartList
                              indexNotVip={indexItem}
                              idAlbum="ZDB6EB9C"
                              index={index}
                              item={e}
                              key={uuidv4()}
                           ></ItemChartList>
                        )
                     })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewMusicPage
