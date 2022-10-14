import React, { memo } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { fetchPlayList } from "../../features/QueueFeatures/QueueFeatures"
import { setPlay, setReady } from "../../features/SettingPlay/settingPlay"
import useLikeHook from "../../hook/useLikeHook"

const ItemAritsStyles = styled.div`
   .main-page_list-item_img {
      img {
         border-radius: 999rem;
         border: 2px solid #333;
      }
   }

   .is-mvpage.zm-btn {
      height: 38px;
      width: 38px;
      background: #fff;
      color: #000;
      position: absolute;
      top: 85.3%;
      left: 85.3%;
      transform: translate(-60%, -60%);
      box-shadow: 0 1.22656px 4.90625px rgb(0 0 0 / 16%);
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      &:hover {
         -webkit-filter: brightness(0.9);
         filter: brightness(0.9);
      }
   }
   .title {
      font-size: 14px;
      font-weight: 500;
      line-height: 1.36;
      color: var(--text-primary);
      overflow: hidden;
      text-overflow: ellipsis;
      text-transform: capitalize;
      display: block;
      &:hover {
         text-decoration: underline;
      }
   }

   .subtitle {
      font-size: 12px;
      font-weight: 400;
      line-height: 1.33;
      color: var(--text-secondary);
   }
   .item-mvArits-footer {
      .play-btn {
         background-color: transparent;
         font-size: 12px;
         padding: 4px 14px;
      }
   }
   .mvpage-link-arlit {
      border: 1px solid var(--border-primary);
      border-radius: 50%;
      position: relative;
      i {
         width: 40px;
         height: 40px;
         margin-right: 0;
         position: absolute;
         top: 52%;
         left: 50%;
         font-size: 40px;
         transform: translate(-50%, -50%);
      }
   }

   .item-myArits-last:hover {
      i,
      a {
         color: var(--link-text-hover);
      }
   }
   .play-btn:hover {
      border-color: var(--link-text-hover);
      color: var(--link-text-hover);
      transition: 0.1s;
   }
`

const ItemArits = memo(({ classGird, data, noneFooter, isLinkToAll }) => {
   const navigate = useNavigate()
   const dispatch = useDispatch()

   const { isLike, handleLike } = useLikeHook(data, 3)

   return (
      <ItemAritsStyles className={`mvpage-item-arits  ${classGird}`}>
         <div
            className={`relative want_list-item-link  cursor-pointer main-page_list-item main_page-hover ${
               isLinkToAll ? "item-myArits-last" : ""
            }`}
         >
            {isLinkToAll ? (
               <Link to="/mymusic/nghe-si" className="flex w-full h-full mvpage-link-arlit items-center justify-center pb-[100%]">
                  <i className="icon ic-16-Arrow-Next-1"></i>
               </Link>
            ) : (
               <div
                  onClick={() => {
                     navigate(`/nghe-si/${data.alias}`)
                  }}
                  className="want_list-item-link shadow main-page_list-item_img !rounded-full "
               >
                  <figure>
                     <img src={data.thumbnailM || data.thumbnail} alt="" />
                  </figure>
               </div>
            )}
            {!isLinkToAll && (
               <button
                  onClick={async () => {
                     if (!data.playlistId) return

                     dispatch(setReady(false))
                     dispatch(setPlay(false))
                     await dispatch(fetchPlayList(data.playlistId))
                     dispatch(setPlay(true))
                  }}
                  className="zm-btn is-mvpage button"
                  tabIndex="0"
               >
                  <i className="icon ic-shuffle"></i>
               </button>
            )}
         </div>
         <div className="zm-card-content flex flex-col items-center mt-[12px]">
            <div className="title mb-[4px]">
               {isLinkToAll ? (
                  <Link to="/mymusic/nghe-si" className="is-ghost">
                     Xem Tất Cả
                  </Link>
               ) : (
                  <Link to={`/nghe-si/${data.alias}`} className="is-ghost">
                     {data?.name}
                  </Link>
               )}
            </div>
            {!noneFooter && (
               <>
                  <div className="subtitle">
                     <span className="followers">
                        {data?.totalFollow > 1000000
                           ? data?.totalFollow.toString().slice(0, -6) + "M"
                           : data?.totalFollow > 10000
                           ? data?.totalFollow.toString().slice(0, -3) + "K"
                           : data.totalFollow}{" "}
                        quan tâm
                     </span>
                  </div>
                  <div className="item-mvArits-footer mt-[10px]">
                     {!isLike && (
                        <button
                           onClick={handleLike}
                           className="zm-btn is-outlined mt-[12px] mb-[15px] !flex items-center justify-center  play-btn button"
                           tabIndex="0"
                        >
                           <i className="icon ic-addfriend"></i>
                           <span>Quan Tâm</span>
                        </button>
                     )}

                     {isLike && (
                        <button
                           onClick={async () => {
                              if (!data.playlistId) return

                              dispatch(setReady(false))
                              dispatch(setPlay(false))
                              await dispatch(fetchPlayList(data.playlistId))
                              dispatch(setPlay(true))
                           }}
                           className="zm-btn is-outlined mt-[12px] mb-[15px] !flex items-center justify-center  play-btn button"
                           tabIndex="0"
                        >
                           <i className="icon ic-20-Shuffle"></i>
                           <span>GÓC NHẠC</span>
                        </button>
                     )}
                  </div>
               </>
            )}
         </div>
      </ItemAritsStyles>
   )
})

export default ItemArits
