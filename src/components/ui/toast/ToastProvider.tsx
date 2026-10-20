/**
 * @fileoverview Lithos UI toast provider and portal stack.
 * - Manages active toast notification queue state via React Context.
 * - Renders a fixed-position portal container to isolate alerts from page layout flow.
 * - Handles fallback and per-intent duration resolution for auto-dismiss timers.
 */
import { useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { ToastContext } from './useToast'
import { cn } from '../../../utils/cn'
import type { ToastProps, ToastProviderProps, IdentifiedToastProps } from './toast.types'
import { DEFAULT_DURATION, positionStyles } from './toast.utils'
import { ToastItem } from './ToastItem'

/**
 * Context provider and floating portal container for managing toast notifications.
 * Wraps the application tree to supply `addToast` and `removeToast` functions,
 * rendering active toasts inside a fixed DOM portal.
 *
 * @param props - Configuration props for default duration, position, and children.
 * @returns Provider wrapper with portal rendering for active toast items.
 */
export const ToastProvider = ({ children, duration, position = 'bottom-right', className }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<IdentifiedToastProps[]>([])

  const durationConfig =
    (typeof duration == 'object' &&
      Object.assign(
        {
          success: 5000,
          error: 8000,
          warning: 5000,
          info: 5000,
          default: 5000,
          accent: 5000,
        },
        duration
      )) ||
    null

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const addToast = useCallback(
    ({ message, intent = 'default', color, title, duration: customDuration }: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      let toastDuration = customDuration

      if (!customDuration && durationConfig) {
        toastDuration = durationConfig[intent]
      }

      // consumer passes a single duration for all the toast types
      if (typeof duration === 'number') {
        toastDuration = duration
      }

      // fallback duration
      if (!toastDuration) {
        toastDuration = DEFAULT_DURATION
      }

      setToasts((prev) => [
        ...prev,
        {
          id,
          message,
          intent,
          color,
          title,
          duration: toastDuration,
        },
      ])

      return id
    },
    [durationConfig, duration]
  )

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={cn(
              'fixed p-4 sm:p-6 md:p-8 z-50 pointer-events-none flex flex-col w-full max-w-xs',
              positionStyles[position],
              position.includes('left') ? 'items-start' : 'items-end',
              className
            )}
          >
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onRemove={() => removeToast(toast.id)} />
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}
