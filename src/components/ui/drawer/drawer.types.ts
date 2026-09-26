/**
 * @fileoverview Lithos UI Drawer type definitions and interface declarations.
 * - Exports TypeScript types, unions, and accessibility-compliant props for drawer components and hooks.
 */
import type { ReactNode } from 'react'
import type { LithosClass } from '../../../utils/cn'

export type DrawerHorizontalPlacement = 'left' | 'right'
export type DrawerVerticalPlacement = 'top' | 'bottom'
export type DrawerPlacement = DrawerHorizontalPlacement | DrawerVerticalPlacement
export type DrawerTransition = 'slide' | 'fade' | 'zoom'
export type DrawerTransformOrigin =
  'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
export type DrawerMode = 'default' | 'responsive'
export type DrawerTransitionDuration = number | { enter: number; exit: number }

type AccessibleNameProps =
  | {
      /**
       * Accessible label for the drawer. Required if `aria-labelledby` is not provided.
       */
      'aria-label': string
      'aria-labelledby'?: string
    }
  | {
      'aria-label'?: string
      /**
       * ID of the element that labels the drawer. Required if `aria-label` is not provided.
       */
      'aria-labelledby': string
    }

export type DrawerProps = AccessibleNameProps & {
  /**
   * Controls the open state of the drawer.
   */
  open: boolean

  /**
   * Callback fired when the drawer open state changes.
   */
  onOpenChange: (open: boolean) => void

  /**
   * Transition effect applied when opening or closing the drawer.
   * @default 'slide'
   */
  transition?: DrawerTransition

  /**
   * Origin point for CSS transform animations.
   * @default 'center'
   */
  transformOrigin?: DrawerTransformOrigin

  /**
   * Content to render inside the drawer.
   */
  children: ReactNode

  /**
   * Callback fired when the enter transition starts.
   */
  onEnter?: () => void

  /**
   * Callback fired when the exit transition ends.
   */
  onExit?: () => void

  /**
   * Additional CSS classes for the drawer main panel container.
   */
  className?: LithosClass

  /**
   * Additional CSS classes for the backdrop overlay.
   */
  backdropClass?: LithosClass

  /**
   * ID of the element that describes the drawer content for screen readers.
   */
  'aria-describedby'?: string

  /**
   * Transition duration in milliseconds. Can be a single number or an object with `enter` and `exit` values.
   * @default 150
   */
  transitionDuration?: DrawerTransitionDuration

  /**
   * Whether to display a visual swipe handle indicator.
   * @default placement === 'bottom' || placement === 'top'
   */
  indicator?: boolean

  /**
   * Accessible label for the swipe handle indicator.
   */
  indicatorLabel?: string

  /**
   * If `true`, drag/swipe gestures will only trigger when dragging directly from the handle indicator.
   * @default false
   */
  swipeOnlyOnIndicator?: boolean

  /**
   * Whether swipe/drag gesture is allowed directly on the drawer content.
   * If set to `false`, interactive elements won't capture pointer drag events.
   * @default true
   */
  allowSwipeOnContent?: boolean

  /**
   * Minimum swipe distance in pixels required to trigger the close action.
   * @default 100
   */
  threshold?: number

  /**
   * Drawer rendering mode. Responsive mode automatically converts to a Dialog on desktop.
   * @default 'default'
   */
  mode?: DrawerMode

  /**
   * Placement edge where the drawer enters from.
   * @default mode === 'responsive' ? 'bottom' : 'right'
   */
  placement?: DrawerPlacement

  /**
   * Trigger element used to open the drawer.
   */
  trigger?: ReactNode
}

export interface UseDrawerSwipeOptions {
  /**
   * Placement orientation for gesture detection.
   */
  placement: DrawerPlacement

  /**
   * Current open state.
   */
  open: boolean

  /**
   * Handler called when a swipe threshold is met to request closing.
   */
  onClose: () => void

  /**
   * Distance threshold in pixels required to register a swipe gesture.
   * @default 100
   */
  threshold?: number

  /**
   * Whether swipe gesture is enabled on the target element.
   * @default true
   */
  allowSwipeOnContent?: boolean
}
