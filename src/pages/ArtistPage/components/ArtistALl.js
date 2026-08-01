import React, { memo } from "react"
import SliderShow from "../../../components/MyMusicPage/SliderShow"
import PlayListSelector from "../../../components/Selection/PlayListSelector"
import ItemChartList from "../../../components/TopChartPage/ItemChartList"
import { useOutletContext } from "react-router-dom"
import CarouselItem from "../../../components/Selection/CarouselItem"
import ItemArits from "../../../components/MyMusicPage/ItemArits"
import MvItem from "../../../components/MVpage/MvItem"
import LoadingSvg from "../../../components/loading/LoadingSvg"

const ArtistALl = () => {
   const datas = useOutletContext()

   const dataSelector = datas?.sections?.find((e) => e.sectionType === "song")
   const dataSelector2 = datas?.sections?.filter((e) => e.sectionType !== "song")

   if (!datas || datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <div className="">
            <PlayListSelector notRow classAdd2="w-full" title={dataSelector?.title}>
               <div className="flex items-center">
                  <div className="m-none">
                     <SliderShow data={dataSelector}></SliderShow>
                  </div>

                  <div className="main_topchart mt-2 w-full">
                     <div className="container_zing-chart">
                        <div className="max-h-[260px] overflow-y-auto zing-chart_list pt-2">
                           {dataSelector?.items &&
                              dataSelector?.items.length > 0 &&
                              dataSelector?.items.map((e, index) => {
                                 return <ItemChartList key={e.encodeId || e.id || index} isNoneRank item={e} index={index}></ItemChartList>
                              })}
                        </div>
                     </div>
                  </div>
               </div>
            </PlayListSelector>
            {dataSelector2 &&
               dataSelector2.map((e, idx) => {
                  const sectionKey = e.sectionId || `${e.sectionType}-${idx}`

                  if (e.sectionType === "video") {
                     if (!e.items) return null

                     return (
                        <PlayListSelector classAdd="artist-mv" key={sectionKey} title={e.title}>
                           {e?.items?.slice(0, 3).map((item, index) => {
                              return <MvItem key={item.encodeId || item.id || index} data={item} isAritst></MvItem>
                           })}
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <PlayListSelector key={sectionKey} title={e.title}>
                           {e?.items?.slice(0, 5).map((item, index) => {
                              let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                              return <ItemArits key={item.id || item.encodeId || index} classGird={classGird} data={item}></ItemArits>
                           })}
                        </PlayListSelector>
                     )
                  }

                  return (
                     <PlayListSelector key={sectionKey} title={e.title}>
                        {e?.items?.slice(0, 5).map((item, index) => {
                           let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                           return (
                              <CarouselItem
                                 isSwiper={true}
                                 key={item.encodeId || item.id || index}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              ></CarouselItem>
                           )
                        })}
                     </PlayListSelector>
                  )
               })}
         </div>
      </div>
   )
}

export default memo(ArtistALl)
