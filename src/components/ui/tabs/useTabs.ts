/**
 * @fileoverview Lithos UI tabs context and custom hook.
 * - Provides the React Context (`TabsContext`) for sharing state across tab primitives.
 * - Implements the `useTabs` custom hook with safety checks for context boundaries.
 */

import { createContext, useContext } from 'react'
import type { TabsContextValue } from './tabs.types'

/** React context used to share tabs state among parent and child components. */
export const TabsContext = createContext<TabsContextValue | undefined>(undefined)

/**
 * Custom hook to access the Tabs context.
 *
 * @throws Will throw an error if used outside of a Tabs provider.
 * @returns The current {@link TabsContextValue}.
 */
export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error('Tabs components must be used within a Tabs provider')
  }
  return context
}
