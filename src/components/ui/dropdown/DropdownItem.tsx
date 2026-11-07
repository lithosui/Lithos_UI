/**
 * @fileoverview Lithos UI DropdownItem primitive.
 * - Interactive action item rendered as a text variant `Button` with `role="menuitem"`.
 * - Automatically dismisses the parent dropdown menu (`setOpen(false)`) upon click or key activation (`Enter`/`Space`).
 * - Skips interaction handlers and prevents pointer events when `disabled`.
 */
import type { MouseEvent, KeyboardEvent } from 'react'
import { Button } from '../Button'
import { usePopoverContext } from '../popover/usePopover'
import { cn } from '../../../utils/cn'
import { useListItem } from '@floating-ui/react'
import { menuItemClass } from './Dropdown'
import type { DropdownItemProps } from './dropdown.types'

/**
 * Individual action item button component for dropdown menus.
 *
 * @param props - Item configuration properties including click handlers, disabled states, and children content. - {@link DropdownItemProps}
 * @returns Menu item button element.
 */
export const DropdownItem = ({ children, disabled, onClick, onKeyDown, className, ...props }: DropdownItemProps) => {
  const { ref, index } = useListItem()
  const { setOpen } = usePopoverContext()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled) return

    onClick?.(e)
    setOpen(false)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return

    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick(e as unknown as MouseEvent<HTMLButtonElement>)
    }

    onKeyDown?.(e)
  }

  return (
    <Button
      ref={ref}
      variant="text"
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      disabled={disabled}
      data-index={index}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(menuItemClass, className)}
      {...props}
    >
      {children}
    </Button>
  )
}
