import React, { memo } from "react"
import { useOutletContext } from "react-router"
import EmptyContent from "../Bottom/EmptyContent"
import LoadingSvg from "../loading/LoadingSvg"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const MyMusicPlayList = memo(() => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>

   return (
      <>
         {docs.favouritePlaylist.length === 0 && (
            <EmptyContent icon="album" text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}
         {docs.favouritePlaylist.length > 0 && (
            <div className="main_songnew main-page-item active">
               <PlayListSelector title={"PlayList"}>
                  {docs.favouritePlaylist.slice(0, 30).map((e, index) => {
                     let classGird = "col l-2-4 m-3 c-5"
                     return <CarouselItem key={index} artis={true} desc={false} class1={classGird} item={e}></CarouselItem>
                  })}
               </PlayListSelector>
            </div>
         )}
      </>
   )
})

export default MyMusicPlayList
