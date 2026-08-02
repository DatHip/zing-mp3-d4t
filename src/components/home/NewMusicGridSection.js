import "swiper/css"

import React, { memo } from "react"
import { Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import { byId, useHomeSection } from "hook/useHomeSection"
import AlbumCard from "components/card/AlbumCard"
import { logError } from "utils/logger"

const NewMusicGridSection = memo(() => {
   const { section, isLoading } = useHomeSection(byId("hAlbum"))
   const datas = section?.items

   if (!section && !isLoading) return null

   try {
      return (
         <div className="release_list !block row mt-[30px]">
            {datas && datas.length > 0 && (
               <Swiper
                  modules={[Autoplay]}
                  autoplay={{
                     delay: 5200,
                     disableOnInteraction: false,
                  }}
                  loop={true}
                  spaceBetween={4}
                  speed={700}
                  allowTouchMove={true}
                  scrollbar={{ draggable: false }}
                  breakpoints={{
                     0: {
                        allowTouchMove: true,
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                     },
                     650: {
                        slidesPerGroup: 4,
                        slidesPerView: 4,
                     },
                     1220: {
                        slidesPerGroup: 5,
                        slidesPerView: 5,
                     },
                  }}
               >
                  {datas &&
                     datas.length > 0 &&
                     datas.map((e, index) => {
                        return (
                           <SwiperSlide key={e.encodeId}>
                              <AlbumCard isSwiper={true} desc={false} artis={true} class1={`col`} item={e}></AlbumCard>
                           </SwiperSlide>
                        )
                     })}
               </Swiper>
            )}
         </div>
      )
   } catch (error) {
      logError("NewMusicGridSection", error)
   }
})

export default NewMusicGridSection
