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
         /**
          * Retry transient failures only. A 4xx means the request itself is
          * wrong — repeating it cannot help, and hammering a dead endpoint
          * three times is what trips the backend's circuit breaker, turning a
          * single 404 into a 503 for every later caller of that key.
          */
         retry: (failureCount, error) => {
            const status = error?.response?.status
            if (status >= 400 && status < 500) return false
            return failureCount < 3
         },
      },
   },
})
