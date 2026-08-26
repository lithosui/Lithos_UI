/**
 * @fileoverview Lithos UI button primitive.
 * - Centralizes `.lithos-click` physics behind a typed `variant` prop so call sites stop hand-rolling className strings.
 * - Text variant overrides `.lithos-click`'s border/shadow to stay flat: text only, no outline, no background fill.
 * - Zero-Gap Rule: `iconLeft`/`iconRight` spacing and `ButtonGroup` layout use explicit margins, never CSS `gap`.
 * - Native `type="button"` default prevents accidental form submission; opt into `type="submit"` explicitly.
 */
import type { ComponentPropsWithRef, ReactNode } from 'react'
import type { ButtonVariant } from '../../core/types'
import { cn } from '../../utils/cn'
import { getContrastText } from '../../utils/yiq'
import type { ClassArray, ClassValue } from 'clsx'

export interface ButtonProps extends Omit<ComponentPropsWithRef<'button'>, 'type' | 'className'> {
  variant?: ButtonVariant | undefined
  color?: string | undefined
  fullWidth?: boolean | undefined
  type?: 'button' | 'submit' | 'reset' | undefined
  iconLeft?: ReactNode
  iconRight?: ReactNode
  children: ReactNode
  className?: ClassValue | ClassArray
}

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-(--lithos-accent) text-(--lithos-accent-text)',
  secondary: 'bg-(--lithos-surface) text-(--lithos-text)',
  accent: 'bg-(--lithos-surface) text-(--lithos-text) hover:bg-(--lithos-accent) hover:text-(--lithos-accent-text)',
  text: 'bg-transparent text-(--lithos-text) cursor-pointer !border-transparent !shadow-none hover:!shadow-none',
  solid: '',
}

export const Button = ({
  variant = 'primary',
  color,
  fullWidth = false,
  type = 'button',
  iconLeft,
  iconRight,
  className,
  children,
  style,
  ref,
  ...rest
}: ButtonProps) => {
  const classes = [
    'lithos-click',
    'rounded-(--lithos-radius)',
    variantClass[variant],
    fullWidth && 'w-full',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
    className,
  ]

  const isSolid = variant === 'solid'
  const solidColor = color || '#00FF00'
  const solidStyle = isSolid ? { backgroundColor: solidColor, color: getContrastText(solidColor) } : {}

  return (
    <button ref={ref} type={type} className={cn(classes)} style={{ ...solidStyle, ...style }} {...rest}>
      {iconLeft && (
        <span className="inline-flex shrink-0 mr-2" aria-hidden="true">
          {iconLeft}
        </span>
      )}
      {children}
      {iconRight && (
        <span className="inline-flex shrink-0 ml-2" aria-hidden="true">
          {iconRight}
        </span>
      )}
    </button>
  )
}

/**
 * ButtonGroup lays out `Button` primitives side by side (`horizontal`) or stacked (`vertical`).
 * `attached` fuses adjacent buttons into a single hard-bordered strip by collapsing the shared
 * border and popping the hovered/focused item's shadow above its neighbors via `z-10`.
 */
export interface ButtonGroupProps extends Omit<ComponentPropsWithRef<'div'>, 'className'> {
  mode?: 'horizontal' | 'vertical' | undefined
  attached?: boolean | undefined
  className?: ClassValue | ClassArray
}

export const ButtonGroup = ({
  mode = 'horizontal',
  attached = false,
  className,
  children,
  ref,
  ...rest
}: ButtonGroupProps) => {
  const isVertical = mode === 'vertical'

  const classes = [
    'inline-flex',
    isVertical ? 'flex-col' : 'flex-row',
    attached
      ? [
          '[&>*]:relative [&>*:hover]:z-10 [&>*:focus-visible]:z-10',
          isVertical ? '[&>*:not(:first-child)]:-mt-0.5' : '[&>*:not(:first-child)]:-ml-0.5',
        ]
      : isVertical
        ? '[&>*:not(:first-child)]:mt-2'
        : '[&>*:not(:first-child)]:ml-2',
    className,
  ]

  return (
    <div ref={ref} role="group" className={cn(classes)} {...rest}>
      {children}
    </div>
  )
}
