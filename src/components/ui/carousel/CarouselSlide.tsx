/**
 * @fileoverview Lithos UI carousel slide item (`CarouselSlide`).
 * - CSS snap-point target (`snap-start`) designed for zero-shrink layouts within the carousel viewport track.
 * - Accessible slide container utilizing `role="group"`, `aria-roledescription="slide"`, and automatic indexing labels.
 * - Focus and accessibility boundary management: applies `inert` and `aria-hidden` attributes to non-active slides to prevent off-screen tab focus.
 */
import { useEffect, useId, type ComponentPropsWithRef } from 'react'
import { cn, type LithosClass } from '../../../utils/cn'
import { useCarousel } from './useCarousel'

export interface CarouselSlideProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  label?: string
  className?: LithosClass
}

export const CarouselSlide = ({ label, className, children, ...rest }: CarouselSlideProps) => {
  const id = useId()
  const { currentIndex, totalSlides, registerSlide, slideIds } = useCarousel()

  useEffect(() => {
    const unregister = registerSlide(id)
    return () => unregister()
  }, [registerSlide, id])

  // get the dynamic index according to the register order
  const slideIndex = slideIds.indexOf(id)
  const isActive = currentIndex === slideIndex
  const slideLabel = label || `${slideIndex + 1} of ${totalSlides}`

  const classes = cn(
    'snap-start shrink-0 w-full h-full border-2 border-(--lithos-border) flex items-center justify-center',
    className
  )

  return (
    <div
      className={classes}
      role="group"
      aria-roledescription="slide"
      aria-label={slideLabel}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
