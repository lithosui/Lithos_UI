/**
 * @fileoverview Lithos UI SidebarItem component.
 * - Renders interactive navigation items supporting polymorphic child delegation via `asChild`.
 * - Automatically displays a floating Tooltip with the item label when the sidebar is in collapsed mini mode.
 * - Adapts layout alignment and text orientation dynamically according to sidebar `placement`.
 */
import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ElementType,
  type MouseEvent,
  type ComponentPropsWithRef,
  type ReactNode,
} from 'react'
import type { SidebarItemProps } from './sidebar.types'
import { useSidebar } from './useSidebar'
import { cn } from '../../../utils/cn'
import { Button } from '../Button'
import { Typography } from '../Typography'
import { Tooltip, TooltipContent, TooltipTrigger } from '../Tooltip'

/**
 * Interactive navigation link or button component designed for sidebar menus.
 * Automatically wraps in a tooltip when the sidebar is collapsed in mini mode.
 *
 * @template T - Polymorphic element type override.
 * @param props - Item props including icon, active state, polymorphic `asChild`, and typography options. - {@link SidebarItemProps}
 * @returns Interactive sidebar button or tooltip-wrapped element.
 */
export const SidebarItem = <T extends ElementType = 'button'>({
  icon,
  children,
  active = false,
  onClick,
  className,
  asChild = false,
  textVariant = 'label',
  textClass,
  ...rest
}: SidebarItemProps<T>) => {
  const { mode, open, placement, isDragging } = useSidebar()
  const isCollapsed = mode === 'mini' && !open
  const isRight = placement === 'right'

  const computedTooltipPlacement = isRight ? 'left' : 'right'

  // Extract inner text/nodes if children is a valid React element (for asChild delegation)
  const isChildValid = asChild && isValidElement(children)
  const labelContent = isChildValid ? (children as ReactElement<{ children?: ReactNode }>).props.children : children

  const itemContent = (
    <>
      {icon && <span className="flex h-6 w-6 shrink-0 items-center justify-center text-xl select-none">{icon}</span>}
      {!isCollapsed && (
        <Typography
          variant={textVariant}
          className={cn(
            'flex-1 truncate leading-snug select-none cursor-pointer',
            isRight ? 'text-right' : 'text-left',
            textClass
          )}
        >
          {labelContent}
        </Typography>
      )}
    </>
  )

  const computedClassName = cn(
    'flex items-center w-full space-x-3 active:translate-none shadow-none justify-start transition-colors duration-150 px-2.5 select-none',
    isRight && 'flex-row-reverse space-x-reverse',
    active ? 'bg-(--lithos-accent) text-(--lithos-accent-text)' : 'hover:bg-(--lithos-surface-hover)',
    isDragging && 'pointer-events-none',
    className
  )

  let itemElement: ReactElement

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<ComponentPropsWithRef<T>>

    const childOnClick = child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined
    const parentOnClick = onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined

    const handleCombinedClick = (e: MouseEvent<HTMLElement>) => {
      childOnClick?.(e)
      parentOnClick?.(e)
    }

    const combinedProps = {
      ...rest,
      draggable: false,
      onClick: handleCombinedClick,
      'aria-current': active ? 'page' : undefined,
      className: cn(computedClassName, child.props.className),
      children: itemContent,
    }

    itemElement = cloneElement(child, combinedProps as unknown as ComponentPropsWithRef<T>)
  } else {
    itemElement = (
      <Button onClick={onClick} variant={active ? 'primary' : 'text'} className={computedClassName} {...rest}>
        {itemContent}
      </Button>
    )
  }

  // If it is not collapsed, we return the button/element directly
  if (!isCollapsed) {
    return itemElement
  }

  // If it's collapsed, we wrap it up with the Tooltip primitive
  return (
    <Tooltip placement={computedTooltipPlacement}>
      <TooltipTrigger asChild>{itemElement}</TooltipTrigger>
      <TooltipContent>{children}</TooltipContent>
    </Tooltip>
  )
}
