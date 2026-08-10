/**
 * useCarouselDrag.ts
 * Custom hook that handles the pointer events (mouse drag/touch swipe) logic for the carousel.
 */
import { useRef, useState, type PointerEvent } from 'react'
import { scrollTo } from '../../../utils/scrollTo'
import type { ScrollFunc } from './CarouselContext'

interface UseCarouselDragOptions {
  containerRef: React.RefObject<HTMLDivElement | null>
  scroll: ScrollFunc
}

export const useCarouselDrag = ({ containerRef, scroll }: UseCarouselDragOptions) => {
  const [isDragging, setIsDragging] = useState(false)
  const start = useRef(0)
  const scrollPosition = useRef(0)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const carousel = containerRef.current

    if (!carousel) return

    setIsDragging(true)
    start.current = e.clientX
    scrollPosition.current = carousel.scrollLeft

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const carousel = containerRef.current

    if (!carousel || !isDragging) return

    const delta = e.clientX - start.current
    carousel.scrollLeft = scrollPosition.current - delta
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)

    const delta = e.clientX - start.current
    const threshold = 50

    if (delta < -threshold) {
      scroll('next')
    } else if (delta > threshold) {
      scroll('prev')
    } else {
      const carousel = containerRef.current

      if (!carousel) return

      scrollTo({ element: carousel, amount: scrollPosition.current })
    }
  }

  return {
    isDragging,
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerCancel: onPointerUp,
  }
}
