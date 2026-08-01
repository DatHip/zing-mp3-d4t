import React, { useRef } from "react"
import ReactPlayer from "react-player"
import { Link } from "react-router-dom"

import LoadingSvg from "components/loading/LoadingSvg"
import PlayListSelector from "components/Selection/PlayListSelector"

import MvDataList from "./components/MvDataList"
import VideoPlayItems from "./components/VideoPlayItems"
import { useVideoPopUp } from "./useVideoPopUp"

const VideoPopUp = () => {
   const { data, isLoading, streamUrl, handleClose, handleReady } = useVideoPopUp()
   const clipRef = useRef()

   if (isLoading || !data) {
      return (
         <div className="zm-video-modal is-loading">
            <div className="relative w-full h-full">
               <div className="mv_play-main">
                  <LoadingSvg />
               </div>
            </div>
         </div>
      )
   }

   return (
      <div className="zm-video-modal ">
         <div className="relative  w-full h-full">
            <div className="mv_play-main">
               <div className="video-wrapper  h-full relative">
                  <div className="cover-bg" style={{ backgroundImage: `url("${data?.thumbnailM || ""}")` }} />
                  <div className="blur-bg"></div>
                  <div className="video-container pt-3 ">
                     <div className=" w-[95vw] mx-auto">
                        <div className="video_header flex items-center justify-between w-full">
                           <div className="video_header-favourite flex items-center gap-[16px]">
                              <div className="video_header-left mr-[10px]">
                                 <div className="todaychoice_list-item-title">
                                    <div className="main_mv-avatr">
                                       <img
                                          src={data?.artists?.[0]?.thumbnail || data?.artists?.[0]?.thumbnailM}
                                          alt=""
                                       />
                                    </div>
                                    <div className="main_mv-info-title">
                                       <div className="main_title-text">{data?.title}</div>
                                       <div className="main_subtitle">
                                          {data?.artists?.map((e, i) => {
                                             const sep = i === data.artists.length - 1 ? "." : ", "
                                             return (
                                                <span key={e.id || i}>
                                                   <Link to={`/nghe-si/${e.alias}/`}>{e.name}</Link>
                                                   {sep}
                                                </span>
                                             )
                                          })}
                                       </div>
                                    </div>
                                 </div>
                              </div>
                              <div className="video_header-right flex-nowrap flex">
                                 <button className="zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-like" />
                                 </button>
                                 <button className="zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-more" />
                                 </button>
                              </div>
                           </div>
                           <div className="video_header-close flex items-center gap-[16px]">
                              <div className="video_header-right">
                                 <button className="btn-minimize zm-btn zm-tooltip-btn is-hover-circle button" tabIndex={0}>
                                    <i className="icon ic-minimize"></i>
                                 </button>
                                 <button
                                    onClick={handleClose}
                                    className="zm-btn zm-tooltip-btn is-hover-circle button"
                                    tabIndex={0}
                                 >
                                    <i className="icon ic-close"></i>
                                 </button>
                              </div>
                           </div>
                        </div>
                        <div className="video_body mt-[10px]">
                           <div className="video-playing flex gap-[30px]">
                              <div className="video-player w-full relative">
                                 <div className="player-wrapper relative border-none overflow-hidden rounded-xl ">
                                    <ReactPlayer
                                       url={streamUrl}
                                       id="video-react"
                                       className="react-player outline-none border-none"
                                       width="100%"
                                       ref={clipRef}
                                       playing
                                       height="100%"
                                       controls
                                       onReady={handleReady}
                                    />
                                 </div>
                              </div>
                              <div className="video-queuer">
                                 <div className="video-queue rounded-xl h-full overflow-auto max-h-full">
                                    <div className="video-queue-list p-[1.6rem]">
                                       <PlayListSelector classAdd={"!mt-0"} title="Danh Sách Phát">
                                          {data.recommends?.map((e) => (
                                             <VideoPlayItems key={e.encodeId} data={e} />
                                          ))}
                                       </PlayListSelector>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="video-recommend">
                        <div className="video-footer ">
                           <div className="main_mv main-page-item active">
                              <div className="main_mv-container ">
                                 {data?.artists?.map((e, i) => (
                                    <MvDataList key={e.id || i} item={e} />
                                 ))}
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}

export default VideoPopUp
