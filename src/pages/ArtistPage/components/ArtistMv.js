import React from "react"
import Section from "components/ui/Section"
import { useOutletContext } from "react-router"
import MvCard from "components/card/MvCard"
import LoadingSvg from "components/ui/LoadingSvg"

const ArtistMv = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.sectionType === "video")

   if (!datas || !datas.sections) return <LoadingSvg></LoadingSvg>

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <Section classAdd2={"container_top100-list "} key={dataSelector?.title} title={dataSelector?.title}>
               {dataSelector &&
                  dataSelector?.items?.length > 0 &&
                  dataSelector?.items?.map((e) => {
                     return <MvCard key={e.encodeId || e.id} data={e}></MvCard>
                  })}
            </Section>
         </div>
      </div>
   )
}

export default ArtistMv
