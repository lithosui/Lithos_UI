/**
 * @fileoverview Lithos UI toast type definitions and interfaces.
 * - Defines intent variants, screen placement options, and auto-dismiss duration mappings.
 * - Specifies prop contracts for ToastProvider, individual ToastItem, and Context dispatchers.
 */
import type { ReactNode } from 'react'
import type { HexColor } from '../../../core/types'
import type { LithosClass } from '../../../utils/cn'

/**
 * Visual intent or status variant for a toast notification.
 */
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'default' | 'accent'

/**
 * Screen corner placement where toast notifications are positioned.
 */
export type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

/**
 * Options for dispatching an individual toast notification.
 */
export interface ToastProps {
  /**
   * Visual style variant representing the status or intent.
   * @default 'default'
   */
  intent?: ToastType | undefined

  /**
   * Optional header title text.
   */
  title?: string | undefined

  /**
   * Primary message text displayed inside the toast.
   */
  message: string

  /**
   * Custom background or accent color override.
   */
  color?: HexColor | string | undefined

  /**
   * Display duration in milliseconds before auto-dismissing.
   */
  duration?: number | undefined

  /**
   * Accessible ARIA label for the close button.
   * @default 'Close notification'
   */
  label?: string
}

/**
 * Toast configuration payload combined with a unique identifier used for state management and animations.
 */
export type IdentifiedToastProps = ToastProps & { id: string }

/**
 * Props for the individual rendered Toast item component.
 */
export interface ToastItemProps {
  /**
   * Toast configuration payload including its unique internal identifier.
   */
  toast: IdentifiedToastProps

  /**
   * Callback function triggered when dismissing or removing the toast.
   */
  onRemove: () => void

  /**
   * Custom CSS class names applied to the toast item element.
   */
  className?: LithosClass
}

/**
 * Custom auto-dismiss duration configuration mapping specific toast intents to display times in milliseconds.
 */
export type DurationObjType = {
  success?: number
  error?: number
  warning?: number
  info?: number
  default?: number
  accent?: number
}

/**
 * Props for the `ToastProvider` wrapper component.
 */
export interface ToastProviderProps {
  /**
   * Application tree or elements wrapped by the toast context.
   */
  children: ReactNode

  /**
   * Default auto-dismiss duration in milliseconds.
   * Accepts a single number for all toasts or an object specifying per-intent durations.
   * @default 5000
   */
  duration?: DurationObjType | number

  /**
   * Screen position where toast notifications will appear.
   * @default 'bottom-right'
   */
  position?: ToastPosition

  /**
   * Custom CSS class names applied to the floating toast container wrapper.
   */
  className?: LithosClass
}

/**
 * Context payload contract for dispatching and removing toast notifications.
 */
export interface ToastContextType {
  /**
   * Dispatches a new toast notification and returns its unique generated ID.
   */
  addToast: (props: ToastProps) => string

  /**
   * Manually dismisses an active toast notification by its unique ID.
   */
  removeToast: (id: string) => void
}
