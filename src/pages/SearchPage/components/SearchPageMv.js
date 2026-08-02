import React from "react"
import { useParams } from "react-router"
import { useSearchByType } from "api/useSearchData"
import { useScrollTop } from "hook/useScrollTop"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import MvCard from "components/card/MvCard"

const SearchPageMv = () => {
   const { id } = useParams()
   const { data, isLoading } = useSearchByType(id, "video")
   useScrollTop(id)

   if (isLoading || !data) return <LoadingSvg />

   const videos = data.items || []

   return (
      <div className="main_mv main-page-item active">
         <div className="main_mv-container ">
            <Section classAdd2="container_top100-list " title="MV">
               {videos.map((video) => (
                  <MvCard key={video.encodeId || video.id} data={video} />
               ))}
            </Section>
         </div>
      </div>
   )
}

export default SearchPageMv
