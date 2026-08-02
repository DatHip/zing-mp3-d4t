import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

// Firestore drags in google-closure-library — together ~1.7MB of source. Only a
// signed-in user can read or write likes, so the SDK is fetched on demand rather
// than riding along in main.js for every visitor.
const loadFirestore = () =>
   Promise.all([import("firebase/firestore"), import("lib/firebase/firestore")]).then(
      ([sdk, { database }]) => (database ? { sdk, database } : null)
   )

const FAVOURITE_FIELD = {
   1: "favouritePlaylist",
   2: "favouriteSongs",
   3: "favouriteArtist",
}

const useLikeHook = (item, type) => {
   // This hook runs once per row in every song/album/artist list, so it reads the
   // two primitives it needs rather than subscribing to the whole users slice.
   const id = useSelector((state) => state.users.id)
   const activeUser = useSelector((state) => state.users.activeUser)

   const [isLike, setLike] = useState(false)
   const [docs, setDocs] = useState([])

   useEffect(() => {
      if (!activeUser) return
      let cancelled = false

      loadFirestore().then((firestore) => {
         if (cancelled || !firestore) return
         const { sdk, database } = firestore

         return sdk.getDoc(sdk.doc(database, "users", id)).then((snapshot) => {
            if (cancelled || !snapshot) return
            const data = snapshot.data()
            if (!data) return

            const liked =
               type === 3
                  ? data.favouriteArtist.find((e) => e?.id === item?.id)
                  : data[FAVOURITE_FIELD[type]].find((e) => e?.encodeId === item?.encodeId)

            setDocs(data)
            setLike(!!liked)
         })
      })

      return () => {
         cancelled = true
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [item, activeUser, id, type])

   const handleLike = async () => {
      if (!activeUser) {
         return toast("Bạn cần phải đăng nhập", {
            type: "info",
         })
      }

      const firestore = await loadFirestore()
      if (!firestore) return
      const { sdk, database } = firestore
      const colRef = sdk.doc(database, "users", id)
      const field = FAVOURITE_FIELD[type]

      // add
      if (!isLike) {
         try {
            sdk.updateDoc(colRef, { [field]: sdk.arrayUnion(item) })
            toast("Thêm vào thư viện thành công", { type: "success" })
            setLike(true)
         } catch (error) {
            console.log(error)
            toast("Lỗi thêm vào thư viện thành công", { type: "error" })
         }
         return
      }

      //  remove
      setLike(true)
      const removed = type === 3 ? docs.favouriteArtist.find((e) => e.id === item.id) : item

      try {
         sdk.updateDoc(colRef, { [field]: sdk.arrayRemove(removed) })
         toast("Xóa khỏi thư viện thành công", { type: "info" })
         setLike(false)
      } catch (error) {
         console.log(error)
         toast("Lỗi xóa khỏi thư viện", { type: "error" })
      }
   }

   return { isLike, handleLike }
}

export default useLikeHook
