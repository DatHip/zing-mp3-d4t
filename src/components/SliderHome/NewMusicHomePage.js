import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React, { memo, useEffect, useState } from "react"
import { Navigation, Autoplay, Pagination } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetHomePage } from "../../api/getHomePage"
import PlayListSelector from "../Selection/PlayListSelector"

import { Link } from "react-router-dom"

const NewMusicHomePage = memo(() => {
   const { data, status } = useGetHomePage()
   const [datas, setData] = useState(null)

   const dataSelector = data?.data.items.find((e) => e.title === "Nhạc mới")

   useEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
   }, [status])

   const navigationPrevRef = React.useRef(null)
   const navigationNextRef = React.useRef(null)

   try {
      return (
         <PlayListSelector classAdd={`container_release`} title={dataSelector?.title} all={true}>
            <div className="release_list">
               {datas && datas.length > 0 && (
                  <Swiper
                     modules={[Navigation, Autoplay, Pagination]}
                     autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                     }}
                     loop={true}
                     slidesPerView={3}
                     slidesPerGroup={1}
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
                        100: {
                           slidesPerView: 1,
                           allowTouchMove: true,
                        },
                        650: {
                           allowTouchMove: true,
                           slidesPerView: 2,
                           slidesPerGroup: 2,
                        },
                        1220: {
                           slidesPerView: 3,
                           slidesPerGroup: 3,
                        },
                     }}
                  >
                     {datas.map((e, index) => {
                        const { title, encodeId, artists, thumbnailM, album } = e

                        return (
                           <SwiperSlide key={encodeId}>
                              <div className="release_list-item">
                                 <div className="release_list-item-left main-page_list-item_img main_page-hover">
                                    <div className="release_list-item-img">
                                       <img src={thumbnailM} alt={title} />
                                    </div>
                                    <div className="recently_list-item_hover">
                                       <div className="recently_btn-hover recently_btn-hover-play">
                                          <span>
                                             <ion-icon class="icon_play-btn" name="play-circle-outline"></ion-icon>
                                          </span>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="release_list-item-right">
                                    <div className="release_list-item-right-top">
                                       <div className="main_title-text">{title}</div>
                                       <div className="main_subtitle">
                                          {artists &&
                                             artists?.slice(0, 3)?.map((e, index) => {
                                                let prara = ", "

                                                if (index === 2) {
                                                   prara = "..."
                                                }

                                                if (artists.length === 1) {
                                                   prara = ""
                                                }
                                                if (artists.length === 2 && index === 1) {
                                                   prara = ""
                                                }
                                                if (artists.length === 3 && index === 2) {
                                                   prara = ""
                                                }
                                                return (
                                                   <span key={index}>
                                                      <Link to={"/"}>{e.name}</Link>
                                                      {prara}
                                                   </span>
                                                )
                                             })}
                                       </div>
                                    </div>
                                    <div className="release_list-item-right-bottom">
                                       <div className="release_list-item-chart">#{index + 1}</div>
                                       <div className="release_list-item-date">{album?.releaseDate}</div>
                                    </div>
                                 </div>
                              </div>
                           </SwiperSlide>
                        )
                     })}

                     <>
                        <button ref={navigationPrevRef} type="button" className="release-btn-left slick-prev slick-arrow">
                           <span span="" className="material-icons-outlined">
                              arrow_back_ios
                           </span>
                        </button>
                        <button ref={navigationNextRef} type="button" className="release-btn-right slick-next slick-arrow">
                           <span className="material-icons-outlined">arrow_forward_ios</span>
                        </button>
                     </>
                  </Swiper>
               )}
            </div>
         </PlayListSelector>
      )
   } catch (error) {
      console.log(error)
   }
})

export default NewMusicHomePage
