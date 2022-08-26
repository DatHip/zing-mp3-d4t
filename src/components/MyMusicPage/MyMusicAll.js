import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useGetHomeChart } from "../../api/getHomeChart"
import CarouselItem from "../Selection/CarouselItem"
import PlayListSelector from "../Selection/PlayListSelector"
import ItemChartList from "../TopChartPage/ItemChartList"

const MyMusicAll = () => {
   const [datas, setData] = useState([])

   const { data, status } = useGetHomeChart()
   useEffect(() => {
      if (data) {
         setData(data.data.RTChart.items.slice(0, 30))
      }
   }, [status])

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
            <div className="main_topchart mt-2">
               <div className="container_zing-chart">
                  <div className="max-h-[300px] overflow-y-auto zing-chart_list pt-2">
                     {datas &&
                        datas.length > 0 &&
                        datas.map((e, index) => {
                           return <ItemChartList onFavourite isNoneRank item={e} index={index} key={e.encodeId}></ItemChartList>
                        })}
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
         <PlayListSelector
            isMyPage={
               <div className="flex items-center justify-center gap-[10px]">
                  <Link to="/mymusic/playlist" className="personal_play-all">
                     Tất Cả <span className="material-icons-outlined ml-[2px]">chevron_right</span>
                  </Link>
               </div>
            }
            title={"Nghệ Sĩ"}
         ></PlayListSelector>
      </>
   )
}

export default MyMusicAll
