import { useEffect, useMemo } from "react"
import { toast } from "react-toastify"
import { useRadioData } from "api/useRadioData"

export function useRadioPage() {
   const { data, isLoading } = useRadioData()
   const items = data?.items

   useEffect(() => {
      if (items) {
         toast("Radio đang phát triển, vui lòng thông cảm!", { type: "info" })
      }
   }, [items])

   const sections = useMemo(() => {
      if (!items) return null
      return {
         discoverPoscast: items.find((e) => e.sectionId === "radPromoteProgram"),
         categoryRadio: items.find((e) => e.sectionId === "radPromoteCategory"),
         featuredPrograms: items.find((e) => e.sectionId === "radSponsoredProgram"),
         featuredEpisodes: items.find((e) => e.sectionId === "radPromoteEpisode"),
         replay: items.filter((e) => e.sectionId === "radReplay"),
         newShow: items.find((e) => e.sectionId === "radLastestProgram"),
      }
   }, [items])

   return { sections, isLoading }
}
