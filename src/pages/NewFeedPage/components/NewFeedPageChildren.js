import React from "react"
import { useParams } from "react-router-dom"
import Masonry from "react-masonry-css"
import { useNewFeedInfinite } from "api/useNewFeedData"
import { useInfiniteScroll } from "hook/useInfiniteScroll"
import useMediaQuery from "hook/useMediaQuery"
import ArtistSpotlight from "components/home/ArtistSpotlight"
import LoadingSvg from "components/ui/LoadingSvg"
import FollowItems from "./FollowItems"

const NewFeedPageChildren = () => {
   const { nation, id } = useParams()
   const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useNewFeedInfinite(id)

   const isTablet = useMediaQuery("(max-width: 1400px)")
   const isMobile = useMediaQuery("(max-width: 600px)")
   const columns = isMobile ? 1 : isTablet ? 2 : 3

   const sentinelRef = useInfiniteScroll(fetchNextPage, hasNextPage && !isFetchingNextPage)

   if (isLoading) return <LoadingSvg />

   const feed = data?.pages.flatMap((page) => page.items || []) || []

   return (
      <div className="h-full">
         {nation === "Viet-Nam" && (
            <>
               <ArtistSpotlight />
               <div className="!mb-[40px]" />
            </>
         )}
         <div className="relative ">
            <Masonry
               breakpointCols={columns}
               className="flex w-auto"
               columnClassName="min-w-0 flex-1 bg-clip-padding"
            >
               {feed.map((item) => (
                  <FollowItems key={item.id || item.encodeId} data={item} />
               ))}
            </Masonry>
            <div ref={sentinelRef} />
            <div className="!mt-[40px] " />
            {isFetchingNextPage && <LoadingSvg isLoadMore />}
         </div>
      </div>
   )
}

export default NewFeedPageChildren
