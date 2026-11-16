import { useState, useCallback, useRef, useEffect } from 'react'

/** Options for the {@link useVirtualizer} hook. */
export interface UseVirtualizerOptions {
  /** The total number of items to virtualize. */
  count: number

  /** The fixed height (in pixels) of each virtualized item. */
  itemHeight: number

  /**
   * The number of additional items to render outside the visible viewport.
   * @default 5
   */
  overscan?: number

  /**
   * The initial index to scroll to upon mount.
   * @default 0
   */
  initialIndex?: number
}

/** Represents a single virtualized item position and index. */
export interface VirtualItem {
  /** The data index of the virtualized item. */
  index: number

  /** The absolute top position (in pixels) relative to the container. */
  start: number
}

/**
 * A custom hook that provides high-performance list virtualization for large datasets.
 *
 * @template T - The HTML container element type (defaults to HTMLUListElement).
 * @param options - Configuration options provided as {@link UseVirtualizerOptions}.
 * @returns An object containing the container ref callback, virtual items array as {@link VirtualItem}, total scroll height, and scroll utility methods.
 */
export const useVirtualizer = <T extends HTMLElement = HTMLUListElement>({
  count,
  itemHeight,
  overscan = 5,
  initialIndex = 0,
}: UseVirtualizerOptions) => {
  const containerRef = useRef<T | null>(null)

  const getInitialScroll = useCallback(() => {
    if (!initialIndex || initialIndex <= 0) return 0
    return Math.max(0, initialIndex * itemHeight - 100)
  }, [initialIndex, itemHeight])

  const [scrollTop, setScrollTop] = useState(getInitialScroll)

  const handleScroll = useCallback((e: Event) => {
    const target = e.currentTarget as T
    if (target) setScrollTop(target.scrollTop)
  }, [])

  const setRef = useCallback(
    (node: T | null) => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll)
      }

      containerRef.current = node

      if (node) {
        const initial = getInitialScroll()
        node.scrollTop = initial
        setScrollTop(initial)

        node.addEventListener('scroll', handleScroll, { passive: true })
      }
    },
    [handleScroll, getInitialScroll]
  )

  // if initialIndex changes while is closed/opening
  useEffect(() => {
    if (initialIndex > 0 && containerRef.current) {
      const initial = getInitialScroll()
      containerRef.current.scrollTop = initial
      setScrollTop(initial)
    }
  }, [initialIndex, getInitialScroll])

  // visible range
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)

  // asume standard max-height to be if clientHeight is still 0
  const containerHeight = containerRef.current?.clientHeight || 240
  const endIndex = Math.min(count - 1, Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan)

  const totalHeight = count * itemHeight

  const virtualItems: VirtualItem[] = []
  if (count > 0) {
    for (let i = startIndex; i <= endIndex; i++) {
      virtualItems.push({
        index: i,
        start: i * itemHeight,
      })
    }
  }

  // method to allow index scrolling
  const scrollToIndex = useCallback(
    (index: number) => {
      const container = containerRef.current
      if (!container || index < 0 || index >= count) return

      const height = container.clientHeight || 240
      const targetTop = index * itemHeight - height / 2 + itemHeight / 2
      const clampedTop = Math.max(0, Math.min(targetTop, totalHeight - height))

      container.scrollTo({ top: clampedTop, behavior: 'instant' })
      setScrollTop(clampedTop)
    },
    [count, itemHeight, totalHeight]
  )

  return {
    containerRef: setRef,
    virtualItems,
    totalHeight,
    scrollToIndex,
  }
}
