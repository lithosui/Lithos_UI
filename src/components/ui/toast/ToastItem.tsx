/**
 * @fileoverview Lithos UI individual toast item.
 * - Renders a single accessible notification tile with adaptive dynamic contrast.
 * - Manages auto-dismiss timers with pause-on-hover interaction.
 * - Implements ARIA live regions and automatic focus trapping for error alerts.
 */
import { useState, useEffect, useRef } from 'react'
import { getContrastText } from '../../../utils/yiq'
import { colors } from '../../../utils/colors'
import { Button } from '../Button'
import { IconClose } from '../icons/IconClose'
import { cn } from '../../../utils/cn'
import type { ToastItemProps } from './toast.types'
import { DEFAULT_DURATION } from './toast.utils'

/**
 * Individual toast notification tile component.
 * Renders an accessible alert panel with dynamic color contrast, pause-on-hover timers,
 * and automatic focus management for error notifications.
 *
 * @param props - Customization, item data payload, and removal callback props.
 * @returns Accessible toast notification element.
 */
export const ToastItem = ({ toast, onRemove, className }: ToastItemProps) => {
  const { id, message, intent = 'default', color, title, duration, label } = toast
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

  const ariaLabel = label ?? 'Close notification'

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

        <Button
          onClick={onRemove}
          className="ml-3 shrink-0"
          aria-label={ariaLabel}
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
