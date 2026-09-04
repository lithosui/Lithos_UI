/**
 * @fileoverview Lithos UI touch and drag gesture hook (`useCarouselDrag`).
 * - Pointer Events API handler: provides unified mouse and touch drag scrolling across vertical and horizontal axes.
 * - Snap-or-revert threshold logic: advances to the next/previous slide when swipe distance exceeds 50px, or scrolls back to origin if released below threshold.
 * - Pointer capture lifecycle management (`setPointerCapture` / `releasePointerCapture`) to maintain gesture tracking across element boundaries.
 */
import { useRef, useState, type PointerEvent } from 'react'
import { scrollTo } from '../../../utils/scrollTo'
import type { ScrollFunc } from './carousel.types'

export interface UseCarouselDragOptions {
  containerRef: React.RefObject<HTMLDivElement | null>
  scroll: ScrollFunc
  vertical?: boolean
}

export const useCarouselDrag = ({ containerRef, scroll, vertical = false }: UseCarouselDragOptions) => {
  const [isDragging, setIsDragging] = useState(false)
  const start = useRef(0)
  const scrollPosition = useRef(0)

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const carousel = containerRef.current

    if (!carousel) return

    setIsDragging(true)
    start.current = e[vertical ? 'clientY' : 'clientX']
    scrollPosition.current = carousel[vertical ? 'scrollTop' : 'scrollLeft']

    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const carousel = containerRef.current

    if (!carousel || !isDragging) return

    const delta = e[vertical ? 'clientY' : 'clientX'] - start.current
    carousel[vertical ? 'scrollTop' : 'scrollLeft'] = scrollPosition.current - delta
  }

  const onPointerUp = (e: PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return

    setIsDragging(false)
    e.currentTarget.releasePointerCapture(e.pointerId)

    const delta = e[vertical ? 'clientY' : 'clientX'] - start.current
    const threshold = 50

    if (delta < -threshold) {
      scroll('forwards')
    } else if (delta > threshold) {
      scroll('backwards')
    } else {
      const carousel = containerRef.current

      if (!carousel) return

      scrollTo({ element: carousel, amount: scrollPosition.current, vertical })
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
