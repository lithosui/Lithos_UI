/**
 * @fileoverview Lithos UI carousel track primitive (`CarouselTrack`).
 * - Encapsulates the scrollable container and maps drag/touch event handlers for gestures.
 * - Handles flexible layouts: supports horizontal/vertical scroll snapping with custom touch action fallback.
 * - Dynamically clones children to automatically inject sequential index props into sub-slides.
 */
import { cn } from '../../../utils/cn'
import { useCarousel } from './useCarousel'
import type { CarouselTrackProps } from './carousel.types'

/**
 * Scrollable track container component holding the carousel slides and registering drag gesture event handlers.
 *
 * @param props - Track container properties including children and custom class names. - {@link CarouselTrackProps}
 * @returns Scrollable track container element.
 */
export const CarouselTrack = ({ children, className }: CarouselTrackProps) => {
  const { containerRef, vertical, handleScroll, dragHandlers } = useCarousel()

  return (
    <div
      ref={containerRef}
      className={cn(
        'flex no-scrollbar select-none cursor-pointer w-full h-80',
        vertical ? 'overflow-y-auto snap-y touch-pan-x flex-col' : 'overflow-x-auto snap-x touch-pan-y flex-row',
        className
      )}
      onScroll={handleScroll}
      {...dragHandlers}
    >
      {children}
    </div>
  )
}
