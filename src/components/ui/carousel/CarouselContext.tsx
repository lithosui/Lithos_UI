/**
 * CarouselContext.tsx
 * Provides the React context and state (like currentIndex) shared across all Carousel sub-components.
 */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useMemo, type ReactNode } from 'react'

export type CarouselDirection = 'prev' | 'next'
export type ScrollFuncProp = CarouselDirection | number
export type ScrollFunc = (direction: ScrollFuncProp) => void
export type SliderSelector = 'dots' | 'numbers'

export interface CarouselContextValue {
  scroll: ScrollFunc
  currentIndex: number
  totalSlides: number
}

export const CarouselContext = createContext<CarouselContextValue | null>(null)

export interface CarouselProviderProps {
  children: ReactNode
  scroll: ScrollFunc
  currentIndex?: number
  totalSlides?: number
}

export const CarouselProvider = ({
  children,
  scroll,
  currentIndex = 0,
  totalSlides = 0
}: CarouselProviderProps) => {
  const value = useMemo(
    () => ({
      scroll,
      currentIndex,
      totalSlides,
    }),
    [scroll, currentIndex, totalSlides]
  )

  return (
    <CarouselContext.Provider value={value}>
      {children}
    </CarouselContext.Provider>
  )
}
