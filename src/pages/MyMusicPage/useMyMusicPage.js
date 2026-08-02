import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { doc, getDoc } from "firebase/firestore"
import { database } from "lib/firebase/firestore"

const TABS = [
   { path: "/mymusic/", label: "TỔNG QUAN" },
   { path: "/mymusic/song", label: "BÀI HÁT" },
   { path: "/mymusic/playlist", label: "PLAYLIST" },
   { path: "/mymusic/nghe-si", label: "NGHỆ SĨ" },
   { path: "/mymusic/info", label: "Thông tin" },
]

export function useMyMusicPage() {
   const { pathname } = useLocation()
   const navigate = useNavigate()
   const users = useSelector((state) => state.users)
   const { activeUser, name, id: userId } = users
   const [docs, setDocs] = useState()

   useEffect(() => {
      if (!activeUser) navigate("/auth")
   }, [activeUser, navigate])

   useEffect(() => {
      if (!activeUser || !userId) return
      const docRef = doc(database, "users", userId)
      let cancelled = false
      getDoc(docRef).then((v) => {
         if (!cancelled) setDocs(v.data())
      })
      return () => {
         cancelled = true
      }
   }, [activeUser, userId])

   const tabs = useMemo(
      () => TABS.map((t) => ({ ...t, active: pathname === t.path })),
      [pathname]
   )

   return {
      users,
      name,
      docs,
      tabs,
   }
}
