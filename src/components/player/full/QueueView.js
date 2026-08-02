import React, { memo, useRef } from "react"
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Lazy } from "swiper"
import QueueSongItem from "components/player/full/QueueSongItem"
import { useLayoutEffect } from "react"
import { selectCurrentIndex, selectListSong, selectListSongShuffle } from "features/queue/queueSelectors"
import { selectIsRandom } from "features/setting/settingSelectors"

const QueueView = memo(({ isScroll }) => {
   const navigationPrevRef = useRef(null)
   const navigationNextRef = useRef(null)
   const swiperERFf = useRef(null)
   const listSong = useSelector(selectListSong)
   const currentIndexSong = useSelector(selectCurrentIndex)
   const listSongShuffle = useSelector(selectListSongShuffle)
   const isRandom = useSelector(selectIsRandom)

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
                        <QueueSongItem index={index} data={e}></QueueSongItem>
                     </SwiperSlide>
                  )
               })}
            {isRandom &&
               listSongShuffle &&
               listSongShuffle.length > 0 &&
               listSongShuffle.map((e, index) => {
                  return (
                     <SwiperSlide key={e.encodeId}>
                        <QueueSongItem index={index} data={e}></QueueSongItem>
                     </SwiperSlide>
                  )
               })}
         </Swiper>
      </div>
   )
})

export default QueueView
