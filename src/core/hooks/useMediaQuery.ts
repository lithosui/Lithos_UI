import { useEffect, useState } from 'react'

/**
 * A custom hook that tracks the state of a CSS media query.
 *
 * @param query - The CSS media query string to evaluate (e.g. `'(min-width: 768px)'`).
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
