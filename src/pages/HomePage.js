import React, { memo } from "react"
import { motion } from "framer-motion"
import SliderHomePage from "../components/SliderHome/SliderHomePage"
import HistoryHomePage from "../components/HomePage/HistoryHomePage"
import WantToHearHomePage from "../components/SliderHome/WantToHearHomePage"
import NewReleaseHomePage from "../components/SliderHome/NewReleaseHomePage"
import NewMusicEveryDayHomePage from "../components/SliderHome/NewMusicEveryDayHomePage"
import Top100HomePage from "../components/SliderHome/Top100HomePage"
import XoneCornerHomePage from "../components/SliderHome/XoneCornerHomePage"
import FavoriteArtistHomePapge from "../components/SliderHome/FavoriteArtistHomePapge"
import WeekChartHomePage from "../components/SliderHome/WeekChartHomePage"
import ArtistSpotlight from "../components/SliderHome/ArtistSpotlight"

const HomePage = () => {
   return (
      <motion.div
         className="h-full w-full !pt-0 "
         // initial={{ y: "100%", opacity: 0.3 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: "-100%", opacity: 0.3 }}
         transition={{ duration: 0.2 }}
      >
         {/* Thanh Slider */}
         <SliderHomePage></SliderHomePage>
         {/* History */}
         <HistoryHomePage></HistoryHomePage>
         {/* Because You Want To Hear || Lựa Chọn Hôm Nay */}
         <WantToHearHomePage></WantToHearHomePage>
         {/* New release  */}
         <NewReleaseHomePage></NewReleaseHomePage>
         {/* Nghệ Sĩ Yêu Thích  */}
         <FavoriteArtistHomePapge></FavoriteArtistHomePapge>
         {/* weekChart */}
         <WeekChartHomePage></WeekChartHomePage>
         {/* ArtistSpotlight */}
         <ArtistSpotlight></ArtistSpotlight>
         {/* Nhạc Mới Mỗi Ngày  */}
         <NewMusicEveryDayHomePage></NewMusicEveryDayHomePage>
         {/* Top100 */}
         <Top100HomePage></Top100HomePage>
         {/* XONE's CORNER */}
         <XoneCornerHomePage></XoneCornerHomePage>
      </motion.div>
   )
}

export default memo(HomePage)

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React from "react"
// // import ReactDOM from "react-dom/client"
// import axios from "axios"
// import { useQuery, useQueryClient } from "@tanstack/react-query"

// function usePosts() {
//    return useQuery(["posts"], async () => {
//       const { data } = await axios.get("https://jsonplaceholder.typicode.com/posts")
//       return data
//    })
// }

// function Posts({ setPostId }) {
//    const queryClient = useQueryClient()
//    const { status, data, error, isFetching } = usePosts()

//    return (
//       <div>
//          <h1>Posts</h1>
//          <div>
//             {status === "loading" ? (
//                "Loading..."
//             ) : status === "error" ? (
//                <span>Error: {error.message}</span>
//             ) : (
//                <>
//                   <div>
//                      {data.map((post) => (
//                         <p key={post.id}>
//                            <a
//                               onClick={() => setPostId(post.id)}
//                               href="#"
//                               style={
//                                  // We can access the query data here to show bold links for
//                                  // ones that are cached
//                                  queryClient.getQueryData(["post", post.id])
//                                     ? {
//                                          fontWeight: "bold",
//                                          color: "green",
//                                       }
//                                     : {}
//                               }
//                            >
//                               {post.title}
//                            </a>
//                         </p>
//                      ))}
//                   </div>
//                   <div>{isFetching ? "Background Updating..." : " "}</div>
//                </>
//             )}
//          </div>
//       </div>
//    )
// }

// const getPostById = async (id) => {
//    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
//    return data
// }

// function usePost(postId) {
//    return useQuery(["post", postId], () => getPostById(postId), {
//       enabled: !!postId,
//    })
// }

// function Post({ postId, setPostId }) {
//    const { status, data, error, isFetching } = usePost(postId)

//    return (
//       <div>
//          <div>
//             <a onClick={() => setPostId(-1)} href="#">
//                Back
//             </a>
//          </div>
//          {!postId || status === "loading" ? (
//             "Loading..."
//          ) : status === "error" ? (
//             <span>Error: {error.message}</span>
//          ) : (
//             <>
//                <h1>{data.title}</h1>
//                <div>
//                   <p>{data.body}</p>
//                </div>
//                <div>{isFetching ? "Background Updating..." : " "}</div>
//             </>
//          )}
//       </div>
//    )
// }

// const HomePage = () => {
//    const [postId, setPostId] = React.useState(-1)

//    return (
//       <div>
//          <p>
//             As you visit the posts below, you will notice them in a loading state the first time you load them. However, after you
//             return to this list and click on any posts you have already visited again, you will see them load instantly and
//             background refresh right before your eyes!{" "}
//             <strong>(You may need to throttle your network speed to simulate longer loading sequences)</strong>
//          </p>
//          {postId > -1 ? <Post postId={postId} setPostId={setPostId} /> : <Posts setPostId={setPostId} />}
//       </div>
//    )
// }

// export default HomePage
