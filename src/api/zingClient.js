import axios from "axios"
import { zingApi } from "config"

/**
 * Transport layer. Every request to the backend goes through one of these.
 *
 * Nothing above this file should import axios: components and slices ask for
 * a resource by name, not by URL, so an endpoint or response envelope can
 * change without a hunt through the tree. Zing wraps everything in
 * `{ data: { ... } }`, and unwrapping it here keeps `res.data.data` out of the
 * rest of the codebase.
 */
const get = async (url) => {
   const res = await axios.get(url)
   return res.data.data
}

export const fetchHomePage = () => get(zingApi.getHomePage())
export const fetchAlbum = (id) => get(zingApi.getAlbumPage(id))
export const fetchSuggestedAlbum = (id) => get(zingApi.getSuggestedAlbum(id))
export const fetchArtist = (name) => get(zingApi.getArtistPage(name))
export const fetchLyrics = (id) => get(zingApi.getLyrics(id))
export const fetchTopChart = () => get(zingApi.getTopChart())
export const fetchRadioPage = () => get(zingApi.getRadioPage())
export const fetchNewSong = () => get(zingApi.getNewSong())
export const fetchTop100 = () => get(zingApi.getTop100Page())
export const fetchHubHome = () => get(zingApi.getHubHome())
export const fetchHubDetail = (id) => get(zingApi.getHubDetail(id))
export const fetchVideoMv = (id) => get(zingApi.getVideoMv(id))
export const fetchListMv = (id, page) => get(zingApi.getListMv(id, page))
export const fetchCategoryMv = (id) => get(zingApi.getCategoryMv(id))
export const fetchNewFeed = (id, page) => get(zingApi.getNewFeed(id, page))
export const fetchHotKey = () => get(zingApi.getHotKeyApi())
export const fetchSuggestKeyword = (keyword) => get(zingApi.getHotSuggestionApi(keyword))
export const fetchSearchAll = (keyword) => get(zingApi.getSearchAllKeyApi(keyword))
export const fetchSearchByType = (keyword, type) => get(zingApi.getSearchByType(keyword, type))

/**
 * The stream endpoint is the one place the envelope is not `{ data: { ... } }`
 * of a list — it returns a quality map, and only the 128kbps entry is a URL
 * for non-VIP accounts.
 */
export const fetchSongStream = (id) => get(zingApi.getSongStream(id))
