import React, { memo } from "react"
import styled from "styled-components"
import { motion } from "framer-motion"
import ThemeItem from "./ThemeItem"
import { themes } from "../../data/dataThemes"

const ThemePortal = (props) => {
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
         width: 70vw;
         max-width: 900px;
         padding-bottom: 20px;
      }
      .modal-content {
         width: 70vw;
         max-width: 900px;
         padding-bottom: 20px;
         position: relative;
      }
      .container {
         flex-grow: 1;
         margin: 0 auto;
         position: relative;
         width: 100%;
         max-height: 50vh;
         min-height: 500px;
         padding: 0 30px;
         overflow-y: scroll;

         &::-webkit-scrollbar {
            width: 5px;
         }

         &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset #fff;
            border-radius: 4px;
         }

         &::-webkit-scrollbar-thumb {
            border-radius: 4px;
            -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
         }
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
      h3.main-title {
         font-size: 24px;
         padding: 20px 30px;
         margin: 0;
         color: var(--text-primary);
         font-weight: 600;
      }
      h3.title {
         font-size: 18px;
         color: var(--text-primary);
         margin-bottom: 10px;
      }
      .title {
         font-weight: 700;
         text-transform: capitalize;
         display: block;
      }
      .columns {
         display: -moz-flex;
         display: flex;
         -webkit-box-lines: multiple;
         -moz-box-lines: multiple;
         box-lines: multiple;
         flex-wrap: wrap;
         position: relative;
         margin: 0 -15px;
      }
      .theme-modal .columns {
         margin: 0 -7px;
      }
      .theme-modal .column {
         padding-left: 7px;
         padding-right: 7px;
      }
      .theme-modal .modal-content .zm-card-theme {
         line-height: 0;
      }
      .zm-card {
         max-width: 100%;
         position: relative;
      }
      .theme-modal .modal-content .zm-card-theme .zm-card-image {
         border: 1px solid transparent;
      }
      .zm-card-image {
         display: block;
         position: relative;
         overflow: hidden;
         border-radius: 4px;
         flex-shrink: 0;
      }
      .zm-card-image.theme-image figure {
         height: 0;
         padding-bottom: 66.67%;
      }
      .zm-card-image figure {
         line-height: 0;
         height: 0;
         padding-bottom: 100%;
         border-radius: 5px;
         overflow: hidden;
      }
      figure {
         background-color: var(--loading-bg);
      }
      .theme-modal .modal-content .zm-card-theme .ic-check {
         /* display: none; */
         display: block;
         position: absolute;
         right: 8px;
         bottom: 8px;
         font-size: 12px;
         padding: 4px;
         border-radius: 50%;
         background-color: var(--purple-primary);
         color: var(--white);
         margin-right: 0;
         width: unset;
         height: unset;
      }
      .opacity {
         width: 100%;
         height: 100%;
         position: absolute;
         top: 0;
         left: 0;
         background-color: var(--dark-alpha-50);
         visibility: hidden;
      }
      .zm-actions {
         position: absolute;
         left: 50%;
         top: 50%;
         bottom: auto;
         right: auto;
         z-index: 98;
         transform: translateX(-50%) translateY(-50%);
         visibility: hidden;
         width: 80%;
      }
      .zm-card-image img {
         transition: transform 0.7s;
      }
      img {
         height: auto;
         width: 100%;
      }
      .zm-card-image.active .opacity,
      .zm-card-image.active .zm-actions,
      .zm-card-image:hover .opacity,
      .zm-card-image:hover .zm-actions {
         visibility: visible;
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .mar-b-10 {
         margin-bottom: 10px !important;
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .theme-actions .zm-btn.is-outlined {
         color: var(--white);
         font-weight: 500;
         padding: 5px 0;
      }
      .zm-btn.is-outlined.active {
         background-color: var(--purple-primary);
         border-color: var(--purple-primary);
         color: var(--white);
      }
      .zm-btn.is-small {
         font-size: 12px;
         padding: 6px 19px;
      }
      .zm-btn.is-outlined {
         display: flex;
         justify-content: center;
         align-items: center;
         font-weight: 400;
         background-color: var(--alpha-bg);
         border: 1px solid var(--border-primary);
         color: var(--text-primary);
         margin: 0 auto;
      }
      .is-upper {
         text-transform: uppercase;
      }
      .theme-actions .zm-btn.is-outlined:not(.active) {
         background-color: rgba(0, 0, 0, 0.3);
         border-color: hsla(0, 0%, 100%, 0.5);
      }
      .theme-modal .modal-content .zm-card-theme .zm-btn {
         width: 100%;
         font-size: 8px;
      }
      .theme-actions .zm-btn.is-outlined {
         color: var(--white);
         font-weight: 500;
         padding: 5px 0;
      }
      .zm-btn.is-small {
         font-size: 12px;
         padding: 6px 19px;
      }
      .zm-btn.is-outlined {
         display: flex;
         justify-content: center;
         align-items: center;
         font-weight: 400;
         background-color: var(--alpha-bg);
         border: 1px solid var(--border-primary);
         color: var(--text-primary);
         margin: 0 auto;
      }
      .zm-card-theme .zm-card-content {
         padding: 5px 0;
      }
      .theme-modal .modal-content .zm-card-theme .zm-card-content .title {
         font-size: 12px;
      }
      .zm-card-content .title {
         font-size: 14px;
         font-weight: 500;
         line-height: 1.36;
         color: var(--text-primary);
         overflow: hidden;
         text-overflow: ellipsis;
      }
   `

   const { modalOpen, handleClose } = props

   const handleClickBackdrop = (e) => {
      if (e.target.id === "modal" || e.target.id === "theme-overlay") {
         return handleClose()
      }
   }

   const dropIn = {
      hidden: {
         y: "-100vh",
         opacity: 0,
      },
      visible: {
         y: "0",
         opacity: 1,
         transition: {
            duration: 0.3,
            type: "spring",
            damping: 25,
            stiffness: 300,
         },
      },
      exit: {
         y: "-100vh",
         opacity: 0,
      },
   }

   return (
      <PortalStyle>
         <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="zm-portal-modal theme-modal-overlay"
            id="theme-overlay"
            onClick={handleClickBackdrop}
         >
            <motion.div variants={dropIn} initial="hidden" animate="visible" exit="exit" className="modal theme-modal is-active">
               <div role="presentation" className="modal-background">
                  <div className="modal-content">
                     <button
                        onClick={handleClickBackdrop}
                        id="modal"
                        className="zm-btn zm-tooltip-btn close-btn is-hover-circle button"
                        tabIndex={0}
                     >
                        <i className="icon ic-close pointer-events-none" />
                     </button>
                     <h3 className="main-title title">Giao Diện</h3>
                     <div className="container">
                        {themes.map((e, index) => {
                           return <ThemeItem key={index} item={e}></ThemeItem>
                        })}
                     </div>
                  </div>
               </div>
            </motion.div>
         </motion.div>
      </PortalStyle>
   )
}

export default memo(ThemePortal)
