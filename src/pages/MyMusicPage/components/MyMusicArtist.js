import React, { memo } from "react"
import Section from "components/ui/Section"
import LoadingSvg from "components/ui/LoadingSvg"
import ArtistCard from "components/card/ArtistCard"

import { useOutletContext } from "react-router"
import EmptyContent from "components/ui/EmptyContent"
const MyMusicArtist = memo(() => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>
   return (
      <>
         {docs.favouriteArtist.length === 0 && (
            <EmptyContent icon={"album"} text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}
         {docs.favouriteArtist.length > 0 && (
            <Section all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
               {docs.favouriteArtist.map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                  return <ArtistCard classGird={classGird} key={e.id} data={e}></ArtistCard>
               })}
            </Section>
         )}
      </>
   )
})

export default MyMusicArtist
