import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { getHubHome } from "../api/getHubHome"
import GenreHub from "../components/HubPage/GenreHub"
import MoodHub from "../components/HubPage/MoodHub"
import NationsHub from "../components/HubPage/NationsHub"
import LoadingSvg from "../components/loading/LoadingSvg"

const HubStyles = styled.div`
   width: 100%;
   border-radius: 4px;
   position: relative;
   overflow: hidden;
   color: var(--text-primary);
`

const HubPage = () => {
   const [datas, setData] = useState([])
   const { data, status } = getHubHome()

   useEffect(() => {
      if (data) {
         setData(data.data)
      }
   }, [status])

   const selectoMood = datas?.topic
   const selectoNation = datas?.nations
   const selectoGenre = datas?.genre

   if (datas.length === 0) return <LoadingSvg></LoadingSvg>

   return (
      <HubStyles className="text-white transition-all">
         <div>
            <figure className="image banner-image is-48x48">
               <img src={datas?.banners[0].cover} alt="" />
            </figure>
         </div>
         {/* Tâm trạng và Hành Động */}
         <MoodHub data={selectoMood}></MoodHub>
         {/* Quốc gia  */}
         <NationsHub data={selectoNation}></NationsHub>
         {/* Genre */}
         <GenreHub data={selectoGenre}></GenreHub>
      </HubStyles>
   )
}

export default HubPage
