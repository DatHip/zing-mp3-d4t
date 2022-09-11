import React, { memo } from "react"
import { useSelector } from "react-redux"
import { v4 as uuidv4 } from "uuid"
const BgFullLyrics = memo(() => {
   const textSize = useSelector((state) => state.setting.text)
   const infoSongCurrent = useSelector((state) => state.queueNowPlay.infoSongCurrent)
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)

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
            <div className="nowplaying-body_lyrics-item lyrics text-white">
               <ul className={`scroll-content ${isTextSize}`}>
                  <li class="item is-over">Nhìn thấy em lao đao </li>
                  <li class="item is-active">Dũng khí nào </li>
                  {lyricByLine &&
                     lyricByLine.length > 0 &&
                     lyricByLine.map((e, index) => {
                        let text = ""
                        e.words.forEach((e) => {
                           text += e.data + " "
                        })
                        return (
                           <li key={uuidv4()} class="item ">
                              {" "}
                              {text}{" "}
                           </li>
                        )
                     })}
               </ul>
            </div>
         </div>
      </div>
   )
})

export default BgFullLyrics
