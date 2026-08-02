import { useCallback, useMemo } from "react"
import { useNavigate } from "react-router"
import { useHubHomeData } from "api/useHubHomeData"

export function useHubPage() {
   const { data, isLoading } = useHubHomeData()
   const navigate = useNavigate()

   const sections = useMemo(() => {
      if (!data) return null
      const banner = data.banners?.[0]
      let bannerSlug = null
      if (banner?.link) {
         const first = banner.link.lastIndexOf("/")
         const last = banner.link.lastIndexOf(".")
         bannerSlug = banner.link.slice(first + 1, last)
      }
      return {
         banner,
         bannerSlug,
         mood: data.topic,
         nations: data.nations,
         genre: data.genre,
      }
   }, [data])

   const onBannerClick = useCallback(() => {
      if (sections?.bannerSlug) navigate(`/hub/detail/${sections.bannerSlug}`)
   }, [navigate, sections])

   return { sections, isLoading, onBannerClick }
}
