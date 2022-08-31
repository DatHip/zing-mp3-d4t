import React, { memo } from "react"
import SliderShow from "../MyMusicPage/SliderShow"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"
import { useOutletContext } from "react-router-dom"
import { v4 as uuidv4 } from "uuid"
import CarouselItem from "../Selection/CarouselItem"
import ItemArits from "../MyMusicPage/ItemArits"
import MvItem from "../MVpage/MvItem"

const ArtistALl = () => {
   const datas = useOutletContext()

   const dataSelector = datas?.sections?.find((e) => e.sectionType === "song")
   const dataSelector2 = datas?.sections?.filter((e) => e.sectionType !== "song")

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
                                 return <ItemChartList key={uuidv4()} isNoneRank item={e} index={index}></ItemChartList>
                              })}
                        </div>
                     </div>
                  </div>
               </div>
            </PlayListSelector>
            {dataSelector2 &&
               dataSelector2.map((e) => {
                  if (e.sectionType === "video") {
                     if (!e.items) return

                     return (
                        <PlayListSelector classAdd="artist-mv" key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              if (index > 2) return

                              return <MvItem key={uuidv4()} data={item} isAritst></MvItem>
                           })}
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <PlayListSelector key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              if (index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if (index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              }

                              return <ItemArits key={uuidv4()} classGird={classGird} data={item}></ItemArits>
                           })}
                        </PlayListSelector>
                     )
                  }

                  return (
                     <PlayListSelector key={uuidv4()} title={e.title}>
                        {e?.items?.map((item, index) => {
                           if (index > 4) return
                           let classGird = "col l-2-4 m-3 c-5"
                           if (index === 4) {
                              classGird = "col l-2-4 m-0 c-5"
                           }

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
                        })}
                     </PlayListSelector>
                  )
               })}
         </div>
      </div>
   )
}

export default memo(ArtistALl)
