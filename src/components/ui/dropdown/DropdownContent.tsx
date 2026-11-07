/**
 * @fileoverview Lithos UI DropdownContent primitive.
 * - Wraps `PopoverContent` with default tight padding (`p-1`) for menu layouts.
 * - Renders the floating panel containing menu items, separators, and nested groups.
 */
import { useEffect, useRef, useState, useCallback, type KeyboardEvent } from 'react'
import { PopoverContent } from '../popover/PopoverContent'
import { FloatingList } from '@floating-ui/react'
import { useListKeyNavigation } from '../../../core/hooks/useListKeyNavigation'
import { DropdownNavigationContext } from './DropdownNavigationContext'
import { useDropdown } from './useDropdown'
import type { DropdownContentProps } from './dropdown.types'

/**
 * Floating panel content viewport component containing interactive dropdown menu items.
 *
 * @param props - Content properties including looping behaviors, close handlers, and custom classes. - {@link DropdownContentProps}
 * @returns Dropdown floating content container element.
 */
export const DropdownContent = ({
  children,
  className,
  loop = true,
  onCloseSubmenu = () => {},
  onKeyDown,
  ...props
}: DropdownContentProps) => {
  const { close } = useDropdown()
  const elementsRef = useRef<(HTMLElement | null)[]>([])
  const [activeIndex, setActiveIndex] = useState<number | null>(0)

  const isItemDisabled = useCallback((index: number) => {
    const el = elementsRef.current[index]
    if (!el) return true

    return el.getAttribute('aria-disabled') === 'true' || el.hasAttribute('disabled')
  }, [])

  const { handleKeyDown: navigateList } = useListKeyNavigation({
    getItemCount: () => elementsRef.current.length,
    isItemDisabled,
    loop,
  })

  useEffect(() => {
    if (activeIndex !== null && elementsRef.current[activeIndex]) {
      elementsRef.current[activeIndex]?.focus()
    }
  }, [activeIndex])

  const handleOpenSubmenu = useCallback((index: number) => {
    const targetElement = elementsRef.current[index]

    if (targetElement && targetElement.getAttribute('aria-haspopup') === 'menu') targetElement.click()
  }, [])

  const handleCloseSubmenu = useCallback(() => onCloseSubmenu?.(), [onCloseSubmenu])

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    onKeyDown?.(e)

    if (e.defaultPrevented) return

    navigateList({
      event: e,
      activeIndex,
      onSelect: (index) => {
        elementsRef.current[index]?.click()
      },
      setActiveIndex,
      enableHorizontalNav: true,
      onOpenSubmenu: handleOpenSubmenu,
      onCloseSubmenu,
      onClose: close,
    })
  }

  return (
    <DropdownNavigationContext.Provider
      value={{
        activeIndex,
        setActiveIndex,
        openSubmenuAtIndex: handleOpenSubmenu,
        closeParentSubmenu: handleCloseSubmenu,
      }}
    >
      <FloatingList elementsRef={elementsRef}>
        <PopoverContent className={['p-1 z-(--lithos-z-dropdown)', className]} onKeyDown={handleKeyDown} {...props}>
          {children}
        </PopoverContent>
      </FloatingList>
    </DropdownNavigationContext.Provider>
  )
}
