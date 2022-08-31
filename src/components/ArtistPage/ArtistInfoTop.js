import React, { memo, useState } from "react"
import styled from "styled-components"
import NewReleaseitem from "../NewReleaseitem/NewReleaseitem"
import usePortal from "react-cool-portal"

const InfoTopStyles = styled.div`
   /* .content-detail {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      height: auto;
      overflow: hidden !important;
   } */

   .read-more {
      display: inline-block;
      color: var(--text-item-hover);
      font-size: 12px;
      font-weight: 700;
      line-height: 1.92;
      cursor: pointer;
      text-transform: uppercase;
   }
`

const PortalStyle = styled.div`
   .theme-modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 1080;
      display: flex;
      justify-content: center;
      align-items: center;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }

   .top {
      position: relative;
      overflow: hidden;
      border-radius: 8px 8px 0 0;
      .cover-bg {
         background-repeat: no-repeat;
         background-position: 50%;
         background-size: cover;
         background-position-y: 10%;
         -webkit-filter: blur(50px);
         filter: blur(50px);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;

         right: 0;
      }
      .blur-bg {
         opacity: 0.4;
         background-color: var(--primary-bg);
         position: absolute;
         top: 0;
         bottom: 0;
         left: 0;
         background-size: cover;
         right: 0;
      }
      .top-content {
         display: flex;
         flex-direction: column;
         align-items: center;
         padding-top: 24px;
         position: relative;
         background-image: linear-gradient(180deg, hsla(0, 0%, 100%, 0), var(--primary-bg));
      }
      .image {
         width: 110px;
         height: 110px;
         border-radius: 50%;
         overflow: hidden;
         margin-bottom: 12px;
      }
      .title {
         font-size: 24px;
         font-weight: 700;
         margin-bottom: 0;
      }
   }
   .bio-content {
      padding: 24px;

      & > div {
         line-height: 1.43;
         color: var(--text-secondary);
         max-height: 218px;
         padding-bottom: 2rem;
      }
   }
   .close-btn {
      position: absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
   }
`

const ArtistInfoTop = memo(({ data }) => {
   const [care, setCare] = useState(false)
   const { Portal, show, hide } = usePortal({ defaultShow: false })

   const handleClickBackdrop = (e) => {
      const id = e.target.id
      if (id === "theme-overlay" || id === "portal-bio-arits") hide()
   }
   return (
      <InfoTopStyles className="artist_page-title row !flex-wrap mb-[40px]">
         <div className="col l-7 m-7 c-12 artist_page-title-deital">
            <div className="artist_page-title-left artist_page-title-deital">
               <h3 className="artist-name title">{data?.name}</h3>
               <div>
                  {data?.sortBiography.length > 0 && (
                     <>
                        <span className="content-detail" dangerouslySetInnerHTML={{ __html: data?.sortBiography }}></span>

                        <span onClick={() => show()} className="read-more ml-2">
                           ...Xem Thêm
                        </span>
                     </>
                  )}

                  <Portal>
                     <PortalStyle>
                        <div className="zm-portal-modal theme-modal-overlay" id="theme-overlay" onClick={handleClickBackdrop}>
                           <div className="modal p-1 theme-modal  text-white">
                              <div className=" max-w-[480px] relative">
                                 <div className="w-full">
                                    <button
                                       onClick={() => hide()}
                                       id="portal-bio-arits"
                                       className="zm-btn zm-tooltip-btn close-btn is-hover-circle button"
                                       tabIndex="0"
                                    >
                                       <i className="icon ic-close"></i>
                                    </button>
                                    <div className="top">
                                       <div
                                          className="cover-bg"
                                          style={{
                                             backgroundImage: `url("${data?.thumbnailM}")`,
                                          }}
                                       />
                                       <div className="blur-bg" />
                                       <div className="top-content">
                                          <figure className="image is-48x48">
                                             <img src={data?.thumbnailM} alt="" />
                                          </figure>
                                          <h3 className="title">{data?.name}</h3>
                                       </div>
                                    </div>
                                    <div className="bio-content">
                                       <div
                                          dangerouslySetInnerHTML={{ __html: data?.biography }}
                                          className="overflow-y-auto"
                                       ></div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </PortalStyle>
                  </Portal>
               </div>
               <div className="actions mt-[20px] mb-[15px] inline-flex gap-[10px] items-center justify-start">
                  <button className=" zm-btn mar-r-10 is-outlined active is-medium is-upper button" tabIndex="0">
                     <span>Phát nhạc</span>
                  </button>
                  <button
                     onClick={() => setCare((value) => !value)}
                     className={`zm-btn is-outlined ${care ? "" : "active"}  mar-r-15 is-medium is-upper button`}
                     tabIndex="0"
                  >
                     <span>
                        {care ? "ĐÃ QUAN TÂM" : "QUAN TÂM"} •{" "}
                        {data?.follow > 10000 ? data?.follow.toString().slice(0, -3) + "K" : data.follow}
                     </span>
                  </button>
               </div>
               <NewReleaseitem item={data.topAlbum} isArtist></NewReleaseitem>
            </div>
         </div>
         <div className="col l-5 m-5 c-12">
            <div className="artist_page-title-right float-right">
               <figure className="image avatar is-48x48">
                  <img src={data.thumbnailM} alt="" />
               </figure>
            </div>
         </div>
      </InfoTopStyles>
   )
})

export default ArtistInfoTop
