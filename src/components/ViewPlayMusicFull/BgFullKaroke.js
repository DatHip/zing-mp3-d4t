import React, { memo } from "react"
import { useLayoutEffect } from "react"
import { useRef } from "react"
import { useMemo } from "react"
import { useState } from "react"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import styled from "styled-components"
import { setProgressInterval } from "../../features/SettingPlay/settingPlay"
import ItemLyricKaraoke from "./ItemLyricKaraoke"

const LyricStyleds = styled.li`
   animation: opactiy 0.5s linear forwards;

   &.up {
      animation: out 0.5s linear forwards !important;
   }

   & > span {
      display: inline-block;
      text-align: center;
      margin: 20px 0;
      letter-spacing: 1.2px;
      font-weight: 700;
      line-height: 1.2;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      .kara-text-highlight {
         width: 0;
         position: absolute;
         top: 0;
         left: 0;
         color: #ffed00;
         overflow: hidden;
      }
   }

   @keyframes opactiy {
      from {
         opacity: 0.2;
      }
      to {
         opacity: 1;
      }
   }
   @keyframes out {
      from {
         opacity: 1;
      }
      to {
         opacity: 0.2;
      }
   }
`

const NextWord = memo(({ index, refIndex }) => {
   const liRef = useRef()
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)
   const current = useSelector((state) => state.queueNowPlay.currentTime)
   const progressBar = useRef(null)
   const data = lyricByLine[index]
   const isUp = useRef(false)

   let text = ""
   let e = data.words
   data.words.forEach((e) => {
      text += e.data + " "
   })

   let startTime = e[0].startTime / 1000
   let endTime = e[e.length - 1].endTime / 1000

   const hi = async () => {
      isUp.current = true
      await liRef.current.classList.add("up")
      refIndex.current += 2
   }

   useLayoutEffect(() => {
      if (current >= startTime && current <= endTime) {
         let duration = endTime - startTime
         var radio = (100 / duration) * (endTime - current) - 100
         let res = radio * -1 + 3
         if (current < endTime) {
            if (res > 100) {
               res = 100
            }
            progressBar.current.style.width = res + "%"
         }
      }
      if (current > endTime) {
         hi()
      }

      if (current < startTime) {
         progressBar.current.style.width = 0 + "%"
      }

      if (current < endTime) {
         liRef.current.classList.remove("up")
      }
   }, [current])

   return (
      <LyricStyleds ref={liRef} className={`item`}>
         <span>
            {text}
            <span ref={progressBar} className="kara-text-highlight">
               {text}
            </span>
         </span>
      </LyricStyleds>
   )
})

const BgFullKaroke = memo(() => {
   const dispatch = useDispatch()
   const textSize = useSelector((state) => state.setting.text)
   const lyricByLine = useSelector((state) => state.lyrics.lyricByLine)

   const current = useSelector((state) => state.queueNowPlay.currentTime)
   const progressBar = useRef(null)
   const progressInterval = useSelector((state) => state.setting.progressInterval)

   useEffect(() => {
      dispatch(setProgressInterval(10))

      return () => {
         dispatch(setProgressInterval(500))
      }
   }, [])

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

   const ref0 = useRef(0)
   const ref1 = useRef(1)

   return (
      <div className="nowplaying-body_item nowplaying-body_karaoke text-white">
         <ul className={`scroll-content ${isTextSize} inline-flex  flex-col`}>
            <NextWord refIndex={ref0} index={ref0.current}></NextWord>
            <NextWord refIndex={ref1} index={ref1.current}></NextWord>
            {/* {lyricByLine &&
               lyricByLine.length > 0 &&
               lyricByLine.slice(0, 6).map((e, index) => {
                  return <ItemLyricKaraoke key={index} data={e}></ItemLyricKaraoke>
               })} */}
         </ul>
      </div>
   )
})

export default BgFullKaroke
