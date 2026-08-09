import { useContext } from "react"
import { type CarouselContextValue, CarouselContext } from "./CarouselContext"

export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext)

  if (!context)
    throw new Error('useCarouselContext must be used within a <CarouselProvider>')

  return context
}
