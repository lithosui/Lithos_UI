/**
 * @fileoverview Lithos UI carousel primitive.
 * - Multi-axis scroll container (horizontal/vertical) driven by native CSS snap points, touch-drag gestures, and ResizeObserver realignments.
 * - Compound component pattern with sub-component filtering to allow arbitrary non-slide children while indexing `CarouselSlide` elements.
 * - Accessible auto-rotation loop with focus/hover pausing and dynamic `aria-live` politeness management.
 */
export * from './carousel/Carousel'
export * from './carousel/CarouselTrack'
export * from './carousel/CarouselPagination'
export * from './carousel/CarouselControls'
export * from './carousel/CarouselSlide'
export * from './carousel/CarouselButton'
export * from './carousel/useCarousel'

export type * from './carousel/carousel.types'
