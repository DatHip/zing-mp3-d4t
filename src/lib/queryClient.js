import { QueryClient } from "@tanstack/react-query"

/**
 * The single React Query cache for the app.
 *
 * It lives here rather than inside index.js so non-component code can reach
 * it — specifically the queue thunks, which need to read album data from the
 * same cache the album page fills instead of issuing a second request.
 */
export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         refetchOnWindowFocus: false,
         retry: 3,
      },
   },
})
