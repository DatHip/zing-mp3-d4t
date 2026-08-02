import React, { useState } from "react"
import { useParams } from "react-router"
import styled from "styled-components"
import LoadingSvg from "components/loading/LoadingSvg"
import PlayListSelector from "components/Selection/PlayListSelector"
import CarouselItem from "components/Selection/CarouselItem"
import NewReleaseitem from "components/NewReleaseitem/NewReleaseitem"
import MvItem from "components/MVpage/MvItem"
import ItemArits from "components/MyMusicPage/ItemArits"
import { useCallback } from "react"
import axios from "axios"
import { tmdAPI } from "config"
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
   const [datas, setData] = useState([])

   const fetchData = useCallback(async () => {
      const data = await axios.get(tmdAPI.getHubDetail(id))
      setData(data.data.data)
   }, [id])

   useLayoutEffect(() => {
      fetchData()
   }, [fetchData])

   if (!datas || !datas.sections) return <LoadingSvg></LoadingSvg>

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
                     <PlayListSelector classAdd={mt} key={e.sectionId || index} title={e?.title}>
                        {e.items.map((item, idx) => {
                           let classGird = "col l-2-4 m-3 c-5 !mb-[30px]"

                           return (
                              <CarouselItem
                                 isSwiper={true}
                                 key={item.encodeId || item.id || idx}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              ></CarouselItem>
                           )
                        })}
                     </PlayListSelector>
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
                        <PlayListSelector key={sectionKey} title={e?.title}>
                           <div className="col l-4 m-6 c-9">
                              {colSong1 && colSong1.map((item, idx) => <NewReleaseitem key={item.encodeId || idx} item={item}></NewReleaseitem>)}
                           </div>
                           <div className="col l-4 m-6 c-9">
                              {colSong2 && colSong2.map((item, idx) => <NewReleaseitem key={item.encodeId || idx} item={item}></NewReleaseitem>)}
                           </div>
                           <div className="col l-4 m-0 c-9">
                              {colSong3 && colSong3.map((item, idx) => <NewReleaseitem key={item.encodeId || idx} item={item}></NewReleaseitem>)}
                           </div>
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "artist") {
                     return (
                        <PlayListSelector
                           key={sectionKey}
                           all={false}
                           classAdd={"container_radio "}
                           classAdd2={"mb-[10px]"}
                           title={e.title}
                        >
                           {e?.items?.map((item, idx) => {
                              if (idx > 4) return null
                              let classGird = idx === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                              return <ItemArits classGird={classGird} key={item.id || item.encodeId || idx} data={item}></ItemArits>
                           })}
                        </PlayListSelector>
                     )
                  }
                  if (e.sectionType === "video") {
                     return (
                        <PlayListSelector classAdd="artist-mv " key={sectionKey} title={e.title}>
                           {e?.items?.map((item, idx) => {
                              if (idx > 2) return null

                              return <MvItem key={item.encodeId || item.id || idx} data={item} isAritst></MvItem>
                           })}
                        </PlayListSelector>
                     )
                  }
                  return (
                     <PlayListSelector classAdd={mt} key={sectionKey} title={e?.title}>
                        {e.items.map((item, idx) => {
                           if (idx > 4) return null
                           let classGird = idx === 4 ? "col l-2-4 m-0 c-5" : "col l-2-4 m-3 c-5"

                           return (
                              <CarouselItem
                                 isSwiper={true}
                                 key={item.encodeId || item.id || idx}
                                 artis={true}
                                 desc={false}
                                 class1={classGird}
                                 item={item}
                              ></CarouselItem>
                           )
                        })}
                     </PlayListSelector>
                  )
               })}
         </div>
      </HubDetailPageStyles>
   )
}

export default HubDetailPage
