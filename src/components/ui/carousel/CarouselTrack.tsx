/**
 * @fileoverview Lithos UI carousel track primitive (`CarouselTrack`).
 * - Encapsulates the scrollable container and maps drag/touch event handlers for gestures.
 * - Handles flexible layouts: supports horizontal/vertical scroll snapping with custom touch action fallback.
 * - Dynamically clones children to automatically inject sequential index props into sub-slides.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useCarousel } from './useCarousel'

export interface CarouselTrackProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

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
