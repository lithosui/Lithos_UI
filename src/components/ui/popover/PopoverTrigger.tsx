/**
 * @fileoverview Lithos UI popover trigger primitive.
 * - Attaches reference refs and accessibility attributes (`data-state`) to open or close the popover.
 * - Supports `asChild` composition via React `cloneElement` to forward props to custom children.
 */
import { cloneElement, isValidElement, type HTMLProps } from 'react'
import { useMergeRefs } from '@floating-ui/react'
import { usePopoverContext } from './usePopover'
import { cn } from '../../../utils/cn'
import type { PopoverTriggerProps } from './popover.types'

/**
 * Reference trigger element component attaching accessibility attributes and toggle interactions.
 *
 * @param props - Trigger properties including asChild composition flags and event handlers. - {@link PopoverTriggerProps}
 * @returns Trigger button element or cloned child element.
 */
export const PopoverTrigger = ({
  children,
  asChild = false,
  ref: propRef,
  className,
  ...props
}: PopoverTriggerProps) => {
  const { context, refs, getReferenceProps } = usePopoverContext()
  const ref = useMergeRefs([refs.setReference, propRef])

  const normalizedClass = cn(className)

  if (asChild && isValidElement(children)) {
    const childProps = children.props as Record<string, unknown>

    return cloneElement(
      children,
      getReferenceProps({
        ref,
        ...props,
        ...childProps,
        className: cn(normalizedClass, childProps['className'] as string),
        'data-state': context.open ? 'open' : 'closed',
      } as HTMLProps<HTMLButtonElement> & { 'data-state'?: string })
    )
  }

  return (
    <button
      ref={ref}
      type="button"
      data-state={context.open ? 'open' : 'closed'}
      className={normalizedClass}
      {...getReferenceProps(props)}
    >
      {children}
    </button>
  )
}
