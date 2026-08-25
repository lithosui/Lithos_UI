import { useEffect, useState } from 'react'
import { getContrastText, getYiqValue } from '../utils/yiq'
import type { HexColor } from './types'

/**
 * Custom hook for managing theme state with localStorage persistence.
 *
 * Manages dark/light mode state by reading from and writing to localStorage.
 * The theme preference is persisted under the key 'lithos-theme-mode'.
 */
export const useLithosTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage using direct string comparison
    return localStorage.getItem('lithos-theme-mode') === 'dark'
  })

  const [accentColor, setAccentColor] = useState(() => {
    return (localStorage.getItem('lithos-theme-color') as HexColor | null) || ('#00FF00' as HexColor)
  })

  const [radius, setRadius] = useState(() => {
    return parseInt(localStorage.getItem('lithos-theme-radius') || '0', 10)
  })

  useEffect(() => {
    let styleTag = document.getElementById('lithos-theme-overrides')
    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'lithos-theme-overrides'
      document.head.appendChild(styleTag)
    }

    // YIQ Logic: Ensure the accent color remains visible against the background.
    // Instead of a binary light/dark check which breaks bright colors like cyan or yellow in light mode,
    // we only override colors that are EXTREMELY close to the background color.
    const yiq = getYiqValue(accentColor)
    let adaptiveAccent = accentColor

    // YIQ of pure white is 255. YIQ of pure black is 0.
    if (!isDarkMode && yiq > 240) {
      adaptiveAccent = '#000000' as HexColor
    } else if (isDarkMode && yiq < 15) {
      adaptiveAccent = '#FFFFFF' as HexColor
    }

    const text = getContrastText(adaptiveAccent)
    styleTag.innerHTML = `
      *, :root, .obsidian, body.obsidian, .dark {
        --lithos-accent: ${adaptiveAccent} !important;
        --lithos-accent-text: ${text} !important;
        --lithos-radius: ${radius}px !important;
      }
      ::selection {
        background-color: var(--lithos-accent) !important;
        color: var(--lithos-accent-text) !important;
      }
    `
  }, [accentColor, isDarkMode, radius])

  const toggleObsidian = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode
      localStorage.setItem('lithos-theme-mode', newMode ? 'dark' : 'light')

      if (newMode) {
        document.body.classList.add('obsidian', 'dark')
      } else {
        document.body.classList.remove('obsidian', 'dark')
      }

      window.dispatchEvent(new Event('lithos-theme-mode-changed'))
      return newMode
    })
  }

  // Ensure body receives the initial class on mount
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('obsidian', 'dark')
    } else {
      document.body.classList.remove('obsidian', 'dark')
    }
  }, [isDarkMode])

  const updateAccentColor = (color: HexColor) => {
    setAccentColor(color)
    localStorage.setItem('lithos-theme-color', color)
  }

  const updateRadius = (newRadius: number) => {
    setRadius(newRadius)
    localStorage.setItem('lithos-theme-radius', newRadius.toString())
  }

  return { isDarkMode, toggleObsidian, accentColor, updateAccentColor, radius, updateRadius } as const
}
