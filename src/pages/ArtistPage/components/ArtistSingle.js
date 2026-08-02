import React from "react"
import Section from "components/ui/Section"
import { useOutletContext } from "react-router"
import AlbumCard from "components/card/AlbumCard"
import LoadingSvg from "components/ui/LoadingSvg"

const ArtistSingle = () => {
   const datas = useOutletContext()
   const dataSelector = datas?.sections?.find((e) => e.title === "Single & EP")

   if (!datas || !datas.sections) return <LoadingSvg></LoadingSvg>

   return (
      <Section classAdd2={"!flex-wrap"} key={dataSelector?.title} title={dataSelector?.title}>
         {dataSelector &&
            dataSelector?.items?.length > 0 &&
            dataSelector?.items?.map((e) => {
               let classGird = "col l-2-4 m-3 c-6 !mb-[30px]"

               return <AlbumCard key={e.encodeId || e.id} artis={true} desc={false} class1={classGird} item={e}></AlbumCard>
            })}
      </Section>
   )
}
export default ArtistSingle
