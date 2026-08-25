/**
 * @fileoverview Lithos UI carousel primitive.
 * - Multi-axis scroll container (horizontal/vertical) driven by native CSS snap points, touch-drag gestures, and ResizeObserver realignments.
 * - Compound component pattern with sub-component filtering to allow arbitrary non-slide children while indexing `CarouselSlide` elements.
 * - Accessible auto-rotation loop with focus/hover pausing and dynamic `aria-live` politeness management.
 */
import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactElement,
  isValidElement,
  type UIEvent,
} from 'react'
import { cn } from '../../utils/cn'
import { scrollTo } from '../../utils/scrollTo'
import { CarouselNext, CarouselPrev } from './carousel/CarouselButton'
import { CarouselProvider, type SliderSelector, type ScrollFuncProp } from './carousel/CarouselContext'
import { CarouselControls } from './carousel/CarouselControls'
import { CarouselPagination } from './carousel/CarouselPagination'
import { CarouselSlide, type CarouselSlideProps } from './carousel/CarouselSlide'
import { useCarouselDrag } from './carousel/useCarouselDrag'
import type { ClassValue, ClassArray } from 'clsx'

export interface CarouselProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  controlsPosition?: 'top' | 'bottom'
  title?: string
  hidePagination?: boolean
  hideControls?: boolean
  slideSelector?: SliderSelector
  showCounter?: boolean
  playInfinite?: boolean
  playInterval?: number
  playDirection?: 'forwards' | 'backwards'
  stopOnHover?: boolean
  loop?: boolean
  mode?: 'horizontal' | 'vertical'
  className?: ClassValue | ClassArray
}

const Carousel = ({
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
  ref,
  ...rest
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const vertical = mode === 'vertical'

  const totalSlides = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === CarouselSlide
  ).length
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

  const scroll = (direction: ScrollFuncProp) => {
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
  }

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

  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    if (isDragging) return

    const carousel = e.currentTarget
    if (!carousel.clientWidth) return

    const carouselScroll = carousel[vertical ? 'scrollTop' : 'scrollLeft']
    const carouselWidth = carousel[vertical ? 'clientHeight' : 'clientWidth']
    const newIndex = Math.round(carouselScroll / carouselWidth)

    if (newIndex !== index) {
      setIndex(newIndex)
    }
  }

  const classes = cn(
    'w-full border-2 border-(--lithos-border) bg-(--lithos-surface) p-2 sm:p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)] rounded-(--lithos-radius)',
    className
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const backwardsKey = vertical ? 'ArrowDown' : 'ArrowLeft'
    const forwardsKey = vertical ? 'ArrowUp' : 'ArrowRight'

    if (e.key === backwardsKey) scroll('backwards')
    if (e.key === forwardsKey) scroll('forwards')
  }

  const pauseRotation = () => stopOnHover && setIsPaused(true)
  const continueRotation = () => stopOnHover && setIsPaused(false)

  const Controls = !hideControls && <CarouselControls title={title} bottomPositioned={!isTop} loop={loop} />

  const Extras = !hidePagination && (
    <CarouselPagination
      index={index}
      slides={totalSlides}
      scroll={scroll}
      sliderSelector={slideSelector}
      showCounter={showCounter}
      bottomControls={!isTop}
      mode={mode} // created outside the provider we need to pass the prop
    />
  )

  let slideIndex = 0

  // this allow the consumer to create custom controls elements inside the
  // Carousel without counting them as Sliders
  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    // if is a Carousel.Slide, assign it's slide indice
    if (child.type === CarouselSlide) {
      const slide = cloneElement(child as ReactElement<CarouselSlideProps>, {
        index: slideIndex,
      })

      slideIndex++
      return slide
    }

    return child
  })

  const trackClass = cn(
    'flex no-scrollbar select-none cursor-pointer w-full',
    vertical ? 'overflow-y-auto snap-y touch-pan-x flex-col h-80' : 'overflow-x-auto snap-x touch-pan-y flex-row'
  )

  const liveRegionPoliteness = playInfinite && !isPaused ? 'off' : 'polite'

  return (
    <CarouselProvider scroll={scroll} currentIndex={index} totalSlides={totalSlides} mode={mode}>
      <div
        className={classes}
        ref={ref}
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
        {!isTop && Extras}
        {isTop && Controls}

        {/* Hard-Snap horizontal/vertical slab */}

        <div className="w-full">
          <div ref={containerRef} className={trackClass} onScroll={handleScroll} {...dragHandlers}>
            {renderedChildren}
          </div>
        </div>

        <div className="sr-only" aria-live={liveRegionPoliteness} aria-atomic="true">
          {`Slide ${index + 1} of ${totalSlides}`}
        </div>

        {isTop && Extras}
        {!isTop && Controls}
      </div>
    </CarouselProvider>
  )
}

export { Carousel, CarouselPrev, CarouselNext, CarouselPagination, CarouselControls, CarouselSlide }
