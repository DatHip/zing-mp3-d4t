const isDev = process.env.NODE_ENV === "development"

/**
 * Report a swallowed error without shipping console noise to production.
 *
 * Bare `console.log(error)` in a catch block hides the failure twice over: it
 * is invisible in production and it reads as debug output rather than an error
 * in development. Always pass the call site as `context` so the log says which
 * feature broke.
 *
 * @param {string} context - Call site, e.g. "SignInForm" or "useLike.like".
 * @param {unknown} error
 */
export const logError = (context, error) => {
   if (isDev) console.error(`[${context}]`, error)
}
