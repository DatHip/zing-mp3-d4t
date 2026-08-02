/**
 * Every React Query key in the app, in one place.
 *
 * Keys were previously written as inline literals at each call site, so the
 * album page and the queue thunk could disagree by a character and silently
 * keep two copies of the same album in the cache.
 */
export const queryKeys = {
   home: () => ["home"],
   album: (id) => ["album", id],
   suggestedAlbum: (id) => ["album-suggested", id],
   artist: (name) => ["artist", name],
   lyrics: (id) => ["lyrics", id],
   hubHome: () => ["hub-home"],
   hubDetail: (id) => ["hub-detail", id],
   newMusic: () => ["new-music"],
   radio: () => ["radio"],
   top100: () => ["top100"],
   zingChart: () => ["zing-chart"],
   videoMv: (id) => ["video-mv", id],
   listMv: (id, page) => ["list-mv", id, page],
   categoryMv: (id) => ["category-mv", id],
   newFeed: (id, page) => ["new-feed", id, page],
   hotKey: () => ["hot-key"],
   suggestKeyword: (keyword) => ["suggest-keyword", keyword],
   searchAll: (keyword) => ["search-all", keyword],
   searchByType: (keyword, type) => ["search-type", keyword, type],
}
