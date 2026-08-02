import React, { memo } from "react"
import { useOutletContext } from "react-router"
import EmptyContent from "components/ui/EmptyContent"
import LoadingSvg from "components/ui/LoadingSvg"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"

const MyMusicPlayList = memo(() => {
   const { docs } = useOutletContext()

   if (!docs?.email) return <LoadingSvg></LoadingSvg>

   return (
      <>
         {docs.favouritePlaylist.length === 0 && (
            <EmptyContent icon="album" text={"Chưa có mục yêu thích trong thư viện"} textBtn={"Khám phá ngay"}></EmptyContent>
         )}
         {docs.favouritePlaylist.length > 0 && (
            <div className="main_songnew main-page-item active">
               <Section title={"PlayList"}>
                  {docs.favouritePlaylist.slice(0, 30).map((e, index) => {
                     let classGird = "col l-2-4 m-3 c-5"
                     return <AlbumCard key={index} artis={true} desc={false} class1={classGird} item={e}></AlbumCard>
                  })}
               </Section>
            </div>
         )}
      </>
   )
})

export default MyMusicPlayList
