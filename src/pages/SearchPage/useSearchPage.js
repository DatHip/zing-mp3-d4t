import { useMemo } from "react"
import { useLocation, useParams } from "react-router"

const TABS = [
   { key: "tatca", label: "TẤT CẢ" },
   { key: "baihat", label: "BÀI HÁT" },
   { key: "playlist", label: "PLAYLIST/ALBUM" },
   { key: "artist", label: "NGHỆ SĨ/OA" },
   { key: "video", label: "MV" },
]

export function useSearchPage() {
   const { id } = useParams()
   const location = useLocation()

   const encodedId = useMemo(() => (id ? encodeURIComponent(id) : ""), [id])

   const tabs = useMemo(
      () =>
         TABS.map((t) => ({
            ...t,
            to: `/tim-kiem/${t.key}/${encodedId}`,
            active: location.pathname.includes(`/tim-kiem/${t.key}/`),
         })),
      [encodedId, location.pathname]
   )

   return { tabs }
}
