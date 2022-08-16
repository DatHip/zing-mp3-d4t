import React from "react"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

const HistoryHomePage = () => {
   const item = {
      sortDescription: "Thứ Bảy là phải nhảy theo những track Remix thịnh hành này",
      thumbnailM: "https://photo-resize-zmp3.zmdcdn.me/w320_r1x1_png/cover/f/0/8/f/f08f6d37403389636c560d0df79880b9.png",
      title: "Nhạc Cho Thứ Bảy",
   }

   return (
      <PlayListSelector isHistory title={"Lịch Sử"} all={true}>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-5"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-5"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-5"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-5"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-5"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-2 c-4 m2-6 m2-none"}></CarouselItem>
         <CarouselItem item={item} desc={false} artis={false} class1={"col l-1-4 m-none c-4"}></CarouselItem>
      </PlayListSelector>
   )
}

export default HistoryHomePage
