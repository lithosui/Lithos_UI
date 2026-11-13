import { createContext } from 'react'
import type { HexColor } from './types'

/**
 * Context type definition providing theme state and mutation methods
 * for the {@link ThemeProvider} component.
 */
export interface ThemeContextType {
  /** The current active accent color as a hexadecimal string. */
  accentColor: HexColor

  /** The current border radius value in pixels. */
  radius: number

  /** A boolean indicating whether dark/obsidian mode is currently enabled. */
  isDarkMode: boolean

  /** Function to update the active accent color. */
  updateAccentColor: (color: HexColor | string) => void

  /** Function to toggle between light and dark mode with view transition support. */
  toggleObsidian: () => void

  /** Function to update the global border radius. */
  updateRadius: (newRadius: number) => void
}

/** React context for accessing and mutating the Lithos UI theme state. */
export const ThemeContext = createContext<ThemeContextType | null>(null)
