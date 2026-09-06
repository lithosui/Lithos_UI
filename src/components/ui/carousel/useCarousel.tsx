/**
 * @fileoverview Lithos UI custom hook for consuming carousel context.
 * - Provides type-safe access to carousel state (`currentIndex`, `totalSlides`, `mode`) and action dispatchers (`scroll`).
 */
import { useContext, createContext, type RefObject, type UIEvent } from 'react'
import type { ScrollFunc, CarouselMode, SliderSelector } from './carousel.types'
import type { useCarouselDragReturn } from './useCarouselDrag'

export interface CarouselContextValue {
  // dynamic state
  scroll: ScrollFunc
  currentIndex: number
  totalSlides: number
  mode: CarouselMode
  containerRef: RefObject<HTMLDivElement | null>
  handleScroll: (e: UIEvent<HTMLDivElement>) => void
  dragHandlers: Omit<useCarouselDragReturn, 'isDragging'>
  registerSlide: (id: string) => () => void

  // config options
  title?: string
  loop: boolean
  slideSelector: SliderSelector
  showCounter: boolean
  vertical: boolean
  bottomControls: boolean

  isPaused: boolean
  playInfinite: boolean
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext)

  if (!context) throw new Error('useCarouselContext must be used within a <CarouselProvider>')

  return context
}
