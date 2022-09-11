import React from "react"
import { useDispatch, useSelector } from "react-redux"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import Tippy from "@tippyjs/react"

const BottomControlsCenter = () => {
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const infoSongNext = useSelector((state) => state.queueNowPlay.infoSongNext)

   return (
      <div className="player_controls-center">
         <div className="player_top">
            <div id="randomMusic" className={`player_btn playing_random  `}>
               <i className="icon ic-shuffle"></i>
               <div className="playing_title-hover">Bật phát ngẫu nhiên</div>
            </div>
            <div id="prevMusic" className={`player_btn playing_back ${currentIndexSong === 0 ? "disabled" : ""}`}>
               <i className="icon ic-pre"></i>
            </div>
            <div className="player_playing-input ">
               <i className="icon ic-play-circle-outline"></i>
            </div>

            <Tippy
               offset={[0, 12]}
               content={
                  <div className="playing_title-hover-next">
                     <h4 className="pb-[8px] pl-[2px] main_subtitle">Phát Tiếp theo </h4>
                     <div className="tipper-next flex ">
                        <figure className="min-w-[50px]  h-[50px] flex   mr-[10px] rounded-xl overflow-hidden">
                           <img src={infoSongNext.thumbnail} alt="" />
                        </figure>
                        <div className="tipper-next-content  flex flex-col justify-center">
                           <p className="want_list-item-title">{infoSongNext.title}</p>
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
               <div id="nextMusic" className="player_btn playing_next">
                  <i className="icon ic-next"></i>
               </div>
            </Tippy>
            <div id="loopMusic" className="player_btn playing_replay">
               <i className="icon ic-repeat"></i>

               <div className="playing_title-hover">Bật phát lại</div>
            </div>
         </div>
         <div className="player_bottom">
            <p className="playing_time-left">0:01</p>
            <div className="playing_time-up2 progress-area">
               <div className="progress-bar" style={{ width: "1.78051%" }} />
               <audio id="main-audio" src="http://api.mp3.zing.vn/api/streaming/audio/ZWBIFCUE/320/"></audio>
            </div>
            <p className="playing_time-right">{fancyTimeFormat(infoSongCurrent?.duration)}</p>
         </div>
      </div>
   )
}

export default BottomControlsCenter
