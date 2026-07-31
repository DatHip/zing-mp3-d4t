import React, { memo } from "react"
import { useDispatch } from "react-redux"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import ItemChartList from "./ItemChartList"

const WeekList = memo(({ data }) => {
   const vn = data?.vn
   const us = data?.us
   const korea = data?.korea
   const dispatch = useDispatch()

   return (
      <div className="main_topchart-week ">
         <h3>Bảng Xếp Hạng Tuần</h3>
         <div className="main_topchart-week3 row">
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box vn">
                  <div className="week-chart-box-title">
                     <p>Việt Nam</p>
                     <span
                        onClick={async () => {
                           dispatch(setReady(false))
                           dispatch(setPlay(false))
                           await dispatch(fetchPlayList(vn.playlistId))
                           dispatch(setPlay(true))
                        }}
                        id="btn-play_vn-week"
                        className="material-icons-round"
                     >
                        play_circle
                     </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        {vn?.items.slice(0, 5).map((e, index) => {
                           return (
                              <ItemChartList
                                 indexNotVip={index}
                                 idAlbum={vn.playlistId}
                                 isChildren
                                 key={e.encodeId}
                                 item={e}
                                 index={index}
                              ></ItemChartList>
                           )
                        })}
                     </div>
                     {/* <div className="zing-chart_item-bottom">
                        <button className="zing-chart_btn">Xem Thêm</button>
                     </div> */}
                  </div>
               </div>
            </div>
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box usuk">
                  <div className="week-chart-box-title">
                     <p>US-UK</p>
                     <span
                        onClick={async () => {
                           dispatch(setReady(false))
                           dispatch(setPlay(false))
                           await dispatch(fetchPlayList(us.playlistId))
                           dispatch(setPlay(true))
                        }}
                        id="btn-play_us-week"
                        className="material-icons-round"
                     >
                        play_circle
                     </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        <div className="zing-chart_list week">
                           {us?.items.slice(0, 5).map((e, index) => {
                              return (
                                 <ItemChartList
                                    indexNotVip={index}
                                    idAlbum={us.playlistId}
                                    isChildren
                                    key={e.encodeId}
                                    item={e}
                                    index={index}
                                 ></ItemChartList>
                              )
                           })}
                        </div>
                        {/* <div className="zing-chart_item-bottom">
                           <button className="zing-chart_btn">Xem Thêm</button>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
            <div className="col l-4 m-12 c-12">
               <div className="week-chart-box kpop">
                  <div className="week-chart-box-title">
                     <p>Korea</p>
                     <span
                        onClick={async () => {
                           dispatch(setReady(false))
                           dispatch(setPlay(false))
                           await dispatch(fetchPlayList(korea.playlistId))
                           dispatch(setPlay(true))
                        }}
                        className="material-icons-round"
                     >
                        {" "}
                        play_circle{" "}
                     </span>
                  </div>
                  <div className="container_zing-chart">
                     <div className="zing-chart_list week">
                        <div className="zing-chart_list week">
                           {korea?.items.slice(0, 5).map((e, index) => {
                              return (
                                 <ItemChartList
                                    indexNotVip={index}
                                    idAlbum={korea.playlistId}
                                    isChildren
                                    key={e.encodeId}
                                    item={e}
                                    index={index}
                                 ></ItemChartList>
                              )
                           })}
                        </div>
                        {/* <div className="zing-chart_item-bottom">
                           <button className="zing-chart_btn">Xem Thêm</button>
                        </div> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
})

export default WeekList
