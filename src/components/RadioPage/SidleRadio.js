import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React, { memo, useRef } from "react"
import PlayListSelector from "../Selection/PlayListSelector"
import { Navigation, Pagination } from "swiper"
import { v4 as uuidv4 } from "uuid"
import { Swiper, SwiperSlide } from "swiper/react"
import styled from "styled-components"

const ItemStyles = styled.div`
   margin-right: 12px;
   margin-left: 12px;
   padding: 16px;
   border-radius: 12px;
   position: relative;
   overflow: hidden;
   align-items: center;
   display: flex;
   text-align: left;
   align-items: center;
   display: flex;
   text-align: left;
   .cover {
      z-index: -1;
      -webkit-filter: blur(50px);
      filter: blur(50px);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
   }
   .opac {
      background-color: rgba(0, 0, 0, 0.2);
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
   }
   .media-content {
      position: relative;
      color: var(--white);
      flex-basis: auto;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      align-self: center;
      width: 0;
   }
   .host {
      font-size: 12px;
      font-weight: 500;
      color: rgba(254, 255, 255, 0.8);
      margin-bottom: 2px;
   }
   .image {
      height: 120px;
      width: 120px;
      border-radius: 6px;
      overflow: hidden;
   }
   .media-left {
      margin-right: 20px;
      position: relative;
   }
   .subtitle {
      margin-top: 4px;
      font-size: 14px;
      color: rgba(254, 255, 255, 0.8);
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      white-space: normal;
      overflow: hidden;
   }
   .title {
      color: var(--white);
      font-size: 16px;
      font-weight: 700;
      margin-bottom: 0;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      max-width: 100%;
      line-height: normal;
      display: inline-block;
   }
`

const SidleRadio = ({ data, isFeatured }) => {
   const navigationPrevRef = useRef(null)
   const navigationNextRef = useRef(null)

   return (
      <PlayListSelector
         title={data?.title}
         childrenOption={
            <div className="absolute mt-2  top-0 event-btn-arrow flex justify-center items-center gap-[10px]">
               <button ref={navigationPrevRef} type="button" className="cursor-pointer">
                  <span className="material-icons-outlined">arrow_back_ios</span>
               </button>
               <button ref={navigationNextRef} type="button" className="cursor-pointer">
                  <span className="material-icons-outlined">arrow_forward_ios</span>
               </button>
            </div>
         }
         classAdd={"container-event"}
      >
         {data?.items && data?.items.length > 0 && (
            <Swiper
               modules={[Navigation, Pagination]}
               loop={false}
               slidesPerView={2}
               pagination={{
                  dynamicBullets: true,
               }}
               navigation={{
                  prevEl: navigationPrevRef.current,
                  nextEl: navigationNextRef.current,
               }}
               onBeforeInit={(swiper) => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current
                  swiper.params.navigation.nextEl = navigationNextRef.current
               }}
               speed={600}
               allowTouchMove={false}
               scrollbar={{ draggable: false }}
               breakpoints={{
                  0: {
                     slidesPerView: 1,
                     allowTouchMove: true,
                     slidesPerGroup: 1,
                  },
                  700: {
                     slidesPerView: 2,
                     allowTouchMove: true,
                     slidesPerGroup: 2,
                  },
               }}
            >
               {data?.items &&
                  data.items.length > 0 &&
                  data?.items?.map((e, index) => {
                     return (
                        <SwiperSlide key={uuidv4()}>
                           {!isFeatured ? (
                              <div className="col want_list-item-link cursor-pointer main-page_list-item main_page-hover">
                                 <div className="want_list-item-link main-page_list-item_img">
                                    <img src={e.thumbnail} alt={e.title} />
                                 </div>
                              </div>
                           ) : (
                              <ItemStyles className="media col zm-podcast-item-h">
                                 <div
                                    className="cover"
                                    style={{
                                       backgroundImage: `url(${e.thumbnailM})`,
                                    }}
                                 >
                                    <div className="opac" />
                                 </div>
                                 <div className="media-left">
                                    <figure className="image is-48x48">
                                       <img src={e.thumbnailM} alt="" />
                                    </figure>
                                 </div>
                                 <div className="media-content">
                                    <div className="host">{e.artists[0].name}</div>
                                    <h3 className="title">{e.title}</h3>
                                    <h3 className="subtitle">{e.description}</h3>
                                 </div>
                              </ItemStyles>
                           )}
                        </SwiperSlide>
                     )
                  })}
            </Swiper>
         )}
      </PlayListSelector>
   )
}

export default memo(SidleRadio)
