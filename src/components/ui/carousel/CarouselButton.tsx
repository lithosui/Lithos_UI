/**
 * @fileoverview Lithos UI carousel navigation controls (`CarouselButton`, `CarouselPrev`, `CarouselNext`).
 * - Direction-aware navigation primitives that consume `CarouselContext` to trigger vertical or horizontal scrolling.
 * - Dynamic icon switching (arrows up/down vs. left/right) based on the carousel orientation state.
 * - Accessible compound triggers providing default `aria-label` fallbacks for screen reader interactions.
 */
import { type ComponentPropsWithRef, type MouseEvent } from 'react'
import { Button } from '../Button'
import { type CarouselDirection } from './CarouselContext'
import { useCarousel } from './useCarousel'
import type { ClassValue, ClassArray } from 'clsx'
import { IconArrowLeft } from '../icons/IconArrowLeft'
import { IconArrowRight } from '../icons/IconArrowRight'
import { IconArrowDown } from '../icons/IconArrowDown'
import { IconArrowUp } from '../icons/IconArrowUp'

export interface CarouselButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  label?: string
  direction?: CarouselDirection
  className?: ClassValue | ClassArray
}

export const CarouselButton = ({
  direction = 'forwards',
  children,
  className,
  label,
  onClick,
  ref,
  ...props
}: CarouselButtonProps) => {
  const { scroll, mode } = useCarousel()
  const vertical = mode === 'vertical'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    scroll(direction)
    onClick?.(e)
  }

  const ArrowIcon =
    direction === 'forwards' ? (vertical ? IconArrowDown : IconArrowRight) : vertical ? IconArrowUp : IconArrowLeft

  return (
    <Button aria-label={label} onClick={handleClick} className={className} {...props} ref={ref}>
      {children || <ArrowIcon aria-hidden="true" />}
    </Button>
  )
}

interface ButtonVariantProp extends ComponentPropsWithRef<typeof CarouselButton> {
  label?: string
}

const DEFAULT_PREV_LABEL = 'Previous slide'
const DEFAULT_NEXT_LABEL = 'Next slide'

export const CarouselPrev = (props: ButtonVariantProp) => {
  return <CarouselButton {...props} label={props.label || DEFAULT_PREV_LABEL} direction="backwards" />
}

export const CarouselNext = (props: ButtonVariantProp) => {
  return <CarouselButton {...props} label={props.label || DEFAULT_NEXT_LABEL} />
}
