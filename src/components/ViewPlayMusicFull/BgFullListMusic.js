import React, { memo, useEffect, useRef, useState } from "react"
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Lazy } from "swiper"
import { v4 as uuidv4 } from "uuid"
import ItemSong from "./itemSong"
import { useLayoutEffect } from "react"

const BgFullListMusic = memo(({ isScroll }) => {
   const navigationPrevRef = useRef(null)
   const navigationNextRef = useRef(null)
   const swiperERFf = useRef(null)
   const listSong = useSelector((state) => state.queueNowPlay.listSong)
   const currentIndexSong = useSelector((state) => state.queueNowPlay.currentIndexSong)
   const listSongShuffle = useSelector((state) => state.queueNowPlay.listSongShuffle)
   const { isRandom } = useSelector((state) => state.setting)

   useLayoutEffect(() => {
      swiperERFf.current.swiper.slideTo(currentIndexSong)
   }, [currentIndexSong, isRandom, isScroll])

   return (
      <div className="want_list  nowplaying-body_item ">
         <button
            ref={navigationPrevRef}
            type="button"
            className="slider_list-btn-left slick-prev slick-arrow "
            style={{ display: "flex" }}
         >
            <span span="" className="material-icons-outlined">
               arrow_back_ios
            </span>
         </button>
         <button
            ref={navigationNextRef}
            type="button"
            className="slider_list-btn-right slick-next slick-arrow "
            style={{ display: "flex" }}
         >
            <span className="material-icons-outlined">arrow_forward_ios</span>
         </button>

         <Swiper
            ref={swiperERFf}
            modules={[Navigation, Pagination, Lazy]}
            lazy={true}
            slidesPerView={5}
            spaceBetween={5}
            centeredSlides={true}
            loop={false}
            navigation={{
               prevEl: navigationPrevRef.current,
               nextEl: navigationNextRef.current,
            }}
            onBeforeInit={(swiper) => {
               swiper.params.navigation.prevEl = navigationPrevRef.current
               swiper.params.navigation.nextEl = navigationNextRef.current
            }}
            speed={200}
            allowTouchMove={true}
            scrollbar={{ draggable: true }}
            breakpoints={{
               0: {
                  slidesPerView: 1,
               },
               721: {
                  slidesPerView: 3,
               },
               1024: {
                  slidesPerView: 5,
               },
            }}
         >
            {!isRandom &&
               listSong &&
               listSong.length > 0 &&
               listSong.map((e, index) => {
                  return (
                     <SwiperSlide key={e.encodeId}>
                        <ItemSong index={index} data={e}></ItemSong>
                     </SwiperSlide>
                  )
               })}
            {isRandom &&
               listSongShuffle &&
               listSongShuffle.length > 0 &&
               listSongShuffle.map((e, index) => {
                  return (
                     <SwiperSlide key={e.encodeId}>
                        <ItemSong index={index} data={e}></ItemSong>
                     </SwiperSlide>
                  )
               })}
         </Swiper>
      </div>
   )
})

export default BgFullListMusic
