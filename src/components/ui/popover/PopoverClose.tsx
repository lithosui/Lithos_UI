/**
 * @fileoverview Lithos UI popover action close primitive.
 * - Closes the active popover on click while safely executing any existing `onClick` handlers.
 * - Supports `asChild` composition to convert any custom element into a dismiss trigger.
 */
import { cloneElement, isValidElement, type HTMLProps, type MouseEvent } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './usePopover'
import { cn } from '../../../utils/cn'
import type { PopoverCloseProps } from './popover.types'

/**
 * Action close trigger component that dismisses the active popover on click or interaction.
 *
 * @param props - Close trigger properties including asChild composition flags and click handlers. - {@link PopoverCloseProps}
 * @returns Close button element or cloned child element.
 */
export const PopoverClose = ({
  children,
  asChild = false,
  onClick,
  ref: propRef,
  className,
  ...props
}: PopoverCloseProps) => {
  const { setOpen } = usePopoverContext()
  const childrenRef = isValidElement(children)
    ? (children as React.ReactElement & { ref?: React.Ref<unknown> }).ref
    : undefined
  const ref = useMergeRefs([propRef, childrenRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    return cloneElement(children, {
      ref,
      ...props,
      className: normalizedClass,
      ...(children.props as Record<string, unknown>),
      onClick: (e: MouseEvent<HTMLElement>) => {
        onClick?.(e as MouseEvent<HTMLButtonElement>)
        const childOnClick = (children.props as Record<string, unknown>)['onClick']
        if (typeof childOnClick === 'function') {
          childOnClick(e)
        }
        setOpen(false)
      },
    } as HTMLProps<HTMLButtonElement>)
  }

  return (
    <button
      type="button"
      ref={propRef}
      onClick={(e) => {
        onClick?.(e)
        setOpen(false)
      }}
      className={normalizedClass}
      {...props}
    >
      {children}
    </button>
  )
}
