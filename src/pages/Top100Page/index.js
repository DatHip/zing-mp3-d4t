import React from "react"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"
import LoadingSvg from "components/ui/LoadingSvg"
import Top100HeaderSvg from "./components/Top100HeaderSvg"
import { useTop100Page } from "./useTop100Page"

const Top100Page = () => {
   const { sections, isLoading } = useTop100Page()

   if (isLoading || !sections) return <LoadingSvg />

   return (
      <div className="main_songnew main-page-item active">
         <div className="main_songnew-title">
            <Top100HeaderSvg />
         </div>
         <div>
            {sections.map((section) => (
               <Section key={section.sectionId || section.title} title={section?.title}>
                  {section.items?.map((item) => (
                     <AlbumCard
                        key={item.encodeId}
                        artis={true}
                        desc={false}
                        class1="col l-2-4 m-3 c-5"
                        item={item}
                     />
                  ))}
               </Section>
            ))}
         </div>
      </div>
   )
}

export default Top100Page
