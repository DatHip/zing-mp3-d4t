import React, { memo } from "react"
import { useArtistData } from "api/useArtistData"
import Section from "components/ui/Section"
import MvCard from "components/card/MvCard"

const MvDataList = memo(({ item }) => {
   const { data } = useArtistData(item.alias)
   const videos = data?.sections?.find((section) => section.sectionType === "video")?.items

   if (!videos || videos.length === 0) return null

   return (
      <Section classAdd2="container_top100-list " key={item.alias} title={`MV Của ${item.name} `}>
         {videos.slice(0, 8).map((video) => (
            <MvCard isMvFull key={video.encodeId || video.id} data={video} />
         ))}
      </Section>
   )
})

export default MvDataList
