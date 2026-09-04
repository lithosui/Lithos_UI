/**
 * @fileoverview Lithos UI carousel pagination primitive (`CarouselPagination`).
 * - Dual selector mode: renders interactive dot indicators or numeric buttons to trigger direct slide navigation.
 * - Dynamic viewport windowing: scales active dot sizes and hides off-screen indicators (outside ±2 index range) with `tabIndex={-1}` for cleaner DOM flow.
 * - Optional slide counter and horizontal rendering safeguard for vertical layout mode.
 */
import type { ComponentPropsWithRef } from 'react'
import { Button } from '../Button'
import { cn, type LithosClass } from '../../../utils/cn'
import type { ScrollFunc, SliderSelector } from './carousel.types'
import { IconCircle } from '../icons/IconCircle'

const iconClass = {
  default: 'w-2 h-2',
  visible: 'w-3 h-3',
  selected: 'w-4 h-4',
}

export interface CarouselPaginationProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  index: number
  slides: number
  scroll: ScrollFunc
  sliderSelector?: SliderSelector
  showCounter?: boolean
  label?: string
  className?: LithosClass
  bottomControls?: boolean
  mode?: 'horizontal' | 'vertical'
}

export const CarouselPagination = ({
  index,
  slides,
  scroll,
  sliderSelector = 'dots',
  showCounter = true,
  className,
  label = 'Move to the slide $',
  bottomControls = false,
  mode = 'horizontal',
  ...rest
}: CarouselPaginationProps) => {
  const selectors = []
  const vertical = mode === 'vertical'

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
        variant={isSelected ? 'primary' : 'text'}
        onClick={() => scroll(i)}
        key={`slider-selector-${i}`}
        aria-label={label.replace('$', String(i + 1))}
        aria-current={isSelected ? 'true' : undefined}
        aria-hidden={shouldHide || undefined}
        tabIndex={shouldHide ? -1 : undefined}
      >
        {sliderIsDots && <IconCircle className={dotSize} aria-hidden="true" />}
        {sliderSelector === 'numbers' && i + 1}
      </Button>
    )
  }

  const selectorsContainerClass = cn('flex sm:ml-auto', !showCounter && 'mx-auto')
  const containerClass = cn(
    'flex items-center justify-center flex-col sm:flex-row',
    bottomControls ? 'mb-3' : 'mt-3',
    className
  )

  return (
    <div className={containerClass} {...rest}>
      {!vertical && <div className={selectorsContainerClass}>{selectors}</div>}
      {showCounter && (
        <span className="sm:ml-auto mt-4 sm:mt-0">
          {index + 1}/{slides}
        </span>
      )}
    </div>
  )
}
