/**
 * @fileoverview Lithos UI select content container.
 * - Wraps floating dropdown options list with automated keyboard navigation and focus management via Floating UI.
 * - Implements fluid pointer move tracking to sync active item state on mouse/touch hover.
 * - Manages accessibility roles (`listbox`) and custom layout container styling.
 */
import type { MouseEvent, KeyboardEvent } from 'react'
import { useEffect, useCallback } from 'react'
import { PopoverContent } from '../popover/PopoverContent'
import { usePopoverContext } from '../popover/usePopover'
import { useSelect } from './useSelect'
import { FloatingList } from '@floating-ui/react'
import { SelectItem } from './SelectItem'
import { useVirtualizer } from '../../../core/hooks/useVirtualizer'
import type { SelectOption } from './select.types'
import { useListKeyNavigation } from '../../../core/hooks/useListKeyNavigation'
import type { SelectContentProps } from './select.types'

/**
 * Floating panel content viewport component for select dropdowns featuring keyboard navigation, typeahead, and optional list virtualization.
 *
 * @param props - Content properties including virtualization thresholds, item heights, and looping flags.
 * @returns Floating options container element.
 */
export const SelectContent = ({
  children,
  className,
  loop = true,
  virtualizeThreshold = 30,
  estimateSize = 32,
  overscan = 15,
  ...rest
}: SelectContentProps) => {
  const { selectedValue, activeIndex, setActiveIndex, elementsRef, labelsRef, handleSelect, open, options, setOpen } =
    useSelect()
  const { refs } = usePopoverContext()

  const shouldVirtualize =
    Array.isArray(options) &&
    (typeof virtualizeThreshold === 'boolean' ? virtualizeThreshold : options.length >= virtualizeThreshold)

  const isItemDisabled = useCallback(
    (index: number) => {
      if (shouldVirtualize) return !!options?.[index]?.disabled
      return elementsRef.current[index]?.getAttribute('aria-disabled') === 'true'
    },
    [shouldVirtualize, options, elementsRef]
  )

  const { handleKeyDown: navigateList } = useListKeyNavigation({
    getItemCount: () => (shouldVirtualize ? (options?.length ?? 0) : elementsRef.current.length),
    isItemDisabled,
    loop,
  })

  const { containerRef, virtualItems, totalHeight, scrollToIndex } = useVirtualizer<HTMLDivElement>({
    count: shouldVirtualize ? options.length : 0,
    itemHeight: estimateSize,
    overscan,
    initialIndex: activeIndex ?? 0,
  })

  const scrollToOption = useCallback(
    (index: number | null) => {
      if (index === null || index === undefined) return

      if (shouldVirtualize) {
        // updates the visible range
        scrollToIndex(index)

        // wait until React renders the virtual items on the new position
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // force the floating element to retain the focus
            if (refs.floating.current && document.activeElement !== refs.floating.current) {
              refs.floating.current.focus({ preventScroll: true })
            }
          })
        })
        return
      }

      requestAnimationFrame(() => {
        const activeElement = elementsRef.current[index]

        if (activeElement) activeElement.scrollIntoView({ behavior: 'instant', block: 'nearest' })
      })
    },
    [shouldVirtualize, elementsRef, scrollToIndex, refs.floating]
  )

  useEffect(() => {
    if (!open || !options?.length) return

    const optsLength = options?.length || 0
    if (optsLength === 0) {
      setActiveIndex(null)
      return
    }

    let targetIndex = activeIndex

    if (targetIndex === null || targetIndex === undefined || targetIndex >= optsLength) {
      if (selectedValue) {
        targetIndex = options?.findIndex((opt) => opt.value === selectedValue) ?? -1
      }

      if (targetIndex === -1) {
        targetIndex = 0
      }
    }

    targetIndex = Math.max(0, Math.min(targetIndex ?? 0, optsLength - 1))

    if (targetIndex !== activeIndex) setActiveIndex(targetIndex)

    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToOption(targetIndex))
    })

    return () => cancelAnimationFrame(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    navigateList({
      event: e,
      activeIndex,
      onClose: () => setOpen(false),
      setActiveIndex: (nextIndex) => {
        setActiveIndex(nextIndex)
        scrollToOption(nextIndex)
      },
      onSelect: (index) => {
        let value: string | null | undefined

        if (shouldVirtualize) {
          const option = options?.[index]
          if (!option) return

          value = option.value !== undefined && option.value !== null ? option.value : null
        } else {
          const element = elementsRef.current[index]
          if (!element) return

          value = element.getAttribute('data-value')
        }

        if (value !== null && value !== undefined) handleSelect(value, e)
      },
    })
  }

  const handleListClick = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null
    const item = target?.closest<HTMLLIElement>('[role="option"]')
    if (!item) return

    const indexAttr = item.getAttribute('data-index')
    if (indexAttr === null) return

    const index = Number(indexAttr)
    const option = options?.[index] ?? elementsRef.current[index]

    if (!option) return

    const isDisabled =
      (option as SelectOption).disabled ?? (option as HTMLElement).getAttribute?.('aria-disabled') === 'true'
    const value = (option as SelectOption).value || (option as HTMLElement).getAttribute?.('data-value')

    if (value === null) return

    if (option && !isDisabled) handleSelect(value, e)
  }

  return (
    <FloatingList elementsRef={elementsRef} labelsRef={labelsRef}>
      <PopoverContent
        ref={containerRef}
        className={['p-1 max-h-60 overflow-y-auto [clip-path:inset(0_round_var(--lithos-radius))]', className]}
        {...rest}
        aria-describedby={undefined}
        onKeyDown={handleKeyDown}
        onClick={handleListClick}
      >
        {shouldVirtualize && options ? (
          <ul className="relative w-full pr-2" style={{ height: `${totalHeight}px` }}>
            {virtualItems.map((virtualItem) => {
              const option = options[virtualItem.index]
              if (!option) return null

              return (
                <SelectItem
                  key={option.value}
                  index={virtualItem.index}
                  data-index={virtualItem.index}
                  value={option.value}
                  disabled={!!option.disabled}
                  className="absolute top-0 left-0 w-full will-change-transform"
                  style={{
                    height: `${estimateSize}px`,
                    transform: `translateY(${virtualItem.start}px)`,
                  }}
                >
                  {option.icon && <span className="mr-2 shrink-0">{option.icon}</span>}
                  {option.label}
                </SelectItem>
              )
            })}
          </ul>
        ) : (
          children
        )}
      </PopoverContent>
    </FloatingList>
  )
}
