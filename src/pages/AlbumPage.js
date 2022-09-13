import React, { useEffect, useState } from "react"
import { getTop100page } from "../api/getTop100page"
import CarouselItem from "../components/Selection/CarouselItem"
import PlayListSelector from "../components/Selection/PlayListSelector"
import { v4 as uuidv4 } from "uuid"
import LoadingSvg from "../components/loading/LoadingSvg"
import { getAlbumPage } from "../api/getAlbumPage"
import { getSuggestedAlbum } from "../api/getSuggestedAlbum"
import { useParams } from "react-router"
import styled from "styled-components"
import ItemChartList from "../components/TopChartPage/ItemChartList"
import getFormartTimeDDYY from "../utils/getFormartTimeDDYY"
import { Link } from "react-router-dom"
import ItemArits from "../components/MyMusicPage/ItemArits"
import fancyTimeFormat from "../utils/fancyTimeFormat"
import axios from "axios"
import { tmdAPI } from "../config"
import scrollTop from "../utils/scrollToTop"

const AlbumPage = () => {
   const { id } = useParams()

   const [datas, setData] = useState([])
   const [dataSuggested, setDataSuggested] = useState([])

   useEffect(() => {
      scrollTop()
      fetchData()
   }, [id])
   useEffect(() => {
      fetchDataSuggested()
   }, [id])

   const fetchData = async () => {
      const data = await axios.get(tmdAPI.getAlbumPage(id))
      setData(data.data.data)
   }
   const fetchDataSuggested = async () => {
      const data = await axios.get(tmdAPI.getSuggestedAlbum(id))
      setDataSuggested(data.data.data)
   }

   if (datas?.length === 0 || dataSuggested?.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <AlbumPageStyles className="text-white mt-[10px]">
         <div className="playlist-detail-container">
            <div className="clearfix">
               <div className="media playlist-header sticky">
                  <div className="media-left">
                     <div className={`want_list-item-link cursor-pointer main-page_list-item main_page-hover`}>
                        <div className="want_list-item-link main-page_list-item_img">
                           <img src={datas.thumbnailM} alt="" />
                        </div>

                        <div className="recently_list-item_hover text-white">
                           <div className="recently_btn-hover recently_btn-hover-play">
                              <span>
                                 <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="media-content">
                     <div className="content-top">
                        <h3 className="title">{datas.title}</h3>
                        <div className="release">Cập nhật: {getFormartTimeDDYY(datas?.contentLastUpdate)}</div>
                        <div className="artists">
                           {datas.artists &&
                              datas.artists?.map((e, index) => {
                                 let prara = ", "

                                 if (index === datas.artists.length - 1) {
                                    prara = ""
                                 }

                                 return (
                                    <span key={index}>
                                       <Link className="is-ghost" to={`/nghe-si/${e.alias}/`}>
                                          {e.name}
                                       </Link>
                                       {prara}
                                    </span>
                                 )
                              })}
                        </div>
                        <div className="like">
                           {datas?.like > 10000 ? datas?.like.toString().slice(0, -3) + "K" : datas.like} người yêu thích
                        </div>
                     </div>
                     <div className="actions">
                        <button className="zm-btn btn-play-all is-outlined active is-medium is-upper button" tabIndex={0}>
                           <i className="icon ic-play" />
                           <span>Tiếp tục phát</span>
                        </button>
                        <div className="media_right">
                           <div className="media_right-btn player_btn">
                              <i className="icon ic-like"></i>
                              <span className="playing_title-hover">Thêm vào thư viện </span>
                           </div>
                           <div className="media_right-btn player_btn">
                              <i className="icon ic-more"></i>
                              <span className="playing_title-hover">Xem thêm</span>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="playlist-content">
                  <div className="description">
                     <span>Lời tựa</span> {datas?.sortDescription}
                  </div>

                  <div className="main_topchart mt-2">
                     <div className="container_zing-chart">
                        <div className="zing-chart_list pt-2">
                           <div className="zing-chart_item none-hover main_page-hover">
                              <div className="zing-chart_item-left">
                                 <div className="zing-chart_item-info column-text">BÀI HÁT</div>
                              </div>

                              <div className="zing-chart_item-center">
                                 <p className="thesong_name column-text">ALBUM</p>
                              </div>

                              <div className="zing-chart_item-right gap-3">
                                 <p className="thesong_time column-text">THỜI GIAN</p>
                              </div>
                           </div>

                           {datas?.song?.items.map((e, index) => {
                              return <ItemChartList isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                           })}
                           <h3 className="bottom-info subtitle mt-[10px] ml-[12px]">
                              <span>{datas?.song?.total} bài hát</span>
                              <span className="mx-[8px]">•</span>
                              <span>{fancyTimeFormat(datas?.song?.totalDuration, 1)}</span>
                           </h3>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div>
               {dataSuggested?.map((e) => {
                  if (e.sectionType === "adBanner") return

                  if (e.sectionType === "artist") {
                     return (
                        <PlayListSelector key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              if (index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if (index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              }

                              return <ItemArits key={uuidv4()} classGird={classGird} data={item}></ItemArits>
                           })}
                        </PlayListSelector>
                     )
                  }

                  if (e.sectionType === "playlist") {
                     return (
                        <PlayListSelector key={uuidv4()} title={e.title}>
                           {e?.items?.map((item, index) => {
                              if (index > 4) return
                              let classGird = "col l-2-4 m-3 c-5"
                              if (index === 4) {
                                 classGird = "col l-2-4 m-0 c-5"
                              }

                              return (
                                 <CarouselItem
                                    isSwiper={true}
                                    key={uuidv4()}
                                    artis={true}
                                    desc={false}
                                    class1={classGird}
                                    item={item}
                                 ></CarouselItem>
                              )
                           })}
                        </PlayListSelector>
                     )
                  }
                  return <></>
               })}
            </div>
         </div>
      </AlbumPageStyles>
   )
}

const AlbumPageStyles = styled.div`
   @media (max-width: 600px) {
      .playlist-header {
         flex-wrap: wrap;
         gap: 16px;
         .media-left,
         .media-content {
            width: 100%;
         }
         .media-content {
            margin-bottom: 10px;
         }
      }
   }
   .zing-chart_item.none-hover {
      &:hover {
         background-color: unset !important;
      }
   }
   .column-text {
      font-size: 12px !important;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--text-secondary);
   }
   .bottom-info {
      font-size: 12px;
   }
   .subtitle {
      color: var(--text-secondary);
   }

   .clearfix:after {
      display: block;
      clear: both;
      content: "";
   }
   .zing-chart_list .main-page_list-item_img {
      width: 40px !important;
   }

   .description span {
      color: var(--text-secondary);
   }

   .media_right {
      display: flex;
      margin-top: 1rem;
      align-items: center;
      justify-content: center;
      gap: 10px;

      i {
         font-size: 16px;
         padding: 5px;
         border-radius: 50%;
         margin-right: 0;
      }

      div {
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 18px;
         border-radius: 999px;
         line-height: normal;
         border: 0;
         display: inline-block;
         font-weight: 400;
         text-align: center;
         cursor: pointer;
         margin: 0 2px;
         border: none;
         color: var(--player-text);
         padding: 6px;
      }
   }

   .playlist-header .media-content .content-top {
      width: 100%;
   }
   .playlist-header .media-content {
      display: flex;
      flex-direction: column;
      align-self: normal;
      justify-content: space-between;
      align-items: flex-start;
   }
   .media-content {
      flex-basis: auto;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      align-self: center;
      width: 0;
   }

   .playlist-header .media-left {
      margin-right: 20px;
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;
   }

   .playlist-header {
      padding: 0 0 30px;
   }
   .media {
      align-items: center;
      display: flex;
      text-align: left;
      padding: 10px;
      border-radius: 5px;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
   }
   .playlist-header .media-content .content-top .artists,
   .playlist-header .media-content .content-top .created-by,
   .playlist-header .media-content .content-top .like,
   .playlist-header .media-content .content-top .release {
      color: var(--text-secondary);
      font-size: 12px;
      line-height: 1.75;
   }

   .content-top .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 0;
      text-transform: none;
   }

   .is-ghost:hover {
      text-decoration: underline;
   }

   @media screen and (min-width: 1200px) {
      .playlist-header.sticky {
         position: -webkit-sticky;
         position: sticky;
         top: 10px;
      }
      .playlist-header {
         display: block;
         width: 300px;
         float: left;
      }
      .playlist-header .media-left {
         margin-right: 0;
      }
      .playlist-header .media-content {
         display: flex;
         align-items: center;
         margin-top: 12px;
         width: 100%;
      }
      .content-top {
         text-align: center;
      }

      .playlist-detail-container .playlist-content {
         margin-left: 330px;
      }

      .media-content .actions {
         flex-direction: column;
         margin-top: 16px;
      }
      .content-top .title {
         white-space: normal;
      }
   }
`

export default AlbumPage
