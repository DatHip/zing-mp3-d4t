import React from "react"
import { Link } from "react-router-dom"

/**
 * Comma-separated artist links, capped at three with a trailing ellipsis.
 *
 * Both song rows carried their own copy of this, each building the separator
 * through a chain of four reassignments of the same variable.
 *
 * @param {{ artists?: Array<{ alias: string, name: string }> }} props
 */
const ArtistLinks = ({ artists = [] }) => {
   const shown = artists.slice(0, 3)

   return (
      <>
         {shown.map((artist, index) => {
            const isLast = index === shown.length - 1
            const separator = !isLast ? ", " : artists.length > 3 ? "..." : ""

            return (
               <span key={artist.alias || index}>
                  <Link to={`/nghe-si/${artist.alias}/`}>{artist.name}</Link>
                  {separator}
               </span>
            )
         })}
      </>
   )
}

export default ArtistLinks
