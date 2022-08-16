const tmdbEndpoint = "https://api-zingmp3.vercel.app/api"

export const tmdAPI = {
   //  getMovieDetails: (movieId) => `${tmdbEndpoint}/${movieId}?api_ey=${apiKey}`,
   getHomePage: () => `${tmdbEndpoint}/home`,

   //  get từ khóa hot :
   getHotKeyApi: () => `${tmdbEndpoint}/recommendkeyword`,

   // lấy key gợi ý :
   getHotSuggestionApi: (keyword) => `${tmdbEndpoint}/suggestionkeyword?keyword=${keyword}`,

   //  bắt đầu search :
   getSearchAllKeyApi: (keyword) => `${tmdbEndpoint}/searchall?keyword=${keyword}`,
}
