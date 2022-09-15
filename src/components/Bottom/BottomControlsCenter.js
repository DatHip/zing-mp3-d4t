import React from "react"
import Tippy from "@tippyjs/react"
import { useDispatch, useSelector } from "react-redux"
import BottomControlllPLayIng from "./BottomControlllPLayIng"
import { setLoopSongs, setPlay, setPlaying, setRandomSongs, setReady } from "../../features/SettingPlay/settingPlay"
import LoadingIcon from "../Icon/LoadingIcon"
import { setCurrentIndexSong } from "../../features/QueueFeatures/QueueFeatures"

const BottomControlsCenter = () => {
   const dispatch = useDispatch()
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const infoSongNext = useSelector((state) => state.queueNowPlay.infoSongNext)
   const { playing, isLoop, autoPlay, isRandom, isReady } = useSelector((state) => state.setting)

   return (
      <div className="player_controls-center">
         <div className="player_top">
            <div
               onClick={() => dispatch(setRandomSongs())}
               id="randomMusic"
               className={`player_btn playing_random  ${isRandom ? "active" : ""}`}
            >
               <i className="icon ic-shuffle"></i>
               <div className="playing_title-hover">{isRandom ? "Tắt" : "Bật"} phát ngẫu nhiên</div>
            </div>
            <div
               onClick={() => {
                  dispatch(setCurrentIndexSong(currentIndexSong - 1))
                  dispatch(setReady(false))

                  if (!playing) {
                     dispatch(setPlay(true))
                  }
               }}
               id="prevMusic"
               className={`player_btn playing_back ${currentIndexSong === 0 ? "disabled" : ""}`}
            >
               <i className="icon ic-pre"></i>
            </div>

            <div onClick={() => dispatch(setPlaying())} className="player_playing-input relative">
               {isReady && (
                  <>
                     {!playing && <i className="icon loading ic-play-circle-outline"></i>}
                     {playing && <i className="icon loading ic-pause-circle-outline"></i>}
                  </>
               )}
               {!isReady && <LoadingIcon></LoadingIcon>}
            </div>

            <Tippy
               offset={[0, 12]}
               content={
                  <div className="playing_title-hover-next">
                     <h4 className="pb-[8px] pl-[2px] main_subtitle">Phát Tiếp theo </h4>
                     <div className="tipper-next flex ">
                        <figure className="min-w-[50px]  h-[50px] flex   mr-[10px] rounded-xl overflow-hidden">
                           <img src={infoSongNext?.thumbnail} alt="" />
                        </figure>
                        <div className="tipper-next-content  flex flex-col justify-center">
                           <p className="want_list-item-title">{infoSongNext?.title}</p>
                           <div className="main_subtitle">
                              {infoSongNext?.artists &&
                                 infoSongNext?.artists?.slice(0, 3)?.map((e, index) => {
                                    let prara = ", "

                                    if (index === 2) {
                                       prara = "..."
                                    }

                                    if (infoSongNext?.artists.length === 1) {
                                       prara = ""
                                    }
                                    if (infoSongNext?.artists.length === 2 && index === 1) {
                                       prara = ""
                                    }
                                    if (infoSongNext?.artists.length === 3 && index === 2) {
                                       prara = ""
                                    }

                                    return (
                                       <span key={index}>
                                          <span>{e.name}</span>
                                          {prara}
                                       </span>
                                    )
                                 })}
                           </div>
                        </div>
                     </div>
                  </div>
               }
               placement={"top"}
               className="!rounded-xl"
            >
               <div
                  onClick={() => {
                     dispatch(setCurrentIndexSong(currentIndexSong + 1))
                     dispatch(setReady(false))
                     if (!playing) {
                        dispatch(setPlay(true))
                     }
                  }}
                  id="nextMusic"
                  className="player_btn playing_next"
               >
                  <i className="icon ic-next"></i>
               </div>
            </Tippy>
            <div
               onClick={() => dispatch(setLoopSongs())}
               id="loopMusic"
               className={`player_btn playing_replay ${isLoop ? "active" : ""}`}
            >
               <i className="icon ic-repeat"></i>

               <div className="playing_title-hover">{isLoop ? "Tắt" : "Bật"} phát lại</div>
            </div>
         </div>
         <BottomControlllPLayIng></BottomControlllPLayIng>
      </div>
   )
}

export default BottomControlsCenter
