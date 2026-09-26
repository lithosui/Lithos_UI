/**
 * @fileoverview Lithos UI Drawer context and hook utilities.
 * - Provides strict context boundaries and consumer hooks for accessing the drawer state.
 */
import { createContext, useContext } from 'react'
import type { DrawerMode } from './drawer.types'

export interface DrawerContextValue {
  /**
   * Current open state of the parent drawer.
   */
  open: boolean

  /**
   * Callback to request opening or closing the parent drawer.
   */
  onOpenChange: (open: boolean) => void

  /**
   * Rendering mode of the drawer.
   */
  mode?: DrawerMode

  /**
   * Indicates whether the current viewport matches the desktop breakpoint.
   */
  isDesktop?: boolean

  /**
   * Unique HTML `id` assigned to the `DrawerTitle` element.
   * - Used to associate the drawer container with its accessible title via `aria-labelledby`.
   * - Automatically generated or passed down through `DrawerContext`.
   */
  titleId?: string
}

export const DrawerContext = createContext<DrawerContextValue | null>(null)

export const useDrawer = () => {
  const context = useContext(DrawerContext)

  if (!context) throw new Error('useDrawer must be used within <Drawer>')

  return context
}
