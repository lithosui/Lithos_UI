import { type ComponentPropsWithRef, type MouseEvent } from "react"
import { Button } from '../Button'
import { type CarouselDirection } from './CarouselContext'
import { useCarousel } from "./useCarousel"
import type { ClassValue, ClassArray } from "clsx"
import { IconArrowLeft } from "../icons/IconArrowLeft"
import { IconArrowRight } from "../icons/IconArrowRight"

export interface CarouselButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'className'> {
  label?: string
  direction?: CarouselDirection
  className?: ClassValue | ClassArray
}

export const CarouselButton = ({
  direction = 'next',
  children,
  className,
  label,
  onClick,
  ...props }: CarouselButtonProps) => {
  const { scroll } = useCarousel()

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    scroll(direction)
    onClick?.(e)
  }

  const ArrowIcon = direction === 'next' ? IconArrowRight : IconArrowLeft

  return (
    <Button aria-label={label} onClick={handleClick} className={className} {...props}>
      {children || <ArrowIcon aria-hidden='true' />}
    </Button>
  )
}

interface ButtonVariantProp extends ComponentPropsWithRef<typeof CarouselButton> {
  label?: string
}

const DEFAULT_PREV_LABEL = 'Previous slide'
const DEFAULT_NEXT_LABEL = 'Next slide'

export const CarouselPrev = (props: ButtonVariantProp) => {
  return (
    <CarouselButton
      {...props}
      label={props.label || DEFAULT_PREV_LABEL}
      direction='prev'
    />
  )
}

export const CarouselNext = (props: ButtonVariantProp) => {
  return (
    <CarouselButton
      {...props}
      label={props.label || DEFAULT_NEXT_LABEL}
    />
  )
}
