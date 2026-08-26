/**
 * @fileoverview Lithos UI select option item.
 * - Represents an individual selectable option supporting single and multi-selection active states.
 * - Handles keyboard activation (Enter/Space) and mouse click events to trigger value changes.
 * - Registers item index dynamically with Floating UI for smooth keyboard list navigation.
 */
import type { ReactNode, ComponentPropsWithRef, MouseEvent, KeyboardEvent } from 'react'
import { useListItem } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useSelect } from './useSelect'
import { getContrastText } from '../../../utils/yiq'
import { useAccentColor } from '../../../core/useAccentColor'

export interface SelectItemProps extends Omit<ComponentPropsWithRef<'li'>, 'className'> {
  value: string
  disabled?: boolean
  children: ReactNode
  className?: LithosClass
  index?: number
}

export const SelectItem = ({ value, disabled, children, className, index, ...rest }: SelectItemProps) => {
  const { selectedValue, handleSelect, activeIndex, multiple } = useSelect()
  const { accentColor } = useAccentColor()
  const fgColor = getContrastText(accentColor)

  const { ref, index: itemIndex } = useListItem({
    label: typeof children === 'string' ? children : undefined,
  })

  const currentIndex = index ?? itemIndex
  const isActive = activeIndex === currentIndex

  const isSelected = multiple && Array.isArray(selectedValue) ? selectedValue.includes(value) : selectedValue === value

  const handleClick = (e: MouseEvent<HTMLLIElement>) => {
    if (!disabled) handleSelect(value, e)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLLIElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault()
      handleSelect(value, e)
    }
  }

  return (
    <li
      ref={ref}
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-active={isActive ? 'true' : undefined}
      data-index={currentIndex}
      tabIndex={isActive ? 0 : -1}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      style={{ color: isSelected ? fgColor : 'var(--lithos-text)' }}
      className={cn(
        'cursor-pointer select-none px-3 py-1.5 text-sm outline-none',

        // both active and not active states uses the same font weight
        isSelected && 'font-bold',

        isSelected
          ? isActive
            ? 'bg-(--lithos-accent)/75'
            : 'bg-(--lithos-accent)'
          : isActive
            ? 'bg-(--lithos-accent)/20'
            : 'hover:bg-(--lithos-accent)/12',
        disabled && 'pointer-events-none opacity-50 cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {children}
    </li>
  )
}
