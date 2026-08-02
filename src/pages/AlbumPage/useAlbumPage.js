import { useEffect } from "react"
import { useParams } from "react-router"
import { useSelector } from "react-redux"
import scrollIntoView from "smooth-scroll-into-view-if-needed"
import scrollTop from "utils/scrollToTop"
import { useAlbumData } from "api/useAlbumData"
import { selectCurrentEncodeId } from "features/queue/queueSelectors"

export function useAlbumPage() {
   const { id } = useParams()
   const currentEncodeId = useSelector(selectCurrentEncodeId)
   const { album, suggested, isLoading } = useAlbumData(id)

   useEffect(() => {
      scrollTop()
   }, [id])

   useEffect(() => {
      const node = document.querySelector(`.main_topchart .zing-chart_item.main_page-hover.active`)
      if (!node) return
      const t = setTimeout(() => {
         scrollIntoView(node, { block: "center", behavior: "smooth", scrollMode: "if-needed" })
      }, 200)
      return () => clearTimeout(t)
   }, [currentEncodeId, album])

   return { album, suggested, isLoading }
}
