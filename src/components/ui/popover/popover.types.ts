/**
 * @fileoverview Lithos UI popover primitive type definitions and interface declarations.
 * - Exports TypeScript types, configuration options, return signatures, and component props for popover elements.
 */
import type { ReactNode } from 'react'
import type { LithosElementProps } from '../../../core/types'
import {
  useInteractions,
  type ElementProps,
  type Placement,
  type UseFloatingReturn,
  type UseHoverProps,
  type UseRoleProps,
  type Middleware,
} from '@floating-ui/react'

/**
 * Configuration options for initializing floating popover behaviors and state.
 */
export interface PopoverOptions {
  /** Initial open state when uncontrolled. */
  initialOpen?: boolean

  /** Floating alignment placement relative to the reference trigger element. */
  placement?: Placement

  /** Enables modal dialog behavior, locking background focus and interaction. */
  modal?: boolean

  /** Controlled open state value. */
  open?: boolean

  /** Callback function triggered when the open state changes. */
  onOpenChange?: (open: boolean) => void

  /** Additional floating interaction arrays. */
  interactions?: ElementProps[]

  /** Pixel offset distance from the reference element. */
  offset?: number

  /** Enables or configures hover trigger interaction properties. */
  hover?: boolean | UseHoverProps

  /** ARIA role assigned to the popover floating surface. */
  role?: UseRoleProps['role']

  /** Automatically matches the floating panel width to the reference trigger element width. */
  matchTriggerWidth?: boolean

  /** Custom floating-ui middleware configurations. */
  middlewares?: Middleware[]
}

/**
 * Return signature contract provided by the `usePopover` state hook.
 */
export type PopoverReturn = {
  /** Current open visibility state. */
  open: boolean

  /** Setter function to update the open state. */
  setOpen: (open: boolean) => void

  /** Indicates whether modal mode is active. */
  modal?: boolean | undefined

  /** Unique HTML identifier associated with accessible labeling. */
  labelId: string

  /** Unique HTML identifier associated with accessible descriptions. */
  descriptionId: string
} & ReturnType<typeof useInteractions> &
  UseFloatingReturn

/**
 * Props configuration interface for the root `Popover` component.
 */
export interface PopoverProps extends PopoverOptions {
  /** Child nodes wrapped inside the popover provider context. */
  children: ReactNode
}

/**
 * Props configuration interface for the `PopoverClose` component.
 */
export interface PopoverCloseProps extends LithosElementProps<'button'> {
  /** Renders the child element directly as a close trigger via cloneElement. */
  asChild?: boolean
}

/**
 * Props configuration interface for the `PopoverContent` component.
 */
export interface PopoverContentProps extends LithosElementProps<'div'> {
  /** Renders the floating panel inside a portal container attached to the document body. */
  portaled?: boolean

  /** Animation transition duration in milliseconds. */
  transitionDuration?: number
}

/**
 * Props configuration interface for the `PopoverTrigger` component.
 */
export interface PopoverTriggerProps extends LithosElementProps<'button'> {
  /** Renders the child element directly as the reference trigger via cloneElement. */
  asChild?: boolean
}

/**
 * Context value type representing popover return states or null boundaries.
 */
export type PopoverContextType = PopoverReturn | null
