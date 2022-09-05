import React, { memo, useEffect, useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import { Link } from "react-router-dom"
import { useGetHomePage } from "../../api/getHomePage"
import CharHomeItem from "../Selection/CharHomeItem"

const ChartHomePage = memo(() => {
   const [datas, setData] = useState(null)
   const { data, status } = useGetHomePage()
   const dataSelector = data?.data.items.find((e) => e.sectionType === "RTChart")

   useEffect(() => {
      if (data) {
         setData(dataSelector)
      }
   }, [status])

   const rank1 = datas?.items[0]
   const rank2 = datas?.items[1]
   const rank3 = datas?.items[2]

   const getEnCodeId = (num) => {
      let item = datas?.items[`${num}`]?.encodeId
      return item
   }
   const DataChart0 = datas?.chart?.items[`${getEnCodeId(0)}`]
   const DataChart1 = datas?.chart?.items[`${getEnCodeId(1)}`]
   const DataChart2 = datas?.chart?.items[`${getEnCodeId(2)}`]

   const getdataMax = (e) =>
      Math.max.apply(
         Math,
         e?.map((e) => e.counter)
      )

   const allScore = getdataMax(DataChart0) + getdataMax(DataChart1) + getdataMax(DataChart2)

   const getdataMaxX = (e) => ((getdataMax(e) * 100) / allScore).toFixed() + "%"

   return (
      <div className="container_zing-chart">
         <div className="container_zing-chart-pos">
            <div className="zing-chart_top">
               <div className="zing-chart_top-item">
                  <Link className="cursor-pointer" to={"zing-chart"}>
                     Top Chart
                     <span className="material-icons-round"> play_circle</span>
                  </Link>
               </div>
            </div>
            <div className="row zing-chart_bottom">
               <div className="col l-4 m-12 c-12 order2">
                  <div className="zing-chart_list">
                     {datas &&
                        datas?.items?.map((e, index) => {
                           if (index > 2) return

                           let datasCalc

                           if (index === 0) {
                              datasCalc = DataChart0
                           }

                           if (index === 1) {
                              datasCalc = DataChart1
                           }
                           if (index === 2) {
                              datasCalc = DataChart2
                           }

                           const img = e.thumbnail?.slice(e.thumbnail?.lastIndexOf("/"))

                           return (
                              <div key={e.encodeId} className="zing-chart_item main_page-hover mb-[12px]">
                                 <div className="zing-chart_item-left">
                                    <div className="zing-chart_item-oder">
                                       <span className="zing-chart-top">{index + 1}</span>
                                    </div>
                                    <div className="zing-chart_item-info">
                                       <div className="zing-chart_item-img">
                                          <div className="main-page_list-item_img">
                                             <div className="release_list-item-img">
                                                <LazyLoadImage
                                                   visibleByDefault={e.thumbnail === img}
                                                   src={e.thumbnail}
                                                   alt={e.title}
                                                />
                                             </div>
                                             <div className="recently_list-item_hover">
                                                <div className="recently_btn-hover recently_btn-hover-play">
                                                   <span>
                                                      <i className="icon action-play ic-play !mr-0" />
                                                   </span>
                                                </div>
                                             </div>
                                          </div>
                                       </div>
                                       <div className="zing-chart_item-text">
                                          <div className="zing-chart_item-name">{e.title}</div>
                                          <div className="zing-chart_item-artist">
                                             <>
                                                {e.artists &&
                                                   e.artists?.slice(0, 3)?.map((a, index) => {
                                                      let prara = ", "

                                                      if (index === 2) {
                                                         prara = "..."
                                                      }

                                                      if (e.artists?.length === 1) {
                                                         prara = ""
                                                      }
                                                      if (e.artists?.length === 2 && index === 1) {
                                                         prara = ""
                                                      }
                                                      if (e.artists?.length === 3 && index === 2) {
                                                         prara = ""
                                                      }

                                                      return (
                                                         <span key={index}>
                                                            <Link to={"/"}>{a.name}</Link>
                                                            {prara}
                                                         </span>
                                                      )
                                                   })}
                                             </>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="zing-chart_item-right">
                                    <p>{getdataMaxX(datasCalc)}</p>
                                 </div>
                              </div>
                           )
                        })}

                     <div className="zing-chart_item-bottom">
                        <Link to={"zing-chart"} className="zing-chart_btn">
                           Xem Thêm
                        </Link>
                     </div>
                  </div>
               </div>
               <div className="col l-8 m-12 c-12">
                  <div className="zing-chart_right">
                     <div className="zing-chart_right-top">
                        <div className="zing-chart_right-top_item">
                           <div className="zing-chart_right-top_box" />
                           <p>{rank1?.title}</p>
                        </div>
                        <div className="zing-chart_right-top_item">
                           <div className="zing-chart_right-top_box" />
                           <p>{rank2?.title}</p>
                        </div>
                        <div className="zing-chart_right-top_item">
                           <div className="zing-chart_right-top_box" />
                           <p>{rank3?.title}</p>
                        </div>
                     </div>
                     <CharHomeItem id="myChart"></CharHomeItem>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
})

export default ChartHomePage
