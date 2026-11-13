/**
 * @fileoverview Type definitions for Lithos UI Sidebar primitive suite.
 * - Discriminated union types supporting both button and polymorphic `asChild` child delegation (`SidebarItemProps`).
 * - Accessible landmark role mappings, layout modes, and strict type safety for compound sidebar subcomponents.
 */
import type { ReactNode, ElementType, Dispatch, SetStateAction } from 'react'
import type { LithosClass } from '../../../utils/cn'
import type { ButtonProps } from '../Button'
import type { AsChildProps, LithosElementProps } from '../../../core/types'
import type { TooltipProps } from '../Tooltip'
import type { TypographyVariants, TypographyProps } from '../Typography'

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
 * Type for updating the sidebar open state,
 * Accepts either a boolean value or an updater function `(prev: boolean) => boolean`.
 */
export type SidebarSetOpen = Dispatch<SetStateAction<boolean>>

/**
 * HTML container elements mapped from ARIA landmark roles.
 */
export type SidebarContainerElement = 'div' | 'section' | 'nav' | 'aside'

/**
 * Visual alignment side of the sidebar content and internal children.
 *
 * @remarks
 * This property does NOT position or float the sidebar container itself within the DOM.
 * Position placement in the page layout must be handled via parent CSS layout (e.g., flex or grid).
 * Using `'right'` flips internal item order, borders, and default trigger icon directions.
 */
export type SidebarPlacement = 'left' | 'right'

/**
 * Props for the root `Sidebar` provider wrapper.
 */
export interface SidebarProps extends LithosElementProps<'div'> {
  /** Controls whether the mini sidebar is expanded. */
  open?: boolean

  /** Initial expansion state when used in uncontrolled mode. Default: `true`. */
  defaultOpen?: boolean

  /** State updater callback for `open`. */
  setOpen?: SidebarSetOpen

  /** Layout mode of the sidebar. Default: `'permanent'`. */
  mode?: SidebarMode

  /** ARIA landmark role that defines the semantic container tag. Default: `'complementary'`. */
  role?: SidebarRole

  /** Children nodes. */
  children?: ReactNode

  /**
   * Layout side where the sidebar is positioned in the application.
   * Controls the directional orientation of default chevron icons and tooltips.
   * Default: `'left'`.
   */
  placement?: SidebarPlacement

  /**
   * Width breakpoints in pixels for snap/resize steps.
   * @default [64, 128, 224]
   */
  breakpoints?: number[]
}

/**
 * Props for the main structural container of the sidebar.
 */
export type SidebarContentProps<T extends ElementType = 'aside'> = {
  /**
   * Whether swipe/drag gesture is allowed directly on the sidebar content.
   * If `false`, interactive elements won't capture pointer drag events.
   * @default true
   */
  allowSwipeOnContent?: boolean

  /**
   * Accessible label for the resizer separator handle.
   * @default 'Resize sidebar'
   */
  resizerAriaLabel?: string

  /**
   * Additional CSS classes for the resizer handle container.
   */
  resizerClass?: LithosClass

  /**
   * Additional CSS classes for the resizer handle indicator line.
   */
  resizerIndicatorClass?: LithosClass

  /**
   * Custom element or render function for the resizer handle.
   */
  resizer?: ReactNode

  /**
   * Additional pixel threshold beyond the collapsed width required
   * to toggle the `open` state to `true` during active dragging.
   * Helps prevent flickering caused by accidental micro-gestures.
   * @default 8
   */
  openThresholdOffset?: number
} & LithosElementProps<T>

/** Base properties shared across all SidebarTrigger variants. */
export type BaseSidebarTriggerProps = {
  /** Custom icon or content for the toggle button. */
  children?: ReactNode

  /** Additional CSS classes for the button. */
  className?: LithosClass

  /** Accessible label added to the trigger button. */
  label?: string

  /** Pixel dimension for default render icons. Default: `18`. */
  iconSize?: number

  /**
   * Whether to disable the tooltip wrapper.
   * Default: `false`.
   */
  disableTooltip?: boolean

  /**
   * Placement orientation for the trigger tooltip.
   * Default: `'right'` (or `'left'` when placement is `'right'`).
   */
  tooltipPlacement?: TooltipProps['placement']

  /**
   * Keyboard shortcut combination to toggle the sidebar state globally (e.g., `'ctrl+b'`, `'cmd+b'`).
   * Supports `ctrl`, `cmd`, `meta`, `alt`, `shift` combinators.
   * Set to `null` or `undefined` to disable the shortcut.
   * Default: `'ctrl+b'`.
   */
  shortcutKey?: string | null
}

/**
 * Component props for SidebarTrigger, supporting both standard button rendering
 * and child component delegation via `asChild`.
 */
export type SidebarTriggerProps<T extends ElementType = 'button'> = AsChildProps<BaseSidebarTriggerProps, 'button', T>

/** Base properties shared across all SidebarItem variants. */
export type BaseSidebarItemProps = {
  /** Icon displayed on the left or centered when collapsed. */
  icon?: ReactNode

  /** Active navigation state. */
  active?: boolean

  /** Additional CSS classes. */
  className?: LithosClass

  /** Variant added to the internal Typography
   * @default label
   */
  textVariant?: TypographyVariants

  /** Additional CSS classes added to the internal Typography */
  textClass?: LithosClass
}

/**
 * Component props for SidebarItem, supporting both standard button rendering
 * and child component delegation via `asChild`.
 */
export type SidebarItemProps<T extends ElementType = 'button'> = AsChildProps<
  BaseSidebarItemProps & Omit<ButtonProps, 'className'>,
  'button',
  T
>

/**
 * Component props for the SidebarHeader, accepts every HTMLDivElement
 * properties.
 */
export type SidebarHeaderProps = LithosElementProps<'div'>

/**
 * Component props for the SidebarTitle, accepts same props as the Typography
 * primitive.
 */
export type SidebarTitleProps = TypographyProps
