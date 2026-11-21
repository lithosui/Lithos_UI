/**
 * @fileoverview Lithos UI custom hook for consuming carousel context.
 * - Provides type-safe access to carousel state (`currentIndex`, `totalSlides`, `mode`) and action dispatchers (`scroll`).
 */
import { useContext, createContext, type RefObject, type UIEvent } from 'react'
import type { ScrollFunc, CarouselMode, CarouselSlideSelector } from './carousel.types'
import type { useCarouselDragReturn } from './useCarouselDrag'

/**
 * Data value interface provided across the carousel component tree via React Context.
 */
export interface CarouselContextValue {
  /** Scroll action dispatcher supporting direction keywords or specific indexes. */
  scroll: ScrollFunc

  /** Current active slide index (0-indexed). */
  currentIndex: number

  /** Total count of registered slides. */
  totalSlides: number

  /** Scroll layout orientation mode. */
  mode: CarouselMode

  /** Reference pointer to the scrollable container element. */
  containerRef: RefObject<HTMLDivElement | null>

  /** Scroll event handler keeping track of active index changes. */
  handleScroll: (e: UIEvent<HTMLDivElement>) => void

  /** Pointer drag event handlers for mouse and touch gesture scrolling. */
  dragHandlers: Omit<useCarouselDragReturn, 'isDragging'>

  /** Registration method called by slides to announce themselves to the track. */
  registerSlide: (id: string) => () => void

  /** Array of unique slide identifier strings in registration order. */
  slideIds: string[]

  /** Accessible label title for the carousel region. */
  title?: string

  /** Enables continuous looping when reaching the first or last slide. */
  loop: boolean

  /** Selector style for slide indicators (dots or numbers). */
  slideSelector: CarouselSlideSelector

  /** Displays the numeric slide counter. */
  showCounter: boolean

  /** Indicates whether the carousel layout mode is vertical. */
  vertical: boolean

  /** Indicates whether the controls are positioned at the bottom. */
  bottomControls: boolean

  /** Indicates whether auto-play rotation is currently paused. */
  isPaused: boolean

  /** Enables automatic continuous infinite slide rotation. */
  playInfinite: boolean
}

/**
 * React Context instance for the carousel primitive suite.
 */
export const CarouselContext = createContext<CarouselContextValue | null>(null)

/**
 * Custom hook to access carousel context state and action methods.
 *
 * @throws {Error} If called outside of a valid `<Carousel>` provider tree.
 * @returns Current carousel context values.
 */
export const useCarousel = (): CarouselContextValue => {
  const context = useContext(CarouselContext)

  if (!context) throw new Error('useCarouselContext must be used within a <CarouselProvider>')

  return context
}
