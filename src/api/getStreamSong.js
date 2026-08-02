import axios from "axios"
import { zingApi } from "config"

const streamCache = new Map()

export async function getStreamUrl(encodeId) {
   if (!encodeId) return null
   if (streamCache.has(encodeId)) return streamCache.get(encodeId)
   try {
      const res = await axios.get(zingApi.getSongStream(encodeId))
      const data = res?.data?.data
      const url = data && typeof data["128"] === "string" && data["128"].startsWith("http") ? data["128"] : null
      streamCache.set(encodeId, url)
      return url
   } catch {
      streamCache.set(encodeId, null)
      return null
   }
}
