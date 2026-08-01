import React, { useEffect } from "react"
import { useParams } from "react-router"
import { v4 as uuidv4 } from "uuid"
import { useSelector } from "react-redux"
import scrollIntoView from "smooth-scroll-into-view-if-needed"

import CarouselItem from "../../components/Selection/CarouselItem"
import PlayListSelector from "../../components/Selection/PlayListSelector"
import LoadingSvg from "../../components/loading/LoadingSvg"
import ItemChartList from "../../components/TopChartPage/ItemChartList"
import ItemArits from "../../components/MyMusicPage/ItemArits"
import fancyTimeFormat from "../../utils/fancyTimeFormat"
import scrollTop from "../../utils/scrollToTop"

import AlbumPageInfo from "./components/AlbumPageInfo"
import { AlbumPageStyles } from "./styles"
import { useAlbumData } from "./useAlbumData"

const SuggestedSection = ({ section, ItemComponent, isCarousel }) => (
   <PlayListSelector title={section.title}>
      {section?.items?.map((item, index) => {
         if (index > 4) return null
         const classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"
         if (isCarousel) {
            return (
               <CarouselItem
                  isSwiper={true}
                  key={uuidv4()}
                  artis={true}
                  desc={false}
                  class1={classGird}
                  item={item}
               ></CarouselItem>
            )
         }
         return <ItemComponent key={uuidv4()} classGird={classGird} data={item}></ItemComponent>
      })}
   </PlayListSelector>
)

const AlbumPage = () => {
   const { id } = useParams()
   const currentEncodeId = useSelector((state) => state.queueNowPlay.currentEncodeId)
   const { album, suggested, isLoading } = useAlbumData(id)

   useEffect(() => {
      scrollTop()
   }, [id])

   useEffect(() => {
      const node = document.querySelector(`.main_topchart .zing-chart_item.main_page-hover.active`)
      if (!node) return
      const t = setTimeout(() => {
         scrollIntoView(node, { block: "center", behavior: "smooth", scrollMode: "if-needed" })
      }, 200)
      return () => clearTimeout(t)
   }, [currentEncodeId, album])

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
                                 <ItemChartList
                                    idAlbum={idAlbum}
                                    isNoneRank
                                    item={e}
                                    index={index}
                                    indexNotVip={indexItem}
                                    key={e.encodeId}
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
               {suggested?.map((e) => {
                  if (e.sectionType === "adBanner") return null
                  if (e.sectionType === "artist") {
                     return <SuggestedSection key={uuidv4()} section={e} ItemComponent={ItemArits} />
                  }
                  if (e.sectionType === "playlist") {
                     return <SuggestedSection key={uuidv4()} section={e} isCarousel />
                  }
                  return null
               })}
            </div>
         </div>
      </AlbumPageStyles>
   )
}

export default AlbumPage
