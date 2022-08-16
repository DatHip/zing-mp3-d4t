import React from "react"

import { motion } from "framer-motion"
const RadioPage = () => {
   return (
      <motion.div
         initial={{ y: "100%", opacity: 0 }}
         animate={{ y: 0, opacity: 1 }}
         exit={{ y: "-100%", opacity: 0 }}
         transition={{ duration: 0.2 }}
         className="text-white"
      >
         Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam cum in aspernatur delectus, rerum similique dolore
         eligendi doloribus autem nobis maiores ipsum eum. Quae voluptatibus numquam asperiores magni nemo libero!
      </motion.div>
   )
}

export default RadioPage
