// Fallback is the deployed API, not localhost: a production build with the env
// var unset would otherwise ship "http://localhost:5000" and be blocked as
// mixed content on HTTPS, breaking every request with no visible error.
const apiBaseUrl = process.env.REACT_APP_API_URL || "https://api-zingmp3.vercel.app/api"

export const zingApi = {
   //  getMovieDetails: (movieId) => `${apiBaseUrl}/${movieId}?api_ey=${apiKey}`,
   getHomePage: () => `${apiBaseUrl}/home`,

   // get Zing Chart :
   getTopChart: () => `${apiBaseUrl}/homechart`,

   // get RadioPage :
   getRadioPage: () => `${apiBaseUrl}/radio`,

   // get New Feed :
   getNewFeed: (id, page) => `${apiBaseUrl}/newfeeds?id=${id}&page=${page}`,

   // get Mới Phát Hành :
   getNewSong: () => `${apiBaseUrl}/newreleasechart`,

   // get Thể Loại :
   getHubHome: () => `${apiBaseUrl}/hubhome`,
   // get Hub Detail:
   getHubDetail: (id) => `${apiBaseUrl}/hubdetails/${id}`,

   // get Top100Page :
   getTop100Page: () => `${apiBaseUrl}/top100`,

   // get List Mv :
   getListMv: (id, page) => `${apiBaseUrl}/listmv?id=${id}&page=${page}&count=19`,

   // get Category Mv :
   getCategoryMv: (id) => `${apiBaseUrl}/categorymv/${id}`,

   // get Mv:
   getVideoMv: (id) => `${apiBaseUrl}/mv/${id}`,

   // get getArtistPage:
   getArtistPage: (id) => `${apiBaseUrl}/artist/${id}`,

   // get getAlbumPage :
   getAlbumPage: (id) => `${apiBaseUrl}/playlist/${id}`,

   getSuggestedAlbum: (id) => `${apiBaseUrl}/suggestedplaylists/${id}`,

   //  get từ khóa hot  :
   getHotKeyApi: () => `${apiBaseUrl}/recommendkeyword`,

   // lấy key gợi ý :
   getHotSuggestionApi: (keyword) => `${apiBaseUrl}/suggestionkeyword?keyword=${keyword}`,

   getSearchByType: (keyword, type) => `${apiBaseUrl}/searchtype?keyword=${keyword}&type=${type}`,

   //  bắt đầu search :
   getSearchAllKeyApi: (keyword) => `${apiBaseUrl}/searchall?keyword=${keyword}`,

   // Lyrics :
   getLyrics: (id) => `${apiBaseUrl}/songlyrics/${id}`,

   // Song streaming URLs (128kbps free, 320kbps VIP)
   getSongStream: (id) => `${apiBaseUrl}/song/${id}`,
}
