import type { ComponentPropsWithoutRef } from 'react'
import { cn } from '../../../utils/cn'
import { CarouselNext, CarouselPrev } from './CarouselButton'
import type { ClassValue, ClassArray } from "clsx"

interface CarouselControlsProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  title?: string | undefined
  bottomPositioned?: boolean
  className?: ClassValue | ClassArray
}

export const CarouselControls = ({
  title,
  bottomPositioned = false,
  className,
  ...rest
}: CarouselControlsProps) => {
  return (
    <div
      className={cn(
        bottomPositioned ? 'mt-3' : 'mb-3',
        'flex flex-col sm:flex-row items-center justify-between',
        className
      )}
      {...rest}
    >
      {title && (
        <h3 className='text-center sm:text-start mb-2 sm:mb-0 font-sans font-bold sm:text-lg lg:text-2xl'>
          {title}
        </h3>
      )}

      <div className='flex items-center flex-row'>
        <CarouselPrev className='mr-4' />
        <CarouselNext />
      </div>
    </div>
  )
}
