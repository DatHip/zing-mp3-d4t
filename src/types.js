/**
 * Shapes the app passes between components.
 *
 * These describe what Zing actually returns, warts included: the same concept
 * arrives under `encodeId` from some endpoints and `id` from others, and
 * artwork is `thumbnailM` on a song row but `thumbnail` on a chart entry.
 * Writing that down once is the point — the alternative is rediscovering it at
 * each call site.
 *
 * Import them with `@typedef {import("types").Song} Song` or reference them
 * directly as `types.Song` in a JSDoc annotation.
 */

/**
 * A playable track.
 *
 * @typedef {Object} Song
 * @property {string} encodeId - Zing's id. Search and MV payloads use `id` instead.
 * @property {string} [id] - present instead of encodeId on search/MV results
 * @property {string} title
 * @property {number} duration - seconds
 * @property {1|2} streamingStatus - 2 means VIP-only: no playable URL on a free account
 * @property {string} [thumbnail]
 * @property {string} [thumbnailM] - larger variant, used by song rows
 * @property {Artist[]} [artists]
 * @property {Album} [album]
 * @property {number} [releaseDate] - unix seconds
 * @property {number} [rakingStatus] - chart movement since the previous run
 */

/**
 * @typedef {Object} Artist
 * @property {string} id
 * @property {string} name
 * @property {string} alias - url segment, e.g. "Son-Tung-M-TP"
 * @property {string} [thumbnailM]
 * @property {string} [playlistId] - the artist's "play all" playlist
 */

/**
 * A playlist or album. `textType` distinguishes a real playlist from an
 * artist's generated song list — only the former belongs in recently-played.
 *
 * @typedef {Object} Album
 * @property {string} encodeId
 * @property {string} title
 * @property {string} [thumbnailM]
 * @property {string} [textType] - "Playlist" for a user-facing playlist
 * @property {{ items: Song[] }} [song]
 * @property {Artist[]} [artists]
 */

/**
 * One block of the /home response. Match on sectionType or sectionId, never on
 * title — Zing rewords titles without warning.
 *
 * @typedef {Object} HomeSection
 * @property {string} sectionType
 * @property {string} [sectionId]
 * @property {string} [title]
 * @property {Array<Song|Album|Artist>} [items]
 */

/**
 * The playback queue slice. Several field names predate the rest of the app's
 * naming and are only reachable through features/queue/queueSelectors.
 *
 * @typedef {Object} QueueState
 * @property {string} currentEncodeId
 * @property {string|null} playlistEncodeId - null when a single song is playing
 * @property {Song[]} listSong
 * @property {Song[]} listSongShuffle
 * @property {Album|Array} infoCurrenAlbum - [] when no album is loaded
 * @property {number} currentIndexSong
 * @property {Song|Object} infoSongCurrent
 * @property {Song|Object} infoSongNext
 * @property {number} duration
 * @property {number} currentTime
 * @property {boolean} loading
 */

export {}
