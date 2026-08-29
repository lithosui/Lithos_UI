/**
 * @fileoverview Lithos UI select content container.
 * - Wraps floating dropdown options list with automated keyboard navigation and focus management via Floating UI.
 * - Implements fluid pointer move tracking to sync active item state on mouse/touch hover.
 * - Manages accessibility roles (`listbox`) and custom layout container styling.
 */
import type { ReactNode, PointerEvent } from 'react'
import { useListNavigation, useInteractions, FloatingList } from '@floating-ui/react'
import { cn, type LithosClass } from '../../../utils/cn'
import { PopoverContent, usePopoverContext } from '../Popover'
import { useSelect } from './useSelect'

export interface SelectContentProps {
  children: ReactNode
  className?: LithosClass
  listLabel?: string
  loop?: boolean
  focusOnHover?: boolean
}

export const SelectContent = ({
  children,
  className,
  listLabel = 'Options',
  loop = true,
  focusOnHover = true,
}: SelectContentProps) => {
  const { activeIndex, setActiveIndex, elementsRef } = useSelect()
  const { context: floatingContext } = usePopoverContext()

  const listNavigation = useListNavigation(floatingContext, {
    listRef: elementsRef,
    activeIndex,
    onNavigate: setActiveIndex,
    loop,
  })

  const { getFloatingProps } = useInteractions([listNavigation])

  const handlePointerMove = (e: PointerEvent<HTMLUListElement>) => {
    if (e.movementX === 0 && e.movementY === 0) return

    const target = e.target as HTMLElement | null
    const item = target?.closest<HTMLLIElement>('[role="option"]')

    if (!item) return

    const rawIndex = item.getAttribute('data-index')
    const isDisabled = item.getAttribute('aria-disabled') === 'true'

    if (rawIndex !== null && !isDisabled) {
      const parsedIndex = Number(rawIndex)
      if (parsedIndex !== activeIndex) setActiveIndex(parsedIndex)
    }
  }

  return (
    <PopoverContent className={cn('p-1', className)} {...getFloatingProps()}>
      <FloatingList elementsRef={elementsRef}>
        <ul
          role="listbox"
          aria-label={listLabel}
          className="flex flex-col space-y-1"
          onPointerMove={focusOnHover ? handlePointerMove : undefined}
        >
          {children}
        </ul>
      </FloatingList>
    </PopoverContent>
  )
}
