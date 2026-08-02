import React, { memo } from "react"
import { useHomeSection } from "hook/useHomeSection"
import PlayListSelector from "components/Selection/PlayListSelector"
import RaidoItem from "components/Selection/RaidoItem"

const matchRadio = (s) =>
   s?.sectionType === "livestream" ||
   s?.sectionId === "radHot" ||
   /^radio( nổi bật)?$/i.test((s?.title || "").trim())

const RadioHomePage = memo(({ isNotAll }) => {
   const { section, isLoading } = useHomeSection(matchRadio)
   const datas = section?.items

   if (!section && !isLoading) return null
   if (!section) return null

   return (
      <PlayListSelector to="radio" classAdd={`container_radio`} title={section?.title} all={!isNotAll}>
         {datas &&
            datas.length > 0 &&
            datas.map((e, index) => {
               if (index > 6) return null
               let classGird = "col l-1-4 m-2 c-5 m2-6 m2-5"
               if (index === 5) {
                  classGird = "col l-1-4 m-2 c-5 m2-6 m2-none"
               }
               if (index === 6) {
                  classGird = "col l-1-4 m-none c-5"
               }

               return <RaidoItem key={e.id} className1={classGird} item={e}></RaidoItem>
            })}
      </PlayListSelector>
   )
})

export default RadioHomePage
