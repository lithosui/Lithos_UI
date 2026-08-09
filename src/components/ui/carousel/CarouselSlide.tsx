import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../utils/cn'
import type { ClassArray, ClassValue } from 'clsx'
import { useCarousel } from "./useCarousel"

export interface CarouselSlideProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  index?: number
  label?: string
  className?: ClassValue | ClassArray
}

export const CarouselSlide = ({
  index,
  label,
  className,
  children,
  ref,
  ...rest
}: CarouselSlideProps) => {
  const { currentIndex, totalSlides } = useCarousel()

  const slideIndex = index ?? 0
  const isActive = currentIndex === slideIndex
  const slideLabel = label || `${slideIndex + 1} of ${totalSlides}`

  const classes = cn(
    'snap-start shrink-0 w-full border-2 border-(--lithos-border) h-[20rem] flex items-center justify-center',
    className
  )

  return (
    <div
      className={classes}
      ref={ref}
      role='group'
      aria-roledescription='slide'
      aria-label={slideLabel}
      aria-hidden={!isActive}
      inert={!isActive ? true : undefined}
      {...rest}
    >
      {children}
    </div>
  )
}
