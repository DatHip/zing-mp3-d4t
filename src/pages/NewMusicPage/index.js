import React, { useCallback } from "react"
import { useDispatch } from "react-redux"

import ItemChartList from "../../components/TopChartPage/ItemChartList"
import LoadingSvg from "../../components/loading/LoadingSvg"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"

import { useNewMusicData } from "./useNewMusicData"

const NEW_RELEASE_PLAYLIST_ID = "ZDB6EB9C"

const NewMusicPage = () => {
   const { data, isLoading } = useNewMusicData()
   const items = data?.items
   const dispatch = useDispatch()

   const handlePlayAll = useCallback(async () => {
      dispatch(setReady(false))
      dispatch(setPlay(false))
      await dispatch(fetchPlayList(NEW_RELEASE_PLAYLIST_ID))
      dispatch(setPlay(true))
   }, [dispatch])

   if (isLoading || !items) return <LoadingSvg />

   let indexItem = -1

   return (
      <div className="main_topchart songnew">
         <div className="container_zing-chart">
            <div className="zing-chart_top">
               <div className="cursor-pointer zing-chartBtn">
                  <p>Mới Phát Hành</p>
                  <span onClick={handlePlayAll} className="material-icons-round">
                     play_circle
                  </span>
               </div>
            </div>
            <div className="zing-chart_bottom">
               <div className="zing-chart_list ">
                  {items.map((e, index) => {
                     if (e.streamingStatus === 1) indexItem++
                     return (
                        <ItemChartList
                           indexNotVip={indexItem}
                           idAlbum={NEW_RELEASE_PLAYLIST_ID}
                           index={index}
                           item={e}
                           key={e.encodeId}
                        />
                     )
                  })}
               </div>
            </div>
         </div>
      </div>
   )
}

export default NewMusicPage
