import { next } from "@vercel/edge"

/**
 * Edge Middleware: dynamic <head> rendering for crawlers.
 *
 * The app is a CRA SPA — every route serves the same empty index.html, so a
 * link to /album/ZWZB969E previews as a blank card on Zalo/Messenger/Facebook
 * and reads as a contentless page to search engines.
 *
 * This runs ONLY for crawler user agents. Humans get `next()` immediately, so
 * normal traffic pays nothing: no upstream fetch, no HTML rewrite.
 *
 * For crawlers it fetches the route's data from the API, then rewrites the
 * shell's <head> with a real title/description/OG image, plus a
 * `noindex,follow` robots tag on pages that mirror zingmp3.vn content.
 */

export const config = {
   matcher: [
      "/album/:path*",
      "/nghe-si/:path*",
      "/video-clip/:path*",
      "/hub/detail/:path*",
      "/tim-kiem/:path*",
      "/newfeed/:path*",
   ],
}

// Same fallback as src/config.js — must stay in sync, or crawlers would resolve
// meta against a different API than the app itself uses.
const API_BASE = (process.env.REACT_APP_API_URL || "https://api-zingmp3.vercel.app/api").replace(/\/+$/, "")

const UPSTREAM_TIMEOUT_MS = 2500

const CRAWLER_RE =
   /(googlebot|google-inspectiontool|bingbot|duckduckbot|yandex(bot)?|baiduspider|applebot|slurp|facebookexternalhit|facebot|twitterbot|linkedinbot|slackbot|slack-imgproxy|telegrambot|discordbot|whatsapp|zalo|viber|skypeuripreview|redditbot|pinterest(bot)?|embedly|quora link preview|bitlybot|nuzzel|vkshare|outbrain|w3c_validator|lighthouse|chrome-lighthouse)/i

const SITE_NAME = "D4T MP3"
const FALLBACK_IMAGE = "/1-2.PNG"

function esc(value) {
   return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;")
}

/** Collapse markup/whitespace from upstream descriptions and cap the length. */
function clean(text, max = 180) {
   const flat = String(text || "")
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
   if (flat.length <= max) return flat
   return flat.slice(0, max - 1).replace(/\s+\S*$/, "") + "…"
}

function absolute(url, origin) {
   if (!url) return origin + FALLBACK_IMAGE
   if (/^https?:\/\//i.test(url)) return url
   return origin + (url.startsWith("/") ? url : "/" + url)
}

async function fetchJson(path) {
   try {
      const res = await fetch(API_BASE + path, {
         signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
         headers: { accept: "application/json" },
      })
      if (!res.ok) return null
      const json = await res.json()
      return json && json.data ? json.data : null
   } catch {
      // Never let a slow or broken upstream stall a crawler — fall back to the
      // generic shell meta instead.
      return null
   }
}

/**
 * Map a pathname to page metadata. Returns null when the route is not one we
 * describe, in which case the shell is served untouched.
 */
async function resolveMeta(pathname) {
   let m

   if ((m = pathname.match(/^\/album\/([^/]+)/))) {
      const d = await fetchJson(`/playlist/${encodeURIComponent(m[1])}`)
      // Guard on the display field, not just on `d`: a partial upstream payload
      // would otherwise render a literal "undefined" title.
      if (!d || !d.title) return { title: `Playlist | ${SITE_NAME}`, noindex: true }
      const artists = d.artistsNames ? ` — ${d.artistsNames}` : ""
      return {
         title: `${d.title}${artists} | ${SITE_NAME}`,
         description: clean(d.sortDescription || d.description) || `Nghe playlist ${d.title} trên ${SITE_NAME}.`,
         image: d.thumbnailM || d.thumbnail,
         noindex: true,
         jsonLd: {
            "@context": "https://schema.org",
            "@type": "MusicPlaylist",
            name: d.title,
            numTracks: d.song && Array.isArray(d.song.items) ? d.song.items.length : undefined,
         },
      }
   }

   if ((m = pathname.match(/^\/nghe-si\/([^/]+)/))) {
      const d = await fetchJson(`/artist/${encodeURIComponent(m[1])}`)
      if (!d || !d.name) return { title: `Nghệ sĩ | ${SITE_NAME}`, noindex: true }
      return {
         title: `${d.name} | ${SITE_NAME}`,
         description:
            clean(d.sortBiography || d.biography) || `Nghe tất cả bài hát, album và MV của ${d.name} trên ${SITE_NAME}.`,
         image: d.thumbnailM || d.thumbnail,
         noindex: true,
         jsonLd: { "@context": "https://schema.org", "@type": "MusicGroup", name: d.name },
      }
   }

   if ((m = pathname.match(/^\/video-clip\/([^/]+)/))) {
      const d = await fetchJson(`/mv/${encodeURIComponent(m[1])}`)
      if (!d || !d.title) return { title: `MV | ${SITE_NAME}`, noindex: true }
      const artists = d.artistsNames ? ` — ${d.artistsNames}` : ""
      return {
         title: `${d.title}${artists} | ${SITE_NAME}`,
         description: `Xem MV ${d.title}${artists} trên ${SITE_NAME}.`,
         image: d.thumbnailM || d.thumbnail,
         noindex: true,
      }
   }

   if ((m = pathname.match(/^\/hub\/detail\/([^/]+)/))) {
      const d = await fetchJson(`/hubdetails/${encodeURIComponent(m[1])}`)
      if (!d || !d.title) return { title: `Chủ đề | ${SITE_NAME}`, noindex: true }
      return {
         title: `${d.title} | ${SITE_NAME}`,
         description: clean(d.description) || `Khám phá chủ đề ${d.title} trên ${SITE_NAME}.`,
         image: d.thumbnailHasText || d.thumbnailM || d.thumbnail,
         noindex: true,
      }
   }

   if (pathname.startsWith("/tim-kiem")) {
      return {
         title: `Tìm kiếm | ${SITE_NAME}`,
         description: `Tìm bài hát, nghệ sĩ, playlist và MV trên ${SITE_NAME}.`,
         noindex: true,
      }
   }

   if (pathname.startsWith("/newfeed")) {
      return {
         title: `Tin tức âm nhạc | ${SITE_NAME}`,
         description: `Tin tức và sự kiện âm nhạc mới nhất trên ${SITE_NAME}.`,
         noindex: true,
      }
   }

   return null
}

/** Drop the shell's static head tags that we are about to replace. */
function stripStaticMeta(html) {
   return html
      .replace(/<title>[\s\S]*?<\/title>/i, "")
      .replace(/<meta\s+name=["']description["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']robots["'][^>]*>/gi, "")
      .replace(/<link\s+rel=["']canonical["'][^>]*>/gi, "")
      .replace(/<meta\s+property=["']og:[^"']*["'][^>]*>/gi, "")
      .replace(/<meta\s+name=["']twitter:[^"']*["'][^>]*>/gi, "")
      .replace(/<script\s+type=["']application\/ld\+json["'][\s\S]*?<\/script>/gi, "")
}

function buildHead(meta, url) {
   const origin = url.origin
   const canonical = origin + url.pathname
   const title = meta.title || `${SITE_NAME} | Nghe nhạc chất lượng cao`
   const description = meta.description || `Nghe nhạc trực tuyến miễn phí trên ${SITE_NAME}.`
   const image = absolute(meta.image, origin)

   const tags = [
      `<title>${esc(title)}</title>`,
      `<meta name="description" content="${esc(description)}" />`,
      `<link rel="canonical" href="${esc(canonical)}" />`,
      meta.noindex ? `<meta name="robots" content="noindex,follow" />` : "",
      `<meta property="og:type" content="website" />`,
      `<meta property="og:site_name" content="${SITE_NAME}" />`,
      `<meta property="og:locale" content="vi_VN" />`,
      `<meta property="og:url" content="${esc(canonical)}" />`,
      `<meta property="og:title" content="${esc(title)}" />`,
      `<meta property="og:description" content="${esc(description)}" />`,
      `<meta property="og:image" content="${esc(image)}" />`,
      `<meta name="twitter:card" content="summary_large_image" />`,
      `<meta name="twitter:title" content="${esc(title)}" />`,
      `<meta name="twitter:description" content="${esc(description)}" />`,
      `<meta name="twitter:image" content="${esc(image)}" />`,
   ]

   if (meta.jsonLd) {
      const ld = { ...meta.jsonLd, url: canonical }
      // </script> inside JSON would close the tag early.
      tags.push(
         `<script type="application/ld+json">${JSON.stringify(ld).replace(/</g, "\\u003c")}</script>`
      )
   }

   return tags.filter(Boolean).join("\n  ")
}

export default async function middleware(request) {
   const ua = request.headers.get("user-agent") || ""
   if (!CRAWLER_RE.test(ua)) return next()

   const url = new URL(request.url)

   let meta
   try {
      meta = await resolveMeta(url.pathname)
   } catch {
      meta = null
   }
   if (!meta) return next()

   const shell = await fetch(new URL("/index.html", url.origin), {
      headers: { accept: "text/html" },
   })
   if (!shell.ok) return next()

   const html = stripStaticMeta(await shell.text()).replace("</head>", `  ${buildHead(meta, url)}\n</head>`)

   return new Response(html, {
      status: 200,
      headers: {
         "content-type": "text/html; charset=utf-8",
         // Let the CDN keep the rendered shell so repeat crawls skip the
         // upstream round trip entirely. Vary is required, not decorative: this
         // body is only produced for crawler user agents, so a cache keyed on
         // URL alone would eventually hand crawler HTML to a human visitor.
         vary: "user-agent",
         "cache-control": "public, s-maxage=600, stale-while-revalidate=3600",
         "x-prerender": "edge-meta",
      },
   })
}
