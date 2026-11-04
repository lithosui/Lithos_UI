/**
 * @fileoverview Lithos UI modal/dialog primitive wrapper component.
 * - Manages focus trapping, portal rendering, background scroll locking, and Escape/backdrop dismissal handlers.
 */
import { useEffect, useId, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../../core/hooks/useFocusTrap'
import { cn } from '../../../utils/cn'
import { colors } from '../../../utils/colors'
import type { DialogSize, DialogVariant, DialogProps } from './dialog.types'
import { DialogContext } from './useDialog'

const sizeClass: Record<DialogSize, string> = {
  sm: 'max-w-sm', // 384px
  md: 'max-w-lg', // 512px
  lg: 'max-w-2xl', // 672px
  xl: 'max-w-4xl', // 896px
}

const variantClass: Record<DialogVariant, string> = {
  default:
    'bg-(--lithos-surface) text-(--lithos-text) border-2 border-(--lithos-border) shadow-[6px_6px_0_0_var(--lithos-shadow)]',
  simple: 'bg-(--lithos-surface) text-(--lithos-text) border-2 border-(--lithos-border)',
  bare: '',
}

/**
 * Root modal dialog overlay component rendering content inside a portal with focus trapping and accessibility support.
 *
 * @param props - Dialog container configuration properties including open state, sizing, variants, and close handlers. - {@link DialogProps}
 * @returns Dialog portal container element or null if closed.
 */
export const Dialog = ({
  open,
  onClose,
  variant = 'default',
  intent = 'default',
  size = 'md',
  offsetColor,
  scrollable = false,
  initialFocusRef,
  className,
  children,
  style,
  ref,
  ...rest
}: DialogProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null)
  const titleId = useId()

  useFocusTrap(panelRef, open, initialFocusRef)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  // locks background scroll for the lifetime of the overlay
  // compensates with padding-right so the removed scrollbar doesn't shift page content
  useEffect(() => {
    if (!open) return

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow
    const previousPaddingRight = document.body.style.paddingRight

    document.body.style.overflow = 'hidden'
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.setProperty('--removed-scrollbar-width', `${scrollbarWidth}px`)
    }

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.paddingRight = previousPaddingRight
      document.body.style.removeProperty('--removed-scrollbar-width')
    }
  }, [open])

  if (!open || typeof document === 'undefined') return null

  const intentColor = intent !== 'default' ? colors[intent] : undefined
  const shadowColor = offsetColor ?? intentColor

  const classes = cn(
    'relative w-full flex flex-col max-h-[calc(100vh-2rem)] overflow-hidden animate-[brutalist-pop_0.15s_ease-out] rounded-(--lithos-radius)',
    sizeClass[size],
    variantClass[variant],
    className
  )

  return createPortal(
    <DialogContext.Provider value={{ onClose, titleId, scrollable }}>
      <div className={cn('fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-(--lithos-z-modal)')}>
        <div
          className="absolute inset-0 bg-black/60 animate-[fade-in_0.15s_ease-out]"
          onClick={onClose}
          aria-hidden="true"
        />

        <div
          ref={(node: HTMLDivElement | null) => {
            panelRef.current = node
            if (typeof ref === 'function') ref(node)
            else if (ref) ref.current = node
          }}
          role={intent === 'error' ? 'alertdialog' : 'dialog'}
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={classes}
          style={{
            ...(intentColor && variant !== 'bare' ? { borderColor: intentColor } : {}),
            ...(shadowColor && variant === 'default' ? { boxShadow: `6px 6px 0px 0px ${shadowColor}` } : {}),
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      </div>
    </DialogContext.Provider>,
    document.body
  )
}
