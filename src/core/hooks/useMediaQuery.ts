import { useEffect, useState } from 'react'

/** Options or parameters for the {@link useMediaQuery} hook. */
export interface UseMediaQueryOptions {
  /** The CSS media query string to evaluate (e.g. `'(min-width: 768px)'`). */
  query: string
}

/**
 * A custom hook that tracks the state of a CSS media query.
 *
 * @param query - The media query string to evaluate, or an options object implementing {@link UseMediaQueryOptions}.
 * @returns A boolean indicating whether the media query currently matches.
 */
export const useMediaQuery = (query: string) => {
  const [matchs, setMatchs] = useState(matchMedia(query).matches)

  useEffect(() => {
    const q = matchMedia(query)

    const handler = (mql: MediaQueryListEvent) => {
      setMatchs(mql.matches)
    }

    q.addEventListener('change', handler)
    return () => q.removeEventListener('change', handler)
  }, [query])

  return matchs
}
