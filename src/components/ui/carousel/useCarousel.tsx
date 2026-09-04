/**
 * @fileoverview Lithos UI custom hook for consuming carousel context.
 * - Provides type-safe access to carousel state (`currentIndex`, `totalSlides`, `mode`) and action dispatchers (`scroll`).
 */
import { useContext, createContext } from 'react'
import type { ScrollFunc, CarouselMode } from './carousel.types'

export interface CarouselContextValue {
  scroll: ScrollFunc
  currentIndex: number
  totalSlides: number
  mode: CarouselMode
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext)

  if (!context) throw new Error('useCarouselContext must be used within a <CarouselProvider>')

  return context
}
