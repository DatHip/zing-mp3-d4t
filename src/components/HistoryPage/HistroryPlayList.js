import React from "react"
import { useSelector } from "react-redux"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const HistroryPlayList = () => {
   const recentPlaylist = useSelector((state) => state.logged.recentPlaylist)

   return (
      <div className="main_songnew main-page-item active">
         <PlayListSelector classAdd2={"history-playlist"}>
            {recentPlaylist?.length > 0 &&
               recentPlaylist.slice(0, 20).map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-6"

                  return <CarouselItem key={e.encodeId} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
               })}
         </PlayListSelector>
      </div>
   )
}

export default HistroryPlayList
