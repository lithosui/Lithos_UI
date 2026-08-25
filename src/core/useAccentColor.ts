import { useState, useEffect } from 'react'
import type { HexColor } from './types'
import { getYiqValue } from '../utils/yiq'

export const useAccentColor = () => {
  const [accentColor, setAccentColor] = useState<HexColor>(() => {
    if (typeof window === 'undefined') return '#00FF00' as HexColor
    const storedColor = (localStorage.getItem('lithos-theme-color') as HexColor | null) || ('#00FF00' as HexColor)
    const isDarkMode = localStorage.getItem('lithos-theme-mode') === 'dark'

    const yiq = getYiqValue(storedColor)
    if (!isDarkMode && yiq > 240) return '#000000' as HexColor
    if (isDarkMode && yiq < 15) return '#FFFFFF' as HexColor

    return storedColor
  })

  useEffect(() => {
    const handleSync = () => {
      const storedColor = (localStorage.getItem('lithos-theme-color') as HexColor | null) || ('#00FF00' as HexColor)
      const isDarkMode =
        document.body.classList.contains('dark') || localStorage.getItem('lithos-theme-mode') === 'dark'

      const yiq = getYiqValue(storedColor)
      let adaptiveAccent = storedColor
      if (!isDarkMode && yiq > 240) adaptiveAccent = '#000000' as HexColor
      if (isDarkMode && yiq < 15) adaptiveAccent = '#FFFFFF' as HexColor

      setAccentColor(adaptiveAccent)
    }

    window.addEventListener('storage', handleSync)
    window.addEventListener('lithos-theme-color-changed', handleSync)
    window.addEventListener('lithos-theme-mode-changed', handleSync)
    return () => {
      window.removeEventListener('storage', handleSync)
      window.removeEventListener('lithos-theme-color-changed', handleSync)
      window.removeEventListener('lithos-theme-mode-changed', handleSync)
    }
  }, [])

  return { accentColor } as const
}
