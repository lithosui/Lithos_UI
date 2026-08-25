/**
 * @fileoverview Lithos UI modal/dialog primitive.
 * - Always dismissible: closes on Escape, backdrop click, and the header close button (the button itself is
 *   optional per DialogHeader's `hideClose`, but Escape/backdrop always remain live).
 * - Panel is a flex column: DialogHeader/DialogFooter stay fixed, DialogBody is the only scrollable region.
 * - Traps focus inside the panel while open (`useFocusTrap`) and restores it to the trigger element on close.
 * - Contrast integrity: `intent` accents route through the shared color map, matching Alert/Toast.
 * - `CustomDialog` is a Header/Body/Footer composition of Dialog for custom action prompts.
 */
import {
  useEffect,
  useId,
  useRef,
  createContext,
  useContext,
  type ComponentPropsWithRef,
  type ReactNode,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'
import { useFocusTrap } from '../../core/hooks/useFocusTrap'
import { Button } from './Button'
import type { ButtonVariant } from '../../core/types'
import { IconClose } from './icons/IconClose'
import { cn } from '../../utils/cn'

export type DialogVariant = 'default' | 'simple' | 'bare'
export type DialogIntent = 'default' | 'success' | 'error' | 'warning' | 'info'
export type DialogSize = 'sm' | 'md' | 'lg' | 'xl'

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

interface DialogContextType {
  onClose: () => void
  titleId: string
  scrollable?: boolean
}

const DialogContext = createContext<DialogContextType | null>(null)

const useDialogContext = () => {
  const context = useContext(DialogContext)

  if (!context) {
    throw new Error('DialogHeader/DialogTitle/DialogBody/DialogFooter must be used within a Dialog')
  }

  return context
}

export interface DialogProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  open: boolean
  onClose: () => void
  variant?: DialogVariant | undefined
  intent?: DialogIntent | undefined
  size?: DialogSize | undefined
  offsetColor?: string | undefined
  scrollable?: boolean | undefined
  initialFocusRef?: RefObject<HTMLElement | null> | undefined
  className?: string
  children: ReactNode
}

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

  const classes = cn(
    'relative w-full flex flex-col max-h-[calc(100vh-2rem)] overflow-hidden animate-[brutalist-pop_0.15s_ease-out] rounded-(--lithos-radius)',
    sizeClass[size],
    variantClass[variant],
    className
  )

  return createPortal(
    <DialogContext.Provider value={{ onClose, titleId, scrollable }}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
            ...(offsetColor && variant === 'default' ? { boxShadow: `6px 6px 0px 0px ${offsetColor}` } : {}),
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

export interface DialogHeaderProps extends ComponentPropsWithRef<'div'> {
  icon?: ReactNode
  hideClose?: boolean
  children: ReactNode
}

export const DialogHeader = ({ icon, hideClose = false, className, children, ref, ...rest }: DialogHeaderProps) => {
  const { onClose, scrollable } = useDialogContext()

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-start justify-between shrink-0 p-4 sm:p-6',
        scrollable && 'border-b-2 border-(--lithos-border)',
        className
      )}
      {...rest}
    >
      <div className="flex items-start flex-1 mr-4">
        {icon && (
          <span className="inline-flex shrink-0 mr-3" aria-hidden="true">
            {icon}
          </span>
        )}
        <div className="flex-1">{children}</div>
      </div>

      {!hideClose && (
        <Button onClick={onClose} variant="text" className="shrink-0 -mr-2 -mt-2" aria-label="Close dialog">
          <IconClose aria-hidden="true" />
        </Button>
      )}
    </div>
  )
}

export interface DialogTitleProps extends ComponentPropsWithRef<'h2'> {
  children: ReactNode
}

export const DialogTitle = ({ className, children, ref, ...rest }: DialogTitleProps) => {
  const { titleId } = useDialogContext()

  return (
    <h2
      id={titleId}
      ref={ref}
      className={cn('text-xl font-black uppercase tracking-tight leading-none m-0', className)}
      {...rest}
    >
      {children}
    </h2>
  )
}

export interface DialogBodyProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode
}

export const DialogBody = ({ className, children, ref, ...rest }: DialogBodyProps) => {
  return (
    <div ref={ref} className={cn('flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 font-body', className)} {...rest}>
      {children}
    </div>
  )
}

export interface DialogFooterProps extends ComponentPropsWithRef<'div'> {
  children: ReactNode
}

export const DialogFooter = ({ className, children, ref, ...rest }: DialogFooterProps) => {
  const { scrollable } = useDialogContext()

  return (
    <div
      ref={ref}
      className={cn(
        'flex items-center justify-end shrink-0 p-4 sm:p-6',
        scrollable && 'border-t-2 border-(--lithos-border)',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

export interface CustomDialogProps {
  open: boolean
  onClose: () => void
  onAction: () => void
  title: string
  message: ReactNode
  actionLabel?: string
  cancelLabel?: string
  buttonVariant?: ButtonVariant
  buttonColor?: string
  offsetColor?: string
  scrollable?: boolean
  size?: DialogSize
  icon?: ReactNode
}

/**
 * Flexible cancel/action composition of Dialog.
 * Exposes offset shadow and button styling for custom prompts like destructive deletes.
 */
export const CustomDialog = ({
  open,
  onClose,
  onAction,
  title,
  message,
  actionLabel = 'Confirm',
  cancelLabel = 'Cancel',
  buttonVariant = 'primary',
  buttonColor,
  offsetColor,
  scrollable = false,
  size = 'md',
  icon,
}: CustomDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} size={size} offsetColor={offsetColor} scrollable={scrollable}>
      <DialogHeader icon={icon}>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      <DialogBody>{typeof message === 'string' ? <p className="m-0 font-body">{message}</p> : message}</DialogBody>
      <DialogFooter>
        <Button variant="text" onClick={onClose} className="mr-2">
          {cancelLabel}
        </Button>
        <Button onClick={onAction} variant={buttonVariant} color={buttonColor}>
          {actionLabel}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}
