import { createContext, useContext, useMemo, type ReactNode } from 'react'

export type CarouselDirection = 'prev' | 'next'
export type ScrollFuncProp = CarouselDirection | number
export type ScrollFunc = (direction: ScrollFuncProp) => void
export type SliderSelector = 'dots' | 'numbers'

export interface CarouselContextValue {
  scroll: ScrollFunc
  currentIndex: number
  totalSlides: number
}

const CarouselContext = createContext<CarouselContextValue | null>(null)

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

export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext)

  if (!context)
    throw new Error('useCarouselContext must be used within a <CarouselProvider>')

  return context
}
