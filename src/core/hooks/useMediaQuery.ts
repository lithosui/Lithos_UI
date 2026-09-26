import { useEffect, useState } from 'react'

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
