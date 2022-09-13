import React, { memo, useRef } from "react"
import { useSelector } from "react-redux"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Lazy } from "swiper"
import { v4 as uuidv4 } from "uuid"
import ItemSong from "./itemSong"

const BgFullListMusic = memo(() => {
   const navigationPrevRef = useRef(null)
   const navigationNextRef = useRef(null)

   const listSong = useSelector((state) => state.queueNowPlay.listSong)

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
            {listSong &&
               listSong.length > 0 &&
               listSong.map((e) => {
                  return (
                     <SwiperSlide key={uuidv4()}>
                        <ItemSong data={e}></ItemSong>
                     </SwiperSlide>
                  )
               })}
         </Swiper>
      </div>
   )
})

export default BgFullListMusic
