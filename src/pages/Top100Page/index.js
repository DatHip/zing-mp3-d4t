import React from "react"
import CarouselItem from "../../components/Selection/CarouselItem"
import PlayListSelector from "../../components/Selection/PlayListSelector"
import LoadingSvg from "../../components/loading/LoadingSvg"
import Top100HeaderSvg from "./components/Top100HeaderSvg"
import { useTop100Data } from "./useTop100Data"

const Top100Page = () => {
   const { data, isLoading } = useTop100Data()

   if (isLoading || !data) return <LoadingSvg />

   return (
      <div className="main_songnew main-page-item active">
         <div className="main_songnew-title">
            <Top100HeaderSvg />
         </div>
         <div>
            {data.map((section) => (
               <PlayListSelector key={section.sectionId || section.title} title={section?.title}>
                  {section.items?.map((item) => (
                     <CarouselItem
                        key={item.encodeId}
                        artis={true}
                        desc={false}
                        class1="col l-2-4 m-3 c-5"
                        item={item}
                     />
                  ))}
               </PlayListSelector>
            ))}
         </div>
      </div>
   )
}

export default Top100Page
