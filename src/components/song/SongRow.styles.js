import styled from "styled-components";

export const SongRowStyles = styled.div`
   &.active {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }
   &.active-album {
      background: var(--alpha-bg);
      transition: 0.2s;
      .player_queue-item-right {
         display: flex !important;
      }
      .player_queue-img-hover {
         visibility: visible !important;
      }
   }

   &.is-artist {
      &:hover {
         background: unset;
         transition: unset;
      }
   }
   .media-content {
      p {
         font-size: 12px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
         margin-bottom: 2px;
      }
      h4 {
         font-size: 12px;
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }

   &.is-disk {
      &:hover {
         .disk {
            transform: rotate(90deg);
         }
         .player_queue-left {
            transform: translateX(-10px);
         }
      }
      .player_queue-left {
         min-width: 87px;
         height: 87px;
         margin-left: 1rem;
         margin-right: 2.6rem;
         .player_queue-img-hover {
            min-width: 87px;
            height: 87px;
         }
      }

      .disk {
         width: 87px;
         height: 87px;
         transition: transform 0.3s linear;
         background-color: transparent;
         transform: rotate(0);
         z-index: -1;
         position: absolute;
         top: 0;
         left: 20px;
         right: 0;
         bottom: 0;
      }
   }

   .player_queue-left {
      min-width: 6rem;
      height: 6rem;
      transition: transform 0.3s linear;
      box-shadow: unset;
      .player_queue-img-hover {
         min-width: 6rem;
         height: 6rem;
      }
   }
   .player_queue-name,
   .player_queue-music,
   .player_queue-time {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }

   .player_queue-name {
      margin-top: 3px;

      a:hover {
         text-decoration: underline !important;
         color: var(--link-text-hover);
      }

      &:hover {
         text-decoration: unset !important;
      }
   }
   .player_queue-time {
      font-size: 12px;
      line-height: 18px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-top: 3px;
   }
   .media-content {
      span {
         font-size: 10px;
         font-weight: 500;
         line-height: 1.9;
         color: var(--text-item-hover);
      }
      h3 {
         text-transform: none;
         font-size: 14px;
         font-weight: 500;
         line-height: 1.57;
      }
      h4 {
         white-space: nowrap;
         text-overflow: ellipsis;
         overflow: hidden;
         max-width: 100%;
         line-height: normal;
      }
   }
`;
