import { useState } from "react"
import { toast } from "react-toastify"
import { arrayRemove, arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore"
import { database } from "../firebase/firebase-config"
import { useSelector } from "react-redux"
import { useMemo } from "react"

const useLikeHook = (item, type) => {
   const { id, activeUser } = useSelector((state) => state.users)

   const [isLike, setLike] = useState(false)
   const [docs, setDocs] = useState([])

   useMemo(() => {
      if (activeUser) {
         const colRef = doc(database, "users", id)

         getDoc(colRef).then(async (doc) => {
            if (!doc) return
            let likeSelector

            if (type === 1) {
               likeSelector = doc.data().favouritePlaylist.find((e) => e?.encodeId === item?.encodeId)
            }
            if (type === 2) {
               likeSelector = doc.data().favouriteSongs.find((e) => e?.encodeId === item?.encodeId)
            }
            if (type === 3) {
               likeSelector = doc.data().favouriteArtist.find((e) => e?.id === item?.id)
            }
            setDocs(doc.data())
            let like = await likeSelector
            if (like) {
               setLike(() => true)
            } else {
               setLike(() => false)
            }
         })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [item])

   const handleLike = () => {
      if (!activeUser) {
         return toast("Bạn cần phải đăng nhập", {
            type: "info",
         })
      }

      if (activeUser) {
         // add
         if (!isLike) {
            const updateLike = async () => {
               const colRef = doc(database, "users", id)

               if (type === 1) {
                  updateDoc(colRef, {
                     favouritePlaylist: arrayUnion(item),
                  })
               }
               if (type === 2) {
                  updateDoc(colRef, {
                     favouriteSongs: arrayUnion(item),
                  })
               }
               if (type === 3) {
                  updateDoc(colRef, {
                     favouriteArtist: arrayUnion(item),
                  })
               }

               try {
                  toast("Thêm vào thư viện thành công", { type: "success" })
                  setLike(true)
               } catch (error) {
                  console.log(error)
                  toast("Lỗi thêm vào thư viện thành công", { type: "error" })
               }
            }
            updateLike()
         }
         //  remove
         if (isLike) {
            const updateLike = async () => {
               setLike(true)

               const colRef = doc(database, "users", id)

               if (type === 1) {
                  updateDoc(colRef, {
                     favouritePlaylist: arrayRemove(item),
                  })
               }
               if (type === 2) {
                  updateDoc(colRef, {
                     favouriteSongs: arrayRemove(item),
                  })
               }

               if (type === 3) {
                  const docArtis = docs.favouriteArtist.find((e) => {
                     return e.id === item.id
                  })
                  updateDoc(colRef, {
                     favouriteArtist: arrayRemove(docArtis),
                  })
               }

               try {
                  toast("Xóa khỏi thư viện thành công", { type: "info" })
                  setLike(false)
               } catch (error) {
                  console.log(error)
                  toast("Lỗi xóa khỏi thư viện", { type: "error" })
               }
            }
            updateLike()
         }
      }
   }

   return { isLike, handleLike }
}

export default useLikeHook
