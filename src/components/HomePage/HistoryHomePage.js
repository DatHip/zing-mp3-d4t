import React from "react"
import { useSelector } from "react-redux"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const HistoryHomePage = () => {
   const recentPlaylist = useSelector((state) => state.logged.recentPlaylist)
   let all = false

   if (recentPlaylist.length < 3) {
      return
   }

   if (recentPlaylist.length > 7) {
      all = true
   }
   return (
      <PlayListSelector isHistory title={"Gần đây"} classAdd2={"!no-wrap"} all={all}>
         {recentPlaylist &&
            recentPlaylist.length > 0 &&
            recentPlaylist.slice(0, 7).map((item, index) => {
               let classGrid = "col l-1-4 m-2 c-4 m2-6 m2-5"

               if (index === 5) {
                  classGrid = "col l-1-4 m-2 c-4 m2-6 m2-none"
               }
               if (index === 6) {
                  // eslint-disable-next-line no-unused-vars
                  classGrid = "col l-1-4 m-none c-4"
               }

               return <CarouselItem key={index} item={item} desc={false} artis={false} class1={classGrid}></CarouselItem>
            })}
      </PlayListSelector>
   )
}

export default HistoryHomePage
