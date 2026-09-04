/**
 * @fileoverview Lithos UI carousel context provider and type definitions.
 * - Centralizes navigation methods, orientation flags, and indexing state for sub-components via `CarouselContext`.
 * - Memoizes provider value to prevent unnecessary re-renders across consumers (`CarouselControls`, `CarouselPagination`, `CarouselButton`).
 */
import { useMemo, type ReactNode } from 'react'
import type { ScrollFunc, CarouselMode } from './carousel.types'
import { CarouselContext } from './useCarousel'

export interface CarouselProviderProps {
  children: ReactNode
  scroll: ScrollFunc
  currentIndex?: number
  totalSlides?: number
  mode?: CarouselMode
}

export const CarouselProvider = ({
  children,
  scroll,
  currentIndex = 0,
  totalSlides = 0,
  mode = 'horizontal',
}: CarouselProviderProps) => {
  const value = useMemo(
    () => ({
      scroll,
      currentIndex,
      totalSlides,
      mode,
    }),
    [scroll, currentIndex, totalSlides, mode]
  )

  return <CarouselContext.Provider value={value}>{children}</CarouselContext.Provider>
}
