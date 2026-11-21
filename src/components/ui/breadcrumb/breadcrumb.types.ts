/**
 * @fileoverview Lithos UI breadcrumb type definitions and interfaces.
 * - Defines structured item payloads, element properties, and configuration variants for navigation paths.
 */
import type { MouseEventHandler, ReactNode } from 'react'
import type { LithosElementProps } from '../../../core/types'

/** Available Breadcrumb modes */
export type BreadcrumbMode = 'default' | 'collapsible'

/**
 * Data payload structure defining an individual breadcrumb step item.
 */
export interface BreadcrumbItemData {
  /** Text label displayed inside the breadcrumb step. */
  label: string

  /** Navigation hyperlink target. */
  href?: string

  /** Custom icon node rendered alongside the label. */
  icon?: ReactNode

  /** Explicitly marks the item as the current active page. */
  active?: boolean

  /** Click event handler for the breadcrumb link. */
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

/**
 * Props for the root `Breadcrumb` navigation component.
 */
export interface BreadcrumbProps extends LithosElementProps<'nav'> {
  /** Array of structured breadcrumb navigation items. */
  items?: BreadcrumbItemData[]

  /** Enables collapsible mode for long breadcrumb lists. */
  mode?: BreadcrumbMode

  /** Custom separator node rendered between items. */
  separator?: ReactNode

  /** Automatically prepends a home icon to the first item if no icon is specified. */
  showHomeIcon?: boolean

  /** Optional prefix text or nodes rendered before the breadcrumb list. */
  humanPrefix?: ReactNode

  /** Maximum number of items allowed before auto-collapsing. */
  maxItems?: number

  /** Number of items to keep visible at the start when collapsed. */
  itemsBeforeCollapse?: number

  /** Number of items to keep visible at the end when collapsed. */
  itemsAfterCollapse?: number
}

/**
 * Props for individual `BreadcrumbItem` wrapper elements.
 */
export type BreadcrumbItemProps = LithosElementProps<'li'>

/**
 * Props for the `BreadcrumbLink` component.
 */
export interface BreadcrumbLinkProps extends LithosElementProps<'a'> {
  /** Hyperlink destination URL. */
  href?: string | undefined

  /** Click handler callback. */
  onClick?: MouseEventHandler<HTMLAnchorElement> | undefined
}

/**
 * Props for the current active `BreadcrumbPage` component.
 */
export type BreadcrumbPageProps = LithosElementProps<'span'>

/**
 * Props for the `BreadcrumbEllipsis` collapse-toggle component.
 */
export interface BreadcrumbEllipsisProps extends LithosElementProps<'button'> {
  /** Click handler triggered to expand or collapse hidden items. */
  onClick?: () => void

  /** Indicates whether the collapsed section is currently expanded. */
  isExpanded?: boolean
}

/**
 * Props for the `BreadcrumbList` container.
 */
export type BreadcrumbListProps = LithosElementProps<'ol'>
