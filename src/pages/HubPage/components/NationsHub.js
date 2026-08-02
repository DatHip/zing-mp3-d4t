import React, { memo } from "react"
import FavoriteArtistCard from "components/card/FavoriteArtistCard"
import Section from "components/ui/Section"

const NationsHub = memo((data) => {
   return (
      <Section classAdd2={"!flex-wrap"} title={"Quốc Gia"}>
         {data &&
            data?.data?.length > 0 &&
            data?.data?.map((e, index) => {
               let classGird = "col l-3 m-6 !mb-6 c-6"

               return <FavoriteArtistCard isCenter key={e.encodeId || e.id || index} clasName={classGird} isHub item={e}></FavoriteArtistCard>
            })}
      </Section>
   )
})

export default NationsHub
