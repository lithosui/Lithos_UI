import { createContext } from 'react'
import type { HexColor } from './types'

export interface ThemeContextType {
  accentColor: HexColor
  radius: number
  isDarkMode: boolean
  updateAccentColor: (color: HexColor | string) => void
  toggleObsidian: () => void
  updateRadius: (newRadius: number) => void
}

export const ThemeContext = createContext<ThemeContextType | null>(null)
