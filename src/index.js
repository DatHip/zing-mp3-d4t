import "./asset/styles/index.scss"
import "./asset/styles/grid.css"
import "./asset/styles/main.scss"
import "./asset/styles/style.scss"
import "./asset/styles/responsive.scss"

import React from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/stores"
import App from "./App"
import reportWebVitals from "./reportWebVitals"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const container = document.getElementById("root")
const root = createRoot(container)

const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 3,
      },
   },
})

document.cookie = "SameSite=None"

root.render(
   <Provider store={store}>
      <QueryClientProvider client={queryClient}>
         <BrowserRouter>
            <App />
         </BrowserRouter>
      </QueryClientProvider>
   </Provider>
)

reportWebVitals()

