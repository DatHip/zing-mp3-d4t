import { fetchSongStream } from "api/zingClient"

const streamCache = new Map()

/**
 * Resolve a playable URL for a song.
 *
 * Zing returns a quality map; only the 128kbps entry is a real URL for a free
 * account, the rest read "VIP". Results are cached for the session because the
 * player asks for the same id every time a track is replayed.
 */
export async function getStreamUrl(encodeId) {
   if (!encodeId) return null
   if (streamCache.has(encodeId)) return streamCache.get(encodeId)
   try {
      const data = await fetchSongStream(encodeId)
      const url =
         data && typeof data["128"] === "string" && data["128"].startsWith("http") ? data["128"] : null
      streamCache.set(encodeId, url)
      return url
   } catch {
      streamCache.set(encodeId, null)
      return null
   }
}
