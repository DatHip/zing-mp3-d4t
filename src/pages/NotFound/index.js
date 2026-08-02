import React from "react"
import { Link } from "react-router-dom"
import { useNotFound } from "./useNotFound"
import { NotFounds } from "./styles"

const NotFound = () => {
   useNotFound()

   return (
      <NotFounds>
         <>
            <p>
               HTTP: <span>404</span>
            </p>
            <code>
               <span>this_page</span>.<em>not_found</em> = true;
            </code>
            <code>
               <span>if</span> (<b>you_spelt_it_wrong</b>) {"{"}
               <span>try_again()</span>;{"}"}
            </code>
            <code>
               <span>
                  else if (<b>we_screwed_up</b>)
               </span>{" "}
               {"{"}
               <em>alert</em>(<i>"We're really sorry about that."</i>); <span>window</span>.<em>location</em> = home;{"}"}
            </code>
            <center>
               <Link className="cursor-pointer" to="/">
                  HOME
               </Link>
            </center>
         </>
      </NotFounds>
   )
}

export default NotFound
