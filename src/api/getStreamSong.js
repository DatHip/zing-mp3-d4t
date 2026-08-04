import { fetchSongStream } from "api/zingClient"

const streamCache = new Map()

/** Why a song has no playable URL — drives which message the player shows. */
export const STREAM_FAIL = {
   REGION: "region",
   UNKNOWN: "unknown",
}

/**
 * Resolve a playable URL for a song.
 *
 * Zing returns a quality map; only the 128kbps entry is a real URL for a free
 * account, the rest read "VIP". Results are cached for the session because the
 * player asks for the same id every time a track is replayed.
 *
 * Returns `{ url, reason }`: `url` is null when nothing is playable, and
 * `reason` says why. The backend answers 451 when Zing licenses the track out
 * of the region the proxy runs in — a case worth telling the user apart from a
 * genuine failure, because the song is fine and retrying will not help.
 */
export async function getStreamUrl(encodeId) {
   if (!encodeId) return { url: null, reason: STREAM_FAIL.UNKNOWN }
   if (streamCache.has(encodeId)) return streamCache.get(encodeId)
   let result
   try {
      const data = await fetchSongStream(encodeId)
      const url = data && typeof data["128"] === "string" && data["128"].startsWith("http") ? data["128"] : null
      result = { url, reason: url ? null : STREAM_FAIL.UNKNOWN }
   } catch (err) {
      const reason = err?.response?.status === 451 ? STREAM_FAIL.REGION : STREAM_FAIL.UNKNOWN
      result = { url: null, reason }
   }
   streamCache.set(encodeId, result)
   return result
}
