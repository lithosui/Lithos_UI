import { useMemo, useEffect, useState, useRef, useCallback, type ReactNode } from 'react'
import { flushSync } from 'react-dom'
import { ThemeContext } from './ThemeProviderContext'
import { getContrastText } from '../utils/yiq'
import { isHexColor, type HexColor } from './types'

/** Props for the {@link ThemeProvider} component. */
export interface LithosThemeProps {
  /** Optional configuration override for accent color and border radius. */
  config?: {
    accentColor: string
    radius: number
  }

  /** React child nodes wrapped by the theme provider. */
  children: ReactNode
}

// static CSS rules defined outside component scope to avoid recreating on every render
const LITHOS_THEME_BASE_STYLES = `
  ::selection {
    background-color: var(--lithos-accent) !important;
    color: var(--lithos-accent-text) !important;
  }

  ::view-transition-old(root) {
    animation: none;
    z-index: 1;
  }

  ::view-transition-new(root) {
    animation: none;
    z-index: 2;
  }

  @keyframes liquid-wave {
    from {
      clip-path: circle(0px at 0% 0%);
    }
    to {
      clip-path: circle(150vmax at 0% 0%);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    ::view-transition-new(root) {
      animation: none;
    }
  }
`

// sync state with localStorage and dispatch events
const syncThemeProperty = (key: string, value: string, eventName?: string) => {
  localStorage.setItem(key, value)
  if (eventName) window.dispatchEvent(new Event(eventName))
}

/**
 * Provides global theme context, manages CSS custom properties, persistence,
 * and smooth animated view transitions for Lithos UI components.
 *
 * @param props - Configuration properties provided as {@link LithosThemeProps}.
 * @returns The rendered theme provider wrapper.
 */
export const ThemeProvider = ({ children, config }: LithosThemeProps) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Initialize from localStorage using direct string comparison
    return localStorage.getItem('lithos-theme-mode') === 'dark'
  })

  const isTransitioningRef = useRef(false)

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

  const applyThemeClasses = useCallback((dark: boolean) => {
    if (typeof document === 'undefined') return
    const root = document.documentElement
    const body = document.body

    if (dark) {
      root.classList.add('obsidian', 'dark')
      body.classList.add('obsidian', 'dark')
    } else {
      root.classList.remove('obsidian', 'dark')
      body.classList.remove('obsidian', 'dark')
    }
  }, [])

  // Single consolidated effect for localStorage sync & DOM class toggling
  useEffect(() => {
    syncThemeProperty('lithos-theme-color', accentColor, 'lithos-theme-color-changed')
    syncThemeProperty('lithos-theme-radius', radius.toString())

    const mode = isDarkMode ? 'dark' : 'light'
    syncThemeProperty('lithos-theme-mode', mode, 'lithos-theme-mode-changed')

    applyThemeClasses(isDarkMode)
  }, [accentColor, radius, isDarkMode, applyThemeClasses])

  // One-time setup for global selection styles & view transitions
  useEffect(() => {
    let styleTag = document.getElementById('lithos-static-styles')

    if (!styleTag) {
      styleTag = document.createElement('style')
      styleTag.id = 'lithos-static-styles'
      styleTag.textContent = LITHOS_THEME_BASE_STYLES
      document.head.appendChild(styleTag)
    } else {
      styleTag.textContent = LITHOS_THEME_BASE_STYLES
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

  const toggleObsidian = useCallback(() => {
    if (isTransitioningRef.current) return

    const nextMode = !isDarkMode

    const applyChange = () => {
      applyThemeClasses(nextMode)
      syncThemeProperty('lithos-theme-mode', nextMode ? 'dark' : 'light', 'lithos-theme-mode-changed')
      setIsDarkMode(nextMode)
    }

    const doc =
      typeof document !== 'undefined'
        ? (document as Document & {
            startViewTransition?: (updateCallback: () => void) => {
              ready: Promise<void>
              finished: Promise<void>
            }
          })
        : undefined

    if (!doc || typeof doc.startViewTransition !== 'function') {
      applyChange()
      return
    }

    isTransitioningRef.current = true

    // Light -> Dark sweeps from top-left (0% 0%)
    // Dark -> Light sweeps from bottom-right (100% 100%)
    const origin = nextMode ? '0% 0%' : '100% 100%'

    try {
      const transition = doc.startViewTransition(() => {
        flushSync(() => {
          applyChange()
        })
      })

      transition.ready
        .then(() => {
          document.documentElement.animate(
            {
              clipPath: [`circle(0px at ${origin})`, `circle(150vmax at ${origin})`],
            },
            {
              duration: 680,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              pseudoElement: '::view-transition-new(root)',
            }
          )
        })
        .catch(() => {})

      transition.finished
        .catch(() => {})
        .finally(() => {
          isTransitioningRef.current = false
        })
    } catch {
      applyChange()
      isTransitioningRef.current = false
    }
  }, [isDarkMode, applyThemeClasses])

  const value = useMemo(
    () => ({
      accentColor,
      radius,
      isDarkMode,
      updateAccentColor,
      toggleObsidian,
      updateRadius: (newRadius: number) => setRadius(newRadius),
    }),
    [accentColor, updateAccentColor, radius, isDarkMode, toggleObsidian]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
