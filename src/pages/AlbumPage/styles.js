import styled from "styled-components"

export const AlbumPageStyles = styled.div`
   @media (max-width: 600px) {
      .playlist-header {
         flex-wrap: wrap;
         gap: 16px;
         .media-left,
         .media-content {
            width: 100%;
         }
         .media-content {
            margin-bottom: 10px;
         }
      }
   }
   .zing-chart_item.none-hover {
      &:hover {
         background-color: unset !important;
      }
   }
   .column-text {
      font-size: 12px !important;
      font-weight: 500;
      text-transform: uppercase;
      color: var(--text-secondary);
   }
   .bottom-info {
      font-size: 12px;
   }
   .subtitle {
      color: var(--text-secondary);
   }

   .clearfix:after {
      display: block;
      clear: both;
      content: "";
   }
   .zing-chart_list .main-page_list-item_img {
      width: 40px !important;
   }

   .description span {
      color: var(--text-secondary);
   }

   .media_right {
      display: flex;
      margin-top: 1rem;
      align-items: center;
      justify-content: center;
      gap: 10px;

      i {
         font-size: 16px;
         padding: 5px;
         border-radius: 50%;
         margin-right: 0;
      }

      div {
         display: flex;
         justify-content: center;
         align-items: center;
         font-size: 18px;
         border-radius: 999px;
         line-height: normal;
         border: 0;
         display: inline-block;
         font-weight: 400;
         text-align: center;
         cursor: pointer;
         margin: 0 2px;
         border: none;
         color: var(--player-text);
         padding: 6px;
      }
   }

   .playlist-header .media-content .content-top {
      width: 100%;
   }
   .playlist-header .media-content {
      display: flex;
      flex-direction: column;
      align-self: normal;
      justify-content: space-between;
      align-items: flex-start;
   }
   .media-content {
      flex-basis: auto;
      flex-grow: 1;
      flex-shrink: 1;
      text-align: left;
      align-self: center;
      width: 0;
   }

   .playlist-header .media-left {
      margin-right: 20px;
      flex-basis: auto;
      flex-grow: 0;
      flex-shrink: 0;
   }

   .playlist-header {
      padding: 0 0 30px;
   }
   .media {
      align-items: center;
      display: flex;
      text-align: left;
      padding: 10px;
      border-radius: 5px;
      -webkit-user-select: none;
      -ms-user-select: none;
      user-select: none;
   }
   .playlist-header .media-content .content-top .artists,
   .playlist-header .media-content .content-top .created-by,
   .playlist-header .media-content .content-top .like,
   .playlist-header .media-content .content-top .release {
      color: var(--text-secondary);
      font-size: 12px;
      line-height: 1.75;
   }

   .content-top .title {
      font-size: 20px;
      font-weight: 700;
      line-height: 1.5;
      margin-bottom: 0;
      text-transform: none;
   }

   .is-ghost:hover {
      text-decoration: underline;
   }

   @media screen and (min-width: 1200px) {
      .playlist-header.sticky {
         position: -webkit-sticky;
         position: sticky;
         top: 10px;
      }
      .playlist-header {
         display: block;
         width: 300px;
         float: left;
      }
      .playlist-header .media-left {
         margin-right: 0;
      }
      .playlist-header .media-content {
         display: flex;
         align-items: center;
         margin-top: 12px;
         width: 100%;
      }
      .content-top {
         text-align: center;
      }

      .playlist-detail-container .playlist-content {
         margin-left: 330px;
      }

      .media-content .actions {
         flex-direction: column;
         margin-top: 16px;
      }
      .content-top .title {
         white-space: normal;
      }
   }
`
