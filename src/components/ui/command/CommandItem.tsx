/**
 * @fileoverview Lithos UI CommandItem component.
 * - Interactive option primitive managing registration, visibility filtering, keyboard selection, and auto-scroll behaviors.
 */
import {
  Children,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from 'react'
import { cn } from '../../../utils/cn'
import type { CommandItemProps } from './command.types'
import { useCommand, useGroup } from './CommandContext'

/**
 * Individual option item component representing selectable actions inside the command palette.
 *
 * @param props - Item configuration properties including values, keywords, disabled states, and selection callbacks. - {@link CommandItemProps}
 * @returns Option option element or null if hidden by search filters.
 */
export const CommandItem = ({
  value,
  keywords,
  disabled = false,
  onSelect,
  className,
  children,
  ...rest
}: CommandItemProps) => {
  const id = useId()
  const groupContext = useGroup()
  const itemRef = useRef<HTMLDivElement | null>(null)

  const getTextFromChildren = useCallback((node: ReactNode): string => {
    let text = ''
    Children.forEach(node, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        text += String(child)
      } else if (isValidElement<{ children?: ReactNode }>(child) && child.props && 'children' in child.props) {
        text += getTextFromChildren(child.props.children)
      }
    })
    return text
  }, [])

  const derivedValue = useMemo(() => {
    if (value !== undefined) return value
    if (typeof children === 'string') return children

    const textContent = getTextFromChildren(children).trim()
    if (textContent) return textContent

    return id
  }, [value, children, id, getTextFromChildren])

  const { activeId, setActiveId, registerItem, filterItem, setIsOpen } = useCommand()

  const handleSelect = useCallback(() => {
    if (disabled) return

    onSelect?.(derivedValue)
    setIsOpen(false)
  }, [disabled, onSelect, derivedValue, setIsOpen])

  useEffect(() => {
    return registerItem({
      id,
      value: derivedValue,
      groupId: groupContext?.groupId,
      disabled,
      keywords,
      onSelect: handleSelect,
    })
  }, [id, derivedValue, groupContext?.groupId, disabled, keywords, handleSelect, registerItem])

  const isVisible = filterItem(derivedValue, keywords)
  const isSelected = activeId === id

  useEffect(() => {
    if (isSelected && itemRef.current) {
      itemRef.current.scrollIntoView({ block: 'nearest' })
    }
  }, [isSelected])

  if (!isVisible) return null

  const handleClick = () => {
    handleSelect()
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      e.stopPropagation()
      handleSelect()
    }
  }

  const handleMouseEnter = () => {
    if (!disabled) {
      setActiveId(id)
    }
  }

  const classes = cn(
    'relative flex items-center px-3 py-2 text-sm font-semibold cursor-pointer select-none rounded-(--lithos-radius) transition-colors duration-75',
    isSelected
      ? 'bg-(--lithos-accent) text-(--lithos-accent-text)'
      : 'text-(--lithos-text) hover:bg-(--lithos-accent)/15',
    disabled && 'opacity-40 cursor-not-allowed pointer-events-none',
    className
  )

  return (
    <div
      ref={itemRef}
      data-slot="command-item"
      role="option"
      aria-selected={isSelected}
      aria-disabled={disabled}
      data-selected={isSelected ? 'true' : undefined}
      data-disabled={disabled ? 'true' : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      tabIndex={isSelected ? 0 : -1}
      className={classes}
      {...rest}
    >
      {children}
    </div>
  )
}
