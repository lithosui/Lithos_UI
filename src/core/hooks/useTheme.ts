import { useContext } from 'react'
import { ThemeContext } from '../ThemeProviderContext'

/**
 * A custom hook that provides access to the current theme context value.
 *
 * @returns The current theme context state and methods.
 * @throws {Error} Throws an error if used outside of a matching ThemeProvider.
 */
export const useTheme = () => {
  const context = useContext(ThemeContext)

  if (!context) throw Error('useTheme must be used within a ThemeProvider')

  return context
}
