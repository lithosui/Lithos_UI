import { createContext } from 'react'
import type { HexColor } from './types'

export type LithosMotion = 'pop' | 'sink' | 'lift' | 'stamp' | 'flip' | 'spring' | 'flat'
export type LithosEffect = 'none' | 'gradient' | 'glint' | 'stripes' | 'dots'

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

  /** The active interactive click/hover physics preset. */
  motion: LithosMotion

  /** The active surface gradient/sheen effect preset. */
  effect: LithosEffect

  /** Function to update the active accent color. */
  updateAccentColor: (color: HexColor | string) => void

  /** Function to toggle between light and dark mode with view transition support. */
  toggleObsidian: () => void

  /** Function to update the global border radius. */
  updateRadius: (newRadius: number) => void

  /** Function to update the global interactive motion preset. */
  updateMotion: (motion: LithosMotion) => void

  /** Function to update the global surface effect preset. */
  updateEffect: (effect: LithosEffect) => void
}

/** React context for accessing and mutating the Lithos UI theme state. */
export const ThemeContext = createContext<ThemeContextType | null>(null)
