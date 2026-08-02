import { useMemo } from "react"
import { useHomePageData } from "api/homeQueries"

/**
 * Locate a section in the /home response using a stable matcher.
 *
 * Prefer sectionType or sectionId (immutable) over title (Zing rewords titles).
 *
 * @param {(section: import("types").HomeSection) => boolean} matcher
 * @returns {{ section: import("types").HomeSection|null, isLoading: boolean }}
 */
export function useHomeSection(matcher) {
   const { data, status } = useHomePageData()
   const section = useMemo(() => {
      const items = data?.items
      if (!Array.isArray(items)) return null
      return items.find(matcher) || null
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [data, status])
   return { section, isLoading: status === "loading" || status === "pending" }
}

export const byType = (type) => (s) => s?.sectionType === type
export const byId = (id) => (s) => s?.sectionId === id
export const byTypeOrId = (type, id) => (s) => s?.sectionType === type || s?.sectionId === id
