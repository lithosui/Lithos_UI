/**
 * @fileoverview Lithos UI carousel navigation controls (`CarouselButton`, `CarouselPrev`, `CarouselNext`).
 * - Direction-aware navigation primitives that consume `CarouselContext` to trigger vertical or horizontal scrolling.
 * - Dynamic icon switching (arrows up/down vs. left/right) based on the carousel orientation state.
 * - Accessible compound triggers providing default `aria-label` fallbacks for screen reader interactions.
 */
import { type ComponentPropsWithRef, type MouseEvent } from 'react'
import { Button } from '../Button'
import type { CarouselButtonProps } from './carousel.types'
import { useCarousel } from './useCarousel'
import { IconArrowLeft } from '../icons/IconArrowLeft'
import { IconArrowRight } from '../icons/IconArrowRight'
import { IconArrowDown } from '../icons/IconArrowDown'
import { IconArrowUp } from '../icons/IconArrowUp'

/**
 * Direction-aware interactive button component for triggering carousel slide transitions.
 *
 * @param props - Configuration properties including direction, label, and click handler. - {@link CarouselButtonProps}
 * @returns Button navigation element.
 */
export const CarouselButton = ({ direction = 'forwards', children, label, onClick, ...props }: CarouselButtonProps) => {
  const { scroll, mode } = useCarousel()
  const vertical = mode === 'vertical'

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    scroll(direction)
    onClick?.(e)
  }

  const ArrowIcon =
    direction === 'forwards' ? (vertical ? IconArrowDown : IconArrowRight) : vertical ? IconArrowUp : IconArrowLeft

  return (
    <Button aria-label={label} onClick={handleClick} {...props}>
      {children || <ArrowIcon aria-hidden="true" />}
    </Button>
  )
}

interface ButtonVariantProp extends ComponentPropsWithRef<typeof CarouselButton> {
  label?: string
}

const DEFAULT_PREV_LABEL = 'Previous slide'
const DEFAULT_NEXT_LABEL = 'Next slide'

/**
 * Previous slide navigation trigger button component.
 *
 * @param props - Button properties. - {@link ButtonVariantProp}
 * @returns Previous navigation button element.
 */
export const CarouselPrev = (props: ButtonVariantProp) => (
  <CarouselButton {...props} label={props.label || DEFAULT_PREV_LABEL} direction="backwards" />
)

/**
 * Next slide navigation trigger button component.
 *
 * @param props - Button properties. - {@link ButtonVariantProp}
 * @returns Next navigation button element.
 */
export const CarouselNext = (props: ButtonVariantProp) => (
  <CarouselButton {...props} label={props.label || DEFAULT_NEXT_LABEL} />
)
