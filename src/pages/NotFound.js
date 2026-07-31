import React from "react"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"

const NotFounds = styled.div`
   @import url("https://fonts.googleapis.com/css?family=Bevan");

   p {
      font-family: "Bevan", cursive;
      font-size: 130px;
      margin: 10vh 0 0;
      text-align: center;
      letter-spacing: 5px;
      background-color: black;
      color: transparent;
      text-shadow: 2px 2px 3px rgba(255, 255, 255, 0.1);
      -webkit-background-clip: text;
      -moz-background-clip: text;
      background-clip: text;

      span {
         font-size: 1.2em;
      }
   }

   code {
      color: #bdbdbd;
      text-align: center;
      display: block;
      font-size: 16px;
      margin: 0 30px 25px;

      span {
         color: #f0c674;
      }

      i {
         color: #b5bd68;
      }

      em {
         color: #b294bb;
         font-style: unset;
      }

      b {
         color: #81a2be;
         font-weight: 500;
      }
   }

   a {
      color: #8abeb7;
      font-family: monospace;
      font-size: 20px;
      text-decoration: underline;
      margin-top: 10px;
      display: inline-block;
   }

   @media screen and (max-width: 880px) {
      p {
         font-size: 14vw;
      }
   }
`

const NotFound = () => {
   function type(n, t) {
      var str = document.getElementsByTagName("code")[n].innerHTML.toString()
      var i = 0
      document.getElementsByTagName("code")[n].innerHTML = ""

      setTimeout(function () {
         var se = setInterval(function () {
            i++
            document.getElementsByTagName("code")[n].innerHTML = str.slice(0, i) + "|"
            if (i === str.length) {
               clearInterval(se)
               document.getElementsByTagName("code")[n].innerHTML = str
            }
         }, 10)
      }, t)
   }

   useEffect(() => {
      type(0, 0)
      type(1, 600)
      type(2, 1300)
   }, [])

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
