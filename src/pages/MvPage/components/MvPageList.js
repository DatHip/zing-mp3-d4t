import React, { memo } from "react"
import { useParams } from "react-router-dom"
import { useListMvInfinite } from "api/useMvData"
import { useInfiniteScroll } from "hook/useInfiniteScroll"
import MvCard from "components/card/MvCard"
import DropDownMv from "./DropDownMv"
import LoadingSvg from "components/ui/LoadingSvg"

const MvPageList = () => {
   const { id } = useParams()
   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useListMvInfinite(id)

   const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage)

   if (isLoading) return <LoadingSvg />

   const videos = data?.pages.flatMap((page) => page.items || []) || []

   return (
      <div className="">
         <DropDownMv />

         <div className="container_top100-list row transition-all">
            {videos.map((video) => (
               <MvCard key={video.encodeId || video.id} data={video} />
            ))}
         </div>
         <div ref={sentinelRef} className="mt-[30px] " />
         {isFetchingNextPage && <LoadingSvg isLoadMore />}
      </div>
   )
}

export default memo(MvPageList)
