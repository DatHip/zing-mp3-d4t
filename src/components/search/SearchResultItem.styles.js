import styled from "styled-components"

export const SearchResultItemStyles = styled.div`
   &.is-item-search {
      .media {
         &:hover {
            .recently_list-item_hover {
               transition: 0.2s !important;
               display: flex !important;
            }
         }
         border-radius: none !important;
         background-color: transparent !important;
         padding: 8px !important;
         border-radius: 2px !important;
         transition: unset !important;
         cursor: pointer;
         .icon {
            font-size: 22px;
            width: 22px;
            height: 22px;
         }
      }
   }

   &.media-hover {
      &:hover .media {
         background-color: var(--box-hot-item-bg-hover) !important;
      }
   }
   .media {
      transition: all 0.2s linear;
      background-color: var(--box-hot-item-bg);
      align-items: center;
      display: flex;
      text-align: left;
      padding: 10px;
      border-radius: 5px;
   }

   .media-left,
   .media-right {
      margin-right: 10px;
   }
   .type {
      font-size: 12px;
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 3px;
      white-space: nowrap;
   }

   .title {
      font-weight: 600;
      font-size: 14px;
      line-height: 20px;
      color: var(--text-primary);
      margin-bottom: 0;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      height: auto;
      overflow: hidden;
   }
   .subtitle {
      margin-top: 2px;
      font-weight: 400;
      font-size: 12px;
      color: var(--text-secondary);
   }

   i {
      margin-right: 0;
   }
   .title-hover:hover {
      text-decoration: underline;
   }
`
