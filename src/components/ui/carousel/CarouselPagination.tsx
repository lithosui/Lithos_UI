/**
 * CarouselPagination.tsx
 * Renders the slide selector (the dots or numbers design) usually located at the middle top or bottom.
 */
import type { ComponentPropsWithoutRef } from 'react'
import { Button } from '../Button'
import { cn } from '../../../utils/cn'
import type { ScrollFunc, SliderSelector } from './CarouselContext'
import type { ClassValue, ClassArray } from "clsx"
import { IconCircle } from '../icons/IconCircle'

const iconClass = {
  default: 'w-2 h-2',
  visible: 'w-3 h-3',
  selected: 'w-4 h-4',
}

interface CarouselPaginationProps extends Omit<ComponentPropsWithoutRef<'div'>, 'className'> {
  index: number
  slides: number
  scroll: ScrollFunc
  sliderSelector?: SliderSelector
  showCounter?: boolean
  label?: string
  className?: ClassValue | ClassArray
}

export const CarouselPagination = ({
  index,
  slides,
  scroll,
  sliderSelector = 'dots',
  showCounter = true,
  className,
  label = 'Move to the slide $',
  ...rest
}: CarouselPaginationProps) => {
  const selectors = []

  for (let i = 0; i < slides; i++) {
    const isLast = i === slides - 1
    const isSelected = i === index
    const extraVisible = i === index - 1 || i === index + 1
    const shouldHide = i < index - 2 || i > index + 2

    const classes = [
      isLast ? 'mr-0' : 'mr-4',
      extraVisible ? 'opacity-85' : 'opacity-60',
      shouldHide && 'absolute invisible opacity-0',
      isSelected && 'opacity-100',
    ]

    const sliderIsDots = sliderSelector === 'dots'
    const dotSize = isSelected ? iconClass.selected : iconClass[extraVisible ? 'visible' : 'default']

    selectors.push(
      <Button
        className={classes}
        intent={isSelected ? 'primary' : 'text'}
        onClick={() => scroll(i)}
        key={`slider-selector-${i}`}
        aria-label={label.replace('$', String(i + 1))}
        aria-current={isSelected ? 'true' : undefined}
        aria-hidden={shouldHide || undefined}
        tabIndex={shouldHide ? -1 : undefined}
      >
        {sliderIsDots && <IconCircle className={dotSize} aria-hidden='true' />}
        {sliderSelector === 'numbers' && i + 1}
      </Button>
    )
  }

  const selectorsContainerClass = cn('flex ml-auto', !showCounter && 'mx-auto')
  const containerClass = cn(
    'flex items-center justify-center',
    'my-3',
    className
  )

  return (
    <div className={containerClass} {...rest}>
      <div className={selectorsContainerClass}>{selectors}</div>
      {showCounter && (
        <span className='ml-auto'>
          {index + 1}/{slides}
        </span>
      )}
    </div>
  )
}
