import { useCallback, type KeyboardEvent } from 'react'

/** Options for the {@link useListKeyNavigation} hook. */
export interface UseListKeyNavigationOptions {
  /** A function that returns the total count of items in the list. */
  getItemCount: () => number

  /** A function that determines whether an item at a given index is disabled. */
  isItemDisabled: (index: number) => boolean

  /**
   * Whether keyboard navigation should loop from the last item to the first and vice versa.
   * @default true
   * */
  loop?: boolean
}

/** Options for the handleKeyDown event handler returned by the navigation hook. */
export interface HandleKeyDownOptions {
  /** The keyboard event triggered on the element. */
  event: KeyboardEvent<HTMLElement>

  /** The currently active or focused item index, or null if none is active. */
  activeIndex: number | null

  /** Callback function to update the active item index. */
  setActiveIndex: (index: number) => void

  /** Optional callback invoked when an item is selected via Enter or Space. */
  onSelect?: (index: number) => void

  /** Optional callback invoked to open a submenu for the given index. */
  onOpenSubmenu?: (index: number) => void

  /** Optional callback invoked to close a submenu. */
  onCloseSubmenu?: () => void

  /** Optional callback invoked to close the entire component/menu. */
  onClose?: () => void

  /** Whether to allow ArrowRight and ArrowLeft keys for horizontal navigation (useful for menus). */
  enableHorizontalNav?: boolean
}

/**
 * A hook that manages keyboard navigation for lists, menus, and comboboxes.
 *
 * Provides utilities to calculate navigable indexes and handle keydown events
 * for arrows, Home, End, Enter, Space, Escape, and Tab keys.
 *
 * @param options - Configuration options provided as {@link UseListKeyNavigationOptions}.
 * @returns An object containing `getNextNavigableIndex` and `handleKeyDown` utilities.
 */
export const useListKeyNavigation = ({ getItemCount, isItemDisabled, loop = true }: UseListKeyNavigationOptions) => {
  const getNextNavigableIndex = useCallback(
    (currentIndex: number | null, direction: 'down' | 'up') => {
      const itemCount = getItemCount()

      if (itemCount === 0) return null

      if (currentIndex === null || currentIndex === undefined) {
        const initialIndex = direction === 'down' ? 0 : itemCount - 1
        if (!isItemDisabled(initialIndex)) return initialIndex
        currentIndex = initialIndex
      }

      let nextIndex = currentIndex

      for (let i = 0; i < itemCount; i++) {
        if (direction === 'down') {
          // user tries to go down on the last option
          if (nextIndex + 1 >= itemCount) {
            nextIndex = loop ? 0 : itemCount - 1
          } else {
            nextIndex++
          }
        } else {
          // user tries to go up on the initial option
          if (nextIndex - 1 < 0) {
            nextIndex = loop ? itemCount - 1 : 0
          } else {
            nextIndex -= 1
          }
        }

        if (!isItemDisabled(nextIndex)) return nextIndex
      }

      return currentIndex
    },
    [getItemCount, isItemDisabled, loop]
  )

  const handleKeyDown = useCallback(
    ({
      event,
      activeIndex,
      setActiveIndex,
      onSelect,
      onOpenSubmenu,
      onCloseSubmenu,
      onClose,
      enableHorizontalNav = false,
    }: HandleKeyDownOptions) => {
      const { key } = event

      const preventnStop = (e: KeyboardEvent) => {
        e.preventDefault()
        e.stopPropagation()
      }

      if (key === 'Tab') {
        onClose?.()
        return
      }

      if (key === 'Escape') {
        preventnStop(event)
        ;(onCloseSubmenu ? onCloseSubmenu : onClose)?.()
        return
      }

      if (key === 'Home' || key === 'End') {
        preventnStop(event)

        const itemCount = getItemCount()
        const startingIndex = key === 'Home' ? -1 : itemCount
        const dir = key === 'Home' ? 'down' : 'up'
        const nextIndex = getNextNavigableIndex(startingIndex, dir)

        if (nextIndex !== null) {
          setActiveIndex(nextIndex)
        }

        return
      }

      if (key === 'ArrowDown' || key === 'ArrowUp') {
        preventnStop(event)

        const dir = key === 'ArrowDown' ? 'down' : 'up'
        const nextIndex = getNextNavigableIndex(activeIndex, dir)

        if (nextIndex !== null) {
          setActiveIndex(nextIndex)
        }

        return
      }

      if (enableHorizontalNav) {
        if (key === 'ArrowRight') {
          if (activeIndex !== null && !isItemDisabled(activeIndex)) {
            preventnStop(event)
            onOpenSubmenu?.(activeIndex)
          }
          return
        }

        if (key === 'ArrowLeft') {
          preventnStop(event)
          onCloseSubmenu?.()
          return
        }
      }

      if (key === 'Enter' || key === ' ') {
        if (activeIndex === null || isItemDisabled(activeIndex)) return

        preventnStop(event)

        if (onOpenSubmenu) {
          onOpenSubmenu(activeIndex)
        } else {
          onSelect?.(activeIndex)
        }
      }
    },
    [getItemCount, getNextNavigableIndex, isItemDisabled]
  )

  return {
    getNextNavigableIndex,
    handleKeyDown,
  }
}
