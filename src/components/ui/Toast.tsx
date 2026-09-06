/**
 * @fileoverview Lithos UI toast stack.
 * - Floats transient feedback outside the page flow so notifications never steal layout space.
 * - Uses explicit margins and fixed positioning to keep the stack predictable.
 * - Applies per-toast contrast and heavy borders so alerts read as hard objects.
 */
import { useState, useCallback, useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { getContrastText } from '../../utils/yiq'
import { ToastContext } from '../../core/hooks/useToast'
import type { ToastProps as CoreToastProps, ToastPosition } from '../../core/types'
import { colors } from '../../utils/colors'
import { Button } from './Button'
import { IconClose } from './icons/IconClose'
import { cn } from '../../utils/cn'

type IdentifiedToastProps = CoreToastProps & { id: string }

export interface ToastItemProps {
  toast: IdentifiedToastProps
  onRemove: () => void
  className?: string
}

type DurationObjType = {
  success?: number
  error?: number
  warning?: number
  info?: number
  default?: number
  accent?: number
}

export interface ToastProviderProps {
  children: ReactNode
  duration?: DurationObjType | number
  position?: ToastPosition
  className?: string
}

const positionStyles = {
  'top-left': 'top-0 left-0',
  'top-right': 'top-0 right-0',
  'bottom-left': 'bottom-0 left-0',
  'bottom-right': 'bottom-0 right-0',
}

const DEFAULT_DURATION = 5000

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
    ({ message, intent = 'default', color, title, duration: customDuration }: CoreToastProps) => {
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
      {/* - Fixed corner stack uses explicit padding and margins, not gap, so each toast remains independently dismissible. */}
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

export const ToastItem = ({ toast, onRemove, className }: ToastItemProps) => {
  const { id, message, intent = 'default', color, title, duration } = toast
  const [isHovered, setIsHovered] = useState(false)
  const toastRef = useRef<HTMLDivElement | null>(null)

  const isError = intent === 'error'

  useEffect(() => {
    if (!isError || !toastRef.current) return

    // save previously focused element to restore it later
    const previousFocus = document.activeElement as HTMLElement | null

    // move focus to toast tile
    toastRef.current.focus()

    return () => {
      // restore focus when toast unmounts if it's still inside document
      if (previousFocus && typeof previousFocus.focus === 'function') {
        previousFocus.focus()
      }
    }
  }, [isError])

  // Toast persists on hover; auto-dismiss timer pauses while hovered
  useEffect(() => {
    if (isHovered) return

    let timeout = duration
    if (!timeout) {
      timeout = DEFAULT_DURATION
    }

    const timer = setTimeout(onRemove, timeout)
    return () => clearTimeout(timer)
  }, [isHovered, onRemove, isError, duration])

  const isAccent = intent === 'accent'
  const bgColor = color || (isAccent ? 'var(--lithos-accent)' : colors[intent as keyof typeof colors]) || colors.default
  const textColor = isAccent && !color ? 'var(--lithos-accent-text)' : getContrastText(bgColor)

  const label = 'Close notification'

  const livePriority = isError ? 'assertive' : 'polite'
  const role = isError ? 'alert' : 'status'

  return (
    <>
      <style>{`
        /* - Per-toast override keeps contrast local to the alert tile. */
        .toast-override-${id} {
          background-color: ${bgColor} !important;
          color: ${textColor} !important;
        }
      `}</style>

      {/* - Stack spacing uses explicit margins so each toast keeps its own exit path. */}
      <div
        ref={toastRef}
        role={role}
        aria-live={livePriority}
        tabIndex={isError ? -1 : undefined}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          `toast-override-${id} pointer-events-auto border-2 border-(--lithos-border) p-3 sm:p-4 mb-4 w-full flex flex-row items-start shadow-[4px_4px_0_0_var(--lithos-shadow)] animate-[slide-up_0.3s_ease-out_forwards] rounded-(--lithos-radius)`,
          className
        )}
      >
        <div className="flex-1 mr-4">
          {title && <h4 className="font-black text-lg uppercase tracking-tighter leading-none mb-2 m-0">{title}</h4>}
          <p className="text-sm leading-tight m-0 font-body">{message}</p>
        </div>

        {/* - Close control keeps the same hard-edge language as the card. */}
        <Button
          onClick={onRemove}
          className="ml-3 shrink-0"
          aria-label={label}
          style={{
            backgroundColor: bgColor,
            borderColor: textColor,
            color: textColor,
            '--lithos-shadow': textColor,
          }}
        >
          <IconClose aria-hidden="true" />
        </Button>
      </div>
    </>
  )
}
