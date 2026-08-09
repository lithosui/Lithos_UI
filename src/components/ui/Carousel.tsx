import {
  useEffect,
  useRef,
  useState,
  Children,
  cloneElement,
  type ComponentPropsWithRef,
  type KeyboardEvent,
  type ReactElement,
  isValidElement
} from 'react'
import { cn } from '../../utils/cn'
import { scrollTo } from '../../utils/scrollTo'
import { CarouselNext, CarouselPrev } from './carousel/CarouselButton'
import { CarouselProvider, type SliderSelector, type ScrollFuncProp } from './carousel/CarouselContext'
import { CarouselControls } from './carousel/CarouselControls'
import { CarouselPagination } from './carousel/CarouselPagination'
import { CarouselSlide } from './carousel/CarouselSlide'
import { useCarouselDrag } from './carousel/useCarouselDrag'
import type { ClassValue, ClassArray } from "clsx"

export interface CarouselProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  controlsPosition?: 'top' | 'bottom'
  title?: string
  hidePagination?: boolean
  hideControls?: boolean
  slideSelector?: SliderSelector
  showCounter?: boolean
  playInfinite?: boolean
  playInterval?: number
  playDirection?: 'right' | 'left'
  stopOnHover?: boolean
  className?: ClassValue | ClassArray
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
  playDirection = 'right',
  stopOnHover = true,
  ref,
  ...rest
}: CarouselProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [index, setIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalSlides = Children.toArray(children).filter(
    (child) => isValidElement(child) && child.type === CarouselSlide
  ).length
  const normalizedSlides = totalSlides - 1 // we use a 0 indexed list
  const isTop = controlsPosition === 'top'

  // ensure the carousel always resets to slide 0 when mounting
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollLeft = 0
    }
  }, [])

  // realigns the exact scroll if the window is resized
  useEffect(() => {
    const carousel = containerRef.current

    if (!carousel) return

    const handleResize = () => {
      const amount = carousel.clientWidth
      scrollTo({ element: carousel, amount: index * amount })
    }

    const observer = new ResizeObserver(handleResize)
    observer.observe(carousel)

    return () => observer.disconnect()
  }, [index])

  const scroll = (direction: ScrollFuncProp) => {
    const carousel = containerRef.current

    if (!carousel || !totalSlides) return

    const amount = carousel.clientWidth
    const isNext = direction === 'next'
    let newIndex: number | undefined

    // allow moving to a specific slide
    if (typeof direction === 'number') {
      const slideExists = direction >= 0 && direction <= normalizedSlides

      if (!slideExists) return

      scrollTo({ element: carousel, amount: direction * amount })
      newIndex = direction
    } else {
      const moveToFirst = index === normalizedSlides && isNext
      const moveToLast = index === 0 && !isNext

      const getMoveTo = () => {
        if (moveToFirst) return 0 // initial slide
        if (moveToLast) return amount * normalizedSlides // last slide

        if (isNext) return amount * (index + 1) // next/prev slide
        return amount * (index - 1)
      }

      scrollTo({ element: carousel, amount: getMoveTo() })

      if (isNext) { newIndex = index + 1 }
      else { newIndex = index - 1 }

      // Infinite scroll
      if (moveToFirst) { newIndex = 0 }
      if (moveToLast) { newIndex = normalizedSlides }
    }

    setIndex(newIndex)
  }

  useEffect(() => {
    if (!playInfinite || isPaused || totalSlides <= 1) return

    const timer = setInterval(() => {
      const carousel = containerRef.current

      if (!carousel) return

      setIndex((prevIndex) => {
        let nextIndex = prevIndex + (playDirection === 'right' ? 1 : -1)

        if (nextIndex < 0) { nextIndex = normalizedSlides }
        if (nextIndex > normalizedSlides) { nextIndex = 0 }

        const amount = carousel.clientWidth
        scrollTo({ element: carousel, amount: index * amount })

        return nextIndex
      })
    }, playInterval)

    return () => clearInterval(timer)
  }, [playInfinite, isPaused, playInterval, playDirection, normalizedSlides, totalSlides])

  const dragHandlers = useCarouselDrag({ containerRef, scroll })

  const classes = cn(
    'w-full border-4 border-(--lithos-border) bg-(--lithos-surface) p-2 sm:p-4 shadow-[4px_4px_0_0_var(--lithos-shadow)]',
    className
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const prevKey = 'ArrowLeft'
    const nextKey = 'ArrowRight'

    if (e.key === prevKey) scroll('prev')
    if (e.key === nextKey) scroll('next')
  }

  const pauseRotation = () => stopOnHover && setIsPaused(true)
  const continueRotation = () => stopOnHover && setIsPaused(false)

  const Controls = !hideControls && (
    <CarouselControls title={title} bottomPositioned={!isTop} />
  )

  const Extras = !hidePagination && (
    <CarouselPagination
      index={index}
      slides={totalSlides}
      scroll={scroll}
      sliderSelector={slideSelector}
      showCounter={showCounter}
      bottomControls={!isTop}
    />
  )

  let slideIndex = 0

  // this allow the consumer to create custom controls elements inside the
  // Carousel without counting them as Sliders
  const renderedChildren = Children.map(children, (child) => {
    if (!isValidElement(child)) return child

    // if is a Carousel.Slide, assign it's slide indice
    if (child.type === CarouselSlide) {
      const slide = cloneElement(child as ReactElement<any>, {
        index: slideIndex,
      })

      slideIndex++;
      return slide
    }

    return child
  })

  const liveRegionPoliteness = playInfinite && !isPaused ? 'off' : 'polite'

  return (
    <CarouselProvider scroll={scroll} currentIndex={index} totalSlides={totalSlides}>
      <div
        className={classes}
        ref={ref}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseEnter={pauseRotation}
        onMouseLeave={continueRotation}
        onFocus={pauseRotation}
        onBlur={continueRotation}
        role='region'
        aria-roledescription='carousel'
        aria-label={title || 'Carousel'}
        {...rest}
      >
        {!isTop && Extras}
        {isTop && Controls}

        {/* Hard-Snap horizontal slab */}

        <div className='w-full'>
          <div
            ref={containerRef}
            className='flex no-scrollbar select-none cursor-pointer w-full flex-row overflow-x-auto snap-x touch-pan-y'
            {...dragHandlers}
          >
            {renderedChildren}
          </div>
        </div>

        <div className='sr-only' aria-live={liveRegionPoliteness} aria-atomic='true'>
          {`Slide ${index + 1} of ${totalSlides}`}
        </div>

        {isTop && Extras}
        {!isTop && Controls}
      </div>
    </CarouselProvider>
  )
}

Carousel.NextButton = CarouselNext
Carousel.PrevButton = CarouselPrev
Carousel.Pagination = CarouselPagination
Carousel.Controls = CarouselControls
Carousel.Slide = CarouselSlide
