import React from "react"
import { Link, useOutletContext } from "react-router-dom"
import EmptyContent from "components/ui/EmptyContent"
import LoadingSvg from "components/ui/LoadingSvg"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"
import ArtistCard from "components/card/ArtistCard"
import CardSlider from "components/card/CardSlider"

const MyMusicAll = () => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>

   return (
      <>
         {docs.favouriteSongs.length <= 3 && docs.favouritePlaylist.length === 0 && docs.favouriteArtist.length === 0 && (
            <EmptyContent text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}

         {docs.favouriteSongs.length > 3 && (
            <Section
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
                        <CardSlider data={docs.favouriteSongs}></CardSlider>
                     </div>
                     <div className="main_topchart mt-2 flex-1">
                        <div className="container_zing-chart">
                           <div className="max-h-[280px] overflow-y-auto zing-chart_list pt-2">
                              {docs.favouriteSongs.map((e, index) => {
                                 return (
                                    <ChartSongRow
                                       notAlbum
                                       onFavourite
                                       isNoneRank
                                       item={e}
                                       index={index}
                                       key={e.encodeId}
                                    ></ChartSongRow>
                                 )
                              })}
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </Section>
         )}
         {docs.favouritePlaylist.length > 0 && (
            <Section
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
                     <AlbumCard
                        isSwiper={true}
                        key={e.encodeId}
                        artis={true}
                        desc={false}
                        class1={classGird}
                        item={e}
                     ></AlbumCard>
                  )
               })}
            </Section>
         )}
         {docs.favouriteArtist.length > 0 && (
            <Section all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
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

                  return <ArtistCard isLinkToAll={isLinkToAll} noneFooter classGird={classGird} key={e.id} data={e}></ArtistCard>
               })}
            </Section>
         )}
      </>
   )
}

export default MyMusicAll
