/**
 * @fileoverview Lithos UI carousel type definitions and interfaces.
 * - Defines layout orientations, navigation directions, scroll handlers, and component props for the Carousel primitive suite.
 */
import type { LithosElementProps } from '../../../core/types'
import type { RefObject } from 'react'

/**
 * Navigation movement direction for scrolling.
 */
export type CarouselDirection = 'forwards' | 'backwards'

/**
 * Scroll target parameter accepting a direction keyword or a direct 0-indexed slide position.
 */
export type ScrollFuncProp = CarouselDirection | number

/**
 * Scroll dispatcher action function.
 */
export type ScrollFunc = (direction: ScrollFuncProp) => void

/**
 * Selector style for slide pagination indicators.
 */
export type CarouselSlideSelector = 'dots' | 'numbers'

/**
 * Scroll layout orientation mode for the carousel track.
 */
export type CarouselMode = 'horizontal' | 'vertical'

/**
 * Position placement of the navigation controls relative to the carousel track.
 */
export type CarouselControlsPosition = 'top' | 'bottom'

/**
 * Props for the `Carousel` component.
 */
export interface CarouselProps extends LithosElementProps<'div'> {
  /**
   * Position of the navigation controls relative to the carousel track.
   * @default 'top'
   */
  controlsPosition?: CarouselControlsPosition

  /**
   * Accessible label title for the carousel region.
   */
  title?: string

  /**
   * Hides the pagination indicators.
   * @default false
   */
  hidePagination?: boolean

  /**
   * Hides the navigation control buttons.
   * @default false
   */
  hideControls?: boolean

  /**
   * Selector style for slide indicators.
   * @default 'dots'
   */
  slideSelector?: CarouselSlideSelector

  /**
   * Displays the numeric slide counter.
   * @default true
   */
  showCounter?: boolean

  /**
   * Enables automatic continuous infinite slide rotation.
   * @default false
   */
  playInfinite?: boolean

  /**
   * Interval duration in milliseconds for automatic rotation.
   * @default 5000
   */
  playInterval?: number

  /**
   * Direction of automatic rotation playback.
   * @default 'forwards'
   */
  playDirection?: CarouselDirection

  /**
   * Pauses automatic rotation when hovering or focusing the carousel region.
   * @default true
   */
  stopOnHover?: boolean

  /**
   * Enables continuous looping when reaching the first or last slide.
   * @default false
   */
  loop?: boolean

  /**
   * Scroll layout orientation mode.
   * @default 'horizontal'
   */
  mode?: CarouselMode

  /**
   * Renders raw children directly without default compound layout wrappers.
   * @default false
   */
  asChild?: boolean
}

/**
 * Props for the `CarouselButton` primitive.
 */
export interface CarouselButtonProps extends LithosElementProps<'button'> {
  /** Accessible label description for screen readers. */
  label?: string

  /** Scroll direction intent for the navigation trigger. */
  direction?: CarouselDirection
}

/**
 * Props for the `CarouselControls` component.
 */
export type CarouselControlsProps = LithosElementProps<'div'>

/**
 * Props for the `CarouselPagination` component.
 */
export interface CarouselPaginationProps extends LithosElementProps<'div'> {
  /** Template string label pattern for pagination item aria-labels. */
  label?: string
}

/**
 * Props for the `CarouselSlide` component.
 */
export interface CarouselSlideProps extends LithosElementProps<'div'> {
  /** Accessible label description for the slide item. */
  label?: string
}

/**
 * Props for the `CarouselTrack` component.
 */
export type CarouselTrackProps = LithosElementProps<'div'>

/**
 * Configuration options for the `useCarouselDrag` hook.
 */
export interface UseCarouselDragOptions {
  /** Reference pointer to the scrollable container element. */
  containerRef: RefObject<HTMLDivElement | null>

  /** Scroll dispatch function. */
  scroll: ScrollFunc

  /** Enables vertical axis drag tracking. */
  vertical?: boolean
}
