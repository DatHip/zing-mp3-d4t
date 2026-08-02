import React from "react"
import Tippy from "@tippyjs/react"
import { useDispatch, useSelector } from "react-redux"
import PlayerEngine from "components/player/PlayerEngine"
import { setLoopSongs, setPlaying, setRandomSongs } from "features/setting/settingSlice"
import LoadingIcon from "components/ui/LoadingIcon"
import scrollToActive from "utils/scrollToActive"
import { useQueueControls } from "hook/useQueueControls"
import { selectCurrentEncodeId, selectNextSong } from "features/queue/queueSelectors"
import { selectIsLoop, selectIsReady } from "features/setting/settingSelectors"

const PlayerControls = () => {
   const dispatch = useDispatch()
   const isLoop = useSelector(selectIsLoop)
   const isReady = useSelector(selectIsReady)

   const infoSongNext = useSelector(selectNextSong)
   const currentEncodeId = useSelector(selectCurrentEncodeId)

   const { playNext, playPrev, currentIndexSong, isRandom, playing } = useQueueControls()

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
               onClick={playPrev}
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
                     let node = document.querySelector(`div[data-rbd-draggable-id='${currentEncodeId}']`)
                     playNext()
                     scrollToActive(node)
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
         <PlayerEngine></PlayerEngine>
      </div>
   )
}

export default PlayerControls
