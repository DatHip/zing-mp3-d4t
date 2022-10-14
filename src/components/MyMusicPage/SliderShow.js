import React, { memo, useEffect } from "react"
import { useCallback } from "react"

const SliderShow = memo(({ data }) => {
   const datas = data.items || data

   let imgIndex = 2
   const slideShow = useCallback(() => {
      const slideImgs = document?.querySelectorAll(".container__slide-item")
      const slideImgFirst = document.querySelector(".container__slide-item.first")
      const slideImgSecond = document.querySelector(".container__slide-item.second")
      const slideImgThird = slideImgs[imgIndex]
      const slideImgFourth = slideImgs[imgIndex === slideImgs.length - 1 ? 0 : imgIndex + 1]

      slideImgFirst?.classList.replace("first", "fourth")
      slideImgFourth?.classList.replace("fourth", "third")
      slideImgThird?.classList.replace("third", "second")
      slideImgSecond?.classList.replace("second", "first")

      imgIndex++
      if (imgIndex >= slideImgs.length) {
         imgIndex = 0
      }
      setTimeout(slideShow, 2300)
   }, [])

   useEffect(() => {
      imgIndex = 2
      const slideImgs = document?.querySelectorAll(".container__slide-item")
      if (!slideImgs) return
      slideShow()
   }, [datas])

   return (
      <div className="container__slide">
         <div className="container__slide-show">
            {datas &&
               datas.length > 0 &&
               datas.map((e, index) => {
                  let classGird = "fourth"
                  if (index === 0) {
                     classGird = "first"
                  }
                  if (index === 1) {
                     classGird = "second"
                  }
                  if (index === 2) {
                     classGird = "third"
                  }

                  return (
                     <div key={e.encodeId} className={`container__slide-item ${classGird}`}>
                        <div
                           style={{
                              background: `url('${e.thumbnailM || e.thumbnail}') no-repeat center center / cover`,
                           }}
                           className="container__slide-img"
                        />
                     </div>
                  )
               })}
         </div>
      </div>
   )
})

export default SliderShow
