import { collection, getDocs } from "firebase/firestore"
import React from "react"
import { useEffect } from "react"
import { database } from "./firebase-config"

const FirebaseApp = () => {
   const colRef = collection(database, "posts")

   useEffect(() => {
      getDocs(colRef).then((spanshot) => {
         console.log(spanshot, "spanshot")
         let posts = []
         spanshot.docs.forEach((docs) => {
            posts.push({
               id: docs.id,
               ...docs.data(),
            })
         })
         console.log(posts)
      })
   }, [])
   return <div></div>
}

export default FirebaseApp
