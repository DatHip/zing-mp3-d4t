import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { EffectFade, Navigation, Pagination, Autoplay } from "swiper"
import { imgBgViewFull } from "../../data/dataBgImgFull"
import { v4 as uuidv4 } from "uuid"
// Import Swiper styles
import "swiper/css"
import "swiper/css/effect-fade"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { memo } from "react"

const BgSwiperFull = () => {
   return (
      <div className="image-effect ">
         <Swiper
            effect={"fade"}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            autoplay={{
               delay: 8800,
               disableOnInteraction: false,
            }}
            className="mySwiper"
            loop={true}
            speed={1200}
         >
            {imgBgViewFull &&
               imgBgViewFull.map((e) => (
                  <SwiperSlide key={uuidv4()}>
                     <li>
                        <img src={e} alt="bgc"></img>
                     </li>
                  </SwiperSlide>
               ))}
         </Swiper>
      </div>
   )
}

export default memo(BgSwiperFull)
