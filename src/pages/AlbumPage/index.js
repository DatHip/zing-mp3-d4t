import React from "react"

import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"
import LoadingSvg from "components/ui/LoadingSvg"
import ChartSongRow from "components/song/ChartSongRow"
import ArtistCard from "components/card/ArtistCard"
import fancyTimeFormat from "utils/fancyTimeFormat"

import AlbumPageInfo from "./components/AlbumPageInfo"
import { AlbumPageStyles } from "./styles"
import { useAlbumPage } from "./useAlbumPage"

const SuggestedSection = ({ section, ItemComponent, isCarousel }) => (
   <Section title={section.title}>
      {section?.items?.map((item, index) => {
         if (index > 4) return null
         const classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
         if (isCarousel) {
            return (
               <AlbumCard
                  isSwiper={true}
                  key={item.encodeId || item.id || index}
                  artis={true}
                  desc={false}
                  class1={classGird}
                  item={item}
               ></AlbumCard>
            )
         }
         return <ItemComponent key={item.id || item.encodeId || index} classGird={classGird} data={item}></ItemComponent>
      })}
   </Section>
)

const AlbumPage = () => {
   const { album, suggested, isLoading } = useAlbumPage()

   if (isLoading || !album || !suggested) return <LoadingSvg />

   const idAlbum = album?.encodeId
   let indexItem = -1

   return (
      <AlbumPageStyles className=" mt-[10px]">
         <div className="playlist-detail-container">
            <div className="clearfix">
               <AlbumPageInfo datas={album} />
               <div className="playlist-content">
                  <div className="description">
                     {album?.sortDescription && (
                        <>
                           <span>Lời tựa</span> {album?.sortDescription}
                        </>
                     )}
                  </div>

                  <div className="main_topchart mt-2">
                     <div className="container_zing-chart">
                        <div className="zing-chart_list pt-2">
                           <div className="zing-chart_item none-hover main_page-hover">
                              <div className="zing-chart_item-left">
                                 <div className="zing-chart_item-info column-text">BÀI HÁT</div>
                              </div>
                              <div className="zing-chart_item-center">
                                 <p className="thesong_name column-text">ALBUM</p>
                              </div>
                              <div className="zing-chart_item-right gap-3">
                                 <p className="thesong_time column-text">THỜI GIAN</p>
                              </div>
                           </div>

                           {album?.song?.items.map((e, index) => {
                              if (e.streamingStatus === 1) indexItem++
                              return (
                                 <ChartSongRow
                                    idAlbum={idAlbum}
                                    isNoneRank
                                    item={e}
                                    index={index}
                                    indexNotVip={indexItem}
                                    key={e.encodeId || index}
                                 />
                              )
                           })}
                           <h3 className="bottom-info subtitle mt-[10px] ml-[12px]">
                              <span>{album?.song?.total} bài hát</span>
                              <span className="mx-[8px]">•</span>
                              <span>{fancyTimeFormat(album?.song?.totalDuration, 1)}</span>
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               {suggested?.map((e, index) => {
                  if (e.sectionType === "adBanner") return null
                  const sectionKey = e.sectionId || `${e.sectionType}-${index}`
                  if (e.sectionType === "artist") {
                     return <SuggestedSection key={sectionKey} section={e} ItemComponent={ArtistCard} />
                  }
                  if (e.sectionType === "playlist") {
                     return <SuggestedSection key={sectionKey} section={e} isCarousel />
                  }
                  return null
               })}
            </div>
         </div>
      </AlbumPageStyles>
   )
}

export default AlbumPage
