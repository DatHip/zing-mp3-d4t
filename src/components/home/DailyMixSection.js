import React, { memo } from "react"
import { byId, useHomeSection } from "hook/useHomeSection"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"

const DailyMixSection = () => {
   const { section, isLoading } = useHomeSection(byId("hAutoTheme2"))
   const datas = section?.items

   if (!section && !isLoading) return null
   if (!section) return null

   return (
      <Section title={section?.title}>
         {datas?.length > 0 &&
            datas.map((e, index) => {
               let classGird = "col l-2-4 m-3 c-5"
               if (index === 4) {
                  classGird = "col l-2-4 m-0 c-5"
               }

               return (
                  <AlbumCard
                     isSwiper={true}
                     key={e.encodeId || e.id || index}
                     artis={true}
                     desc={false}
                     class1={classGird}
                     item={e}
                  ></AlbumCard>
               )
            })}
         {!datas &&
            Array(5)
               .fill(0)
               .map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-5"
                  if (index === 4) {
                     classGird = "col l-2-4 m-0 c-5"
                  }

                  return (
                     <AlbumCard.Loading
                        key={index}
                        artis={false}
                        desc={false}
                        class1={classGird}
                        item={e}
                     ></AlbumCard.Loading>
                  )
               })}
      </Section>
   )
}

export default memo(DailyMixSection)
