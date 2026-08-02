import { useQuery } from "@tanstack/react-query"
import { fetchVideoMv } from "api/zingClient"
import { queryKeys } from "api/queryKeys"

export function useVideoMvData(id) {
   return useQuery(queryKeys.videoMv(id), () => fetchVideoMv(id), {
      enabled: !!id,
      staleTime: 30 * 60 * 1000,
      keepPreviousData: true,
   })
}
