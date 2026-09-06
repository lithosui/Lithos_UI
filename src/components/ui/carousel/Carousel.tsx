/**
 * @fileoverview Lithos UI carousel primitive.
 * - Multi-axis scroll container (horizontal/vertical) driven by native CSS snap points, touch-drag gestures, and ResizeObserver realignments.
 * - Compound component pattern with sub-component filtering to allow arbitrary non-slide children while indexing `CarouselSlide` elements.
 * - Accessible auto-rotation loop with focus/hover pausing and dynamic `aria-live` politeness management.
 */
import {
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type UIEvent,
} from 'react'
import { cn, type LithosClass } from '../../../utils/cn'
import { scrollTo } from '../../../utils/scrollTo'
import {
  type SliderSelector,
  type ScrollFuncProp,
  type CarouselDirection,
  type CarouselMode,
  type CarouselControlsPosition,
} from './carousel.types'
import { CarouselControls } from './CarouselControls'
import { CarouselPagination } from './CarouselPagination'
import { useCarouselDrag } from './useCarouselDrag'
import { CarouselContext } from './useCarousel'
import { CarouselTrack } from './CarouselTrack'

export interface CarouselProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  controlsPosition?: CarouselControlsPosition
  title?: string
  hidePagination?: boolean
  hideControls?: boolean
  slideSelector?: SliderSelector
  showCounter?: boolean
  playInfinite?: boolean
  playInterval?: number
  playDirection?: CarouselDirection
  stopOnHover?: boolean
  loop?: boolean
  mode?: CarouselMode
  className?: LithosClass
  custom?: boolean
}

export const Carousel = ({
  controlsPosition = 'top',
  title,
  children,
  className,
  hidePagination = false,
  hideControls = false,
  slideSelector = 'dots',
  showCounter = true,
  playInfinite = false,
  playInterval = 5000,
  playDirection = 'forwards',
  stopOnHover = true,
  loop = false,
  mode = 'horizontal',
  custom = false,
  ...rest
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const vertical = mode === 'vertical'

  const [slideIds, setSlideIds] = useState<string[]>([])

  const registerSlide = useCallback((id: string) => {
    setSlideIds((prev) => (prev.includes(id) ? prev : [...prev, id]))

    return () => setSlideIds((prev) => prev.filter((item) => item !== id))
  }, [])

  const totalSlides = slideIds.length

  const normalizedSlides = totalSlides - 1 // we use a 0 indexed list
  const isTop = controlsPosition === 'top'

  // ensure the carousel always resets to slide 0 when mounting
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current[vertical ? 'scrollTop' : 'scrollLeft'] = 0
    }
  }, [vertical])

  // realigns the exact scroll if the window is resized
  useEffect(() => {
    const carousel = containerRef.current

    if (!carousel) return

    const handleResize = () => {
      const amount = carousel[vertical ? 'clientHeight' : 'clientWidth']
      scrollTo({ element: carousel, amount: index * amount, vertical })
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(carousel)

    return () => observer.disconnect()
  }, [index, vertical])

  const scroll = useCallback(
    (direction: ScrollFuncProp) => {
      const carousel = containerRef.current

      if (!carousel || !totalSlides) return

      const amount = carousel[vertical ? 'clientHeight' : 'clientWidth']
      const isNext = direction === 'forwards'
      let newIndex: number | undefined

      // allow moving to a specific slide
      if (typeof direction === 'number') {
        const slideExists = direction >= 0 && direction <= normalizedSlides

        if (!slideExists) return

        scrollTo({ element: carousel, amount: direction * amount, vertical })
        newIndex = direction
      } else {
        const moveToFirst = index === normalizedSlides && isNext
        const moveToLast = index === 0 && !isNext

        const getMoveTo = () => {
          if (loop) {
            if (moveToFirst) return 0 // initial slide
            if (moveToLast) return amount * normalizedSlides // last slide
          }

          if (isNext) return amount * (index + 1) // next/prev slide
          return amount * (index - 1)
        }

        // don't scroll if is the last/initial slider and loop !== true
        if (!loop && (moveToFirst || moveToLast)) return

        scrollTo({ element: carousel, amount: getMoveTo(), vertical })

        if (isNext) {
          newIndex = index + 1
        } else {
          newIndex = index - 1
        }

        // infinite scroll
        if (loop) {
          if (moveToFirst) {
            newIndex = 0
          }
          if (moveToLast) {
            newIndex = normalizedSlides
          }
        }
      }

      setIndex(newIndex)
    },
    [index, loop, normalizedSlides, totalSlides, vertical]
  )

  useEffect(() => {
    if (!playInfinite || isPaused || totalSlides <= 1) return

    const timer = setInterval(() => {
      const carousel = containerRef.current

      if (!carousel) return

      setIndex((prevIndex) => {
        let nextIndex = prevIndex + (playDirection === 'forwards' ? 1 : -1)

        if (nextIndex < 0) {
          nextIndex = normalizedSlides
        }
        if (nextIndex > normalizedSlides) {
          nextIndex = 0
        }

        const amount = carousel[vertical ? 'clientHeight' : 'clientWidth']
        scrollTo({ element: carousel, amount: nextIndex * amount, vertical })

        return nextIndex
      })
    }, playInterval)

    return () => clearInterval(timer)
  }, [playInfinite, isPaused, playInterval, playDirection, normalizedSlides, totalSlides, vertical])

  const { isDragging, ...dragHandlers } = useCarouselDrag({ containerRef, scroll, vertical })

  const handleScroll = useCallback(
    (e: UIEvent<HTMLDivElement>) => {
      if (isDragging) return

      const carousel = e.currentTarget
      if (!carousel.clientWidth) return

      const carouselScroll = carousel[vertical ? 'scrollTop' : 'scrollLeft']
      const carouselWidth = carousel[vertical ? 'clientHeight' : 'clientWidth']
      const newIndex = Math.round(carouselScroll / carouselWidth)

      if (newIndex !== index) {
        setIndex(newIndex)
      }
    },
    [index, isDragging, vertical]
  )

  const classes = cn(
    'w-full border-2 border-(--lithos-border) bg-(--lithos-surface) p-2 sm:p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
    className
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      const backwardsKey = vertical ? 'ArrowDown' : 'ArrowLeft'
      const forwardsKey = vertical ? 'ArrowUp' : 'ArrowRight'

      const isValid = e.key === backwardsKey || e.key === forwardsKey

      if (isValid) {
        e.preventDefault()

        const goTo = e.key === backwardsKey ? 'backwards' : 'forwards'
        scroll(goTo)
      }
    },
    [scroll, vertical]
  )

  const pauseRotation = () => stopOnHover && setIsPaused(true)
  const continueRotation = () => stopOnHover && setIsPaused(false)

  const liveRegionPoliteness = playInfinite && !isPaused ? 'off' : 'polite'

  const contextValue = useMemo(
    () => ({
      scroll,
      currentIndex: index,
      totalSlides,
      mode,
      containerRef,
      handleScroll,
      dragHandlers,
      title: title ?? '',
      loop,
      slideSelector,
      showCounter,
      isPaused,
      playInfinite,
      vertical,
      bottomControls: !isTop,
      registerSlide,
    }),
    [
      scroll,
      index,
      totalSlides,
      mode,
      containerRef,
      handleScroll,
      dragHandlers,
      title,
      loop,
      slideSelector,
      showCounter,
      isPaused,
      playInfinite,
      vertical,
      isTop,
      registerSlide,
    ]
  )

  return (
    <CarouselContext.Provider value={contextValue}>
      <div
        className={classes}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={pauseRotation}
        onMouseLeave={continueRotation}
        onFocus={pauseRotation}
        onBlur={continueRotation}
        role="region"
        aria-roledescription="carousel"
        aria-label={title || 'Carousel'}
        {...rest}
      >
        <div className="sr-only" aria-live={liveRegionPoliteness} aria-atomic="true">
          {`Slide ${index + 1} of ${totalSlides}`}
        </div>

        {custom ? (
          children
        ) : (
          /* Default layout */
          <>
            {!isTop && !hidePagination && <CarouselPagination />}
            {isTop && !hideControls && <CarouselControls />}

            <CarouselTrack>{children}</CarouselTrack>

            {isTop && !hidePagination && <CarouselPagination />}
            {!isTop && !hideControls && <CarouselControls />}
          </>
        )}
      </div>
    </CarouselContext.Provider>
  )
}
