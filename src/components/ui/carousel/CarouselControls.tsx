/**
 * @fileoverview Lithos UI carousel controls primitive (`CarouselControls`).
 * - Header/footer toolbar providing title display and next/previous navigation triggers.
 * - Reactive button boundary guards: automatically disables navigation triggers at bounds when loop mode is inactive.
 */
import type { ComponentPropsWithRef } from 'react'
import { cn } from '../../../utils/cn'
import { CarouselNext, CarouselPrev } from './CarouselButton'
import { useCarousel } from './useCarousel'
import type { LithosClass } from '../../../utils/cn'

export interface CarouselControlsProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  className?: LithosClass
}

export const CarouselControls = ({ className, ...rest }: CarouselControlsProps) => {
  const { currentIndex, totalSlides, title, loop, bottomControls } = useCarousel()

  return (
    <div
      className={cn(
        bottomControls ? 'mt-3' : 'mb-3',
        'flex flex-col sm:flex-row items-center justify-between',
        className
      )}
      {...rest}
    >
      {title && <h3 className="text-center sm:text-start mb-2 sm:mb-0 font-body sm:text-sm lg:text-xl">{title}</h3>}

      <div className="flex items-center flex-row">
        <CarouselPrev className="mr-4" disabled={!loop && currentIndex === 0} />
        <CarouselNext disabled={!loop && currentIndex === totalSlides - 1} />
      </div>
    </div>
  )
}
