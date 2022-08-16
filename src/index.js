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
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

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

root.render(
   <React.StrictMode>
      <BrowserRouter>
         <Provider store={store}>
            <QueryClientProvider client={queryClient}>
               <App />
               {/* <ReactQueryDevtools initialIsOpen /> */}
            </QueryClientProvider>
         </Provider>
      </BrowserRouter>
   </React.StrictMode>
)

reportWebVitals()

