import React from "react"
import { useSelector } from "react-redux"
import AlbumCard from "components/card/AlbumCard"
import Section from "components/ui/Section"

const HistoryPlayList = () => {
   const recentPlaylist = useSelector((state) => state.logged.recentPlaylist)

   return (
      <div className="main_songnew main-page-item active">
         <Section classAdd2={"history-playlist"}>
            {recentPlaylist?.length > 0 &&
               recentPlaylist.slice(0, 20).map((e, index) => {
                  let classGird = "col l-2-4 m-3 c-6"

                  return <AlbumCard key={e.encodeId} artis={true} desc={false} class1={classGird} item={e}></AlbumCard>
               })}

            {recentPlaylist && recentPlaylist.length === 0 && (
               <div className="personal_podcast-main personal_container-main active">
                  <div className="personal_podcast-img"></div>
                  <div className="personal_podcast-text">Không có tập mới</div>
               </div>
            )}
         </Section>
      </div>
   )
}

export default HistoryPlayList
