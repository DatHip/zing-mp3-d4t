import React from "react"
import PodcastRadio from "./PodcastRadio"
import { v4 as uuidv4 } from "uuid"

const RadReplayRadio = ({ data }) => {
   return (
      <>
         {data?.map((e) => {
            return <PodcastRadio data={e} key={uuidv4()}></PodcastRadio>
         })}
      </>
   )
}

export default RadReplayRadio
