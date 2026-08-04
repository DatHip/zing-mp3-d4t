// The primary CTA ("Phát Album", "Tiếp tục phát") fills with --purple-primary,
// which every theme redefines. White text clears 4.5:1 on the dark accents but
// not on the light ones — #D1AB00 lands at 2.2:1 and #ed2b91 at 3.9:1 — so a
// single hard-coded foreground cannot pass AA across the theme set.
//
// Picking whichever of black/white contrasts better does pass for all of them,
// and leaves the dark accents rendering white exactly as before; only the light
// accents flip to dark text, which is what they need to be readable anyway.

const channel = (value) => {
   const c = value / 255
   return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
}

const parseHex = (hex) => {
   const raw = hex.trim().replace(/^#/, "")
   const full =
      raw.length === 3
         ? raw
              .split("")
              .map((ch) => ch + ch)
              .join("")
         : raw
   if (full.length < 6) return null
   const int = parseInt(full.slice(0, 6), 16)
   if (Number.isNaN(int)) return null
   return [(int >> 16) & 255, (int >> 8) & 255, int & 255]
}

const relativeLuminance = (rgb) =>
   0.2126 * channel(rgb[0]) + 0.7152 * channel(rgb[1]) + 0.0722 * channel(rgb[2])

export const contrastRatio = (hexA, hexB) => {
   const a = parseHex(hexA)
   const b = parseHex(hexB)
   if (!a || !b) return 1
   const la = relativeLuminance(a)
   const lb = relativeLuminance(b)
   return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05)
}

/**
 * @param {string} accent hex colour the button is filled with
 * @returns {"#ffffff"|"#000000"} the foreground with the higher contrast
 */
export const accentForeground = (accent) => {
   if (!accent || !parseHex(accent)) return "#ffffff"
   return contrastRatio(accent, "#ffffff") >= contrastRatio(accent, "#000000") ? "#ffffff" : "#000000"
}

/**
 * Reads --purple-primary out of a theme's dataStyle array and returns the
 * matching `--on-accent: <colour>` declaration to append to it.
 */
export const onAccentDeclaration = (dataStyle) => {
   const entry = (dataStyle || []).find((d) => typeof d === "string" && d.trim().startsWith("--purple-primary"))
   if (!entry) return null
   const accent = entry.split(":")[1]
   if (!accent) return null
   return `--on-accent: ${accentForeground(accent)}`
}

export default accentForeground
