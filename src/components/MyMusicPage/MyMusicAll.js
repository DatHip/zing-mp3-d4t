import React from "react"
import { Link, useOutletContext } from "react-router-dom"
import EmptyContent from "../Bottom/EmptyContent"
import LoadingSvg from "../loading/LoadingSvg"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"
import ItemArits from "./ItemArits"
import SliderShow from "./SliderShow"

const MyMusicAll = () => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>

   return (
      <>
         {docs.favouriteSongs.length <= 3 && docs.favouritePlaylist.length === 0 && docs.favouriteArtist.length === 0 && (
            <EmptyContent text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}

         {docs.favouriteSongs.length > 3 && (
            <PlayListSelector
               classAdd="mb-[36px]"
               notRow
               classAdd2="w-full"
               isMyPage={
                  <div className="flex items-center justify-center gap-[10px]">
                     <Link to="/mymusic/song" className="personal_play-all">
                        Tất Cả <span className="material-icons-outlined ml-[2px]">chevron_right</span>
                     </Link>
                  </div>
               }
               title={"Bài Hát"}
            >
               {docs.favouriteSongs && docs.favouriteSongs.length > 3 && (
                  <div className="flex items-center justify-between">
                     <div>
                        <SliderShow data={docs.favouriteSongs}></SliderShow>
                     </div>
                     <div className="main_topchart mt-2 flex-1">
                        <div className="container_zing-chart">
                           <div className="max-h-[280px] overflow-y-auto zing-chart_list pt-2">
                              {docs.favouriteSongs.map((e, index) => {
                                 return (
                                    <ItemChartList
                                       notAlbum
                                       onFavourite
                                       isNoneRank
                                       item={e}
                                       index={index}
                                       key={e.encodeId}
                                    ></ItemChartList>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </PlayListSelector>
         )}
         {docs.favouritePlaylist.length > 0 && (
            <PlayListSelector
               isMyPage={
                  <div className="flex items-center justify-center gap-[10px]">
                     <Link to="/mymusic/playlist" className="personal_play-all">
                        Tất Cả <span className="material-icons-outlined ml-[2px]">chevron_right</span>
                     </Link>
                  </div>
               }
               title={"PlayList"}
            >
               {docs?.favouritePlaylist?.slice(0, 5).map((e, index) => {
                  if (index > 4) return
                  let classGird = "col l-2-4 m-3 c-5"
                  if (index === 4) {
                     classGird = "col l-2-4 m-0 c-5"
                  }

                  return (
                     <CarouselItem
                        isSwiper={true}
                        key={e.encodeId}
                        artis={true}
                        desc={false}
                        class1={classGird}
                        item={e}
                     ></CarouselItem>
                  )
               })}
            </PlayListSelector>
         )}
         {docs.favouriteArtist.length > 0 && (
            <PlayListSelector all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
               {docs.favouriteArtist.map((e, index) => {
                  if (index > 6) return

                  let isLinkToAll
                  let classGird = "col l-1-4 m-2 c-5 m2-6 m2-5"
                  if (index === 4) {
                     classGird = "col l-1-4 m-2 c-5 m2-6 m2-none"
                  }
                  if (index === 5) {
                     classGird = "col l-1-4 m-none c-5"
                  }

                  if (index === 6) {
                     isLinkToAll = true
                  }

                  return <ItemArits isLinkToAll={isLinkToAll} noneFooter classGird={classGird} key={e.id} data={e}></ItemArits>
               })}
            </PlayListSelector>
         )}
      </>
   )
}

export default MyMusicAll
