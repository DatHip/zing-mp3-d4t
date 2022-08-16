import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React, { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { Navigation, Autoplay, Pagination } from "swiper"
import { v4 as uuidv4 } from "uuid"

import { Swiper, SwiperSlide } from "swiper/react"
import { useGetHomePage } from "../../api/getHomePage"
import LoadingSkeleton from "../loading/LoadingSkeleton"
import { LazyLoadImage } from "react-lazy-load-image-component"

const ArtistSpotlight = memo(() => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataNice = data?.data?.items.filter((e) => {
      return e.sectionType === "banner"
   })

   useEffect(() => {
      if (data) {
         setData(dataNice[0].items)
      }
   }, [status])

   const navigationPrevRef = React.useRef(null)
   const navigationNextRef = React.useRef(null)

   return (
      <div className="container_choice">
         <div className="choice_list">
            <Swiper
               modules={[Navigation, Autoplay, Pagination]}
               autoplay={{
                  delay: 3500,
                  disableOnInteraction: false,
               }}
               loop={true}
               spaceBetween={6}
               slidesPerView={7}
               pagination
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
                     spaceBetween: 2,
                     allowTouchMove: true,
                     pagination: {
                        dynamicBullets: true,
                     },
                     navigation: false,
                     autoplay: {
                        delay: 3000,
                        disableOnInteraction: false,
                     },
                  },
                  700: {
                     slidesPerView: 3,
                  },
                  800: {
                     slidesPerView: 4,
                     spaceBetween: 2,
                     allowTouchMove: true,
                  },
                  1220: {
                     slidesPerView: 7,
                  },
               }}
            >
               {datas &&
                  datas.length > 0 &&
                  datas.map((e, index) => {
                     const img = e.banner.slice(e.banner.lastIndexOf("/"))

                     return (
                        <SwiperSlide>
                           <div className="choice_list-item slick-slide slick-cloned slick-active">
                              <a className="choice_list-item-link" href="#">
                                 <LazyLoadImage
                                    src="https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/zma-2021/imgs/duc-phuc.png"
                                    alt=""
                                 />
                              </a>
                           </div>
                        </SwiperSlide>
                     )
                  })}
               {datas && datas.length > 0 && (
                  <>
                     <button
                        ref={navigationPrevRef}
                        type="button"
                        className="choice-btn-left slick-prev slick-arrow"
                        style={{ display: "flex" }}
                     >
                        <span className="material-icons-outlined">arrow_back_ios</span>
                     </button>
                     <button
                        ref={navigationNextRef}
                        type="button"
                        className="choice-btn-right slick-next slick-arrow"
                        style={{ display: "flex" }}
                     >
                        <span className="material-icons-outlined">arrow_forward_ios</span>
                     </button>
                  </>
               )}
            </Swiper>
         </div>
      </div>
   )
})

export default ArtistSpotlight
