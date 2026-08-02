import React, { memo } from "react"

import { motion } from "framer-motion"

import ThemeItem from "components/portal/ThemeItem"

import { themes } from "data/dataThemes"
import { ThemePortalStyles } from "./ThemePortal.styles"

const ThemePortal = (props) => {

   const { handleClose } = props

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
      <ThemePortalStyles>
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
      </ThemePortalStyles>
   )
}

export default memo(ThemePortal)
