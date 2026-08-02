import React, { useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import LoadingSvg from "components/ui/LoadingSvg"
import Section from "components/ui/Section"
import AlbumCard from "components/card/AlbumCard"
import SongRow from "components/song/SongRow"
import MvCard from "components/card/MvCard"
import ArtistCard from "components/card/ArtistCard"
import { useCallback } from "react"
import { useHubDetailData } from "api/useHubDetailData"
import { useLayoutEffect } from "react"

const HubDetailPageStyles = styled.div`
   .cover {
      position: relative;
      margin: 0 calc(var(--padding-section) * -1);
      text-align: center;
      padding-bottom: 30%;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 0;
      background-color: var(--loading-bg);
   }
   .blur {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      filter: unset;
      &:before {
         content: "";
         clear: both;
         position: absolute;
         width: 100%;
         height: 50%;
         bottom: 0;
         left: 0;
         background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), var(--layout-bg));
      }
   }
`

const HubDetailPage = () => {
   const { id } = useParams()
   const { data: datas, isLoading } = useHubDetailData(id)

   if (isLoading || !datas?.sections) return <LoadingSvg />

   return (
      <HubDetailPageStyles>
         <div className="cover">
            <div
               className="blur"
               style={{
                  background: `url("${datas?.cover}") center top / cover no-repeat`,
               }}
            />
         </div>

         <div>
            {datas?.sections?.length === 1 &&
               datas.sections.map((e, index) => {
                  let mt = index === 0 ? "!mt-0" : ""

                  return (
                     <Section classAdd={mt} key={e.sectionId || index} title={e?.title}>
                        {e.items.map((item, idx) => {
                           let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                           return (
                              <AlbumCard
                                 isSwiper={true}
                                 key={item.encodeId || item.id || idx}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              ></AlbumCard>
                           )
                        })}
                     </Section>
                  )
               })}

            {datas?.sections?.length > 1 &&
               datas?.sections.map((e, index) => {
                  let mt = index === 0 ? "!mt-0" : ""
                  const sectionKey = e.sectionId || `${e.sectionType}-${index}`

                  if (e.title === "Hot Songs") {
                     const colSong1 = e.items?.slice(0, 5)
                     const colSong2 = e.items?.slice(5, 10)
                     const colSong3 = e.items?.slice(9, 14)

                     return (
                        <Section key={sectionKey} title={e?.title}>
                           <div className="col l-4 m-6 c-9">
                              {colSong1 && colSong1.map((item, idx) => <SongRow key={item.encodeId || idx} item={item}></SongRow>)}
                           </div>
                           <div className="col l-4 m-6 c-9">
                              {colSong2 && colSong2.map((item, idx) => <SongRow key={item.encodeId || idx} item={item}></SongRow>)}
                           </div>
                           <div className="col l-4 m-0 c-9">
                              {colSong3 && colSong3.map((item, idx) => <SongRow key={item.encodeId || idx} item={item}></SongRow>)}
                           </div>
                        </Section>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <Section
                           key={sectionKey}
                           all={false}
                           classAdd={"container_radio "}
                           classAdd2={"mb-[10px]"}
                           title={e.title}
                        >
                           {e?.items?.map((item, idx) => {
                              if (idx > 4) return null
                              let classGird = idx === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                              return <ArtistCard classGird={classGird} key={item.id || item.encodeId || idx} data={item}></ArtistCard>
                           })}
                        </Section>
                     )
                  }
                  if (e.sectionType === "video") {
                     return (
                        <Section classAdd="artist-mv " key={sectionKey} title={e.title}>
                           {e?.items?.map((item, idx) => {
                              if (idx > 2) return null

                              return <MvCard key={item.encodeId || item.id || idx} data={item} isAritst></MvCard>
                           })}
                        </Section>
                     )
                  }
                  return (
                     <Section classAdd={mt} key={sectionKey} title={e?.title}>
                        {e.items.map((item, idx) => {
                           if (idx > 4) return null
                           let classGird = idx === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                           return (
                              <AlbumCard
                                 isSwiper={true}
                                 key={item.encodeId || item.id || idx}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              ></AlbumCard>
                           )
                        })}
                     </Section>
                  )
               })}
         </div>
      </HubDetailPageStyles>
   )
}

export default HubDetailPage
