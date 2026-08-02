import React, { memo } from "react"
import CardSlider from "components/card/CardSlider"
import Section from "components/ui/Section"
import ChartSongRow from "components/song/ChartSongRow"
import { useOutletContext } from "react-router-dom"
import AlbumCard from "components/card/AlbumCard"
import ArtistCard from "components/card/ArtistCard"
import MvCard from "components/card/MvCard"
import LoadingSvg from "components/ui/LoadingSvg"

const ArtistAll = () => {
   const datas = useOutletContext()

   const dataSelector = datas?.sections?.find((e) => e.sectionType === "song")
   const dataSelector2 = datas?.sections?.filter((e) => e.sectionType !== "song")

   if (!datas || !datas.sections) return <LoadingSvg></LoadingSvg>

   return (
      <div>
         <div className="">
            <Section notRow classAdd2="w-full" title={dataSelector?.title}>
               <div className="flex items-center">
                  <div className="m-none">
                     <CardSlider data={dataSelector}></CardSlider>
                  </div>

                  <div className="main_topchart mt-2 w-full">
                     <div className="container_zing-chart">
                        <div className="max-h-[260px] overflow-y-auto zing-chart_list pt-2">
                           {dataSelector?.items &&
                              dataSelector?.items.length > 0 &&
                              dataSelector?.items.map((e, index) => {
                                 return <ChartSongRow key={e.encodeId || e.id || index} isNoneRank item={e} index={index}></ChartSongRow>
                              })}
                        </div>
                     </div>
                  </div>
               </div>
            </Section>
            {dataSelector2 &&
               dataSelector2.map((e, idx) => {
                  const sectionKey = e.sectionId || `${e.sectionType}-${idx}`

                  if (e.sectionType === "video") {
                     if (!e.items) return null

                     return (
                        <Section classAdd="artist-mv" key={sectionKey} title={e.title}>
                           {e?.items?.slice(0, 3).map((item, index) => {
                              return <MvCard key={item.encodeId || item.id || index} data={item} isAritst></MvCard>
                           })}
                        </Section>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <Section key={sectionKey} title={e.title}>
                           {e?.items?.slice(0, 5).map((item, index) => {
                              let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                              return <ArtistCard key={item.id || item.encodeId || index} classGird={classGird} data={item}></ArtistCard>
                           })}
                        </Section>
                     )
                  }

                  return (
                     <Section key={sectionKey} title={e.title}>
                        {e?.items?.slice(0, 5).map((item, index) => {
                           let classGird = index === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

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
                        })}
                     </Section>
                  )
               })}
         </div>
      </div>
   )
}

export default memo(ArtistAll)
