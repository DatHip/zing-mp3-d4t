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

// This hook is mounted once per row, and every row used to issue its own
// getDoc(users/{id}) — a 50-song list meant 50 identical Firestore reads. The
// in-flight promise is shared per user id and invalidated on every write.
const userDocCache = new Map()

function readUserDoc(id) {
   if (userDocCache.has(id)) return userDocCache.get(id)
   const pending = loadFirestore()
      .then((firestore) => {
         if (!firestore) return null
         const { sdk, database } = firestore
         return sdk.getDoc(sdk.doc(database, "users", id)).then((snapshot) => snapshot?.data() || null)
      })
      .catch(() => null)
   userDocCache.set(id, pending)
   return pending
}

function invalidateUserDoc(id) {
   userDocCache.delete(id)
}

/** Favourites can be missing on a freshly created user document. */
function favouritesOf(data, type) {
   const field = FAVOURITE_FIELD[type]
   if (!field) return []
   const list = data?.[field]
   return Array.isArray(list) ? list : []
}

const useLikeHook = (item, type) => {
   // This hook runs once per row in every song/album/artist list, so it reads the
   // two primitives it needs rather than subscribing to the whole users slice.
   const id = useSelector((state) => state.users.id)
   const activeUser = useSelector((state) => state.users.activeUser)

   const [isLike, setLike] = useState(false)
   const [docs, setDocs] = useState([])

   useEffect(() => {
      if (!activeUser || !id) return
      let cancelled = false

      readUserDoc(id).then((data) => {
         if (cancelled || !data) return

         const favourites = favouritesOf(data, type)
         const liked =
            type === 3
               ? favourites.find((e) => e?.id === item?.id)
               : favourites.find((e) => e?.encodeId === item?.encodeId)

         setDocs(data)
         setLike(!!liked)
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
      if (!field) return

      // add
      if (!isLike) {
         try {
            // Awaited: an un-awaited updateDoc rejects outside this try, so the
            // catch never ran and a failed write still toasted "success".
            await sdk.updateDoc(colRef, { [field]: sdk.arrayUnion(item) })
            invalidateUserDoc(id)
            toast("Thêm vào thư viện thành công", { type: "success" })
            setLike(true)
         } catch (error) {
            console.log(error)
            toast("Lỗi thêm vào thư viện", { type: "error" })
         }
         return
      }

      //  remove
      const removed = type === 3 ? favouritesOf(docs, type).find((e) => e?.id === item?.id) : item
      if (!removed) return

      try {
         await sdk.updateDoc(colRef, { [field]: sdk.arrayRemove(removed) })
         invalidateUserDoc(id)
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
