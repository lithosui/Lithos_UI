import { useMemo, useEffect, useState, useRef, useCallback, type ReactNode } from 'react'
import { ThemeContext } from './ThemeProviderContext'
import { getContrastText } from '../utils/yiq'
import { isHexColor, type HexColor } from './types'

export interface LithosThemeProps {
  config?: {
    accentColor: string
    radius: number
  }
  children: ReactNode
}

// static CSS rules defined outside component scope to avoid recreating on every render
const LITHOS_THEME_BASE_STYLES = `
  ::selection {
    background-color: var(--lithos-accent) !important;
    color: var(--lithos-accent-text) !important;
  }
`

// sync state with localStorage and dispatch events
const syncThemeProperty = (key: string, value: string, eventName?: string) => {
  localStorage.setItem(key, value)
  if (eventName) window.dispatchEvent(new Event(eventName))
}

export const ThemeProvider = ({ children, config }: LithosThemeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage using direct string comparison
    return localStorage.getItem('lithos-theme-mode') === 'dark'
  })

  const [accentColor, setAccentColor] = useState(() => {
    const stored = localStorage.getItem('lithos-theme-color')
    if (stored && isHexColor(stored)) return stored as HexColor
    return '#00FF00' as HexColor
  })

  const [radius, setRadius] = useState(() => parseInt(localStorage.getItem('lithos-theme-radius') || '0', 10))

  const prevConfig = useRef({
    accentColor: config?.accentColor,
    radius: config?.radius,
  })

  const updateAccentColor = useCallback((color: HexColor | string) => {
    let validColor = color

    if (!isHexColor(color)) {
      console.warn(`[Lithos UI] Invalid hex color provided: "${color}". Falling back to default #00FF00.`)
      validColor = '#00FF00'
    }

    setAccentColor(validColor as HexColor)
  }, [])

  // Synchronize incoming config changes in a single place
  useEffect(() => {
    if (!config) return

    if (config.accentColor !== undefined && config.accentColor !== prevConfig.current.accentColor) {
      prevConfig.current.accentColor = config.accentColor
      updateAccentColor(config.accentColor)
    }

    if (config.radius !== undefined && config.radius !== prevConfig.current.radius) {
      prevConfig.current.radius = config.radius
      setRadius(config.radius)
    }
  }, [config, updateAccentColor])

  // Single consolidated effect for localStorage sync & DOM class toggling
  useEffect(() => {
    syncThemeProperty('lithos-theme-color', accentColor, 'lithos-theme-color-changed')
    syncThemeProperty('lithos-theme-radius', radius.toString())

    const mode = isDarkMode ? 'dark' : 'light'
    syncThemeProperty('lithos-theme-mode', mode, 'lithos-theme-mode-changed')

    if (isDarkMode) {
      document.body.classList.add('obsidian', 'dark')
    } else {
      document.body.classList.remove('obsidian', 'dark')
    }
  }, [accentColor, radius, isDarkMode])

  // One-time setup for global selection styles
  useEffect(() => {
    let styleTag = document.getElementById('lithos-static-styles')

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'lithos-static-styles'
      styleTag.textContent = LITHOS_THEME_BASE_STYLES
      document.head.appendChild(styleTag)
    }
  }, [])

  // Direct CSS custom properties update on root
  useEffect(() => {
    const rootStyle = document.documentElement.style
    const contrastText = getContrastText(accentColor)

    rootStyle.setProperty('--lithos-accent', accentColor)
    rootStyle.setProperty('--lithos-accent-text', contrastText)
    rootStyle.setProperty('--lithos-radius', `${radius}px`)
  }, [accentColor, radius])

  const value = useMemo(
    () => ({
      accentColor,
      radius,
      isDarkMode,
      updateAccentColor,
      toggleObsidian: () => setIsDarkMode((prevMode) => !prevMode),
      updateRadius: (newRadius: number) => setRadius(newRadius),
    }),
    [accentColor, updateAccentColor, radius, isDarkMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
