import { useEffect } from "react"
import { useParams } from "react-router"
import scrollTop from "../../utils/scrollToTop"
import { useArtistData } from "../../api/useArtistData"

/**
 * Container hook: wires router param + data fetch + side effects.
 * Returns everything the UI needs to render.
 */
export function useArtistPage() {
   const { name } = useParams()
   const { data, isLoading } = useArtistData(name)

   useEffect(() => {
      scrollTop()
   }, [name])

   const tabs = [
      { to: `/nghe-si/${name}/`, label: "TỔNG QUAN", end: true },
      { to: `/nghe-si/${name}/song`, label: "BÀI HÁT" },
      { to: `/nghe-si/${name}/single`, label: "SINGLE & EP" },
      { to: `/nghe-si/${name}/album`, label: "ALBUM" },
      { to: `/nghe-si/${name}/mv`, label: "MV" },
   ]

   return { name, artist: data, isLoading, tabs }
}
