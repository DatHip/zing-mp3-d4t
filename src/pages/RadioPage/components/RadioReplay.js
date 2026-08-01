import React from "react"
import PodcastRadio from "./PodcastRadio"

const RadioReplay = ({ data }) => {
   return (
      <>
         {data?.map((e) => {
            return <PodcastRadio data={e} key={e.id || e.encodeId}></PodcastRadio>
         })}
      </>
   )
}

export default RadioReplay
