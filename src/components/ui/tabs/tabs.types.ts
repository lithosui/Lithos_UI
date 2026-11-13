/**
 * @fileoverview Lithos UI tabs types and interfaces.
 * - Defines all TypeScript types and props for the Tabs component family.
 * - Includes layout variants (`TabsVariants`), context configuration, and element props.
 */

import type { LithosElementProps } from '../../../core/types'

/** Available visual layout variants for the Tabs system. */
export type TabsVariants = 'default' | 'underline' | 'vertical'

/** Context value interface for sharing tab state and configuration across subcomponents. */
export interface TabsContextValue {
  /** The currently active tab value. */
  value: string

  /** Function to update the active tab value. */
  onValueChange: (value: string) => void

  /**
   * The visual layout variant of the tabs system.
   * @default 'default'
   */
  variant?: TabsVariants
}

/** Props for the Tabs root container component. */
export interface TabsProps extends LithosElementProps<'div'> {
  /** The initial active tab value for uncontrolled usage. */
  defaultValue?: string

  /** The active tab value for controlled usage. */
  value?: string

  /** Event handler triggered when the active tab value changes. */
  onValueChange?: (value: string) => void

  /**
   * The visual layout variant of the tabs system.
   * @default 'default'
   */
  variant?: TabsVariants
}

/** Props for the TabsList component. */
export type TabsListProps = LithosElementProps<'div'>

/** Props for the TabsTrigger component. */
export interface TabsTriggerProps extends LithosElementProps<'button'> {
  /** The unique value associated with this tab trigger. */
  value: string
}

/** Props for the TabsContent component. */
export interface TabsContentProps extends LithosElementProps<'div'> {
  /** The unique value that links this content panel to a specific tab trigger. */
  value: string
}
