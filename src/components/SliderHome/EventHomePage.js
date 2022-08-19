import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import React, { memo, useEffect, useState } from "react"
import { Navigation, Pagination } from "swiper"
import { v4 as uuidv4 } from "uuid"
import { Swiper, SwiperSlide } from "swiper/react"
import { useGetHomePage } from "../../api/getHomePage"
import EventHomeItem from "../Selection/EventHomeItem"
import PlayListSelector from "../Selection/PlayListSelector"

const EventHomePage = memo(() => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()

   const dataSelector = data?.data.items.find((e) => e.title === "Sự kiện")

   useEffect(() => {
      if (data) {
         setData(dataSelector.items)
      }
   }, [status])

   const navigationPrevRef = React.useRef(null)
   const navigationNextRef = React.useRef(null)

   try {
      return (
         <PlayListSelector
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
            title={dataSelector?.title}
         >
            {datas && datas.length > 0 && (
               <Swiper
                  modules={[Navigation, Pagination]}
                  loop={false}
                  slidesPerView={3}
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
                     1024: {
                        slidesPerView: 3,
                        allowTouchMove: false,
                        slidesPerGroup: 3,
                     },
                  }}
               >
                  {datas &&
                     datas.length > 0 &&
                     datas.map((e, index) => {
                        return (
                           <SwiperSlide key={uuidv4()}>
                              <EventHomeItem className="col" key={index} item={e}></EventHomeItem>
                           </SwiperSlide>
                        )
                     })}
               </Swiper>
            )}
         </PlayListSelector>
      )
   } catch (error) {
      console.log(error)
   }
})

export default EventHomePage
