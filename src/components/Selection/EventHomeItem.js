import React, { memo } from "react"
import { useState } from "react"
import { LazyLoadImage } from "react-lazy-load-image-component"
import styled from "styled-components"

const EventStyle = styled.div`
   .favorite_content-name {
      white-space: nowrap;
      font-size: 18px !important;
      font-weight: 700 !important;
      margin-top: 4px !important;
      margin-bottom: 2px !important;
   }
   .favorite_content-list {
      font-size: 14px;
      font-weight: 500;
      color: var(--white);
      white-space: nowrap;
   }
   .tag {
      display: inline-block;
      font-size: 12px;
      padding: 2px 4px;
      border-radius: 2px;
      color: #ff0101;
      background-color: #fff;
      text-transform: uppercase;
   }
   .avatars-item {
      width: 15px;
      line-height: 0;
   }
   .avatars-item-img {
      border-radius: 999px;
      overflow: hidden;
      height: 20px;
      width: 20px;
      border: 2px solid var(--primary-bg);
   }
   .right-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      padding: 9px 20px;
      background-color: var(--purple-primary);
      border-color: var(--purple-primary);
      color: var(--white);
      font-size: 14px;
      text-transform: uppercase;
      border: 1px solid var(--border-primary);
      transition: width 0.2s linear;
      &.is-active {
         background-color: transparent;
         border-color: var(--border-primary);
         color: var(--text-primary);
      }
   }
   .avatars {
      display: flex;
      justify-content: flex-start;
   }
   .left-title {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 4px;
      color: var(--text-primary);
   }
   .text-item {
      font-size: 14px;
      margin-left: 8px;
      color: var(--text-secondary);
   }
`

const EventHomeItem = memo(({ item, className = "" }) => {
   const [isActive, setActice] = useState(false)

   const { coverH, title, startTime, followers, label, subscribeText, unsubscribeText, totalFollow } = item

   function checkTime(i) {
      if (i < 10) {
         i = "0" + i
      }
      return i
   }

   // Lịch
   var datetime = startTime * 1000
   var date = new Date(datetime)
   var options = {
      weekday: "long",
      month: "long",
      day: "numeric",
   }
   var result = date.toLocaleDateString("vn", options)

   // Lất Giờ
   var h = date.getHours()
   var m = date.getMinutes()
   h = checkTime(h)
   m = checkTime(m)
   let time = h + ":" + m

   let praraTitle
   if (label === "Minigame") {
      praraTitle = "đặt lịch"
   }

   if (label === "Sinh Nhật Sao") {
      praraTitle = "chúc mừng"
   }

   if (label === "Phát Hành Bài Hát" || label === "Phát Hành Album") {
      praraTitle = "quan tâm"
   }

   return (
      <EventStyle className={`favorite_list-item ${className}`}>
         <a className="main-page_list-item main_page-hover" href="#">
            <div className="main-page_list-item_img">
               <img src={coverH} alt={title} />
            </div>
            <div className="favorite_content">
               <div className="tag">{label}</div>
               <p className="favorite_content-name">{title}</p>
               <div className="favorite_content-list">
                  {time} {result}
               </div>
            </div>
            <div className="main_blur-bg" />
         </a>
         <div className="flex justify-between items-center mt-3">
            <div className="left">
               <p className="left-title">Lượt {praraTitle}</p>
               <div className="avatars">
                  {followers &&
                     followers.length > 0 &&
                     followers.map((e) => {
                        return (
                           <div key={e.id} className="avatars-item">
                              <div className="avatars-item-img">
                                 <LazyLoadImage height={190} src={e.avatar} alt="" />
                              </div>
                           </div>
                        )
                     })}
                  <div className="text-item">+{totalFollow}</div>
               </div>
            </div>
            <div className="right">
               <button
                  type="button"
                  onClick={() => setActice((value) => !value)}
                  className={`right-btn rounded-full transition-all hover:opacity-70 ${isActive ? "is-active" : ""}`}
               >
                  {!isActive ? subscribeText : unsubscribeText}
               </button>
            </div>
         </div>
      </EventStyle>
   )
})

export default EventHomeItem
