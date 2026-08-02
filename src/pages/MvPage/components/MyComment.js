import React, { memo } from "react"
import { CommentStyles } from "./MyComment.styles"


const MyComment = memo(() => {
   return (
      <CommentStyles>
         <div className="feed-header mb-[10px]">
            <div className="media flex items-start justify-start">
               <div className="media-left mr-[10px] ">
                  <figure className="image w-[25px] h-[25px] !rounded-full overflow-hidden">
                     <img src="https://s120-ava-talk.zadn.vn/a/0/e/b/0/120/ffc5cc66d359a7b40c66def5dfa64ec1.jpg" alt="" />
                  </figure>
               </div>
               <div className="flex flex-col">
                  <h3 className="mar-b-0 title leading-none mb-2">
                     <span className=" font-bold">Ahihi</span>
                     <span>&nbsp;&nbsp;•&nbsp;&nbsp;</span>
                     <span className="subtitle">3 ngày trước</span>
                  </h3>
                  <p className="text-[14px]">Liếc Mắt Kìa</p>
               </div>
            </div>
            <div className="reactions">
               <div className="item z-btn">
                  <i className="icon ic-like-other" />
                  <span>0</span>
               </div>
               <div className="item z-btn">
                  <i className="icon ic-dislike" />
                  <span>0</span>
               </div>
            </div>
            <div className="comment-reply-list-wrapper" />
         </div>
      </CommentStyles>
   )
})

export default MyComment
