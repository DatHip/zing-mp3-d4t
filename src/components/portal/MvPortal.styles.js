import styled from "styled-components"

export const MvPortalStyles = styled.div`
   .message-wrapper {
      width: 100%;
      padding-left: 15px;
      padding-right: 15px;
      padding-bottom: 15px;
      background: var(--primary-bg);
      .noti-message {
         background-color: var(--alpha-bg);
         color: var(--text-second);
         font-weight: 500;
         padding: 10px 15px;
         border-radius: 4px;
         display: flex;
         align-items: center;
         justify-content: center;
      }
   }

   .feed-detail {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 100%;
      background-color: #000;
      img {
         position: relative;
         object-fit: cover;
         width: auto;
      }
   }
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
      background-color: var(--dark-alpha-50);
   }

   .alert-enter {
      opacity: 0;
      transform: scale(0.9);
   }
   .alert-enter-active {
      opacity: 1;
      transform: translateX(0);
      transition: opacity 300ms, transform 300ms;
   }
   .alert-exit {
      opacity: 1;
   }
   .alert-exit-active {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
   }

   .zm-portal-modal .modal {
      background-color: var(--primary-bg);
      border-radius: 8px;
      max-width: 900px;
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      position: fixed;
      z-index: 40;
   }
   .theme-modal .modal-content {
      width: 80vw;
      max-width: 900px;
   }

   .theme-modal .modal-content .close-btn {
      position: absolute;
      top: 15px;
      right: 15px;
      margin: 0;
      color: var(--text-primary);
      cursor: pointer;
      i {
         font-size: 24px;
      }
   }

   .subtitle {
      font-size: 12px;
      font-weight: 300;
      margin-top: 3px;
      white-space: nowrap;
      color: var(--text-secondary);
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .recently_list-item_hover {
      background-color: rgba(0, 0, 0, 0.2);
   }
   .name {
      &:hover {
         color: var(--link-text-hover);
      }
   }

   .btn-care {
      color: var(--link-text-hover);
      &:hover {
         filter: brightness(0.9);
      }

      &.is-care {
         color: var(--text-placeholder);
      }
   }
   .title {
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 20;
      height: auto;
      overflow: hidden;
   }

   .title-desp {
      border-top: 1px solid var(--border-secondary);
      border-bottom: 1px solid var(--border-secondary);
   }
   .feed-footer {
      border-bottom: 1px solid var(--border-secondary);
   }
   .recently_list-item_hover {
      display: flex !important;
   }
   .main_page-hover:hover img {
      transform: scale(1) !important;
   }
   .list-comment {
      font-size: 13px;
      font-weight: 700;
      margin-bottom: 10px;
      flex-shrink: 0;
   }

   .zm-btn.close-feed-modal {
      position: fixed;
      color: var(--white);
      margin: 0;
      top: 14px;
      right: 14px;
      width: 40px;
      height: 40px;
      font-size: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background-color: hsla(0, 0%, 100%, 0.3);
      box-shadow: 0 2px 4px 0 rgb(0 0 0 / 30%);
      .icon.ic-svg-close-white {
         background-image: url(https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.7.23/static/media/close-white.42640965.svg);
      }
   }

   @media (max-width: 1113px) {
      .feed-detail {
         overflow: hidden;
         height: 85% !important;
      }
      .row {
         flex-wrap: wrap !important ;
      }
   }
`
