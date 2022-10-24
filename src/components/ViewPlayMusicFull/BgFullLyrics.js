import React, { memo } from "react"
import { useSelector } from "react-redux"
import LoadingSvg from "../loading/LoadingSvg"
import ItemLyric from "./ItemLyric"
const BgFullLyrics = memo(() => {
   const textSize = useSelector((state) => state.setting.text)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)
   const isLoading = useSelector((state) => state.lyrics.isLoading)

   let isTextSize
   if (textSize === 1) {
      isTextSize = "s"
   }
   if (textSize === 2) {
      isTextSize = "m"
   }
   if (textSize === 3) {
      isTextSize = "l"
   }

   return (
      <div className="nowplaying-body_item nowplaying-body_lyrics row no-gutters">
         <div className="col l-5 m-0 c-0">
            <div className="nowplaying-body_lyrics-item img">
               <div className="nowplaying-body_lyrics-item-img">
                  <img src={infoSongCurrent.thumbnailM} alt="" />
               </div>
            </div>
         </div>
         <div className="col l-7 m-12 c-12">
            <div className="nowplaying-body_lyrics-item lyrics ">
               <ul className={`scroll-content ${isTextSize}`}>
                  {isLoading && (
                     <li className="item ">
                        <LoadingSvg></LoadingSvg>
                     </li>
                  )}

                  {!isLoading && (
                     <>
                        {!lyricByLine && <li className="item ">Lời bài hát đang được cập nhật</li>}

                        {lyricByLine &&
                           lyricByLine.length > 0 &&
                           lyricByLine.map((e, index) => {
                              return <ItemLyric data={e} key={index}></ItemLyric>
                           })}
                     </>
                  )}
               </ul>
            </div>
         </div>
      </div>
   )
})

export default BgFullLyrics
