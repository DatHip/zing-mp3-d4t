import React, { memo, useMemo } from "react"
import { useSelector } from "react-redux"
import LoadingSvg from "../loading/LoadingSvg"
import ItemLyric from "./ItemLyric"
const BgFullLyrics = memo(() => {
   const textSize = useSelector((state) => state.setting.text)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)
   const isLoading = useSelector((state) => state.lyrics.isLoading)
   const currentTime = useSelector((state) => state.queueNowPlay.currentTime)

   // One subscription for the whole list instead of one per line. Lines are
   // memoized because only the two whose active/over flags flip need to
   // re-render on a tick — the rest bail out on identical props.
   const lines = useMemo(
      () =>
         (lyricByLine || []).flatMap((line) => {
            const words = line?.words
            // A line with no words carries no timing, and words[0] would throw.
            if (!Array.isArray(words) || words.length === 0) return []
            let text = ""
            words.forEach((w) => {
               text += w.data + " "
            })
            return [
               {
                  text,
                  // Second granularity: matches the original MM:SS string compare.
                  start: Math.floor(words[0].startTime / 1000),
                  end: Math.floor(words[words.length - 1].endTime / 1000),
               },
            ]
         }),
      [lyricByLine]
   )

   const currentSecond = Math.floor(currentTime || 0)

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

                        {lines.length > 0 &&
                           lines.map((line, index) => {
                              return (
                                 <ItemLyric
                                    key={index}
                                    text={line.text}
                                    active={currentSecond >= line.start && currentSecond < line.end}
                                    over={currentSecond > line.end}
                                 ></ItemLyric>
                              )
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
