import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGetHomeChart } from "../../api/getHomeChart"
import LoadingSvg from "../loading/LoadingSvg"

import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"

import ItemChartList from "../TopChartPage/ItemChartList"
import ItemArits from "./ItemArits"
import SliderShow from "./SliderShow"

const MyMusicAll = () => {
   const [datas, setData] = useState([])

   const { data, status } = useGetHomeChart()
   useEffect(() => {
      if (data) {
         setData(data.data.RTChart.items.slice(0, 30))
      }
   }, [status])

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <>
         <PlayListSelector
            classAdd="mb-[36px]"
            notRow
            classAdd2="w-full"
            isMyPage={
               <div className="flex items-center justify-center gap-[10px]">
                  <button className="personal_play-all">
                     Phát Tất Cả
                     <span className="material-icons">play_arrow</span>
                  </button>
                  <Link to="/mymusic/song" className="personal_play-all">
                     Tất Cả <span className="material-icons-outlined ml-[2px]">chevron_right</span>
                  </Link>
               </div>
            }
            title={"Bài Hát"}
         >
            <div className="flex items-center justify-between">
               <div>
                  <SliderShow data={data?.data?.RTChart}></SliderShow>
               </div>
               <div className="main_topchart mt-2 flex-1">
                  <div className="container_zing-chart">
                     <div className="max-h-[280px] overflow-y-auto zing-chart_list pt-2">
                        {datas &&
                           datas.length > 0 &&
                           datas.map((e, index) => {
                              return (
                                 <ItemChartList onFavourite isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                              )
                           })}
                     </div>
                  </div>
               </div>
            </div>
         </PlayListSelector>

         <PlayListSelector
            isMyPage={
               <div className="flex items-center justify-center gap-[10px]">
                  <Link to="/mymusic/playlist" className="personal_play-all">
                     Tất Cả <span className="material-icons-outlined ml-[2px]">chevron_right</span>
                  </Link>
               </div>
            }
            title={"PlayList"}
         >
            {datas?.slice(0, 5).map((e, index) => {
               if (index > 4) return
               let classGird = "col l-2-4 m-3 c-5"
               if (index === 4) {
                  classGird = "col l-2-4 m-0 c-5"
               }

               return (
                  <CarouselItem
                     isSwiper={true}
                     key={e.encodeId}
                     artis={true}
                     desc={false}
                     class1={classGird}
                     item={e}
                  ></CarouselItem>
               )
            })}
         </PlayListSelector>

         <PlayListSelector all={false} classAdd={"container_radio "} classAdd2={"mb-[10px]"} title={"Nghệ Sĩ"}>
            {datas &&
               datas.length > 0 &&
               datas.map((e, index) => {
                  if (index > 6) {
                     // eslint-disable-next-line array-callback-return
                     return
                  }

                  let isLinkToAll
                  let classGird = "col l-1-4 m-2 c-5 m2-6 m2-5"
                  if (index === 4) {
                     classGird = "col l-1-4 m-2 c-5 m2-6 m2-none"
                  }
                  if (index === 5) {
                     classGird = "col l-1-4 m-none c-5"
                  }

                  if (index === 6) {
                     isLinkToAll = true
                  }

                  return (
                     <ItemArits isLinkToAll={isLinkToAll} noneFooter classGird={classGird} key={e.encodeId} data={e}></ItemArits>
                  )
               })}
         </PlayListSelector>
      </>
   )
}

export default MyMusicAll
