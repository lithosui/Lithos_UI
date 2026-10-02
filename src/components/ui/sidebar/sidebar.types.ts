import type { ReactNode, ComponentPropsWithRef, ElementType } from 'react'
import type { LithosClass } from '../../../utils/cn'
import type { ButtonProps } from '../Button'

/**
 * Defines the behavior mode of the sidebar.
 * - 'permanent': Always displayed at expanded width.
 * - 'mini': Can toggle between expanded and collapsed widths.
 */
export type SidebarMode = 'permanent' | 'mini'

/**
 * Accessible ARIA landmarks mapped to container HTML elements.
 */
export type SidebarRole = 'complementary' | 'region' | 'navigation'

/**
 * Callback function to update the sidebar open/collapsed state.
 */
export type SidebarSetOpen = (open: boolean) => void

/**
 * HTML container elements mapped from ARIA landmark roles.
 */
export type SidebarContainerElement = 'div' | 'section' | 'nav' | 'aside'

/**
 * Props for the root `Sidebar` provider wrapper.
 */
export interface SidebarProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  /** Controls whether the mini sidebar is expanded. */
  open?: boolean

  /** State updater callback for `open`. */
  setOpen?: SidebarSetOpen

  /** Layout mode of the sidebar. Default: `'permanent'`. */
  mode?: SidebarMode

  /** ARIA landmark role that defines the semantic container tag. Default: `'complementary'`. */
  role?: SidebarRole

  /** Children nodes. */
  children?: ReactNode

  /** Additional CSS classes for the root container. */
  className?: LithosClass
}

/**
 * Props for the main structural container of the sidebar.
 */
export type SidebarContentProps<T extends ElementType = 'aside'> = {
  /** Tailwind width class for collapsed state (e.g. `'w-16'`). */
  collapsedWidth?: string

  /** Tailwind width class for expanded state (e.g. `'w-56'`). */
  expandedWidth?: string

  /** Additional CSS classes. */
  className?: LithosClass
} & Omit<ComponentPropsWithRef<T>, 'className'>

/**
 * Props for the trigger button that toggles sidebar state.
 */
export interface SidebarTriggerProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  /** Custom icon or content for the toggle button. */
  children?: ReactNode

  /** Additional CSS classes for the button. */
  className?: LithosClass

  /** Accessible label added to the trigger button.*/
  label?: string
}

/**
 * Props for individual interactive navigation items inside the sidebar.
 */
export interface SidebarItemProps extends ButtonProps {
  /** Icon displayed on the left or centered when collapsed. */
  icon?: ReactNode

  /** Active navigation state. */
  active?: boolean

  /** Additional CSS classes. */
  className?: LithosClass
}
