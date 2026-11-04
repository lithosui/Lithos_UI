import { useCallback, type KeyboardEvent } from 'react'

export interface UseListKeyNavigationOptions {
  getItemCount: () => number
  isItemDisabled: (index: number) => boolean
  loop?: boolean
}

export interface HandleKeyDownOptions {
  event: KeyboardEvent<HTMLElement>
  activeIndex: number | null
  setActiveIndex: (index: number) => void
  onSelect?: (index: number) => void
  onOpenSubmenu?: (index: number) => void
  onCloseSubmenu?: () => void
  onClose?: () => void

  // allow ArrowRight and ArrowLeft (useful for menus)
  enableHorizontalNav?: boolean
}

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
